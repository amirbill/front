import { cookies } from "next/headers";
import { API_URL } from "./api";

export async function getUserFromServer() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) return null;

    try {
        const res = await fetch(`${API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
            cache: 'no-store'
        });

        if (res.ok) {
            return await res.json();
        }
        return null;
    } catch (error) {
        console.error("Error fetching user from server:", error);
        return null;
    }
}
