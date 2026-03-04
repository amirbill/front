"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, Loader2, Clock, Rocket } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuth } from "@/contexts/AuthContext"
import { GoogleAuthButton } from "@/components/GoogleAuthButton"

const signUpSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    phone: z.string().min(8, "Numéro WhatsApp invalide"),
    address: z.string().min(5, "Adresse trop courte"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
})

type SignUpFormValues = z.infer<typeof signUpSchema>

// Countdown target: 30 days from first visit
function useCountdown() {
    const [mounted, setMounted] = useState(false)
    const [target] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("launch_date_1111")
            if (stored) return parseInt(stored, 10)
            const t = Date.now() + 30 * 24 * 60 * 60 * 1000
            localStorage.setItem("launch_date_1111", t.toString())
            return t
        }
        return Date.now() + 30 * 24 * 60 * 60 * 1000
    })

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        setMounted(true)
        const tick = () => {
            const diff = Math.max(0, target - Date.now())
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            })
        }
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [target])

    return { timeLeft, mounted }
}

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [videoLoaded, setVideoLoaded] = useState(false)
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { signup } = useAuth()
    const { timeLeft: countdown, mounted } = useCountdown()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
    })

    const onSubmit = async (data: SignUpFormValues) => {
        setError(null)
        setSuccess(false)
        setIsLoading(true)
        try {
            await signup({
                email: data.email,
                password: data.password,
                role: "client",
                full_name: data.name,
                phone: data.phone,
                address: data.address,
            })
            setSuccess(true)
            reset()
        } catch (err: any) {
            console.error("Signup Error:", err);
            if (err.response) {
                console.error("Response Data:", err.response.data);
                console.error("Response Status:", err.response.status);
            }
            setError(err.response?.data?.detail || `Erreur: ${err.message || "Une erreur est survenue lors de l'inscription"}`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="relative flex min-h-screen min-h-[100dvh] lg:h-screen lg:h-[100dvh] lg:overflow-hidden">
            {/* Gradient fallback + Video background */}
            <div className="fixed inset-0 z-0">
                {/* Instant gradient background while video loads */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-orange-100 to-amber-200" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onLoadedData={() => setVideoLoaded(true)}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{ objectFit: 'cover', objectPosition: 'center', opacity: videoLoaded ? 1 : 0 }}
                >
                    <source src="/videos/1111_vid.mp4" type="video/mp4" />
                </video>
                {/* Overlay - stronger on mobile for readability */}
                <div className="absolute inset-0 bg-white/15 sm:bg-white/10 lg:bg-white/5" />
            </div>

            {/* Left Side - Branding + Countdown */}
            <div className="relative hidden w-1/2 flex-col justify-between p-6 xl:p-8 lg:flex z-10">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Image
                        src="/images/Logo 1111.svg"
                        alt="1111.tn"
                        width={140}
                        height={48}
                        className="h-12 w-auto object-contain drop-shadow-lg"
                        priority
                    />
                </div>

                {/* Center: Mascot + Countdown */}
                <div className="flex flex-1 flex-col items-center justify-center gap-5">
                    <div className="relative h-36 w-36 xl:h-48 xl:w-48 animate-fade-in-up">
                        <Image
                            src="/images/1.png"
                            alt="1111 Mascot"
                            fill
                            className="object-contain drop-shadow-2xl"
                        />
                        <Image
                            src="/images/cadre.png"
                            alt="Frame"
                            fill
                            className="pointer-events-none object-contain"
                        />
                    </div>

                    {/* Countdown */}
                    <div className="animate-fade-in-up-delay text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Rocket className="size-5 text-blue-600 animate-pulse" />
                            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                                Disponible bientôt
                            </span>
                            <Rocket className="size-5 text-blue-600 animate-pulse" />
                        </div>

                        <div className="flex items-center gap-3">
                            {mounted && [
                                { value: countdown.days, label: "Jours" },
                                { value: countdown.hours, label: "Heures" },
                                { value: countdown.minutes, label: "Min" },
                                { value: countdown.seconds, label: "Sec" },
                            ].map((item, i) => (
                                <React.Fragment key={item.label}>
                                    {i > 0 && <span className="text-2xl font-bold text-blue-400 animate-pulse">:</span>}
                                    <div className="flex flex-col items-center">
                                        <div className="relative w-[46px] h-[46px] xl:w-[56px] xl:h-[56px] rounded-2xl bg-white/40 backdrop-blur-md border-2 border-blue-200/30 shadow-lg flex items-center justify-center overflow-hidden group hover:scale-105 transition-transform duration-300">
                                            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent" />
                                            <span className="relative text-xl xl:text-2xl font-black text-blue-700 tabular-nums">
                                                {String(item.value).padStart(2, "0")}
                                            </span>
                                        </div>
                                        <span className="mt-2 text-[11px] font-bold uppercase tracking-wider text-blue-500/80">
                                            {item.label}
                                        </span>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tagline */}
                <p className="max-w-md text-sm xl:text-base italic text-blue-600/70 font-medium">
                    {'"'}Toutes les offres, les vrais prix et les meilleures décisions au même endroit.{'"'}
                </p>
            </div>

            {/* Right Side - Floating Sign Up Form */}
            <div className="relative flex w-full items-start sm:items-center justify-center px-2 py-3 sm:p-3 md:p-4 lg:p-4 lg:w-1/2 z-10 lg:overflow-y-auto">
                <div className="w-full max-w-[360px] sm:max-w-md animate-fade-in-up my-auto">
                    {/* Mobile: Mascot first, Countdown second | Desktop: hidden (shown on left side) */}
                    <div className="flex flex-col items-center lg:hidden mt-2 sm:mt-6 mb-1 sm:mb-2">
                        {/* Mascot - shown first on mobile */}
                        <div className="flex justify-center mb-3 sm:mb-8 animate-bounce-gentle">
                            <div className="relative w-10 h-10 sm:w-14 sm:h-14">
                                <Image
                                    src="/images/1.png"
                                    alt="Mascotte 1111"
                                    fill
                                    className="object-contain drop-shadow-lg"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Countdown - shown second on mobile */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Rocket className="size-3 text-blue-600 animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-600">
                                    Disponible bientôt
                                </span>
                            </div>
                            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                                {mounted && [
                                    { value: countdown.days, label: "J" },
                                    { value: countdown.hours, label: "H" },
                                    { value: countdown.minutes, label: "M" },
                                    { value: countdown.seconds, label: "S" },
                                ].map((item, i) => (
                                    <React.Fragment key={item.label}>
                                        {i > 0 && <span className="text-sm sm:text-base font-bold text-blue-400">:</span>}
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg bg-white/40 backdrop-blur-sm border border-blue-200/30 shadow flex items-center justify-center">
                                            <span className="text-sm sm:text-base font-black text-blue-700 tabular-nums">
                                                {String(item.value).padStart(2, "0")}
                                            </span>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mascot - desktop only (hidden on mobile since it's in the block above) */}
                    <div className="hidden lg:flex justify-center mb-1 xl:mb-2 animate-bounce-gentle">
                        <div className="relative w-12 h-16 xl:w-16 xl:h-20">
                            <Image
                                src="/images/1.png"
                                alt="Mascotte 1111"
                                fill
                                className="object-contain drop-shadow-lg"
                                priority
                            />
                        </div>
                    </div>

                    {/* Floating form card */}
                    <div className="rounded-2xl sm:rounded-3xl bg-white/35 backdrop-blur-lg p-2.5 sm:p-3 md:p-5 shadow-2xl shadow-blue-900/10 border border-white/25 hover:shadow-blue-900/15 transition-shadow duration-500">
                        {/* Header */}
                        <div className="mb-1.5 sm:mb-2 text-center">
                            <div className="lg:hidden flex justify-center mb-1.5 sm:mb-2">
                                <Image
                                    src="/images/Logo 1111.svg"
                                    alt="1111.tn"
                                    width={80}
                                    height={28}
                                    className="h-6 sm:h-7 w-auto object-contain"
                                />
                            </div>
                            <h1 className="mb-0.5 sm:mb-1 text-lg sm:text-xl font-extrabold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
                                Créer un compte
                            </h1>
                            <p className="text-xs text-slate-500">
                                Rejoignez 1111 et soyez les premiers informés.
                            </p>
                        </div>

                        {error && (
                            <div className="mb-2 rounded-xl bg-red-50 border border-red-200 p-2 text-xs text-red-600 font-medium animate-shake">
                                {error}
                            </div>
                        )}

                        {success && mounted && (
                            <div className="mb-2 rounded-xl bg-green-50 border border-green-200 p-2 text-xs text-green-600 font-medium">
                                ✅ Inscription réussie ! Votre compte a été créé. Le site ouvrira dans {countdown.days} jours.
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 sm:space-y-1.5">
                            {/* Name & Email - 2 columns on sm+ */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 sm:gap-x-3 gap-y-1 sm:gap-y-1.5">
                            <div className="space-y-0.5">
                                <label htmlFor="name" className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                                    Nom complet
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register("name")}
                                    placeholder="Votre nom"
                                    className="w-full rounded-xl border-2 border-slate-200/40 bg-white/30 backdrop-blur-sm px-3 py-1.5 text-sm outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 focus:bg-white/50 placeholder:text-slate-400"
                                />
                                {errors.name && <span className="text-[10px] text-red-500 font-medium">{errors.name.message}</span>}
                            </div>

                            {/* Email */}
                            <div className="space-y-0.5">
                                <label htmlFor="email" className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register("email")}
                                    placeholder="vous@exemple.com"
                                    className="w-full rounded-xl border-2 border-slate-200/40 bg-white/30 backdrop-blur-sm px-3 py-1.5 text-sm outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 focus:bg-white/50 placeholder:text-slate-400"
                                />
                                {errors.email && <span className="text-[10px] text-red-500 font-medium">{errors.email.message}</span>}
                            </div>
                            </div>

                            {/* Phone & Address - 2 columns on sm+ */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 sm:gap-x-3 gap-y-1 sm:gap-y-1.5">
                            {/* Phone */}
                            <div className="space-y-0.5">
                                <label htmlFor="phone" className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                                    Numéro WhatsApp
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    {...register("phone")}
                                    placeholder="+216 XX XXX XXX"
                                    className="w-full rounded-xl border-2 border-slate-200/40 bg-white/30 backdrop-blur-sm px-3 py-1.5 text-sm outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 focus:bg-white/50 placeholder:text-slate-400"
                                />
                                {errors.phone && <span className="text-[10px] text-red-500 font-medium">{errors.phone.message}</span>}
                            </div>

                            {/* Address */}
                            <div className="space-y-0.5">
                                <label htmlFor="address" className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                                    Adresse
                                </label>
                                <input
                                    id="address"
                                    type="text"
                                    {...register("address")}
                                    placeholder="Votre adresse"
                                    className="w-full rounded-xl border-2 border-slate-200/40 bg-white/30 backdrop-blur-sm px-3 py-1.5 text-sm outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 focus:bg-white/50 placeholder:text-slate-400"
                                />
                                {errors.address && <span className="text-[10px] text-red-500 font-medium">{errors.address.message}</span>}
                            </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-0.5">
                                <label htmlFor="password" className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        {...register("password")}
                                        placeholder="Créer un mot de passe"
                                        className="w-full rounded-xl border-2 border-slate-200/40 bg-white/30 backdrop-blur-sm px-3 py-1.5 pr-10 text-sm outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 focus:bg-white/50 placeholder:text-slate-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </button>
                                </div>
                                {errors.password && <span className="text-[10px] text-red-500 font-medium">{errors.password.message}</span>}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-0.5">
                                <label htmlFor="confirmPassword" className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                                    Confirmer le mot de passe
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        {...register("confirmPassword")}
                                        placeholder="Confirmer votre mot de passe"
                                        className="w-full rounded-xl border-2 border-slate-200/40 bg-white/30 backdrop-blur-sm px-3 py-1.5 pr-10 text-sm outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 focus:bg-white/50 placeholder:text-slate-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <span className="text-[10px] text-red-500 font-medium">{errors.confirmPassword.message}</span>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-2 sm:py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin inline" /> : null}
                                {isLoading ? "Inscription..." : "S'inscrire"}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-2 flex items-center gap-3">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                            <span className="text-[10px] font-medium text-slate-400">ou</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                        </div>

                        {/* Google Sign Up */}
                        <GoogleAuthButton />

                        {/* Sign In Link */}
                        <p className="mt-2 text-center text-xs text-slate-500">
                            Vous avez déjà un compte?{" "}
                            <Link href="/signin" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                Connectez-vous.
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* CSS animations */}
            <style jsx global>{`
                @keyframes gradient-shift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes float-slow {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(30px, -40px) scale(1.05); }
                }
                @keyframes float-slower {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-20px, 30px) scale(1.08); }
                }
                @keyframes float-medium {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(40px, -20px) scale(1.03); }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-4px); }
                    40%, 80% { transform: translateX(4px); }
                }
                .animate-gradient-shift {
                    background-size: 200% 200%;
                    animation: gradient-shift 8s ease infinite;
                }
                .animate-float-slow {
                    animation: float-slow 12s ease-in-out infinite;
                }
                .animate-float-slower {
                    animation: float-slower 16s ease-in-out infinite;
                }
                .animate-float-medium {
                    animation: float-medium 10s ease-in-out infinite;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.7s ease-out both;
                }
                .animate-fade-in-up-delay {
                    animation: fade-in-up 0.7s ease-out 0.3s both;
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </div>
    )
}
