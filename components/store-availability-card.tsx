"use client"

import React from "react"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface StorePrice {
    name: string
    logo: React.ReactNode
    price: string
}

interface StoreAvailabilityCardProps {
    productName: string
    productSubtitle: string
    productImage: string
    stores: StorePrice[]
    priceNote?: {
        text: string
        type: "higher" | "same"
    }
}

export function StoreAvailabilityCard({
    productName,
    productSubtitle,
    productImage,
    stores,
    priceNote,
}: StoreAvailabilityCardProps) {
    return (
        <Link
            href="/products/1"
            className="flex gap-4 rounded-[2rem] bg-white p-5 shadow-[0_4px_25px_rgb(0,0,0,0.05)] border border-gray-100 transition-all hover:shadow-lg group"
        >
            {/* Product Image */}
            <div className="flex size-32 shrink-0 items-center justify-center bg-[#F9FAFB] rounded-2xl border border-gray-100 p-2">
                <img
                    src={productImage || "/placeholder.svg"}
                    alt={productName}
                    className="h-auto max-h-28 w-auto object-contain drop-shadow-sm transition-transform group-hover:scale-105"
                />
            </div>

            {/* Product Info & Stores */}
            <div className="flex flex-1 flex-col">
                {/* Product Name */}
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#111827] leading-tight">{productName}</h3>
                    <p className="text-sm font-medium text-gray-500">{productSubtitle}</p>
                    <div className="mt-2 flex items-center gap-1">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Disponible à</span>
                        <div className="h-px flex-1 bg-gray-100" />
                    </div>
                </div>

                {/* Store Logos and Prices */}
                <div className="flex items-start gap-5">
                    {stores.map((store, index) => (
                        <div key={index} className="flex flex-col items-center gap-1.5 grayscale hover:grayscale-0 transition-all cursor-default group/store">
                            <div className="flex h-10 w-16 items-center justify-center transition-transform group-hover/store:scale-110">{store.logo}</div>
                            <span className="text-xs font-black text-[#111827]">{store.price}</span>
                        </div>
                    ))}
                </div>

                {/* Price Note */}
                {priceNote && (
                    <div className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold ${priceNote.type === "higher"
                        ? "bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-100"
                        : "bg-green-50 text-green-600 border border-green-100"
                        }`}>
                        <div className={`size-1.5 rounded-full ${priceNote.type === "higher" ? "bg-fuchsia-600" : "bg-green-600"} animate-pulse`} />
                        {priceNote.text}
                    </div>
                )}

                {/* View More Link */}
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors group/link">
                    Voir plus
                    <ArrowRight className="size-3 transition-transform group-hover/link:translate-x-0.5" />
                </div>
            </div>
        </Link>
    )
}

// Store Logo Components
export function CarrefourLogo() {
    return (
        <div className="flex flex-col items-center">
            <div className="flex size-7 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white shadow-sm">
                C
            </div>
            <span className="mt-1 text-[8px] font-bold text-blue-600 uppercase tracking-tighter">Carrefour</span>
        </div>
    )
}

export function CarrefourExpressLogo() {
    return (
        <div className="flex flex-col items-center">
            <div className="flex size-7 items-center justify-center rounded-full bg-red-600 text-[10px] font-black text-white shadow-sm">
                C
            </div>
            <span className="mt-1 text-[8px] font-bold text-red-600 uppercase tracking-tighter leading-none">Carrefour</span>
            <span className="text-[7px] font-medium text-red-600 uppercase tracking-tighter leading-none">express</span>
        </div>
    )
}

export function GeantLogo() {
    return (
        <div className="flex flex-col items-center">
            <div className="flex size-7 items-center justify-center text-xl font-black text-green-600 leading-none">
                G
            </div>
            <span className="mt-1 text-[8px] font-bold text-green-600 uppercase tracking-tighter">Géant</span>
        </div>
    )
}
