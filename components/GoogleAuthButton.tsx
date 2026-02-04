"use client"

import { GoogleLogin } from "@react-oauth/google"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export function GoogleAuthButton() {
    const { loginWithGoogle } = useAuth()
    const router = useRouter()

    const handleSuccess = async (credentialResponse: any) => {
        if (credentialResponse.credential) {
            try {
                await loginWithGoogle(credentialResponse.credential)
            } catch (error) {
                console.error("Google login failed:", error)
            }
        }
    }

    const handleError = () => {
        console.error("Google login failed")
    }

    return (
        <div className="flex justify-center w-full">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                theme="outline"
                size="large"
                text="continue_with"
                width="100%"
            />
        </div>
    )
}
