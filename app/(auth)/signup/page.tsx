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

const signUpSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    phone: z.string().min(8, "Numéro de téléphone invalide"),
    address: z.string().min(5, "Adresse trop courte"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
})

type SignUpFormValues = z.infer<typeof signUpSchema>

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const { signup } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
    })

    const onSubmit = async (data: SignUpFormValues) => {
        setError(null)
        setIsLoading(true)
        try {
            await signup({
                email: data.email,
                password: data.password,
                role: "client", // Default role
            })
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

            {/* Right Side - Sign Up Form */}
            <div className="flex w-full items-center justify-center bg-muted/30 p-8 lg:w-1/2">
                <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-sm">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="mb-2 text-3xl font-bold text-purple-600">
                            Créer un compte
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Rejoignez 1111 et profitez des meilleures offres.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-500">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm text-muted-foreground">
                                Nom complet
                            </label>
                            <input
                                id="name"
                                type="text"
                                {...register("name")}
                                placeholder="Votre nom"
                                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                            />
                            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                        </div>

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

                        {/* Phone */}
                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm text-muted-foreground">
                                Numéro de téléphone
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                {...register("phone")}
                                placeholder="+216 XX XXX XXX"
                                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                            />
                            {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <label htmlFor="address" className="text-sm text-muted-foreground">
                                Adresse
                            </label>
                            <input
                                id="address"
                                type="text"
                                {...register("address")}
                                placeholder="Votre adresse"
                                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                            />
                            {errors.address && <span className="text-xs text-red-500">{errors.address.message}</span>}
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
                                    placeholder="Créer un mot de passe"
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

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm text-muted-foreground">
                                Confirmer le mot de passe
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    {...register("confirmPassword")}
                                    placeholder="Confirmer votre mot de passe"
                                    className="w-full rounded-lg border border-border bg-card px-4 py-3 pr-12 text-sm outline-none transition-colors focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500 hover:text-amber-600"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="size-5" />
                                    ) : (
                                        <Eye className="size-5" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && <span className="text-xs text-red-500">{errors.confirmPassword.message}</span>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-lg bg-purple-600 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin inline" /> : null}
                            {isLoading ? "Inscription en cours..." : "S'inscrire"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-xs text-muted-foreground">ou</span>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    {/* Google Sign Up */}
                    <GoogleAuthButton />

                    {/* Sign In Link */}
                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Vous avez déjà un compte?{" "}
                        <Link href="/signin" className="font-medium text-purple-600 hover:underline">
                            Connectez-vous.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
