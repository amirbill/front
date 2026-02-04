import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from '@/lib/api';

const BASE_URL = API_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    signup: async (data: any) => {
        return api.post('/auth/signup', data);
    },
    signin: async (data: any) => {
        return api.post('/auth/signin', data);
    },
    verifyEmail: async (data: { email: string; code: string }) => {
        return api.post('/auth/verify-email', data);
    },
    forgotPassword: async (data: { email: string }) => {
        return api.post('/auth/forgot-password', data);
    },
    resetPassword: async (data: any) => {
        return api.post('/auth/reset-password', data);
    },
    me: async () => {
        return api.get('/auth/me');
    },
    updateProfile: async (data: any) => {
        return api.put('/auth/profile', data);
    },
    changePassword: async (data: any) => {
        return api.put('/auth/change-password', data);
    },
    googleLogin: async (credential: string) => {
        return api.post('/auth/google', { credential });
    },
};
