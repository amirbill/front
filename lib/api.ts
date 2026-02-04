// API Configuration
// In development: uses local proxy via Next.js rewrites (empty string = same origin)
// In production: uses NEXT_PUBLIC_API_URL environment variable

const getApiBaseUrl = () => {
    // Client-side: use relative URL to go through Next.js rewrites
    if (typeof window !== 'undefined') {
        return '';
    }
    // Server-side: use environment variable or localhost fallback
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
};

export const API_BASE_URL = getApiBaseUrl();
export const API_URL = `${API_BASE_URL}/api/v1`;
