"use client"

import React, { useState, useEffect, useRef, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Loader2, Mail, RefreshCw } from "lucide-react"
import { verifyEmailAction, resendVerificationAction } from "@/app/auth-actions"

function VerifyContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const email = searchParams.get("email")
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [resendSuccess, setResendSuccess] = useState(false)
    const [videoLoaded, setVideoLoaded] = useState(false)
    const [code, setCode] = useState(["", "", "", "", "", ""])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const [cooldown, setCooldown] = useState(0)

    useEffect(() => {
        if (!email) {
            router.push("/signup")
        }
    }, [email, router])

    // Cooldown timer for resend
    useEffect(() => {
        if (cooldown <= 0) return
        const id = setInterval(() => setCooldown((c) => c - 1), 1000)
        return () => clearInterval(id)
    }, [cooldown])

    // Auto-focus first input
    useEffect(() => {
        inputRefs.current[0]?.focus()
    }, [])

    const handleChange = (index: number, value: string) => {
        if (value && !/^\d$/.test(value)) return
        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)
        setError(null)

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }

        if (value && index === 5 && newCode.every((d) => d !== "")) {
            handleSubmit(newCode.join(""))
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
            const newCode = [...code]
            newCode[index - 1] = ""
            setCode(newCode)
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
        if (!pasted) return
        const newCode = [...code]
        for (let i = 0; i < 6; i++) {
            newCode[i] = pasted[i] || ""
        }
        setCode(newCode)
        const focusIndex = Math.min(pasted.length, 5)
        inputRefs.current[focusIndex]?.focus()
        if (pasted.length === 6) {
            handleSubmit(pasted)
        }
    }

    const handleSubmit = async (codeStr?: string) => {
        if (!email) return
        const finalCode = codeStr || code.join("")
        if (finalCode.length !== 6) {
            setError("Veuillez entrer les 6 chiffres du code")
            return
        }
        setError(null)
        setIsLoading(true)
        try {
            const response = await verifyEmailAction(email, finalCode)
            if (response.success) {
                setSuccess(true)
                setTimeout(() => {
                    router.push("/signin")
                }, 2000)
            } else {
                setError(response.error || "Code invalide")
                setCode(["", "", "", "", "", ""])
                inputRefs.current[0]?.focus()
            }
        } catch (err: any) {
            setError("Une erreur est survenue")
        } finally {
            setIsLoading(false)
        }
    }

    const handleResend = async () => {
        if (!email || cooldown > 0) return
        setIsResending(true)
        setResendSuccess(false)
        try {
            const response = await resendVerificationAction(email)
            if (response.success) {
                setResendSuccess(true)
                setCooldown(60)
                setCode(["", "", "", "", "", ""])
                inputRefs.current[0]?.focus()
                setTimeout(() => setResendSuccess(false), 4000)
            } else {
                setError(response.error || "Impossible de renvoyer le code")
            }
        } catch {
            setError("Erreur réseau")
        } finally {
            setIsResending(false)
        }
    }

    if (!email) return null

    return (
        <div className="relative flex min-h-screen min-h-[100dvh] items-center justify-center">
            {/* Video background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-orange-100 to-amber-200" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onLoadedData={() => setVideoLoaded(true)}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{ objectFit: "cover", objectPosition: "center", opacity: videoLoaded ? 1 : 0 }}
                >
                    <source src="/videos/1111_vid.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-white/15 sm:bg-white/10" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-[360px] sm:max-w-md mx-auto px-3 sm:px-4 animate-fade-in-up">
                {/* Mascot */}
                <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="relative w-16 h-20 sm:w-20 sm:h-24">
                        <Image
                            src="/images/1.png"
                            alt="Mascotte 1111"
                            fill
                            className="object-contain drop-shadow-lg"
                            priority
                        />
                    </div>
                </div>

                {/* Card */}
                <div className="rounded-2xl sm:rounded-3xl bg-white/35 backdrop-blur-lg p-5 sm:p-8 shadow-2xl shadow-blue-900/10 border border-white/25">
                    {/* Logo */}
                    <div className="flex justify-center mb-3 sm:mb-4">
                        <Image
                            src="/images/Logo 1111.svg"
                            alt="1111.tn"
                            width={100}
                            height={36}
                            className="h-7 sm:h-9 w-auto object-contain"
                        />
                    </div>

                    {/* Mail icon */}
                    <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100/60 backdrop-blur-sm flex items-center justify-center">
                            <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                        </div>
                    </div>

                    <div className="text-center mb-4 sm:mb-6">
                        <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent mb-1.5">
                            Vérifiez votre email
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-600">
                            Un code à 6 chiffres a été envoyé à
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-blue-700 mt-0.5 break-all">
                            {email}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-3 sm:mb-4 rounded-xl bg-red-50/80 border border-red-200 p-2.5 sm:p-3 text-xs sm:text-sm text-red-600 font-medium text-center animate-shake">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-3 sm:mb-4 rounded-xl bg-green-50/80 border border-green-200 p-2.5 sm:p-3 text-xs sm:text-sm text-green-600 font-medium text-center">
                            ✅ Email vérifié avec succès ! Redirection...
                        </div>
                    )}

                    {resendSuccess && (
                        <div className="mb-3 sm:mb-4 rounded-xl bg-blue-50/80 border border-blue-200 p-2.5 sm:p-3 text-xs sm:text-sm text-blue-600 font-medium text-center">
                            📧 Nouveau code envoyé !
                        </div>
                    )}

                    {/* 6-digit code inputs */}
                    <div className="flex justify-center gap-2 sm:gap-3 mb-5 sm:mb-6" onPaste={handlePaste}>
                        {code.map((digit, i) => (
                            <input
                                key={i}
                                ref={(el) => { inputRefs.current[i] = el }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                disabled={isLoading || success}
                                className={`w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-xl border-2 outline-none transition-all duration-200
                                    ${digit ? "border-blue-400 bg-white/50 text-blue-700" : "border-slate-200/50 bg-white/30 text-slate-700"}
                                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50 focus:bg-white/50
                                    disabled:opacity-50 placeholder:text-slate-300 backdrop-blur-sm`}
                                placeholder="·"
                            />
                        ))}
                    </div>

                    {/* Verify button */}
                    <button
                        onClick={() => handleSubmit()}
                        disabled={isLoading || success || code.some((d) => !d)}
                        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-2.5 sm:py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin inline" /> : null}
                        {isLoading ? "Vérification..." : success ? "Vérifié ✓" : "Vérifier"}
                    </button>

                    {/* Resend */}
                    <div className="mt-4 sm:mt-5 text-center">
                        <p className="text-xs sm:text-sm text-slate-500 mb-2">
                            Vous n{"'"}avez pas reçu le code ?
                        </p>
                        <button
                            onClick={handleResend}
                            disabled={isResending || cooldown > 0 || success}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${isResending ? "animate-spin" : ""}`} />
                            {cooldown > 0 ? `Renvoyer dans ${cooldown}s` : "Renvoyer le code"}
                        </button>
                    </div>

                    {/* Back to signup */}
                    <p className="mt-4 text-center text-xs text-slate-500">
                        Mauvais email ?{" "}
                        <a href="/signup" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
                            Modifier
                        </a>
                    </p>
                </div>
            </div>

            {/* CSS animations */}
            <style jsx global>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-4px); }
                    40%, 80% { transform: translateX(4px); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.7s ease-out both;
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </div>
    )
}

export default function VerifyPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        }>
            <VerifyContent />
        </Suspense>
    )
}
