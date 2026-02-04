// API Configuration
// Direct connection to backend (avoids Vercel rewrite issues)

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://back-27em.onrender.com";
export const API_URL = `${API_BASE_URL}/api/v1`;
