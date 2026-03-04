"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter, usePathname } from 'next/navigation';
import { authService } from '../services/auth';
import { signinAction, signupAction, logoutAction, googleLoginAction } from "@/app/auth-actions"

interface AuthContextType {
    user: any;
    loading: boolean;
    login: (data: any) => Promise<void>;
    signup: (data: any) => Promise<void>;
    logout: () => void;
    loginWithGoogle: (credential: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children, initialUser }: { children: React.ReactNode, initialUser?: any }) => {
    const [user, setUser] = useState<any>(initialUser || null);
    const [loading, setLoading] = useState(!initialUser);
    const router = useRouter();


    useEffect(() => {
        const checkUser = async () => {
            const token = Cookies.get('token');
            // Only fetch if token exists AND we don't already have the user (e.g. from SSR)
            if (token && !initialUser) {
                try {
                    const response = await authService.me();
                    setUser(response.data);
                } catch (error) {
                    Cookies.remove('token');
                }
            }
            setLoading(false);
        };
        checkUser();
    }, [initialUser]);

    const login = async (data: any) => {
        const response = await signinAction(data);
        if (response.success && response.user) {
            setUser(response.user);
            // Site is closed - don't redirect anywhere, just stay on signin page
            router.refresh();
        } else {
            throw new Error(response.error || 'Login failed');
        }
    };

    const signup = async (data: any) => {
        const response = await signupAction(data);
        if (response.success) {
            router.push('/signin');
        } else {
            throw new Error(response.error || 'Signup failed');
        }
    };

    const logout = async () => {
        await logoutAction();
        setUser(null);
        router.push('/signup');
        router.refresh();
    };

    const loginWithGoogle = async (credential: string) => {
        try {
            const response = await googleLoginAction(credential);
            if (response.success && response.data) {
                // Site is closed - don't redirect anywhere, just refresh to update user state
                router.refresh();
            }
        } catch (error) {
            console.error("Google login error:", error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, loginWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
