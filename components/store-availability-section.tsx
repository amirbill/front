"use client"

import {
    StoreAvailabilityCard,
    CarrefourLogo,
    CarrefourExpressLogo,
    GeantLogo,
} from "@/components/store-availability-card"

const products = [
    {
        productName: "Natilait",
        productSubtitle: "Crème fraiche",
        productImage: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=400&auto=format&fit=crop",
        priceNote: {
            text: "Prix plus élevé sur Glovo",
            type: "higher" as const,
        },
    },
    {
        productName: "Natilait",
        productSubtitle: "Lait Entier",
        productImage: "https://images.unsplash.com/photo-1563636619-e9107da8a1bb?q=80&w=400&auto=format&fit=crop",
        priceNote: {
            text: "Prix plus élevé sur Glovo",
            type: "higher" as const,
        },
    },
    {
        productName: "Natilait",
        productSubtitle: "Yaourt Naturel",
        productImage: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=400&auto=format&fit=crop",
        priceNote: {
            text: "Même prix sur Glovo",
            type: "same" as const,
        },
    },
]

const stores = [
    { name: "Carrefour", logo: <CarrefourLogo />, price: "2.300DT" },
    { name: "Carrefour Express", logo: <CarrefourExpressLogo />, price: "2.380DT" },
    { name: "Géant", logo: <GeantLogo />, price: "2.550DT" },
]

export function StoreAvailabilitySection() {
    return (
        <section className="w-full px-4 py-2 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product, index) => (
                        <StoreAvailabilityCard
                            key={index}
                            productName={product.productName}
                            productSubtitle={product.productSubtitle}
                            productImage={product.productImage}
                            stores={stores}
                            priceNote={product.priceNote}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
