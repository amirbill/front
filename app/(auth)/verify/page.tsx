"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { verifyEmailAction } from "@/app/auth-actions"

const verifySchema = z.object({
    code: z.string().min(1, "Le code est requis"),
})

type VerifyFormValues = z.infer<typeof verifySchema>

function VerifyContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const email = searchParams.get("email")
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VerifyFormValues>({
        resolver: zodResolver(verifySchema),
    })

    useEffect(() => {
        if (!email) {
            router.push("/signup")
        }
    }, [email, router])

    const onSubmit = async (data: VerifyFormValues) => {
        if (!email) return
        setError(null)
        setIsLoading(true)
        try {
            const response = await verifyEmailAction(email, data.code)
            if (response.success) {
                setSuccess(true)
                setTimeout(() => {
                    router.push("/signin")
                }, 2000)
            } else {
                setError(response.error || "Code invalide")
            }
        } catch (err: any) {
            setError("Une erreur est survenue")
        } finally {
            setIsLoading(false)
        }
    }

    if (!email) return null

    return (
        <div className="flex w-full items-center justify-center bg-muted/30 p-8 lg:w-1/2">
            <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-purple-600">
                        Vérifiez votre email
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Nous avons envoyé un code de vérification à {email}
                    </p>
                </div>

                {error && (
                    <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-500">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-500">
                        Email vérifié avec succès! Redirection...
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="code" className="text-sm text-muted-foreground">
                            Code de vérification
                        </label>
                        <input
                            id="code"
                            type="text"
                            {...register("code")}
                            placeholder="Entrez le code"
                            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                        />
                        {errors.code && (
                            <span className="text-xs text-red-500">{errors.code.message}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || success}
                        className="w-full rounded-lg bg-purple-600 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin inline" /> : null}
                        {isLoading ? "Vérification..." : "Vérifier"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default function VerifyPage() {
    return (
        <div className="flex min-h-screen">
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
                    </div>
                </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <VerifyContent />
            </Suspense>
        </div>
    )
}
