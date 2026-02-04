"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter, usePathname } from 'next/navigation';
import { authService } from '../services/auth';

interface AuthContextType {
    user: any;
    loading: boolean;
    login: (data: any) => Promise<void>;
    signup: (data: any) => Promise<void>;
    logout: () => void;
    loginWithGoogle: (credential: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();


    useEffect(() => {
        const checkUser = async () => {
            const token = Cookies.get('token');
            if (token) {
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
    }, []);

    const login = async (data: any) => {
        const response = await authService.signin(data);
        const { access_token, role } = response.data;
        Cookies.set('token', access_token);
        const userResponse = await authService.me();
        setUser(userResponse.data);

        if (role === 'admin') {
            router.push('/dashboard');
        } else {
            router.push('/'); // Redirect to home page
        }
    };

    const signup = async (data: any) => {
        await authService.signup(data);
        // Redirect to verification or tell user to check email
        router.push(`/verify?email=${data.email}`);
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        router.push('/signin');
    };

    const loginWithGoogle = async (credential: string) => {
        try {
            const response = await authService.googleLogin(credential);
            console.log("Google Login Response:", response.data);
            const { access_token, role } = response.data;

            Cookies.set('token', access_token);
            const userResponse = await authService.me();
            setUser(userResponse.data);

            console.log("Redirecting based on role:", role);
            if (role === 'admin') {
                router.push('/dashboard');
            } else {
                router.push('/');
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
