"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuth } from "@/contexts/AuthContext"
import { GoogleAuthButton } from "@/components/GoogleAuthButton"

const signInSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(1, "Mot de passe requis"),
})

type SignInFormValues = z.infer<typeof signInSchema>

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
    })

    const onSubmit = async (data: SignInFormValues) => {
        setError(null)
        setIsLoading(true)
        try {
            await login(data)
        } catch (err: any) {
            setError(err.response?.data?.detail || "Email ou mot de passe incorrect")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen">
            {/* Left Side - Gradient Background */}
            <div className="relative hidden w-1/2 flex-col justify-between bg-gradient-to-br from-purple-200 via-pink-200 to-orange-100 p-8 lg:flex">
                <div className="flex items-center gap-1">
                    <Image
                        src="/images/Logo 1111.svg"
                        alt="1111.tn"
                        width={120}
                        height={40}
                        className="h-10 w-auto object-contain"
                        priority
                    />
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="relative h-80 w-80">
                        <Image
                            src="/images/1.png"
                            alt="1111 Mascot"
                            fill
                            className="object-contain"
                        />
                        <Image
                            src="/images/cadre.png"
                            alt="Frame"
                            fill
                            className="pointer-events-none object-contain"
                        />
                    </div>
                </div>

                {/* Tagline */}
                <p className="max-w-md text-lg italic text-amber-600">
                    {'"'}Toutes les offres, les vrais prix et les meilleures décisions au même endroit.{'"'}
                </p>
            </div>

            {/* Right Side - Sign In Form */}
            <div className="flex w-full items-center justify-center bg-muted/30 p-8 lg:w-1/2">
                <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-sm">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="mb-2 text-3xl font-bold text-purple-600">
                            Bienvenue à 1111
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Activez les alertes et suivez les prix en temps réel.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-500">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm text-muted-foreground">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register("email")}
                                placeholder="Adressecourriel@exemple.com"
                                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                            />
                            {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm text-muted-foreground">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    placeholder="AxY450p"
                                    className="w-full rounded-lg border border-border bg-card px-4 py-3 pr-12 text-sm outline-none transition-colors focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500 hover:text-amber-600"
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5" />
                                    ) : (
                                        <Eye className="size-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right">
                            <Link
                                href="/forgot-password"
                                className="text-xs text-muted-foreground hover:text-purple-600"
                            >
                                Mot de passe oublié?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-lg bg-purple-600 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin inline" /> : null}
                            {isLoading ? "Se connecter" : "Se connecter"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-xs text-muted-foreground">ou</span>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    {/* Google Sign In */}
                    <GoogleAuthButton />

                    {/* Sign Up Link */}
                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Vous n{"'"}avez pas de compte?{" "}
                        <Link href="/signup" className="font-medium text-purple-600 hover:underline">
                            Inscrivez-vous.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
