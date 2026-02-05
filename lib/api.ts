// API Configuration
// Direct connection to backend (avoids Vercel rewrite issues)

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://back-27em.onrender.com/api/v1/";

// Prevent doubling /api/v1 if it's already in the base URL
export const API_URL = API_BASE_URL.endsWith('/api/v1')
    ? API_BASE_URL
    : `${API_BASE_URL.replace(/\/$/, '')}/api/v1`;
