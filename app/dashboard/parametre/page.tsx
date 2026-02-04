"use client"

import React, { useEffect } from "react"
import { useState } from "react"
import Image from "next/image"
import { Pencil, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/header"
import { Switch } from "@/components/ui/switch"
import { authService } from "@/services/auth"
import { useAuth } from "@/contexts/AuthContext"

export default function ParametresPage() {
    const { user: authUser } = useAuth()
    const [activeTab, setActiveTab] = useState<"profile" | "security">("profile")
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const [profileData, setProfileData] = useState({
        nom: "",
        nomUtilisateur: "",
        email: "",
        dateNaissance: "",
        adresse: "",
    })

    const [securityData, setSecurityData] = useState({
        currentPassword: "",
        newPassword: "",
    })

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await authService.me()
                const userData = response.data
                setProfileData({
                    nom: userData.full_name || "",
                    nomUtilisateur: userData.username || "",
                    email: userData.email || "",
                    dateNaissance: userData.birthdate || "",
                    adresse: userData.address || "",
                })
            } catch (error) {
                console.error("Failed to fetch user data", error)
            } finally {
                setLoading(false)
            }
        }
        fetchUserData()
    }, [])

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value })
    }

    const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSecurityData(prev => ({ ...prev, [name]: value }))
    }

    const saveProfile = async () => {
        setSaving(true)
        setMessage(null)
        try {
            await authService.updateProfile({
                full_name: profileData.nom,
                username: profileData.nomUtilisateur,
                email: profileData.email,
                birthdate: profileData.dateNaissance,
                address: profileData.adresse
            })
            setMessage({ type: 'success', text: 'Profil mis à jour avec succès' })
        } catch (error) {
            setMessage({ type: 'error', text: 'Échec de la mise à jour du profil' })
        } finally {
            setSaving(false)
        }
    }

    const saveSecurity = async () => {
        if (!securityData.currentPassword || !securityData.newPassword) {
            setMessage({ type: 'error', text: 'Veuillez remplir tous les champs' })
            return
        }
        setSaving(true)
        setMessage(null)
        try {
            await authService.changePassword({
                current_password: securityData.currentPassword,
                new_password: securityData.newPassword
            })
            setMessage({ type: 'success', text: 'Mot de passe mis à jour avec succès' })
            setSecurityData({ currentPassword: "", newPassword: "" })
        } catch (error: any) {
            const errorMsg = error.response?.data?.detail || 'Échec de la mise à jour du mot de passe'
            setMessage({ type: 'error', text: errorMsg })
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="size-8 animate-spin text-purple" />
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <DashboardHeader title="Paramètres" />
            <main className="p-6">
                <div className="rounded-2xl bg-card p-6 shadow-sm">
                    {/* Status Message */}
                    {message && (
                        <div className={`mb-6 flex items-center gap-2 rounded-lg p-4 text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                            }`}>
                            {message.type === 'success' ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
                            {message.text}
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="mb-8 flex gap-8 border-b border-border">
                        <button
                            onClick={() => { setActiveTab("profile"); setMessage(null); }}
                            className={`relative pb-3 text-sm font-medium transition-colors ${activeTab === "profile"
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Modifier le profil
                            {activeTab === "profile" && (
                                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-purple" />
                            )}
                        </button>
                        <button
                            onClick={() => { setActiveTab("security"); setMessage(null); }}
                            className={`relative pb-3 text-sm font-medium transition-colors ${activeTab === "security"
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Sécurité
                            {activeTab === "security" && (
                                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-purple" />
                            )}
                        </button>
                    </div>

                    {/* Profile Tab */}
                    {activeTab === "profile" && (
                        <div className="flex flex-col md:flex-row gap-12">
                            {/* Avatar */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative">
                                    <div className="size-32 overflow-hidden rounded-full bg-muted">
                                        <Image
                                            src="/avatar.jpg"
                                            alt="Profile avatar"
                                            width={128}
                                            height={128}
                                            className="size-full object-cover"
                                        />
                                    </div>
                                    <button className="absolute bottom-2 right-2 flex size-7 items-center justify-center rounded-full bg-purple text-white shadow-md hover:bg-purple/90">
                                        <Pencil className="size-3.5" />
                                    </button>
                                </div>
                                <p className="text-sm font-medium text-foreground">{profileData.nom || profileData.email.split('@')[0]}</p>
                            </div>

                            {/* Form */}
                            <div className="flex-1 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Nom */}
                                    <div className="space-y-2">
                                        <label className="text-sm text-muted-foreground">Nom complet</label>
                                        <input
                                            type="text"
                                            name="nom"
                                            value={profileData.nom}
                                            onChange={handleProfileChange}
                                            placeholder="Ex: Jean Dupont"
                                            className="w-full rounded-lg border border-purple/30 bg-purple/5 px-4 py-2.5 text-sm text-purple placeholder:text-purple/50 outline-none transition-colors focus:border-purple focus:ring-1 focus:ring-purple"
                                        />
                                    </div>

                                    {/* Nom d'utilisateur */}
                                    <div className="space-y-2">
                                        <label className="text-sm text-muted-foreground">Nom d'utilisateur</label>
                                        <input
                                            type="text"
                                            name="nomUtilisateur"
                                            value={profileData.nomUtilisateur}
                                            onChange={handleProfileChange}
                                            placeholder="Ex: jdupont"
                                            className="w-full rounded-lg border border-purple/30 bg-purple/5 px-4 py-2.5 text-sm text-purple placeholder:text-purple/50 outline-none transition-colors focus:border-purple focus:ring-1 focus:ring-purple"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label className="text-sm text-muted-foreground">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={profileData.email}
                                            onChange={handleProfileChange}
                                            placeholder="Email"
                                            className="w-full rounded-lg border border-purple/30 bg-purple/5 px-4 py-2.5 text-sm text-purple placeholder:text-purple/50 outline-none transition-colors focus:border-purple focus:ring-1 focus:ring-purple"
                                        />
                                    </div>

                                    {/* Date de naissance */}
                                    <div className="space-y-2">
                                        <label className="text-sm text-muted-foreground">Date de naissance</label>
                                        <input
                                            type="date"
                                            name="dateNaissance"
                                            value={profileData.dateNaissance}
                                            onChange={handleProfileChange}
                                            className="w-full rounded-lg border border-purple/30 bg-purple/5 px-4 py-2.5 text-sm text-purple outline-none transition-colors focus:border-purple focus:ring-1 focus:ring-purple"
                                        />
                                    </div>

                                    {/* Adresse */}
                                    <div className="col-span-full space-y-2">
                                        <label className="text-sm text-muted-foreground">Adresse</label>
                                        <input
                                            type="text"
                                            name="adresse"
                                            value={profileData.adresse}
                                            onChange={handleProfileChange}
                                            placeholder="Votre adresse complète"
                                            className="w-full rounded-lg border border-purple/30 bg-purple/5 px-4 py-2.5 text-sm text-purple placeholder:text-purple/50 outline-none transition-colors focus:border-purple focus:ring-1 focus:ring-purple"
                                        />
                                    </div>
                                </div>

                                {/* Save Button */}
                                <div className="flex justify-end pt-4">
                                    <button
                                        onClick={saveProfile}
                                        disabled={saving}
                                        className="inline-flex items-center gap-2 rounded-full border-2 border-purple bg-transparent px-8 py-2 text-sm font-medium text-purple transition-colors hover:bg-purple hover:text-white disabled:opacity-50"
                                    >
                                        {saving && <Loader2 className="size-4 animate-spin" />}
                                        Sauvegarder
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === "security" && (
                        <div className="max-w-md space-y-8">
                            {/* Two Factor Authentication */}
                            <div className="space-y-3 border-b border-border pb-8">
                                <h3 className="font-medium text-foreground">Authentification à deux facteurs</h3>
                                <div className="flex items-center gap-3">
                                    <Switch
                                        checked={twoFactorEnabled}
                                        onCheckedChange={setTwoFactorEnabled}
                                    />
                                    <span className="text-sm text-muted-foreground">
                                        Activer ou désactiver l{"'"}authentification à deux facteurs
                                    </span>
                                </div>
                            </div>

                            {/* Change Password */}
                            <div className="space-y-4">
                                <h3 className="font-medium text-foreground">Changer le mot de passe</h3>

                                <div className="space-y-2">
                                    <label className="text-sm text-muted-foreground">Mot de passe actuel</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={securityData.currentPassword}
                                        onChange={handleSecurityChange}
                                        placeholder="••••••••"
                                        className="w-full rounded-lg border border-purple/30 bg-purple/5 px-4 py-2.5 text-sm text-purple placeholder:text-purple/50 outline-none transition-colors focus:border-purple focus:ring-1 focus:ring-purple"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-muted-foreground">Nouveau mot de passe</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={securityData.newPassword}
                                        onChange={handleSecurityChange}
                                        placeholder="••••••••"
                                        className="w-full rounded-lg border border-purple/30 bg-purple/5 px-4 py-2.5 text-sm text-purple placeholder:text-purple/50 outline-none transition-colors focus:border-purple focus:ring-1 focus:ring-purple"
                                    />
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end pt-4">
                                <button
                                    onClick={saveSecurity}
                                    disabled={saving}
                                    className="inline-flex items-center gap-2 rounded-full border-2 border-purple bg-transparent px-8 py-2 text-sm font-medium text-purple transition-colors hover:bg-purple hover:text-white disabled:opacity-50"
                                >
                                    {saving && <Loader2 className="size-4 animate-spin" />}
                                    Sauvegarder
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
