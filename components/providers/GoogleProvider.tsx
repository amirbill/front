"use client"

import { GoogleOAuthProvider } from "@react-oauth/google"
import { ReactNode } from "react"

// Use environment variable or fallback to provided ID (for immediate testing)
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "166147533764-que54mo53gh1u5vgdfshloem97oluhnf.apps.googleusercontent.com"

export function GoogleProvider({ children }: { children: ReactNode }) {
    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            {children}
        </GoogleOAuthProvider>
    )
}
