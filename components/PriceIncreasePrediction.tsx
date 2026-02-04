"use client"

import Image from "next/image"
import { TrendingUp, Clock, Bell, AlertCircle, ArrowUp } from "lucide-react"

interface PricePrediction {
    id: string
    name: string
    brand: string
    shop: string
    image: string
    currentPrice: number
    predictedPrice: number
    increasePercent: number
    confidence: number
    timeLeft: string
    reason: string
}

// Fake but realistic price increase predictions
const priceIncreases: PricePrediction[] = [
    {
        id: "pred-001",
        name: "Crème Hydratante 24h 50ml",
        brand: "La Roche-Posay",
        shop: "Parashop",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200",
        currentPrice: 65.500,
        predictedPrice: 72.900,
        increasePercent: 11,
        confidence: 94,
        timeLeft: "23h restantes",
        reason: "Fin de promotion"
    },
    {
        id: "pred-002",
        name: "Eau Micellaire 400ml",
        brand: "Bioderma",
        shop: "Pharma-Shop",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200",
        currentPrice: 28.900,
        predictedPrice: 34.500,
        increasePercent: 19,
        confidence: 88,
        timeLeft: "18h restantes",
        reason: "Réapprovisionnement"
    },
    {
        id: "pred-003",
        name: "Huile Sèche Corps 100ml",
        brand: "NUXE",
        shop: "Parafendri",
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=200",
        currentPrice: 42.000,
        predictedPrice: 48.500,
        increasePercent: 15,
        confidence: 91,
        timeLeft: "12h restantes",
        reason: "Hausse fournisseur"
    },
    {
        id: "pred-004",
        name: "Dentifrice Blancheur 75ml",
        brand: "Elmex",
        shop: "Parashop",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200",
        currentPrice: 12.500,
        predictedPrice: 14.900,
        increasePercent: 19,
        confidence: 86,
        timeLeft: "20h restantes",
        reason: "Stock limité"
    },
    {
        id: "pred-005",
        name: "Sérum Anti-Taches 30ml",
        brand: "Eucerin",
        shop: "Pharma-Shop",
        image: "https://images.unsplash.com/photo-1556227834-09f1de7a7d14?w=200",
        currentPrice: 89.900,
        predictedPrice: 99.000,
        increasePercent: 10,
        confidence: 92,
        timeLeft: "15h restantes",
        reason: "Fin de promotion"
    },
    {
        id: "pred-006",
        name: "Gel Lavant Bébé 500ml",
        brand: "Mustela",
        shop: "Parafendri",
        image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=200",
        currentPrice: 32.500,
        predictedPrice: 38.900,
        increasePercent: 20,
        confidence: 89,
        timeLeft: "8h restantes",
        reason: "Forte demande"
    },
]

const shopColors: Record<string, string> = {
    Parashop: "bg-teal-500",
    "Pharma-Shop": "bg-emerald-500",
    Parafendri: "bg-cyan-500",
}

export function PriceIncreasePrediction() {
    const formatPrice = (price: number) => {
        return price.toFixed(3) + " DT"
    }

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 90) return "text-red-600 bg-red-100"
        if (confidence >= 80) return "text-orange-600 bg-orange-100"
        return "text-yellow-600 bg-yellow-100"
    }

    const getTimeUrgency = (timeLeft: string) => {
        if (timeLeft.includes("8h") || timeLeft.includes("12h")) {
            return "animate-pulse bg-red-500"
        }
        return "bg-orange-500"
    }

    return (
        <section className="w-full max-w-[1400px] mx-auto px-4 py-10">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center size-14 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg animate-pulse">
                    <TrendingUp className="size-7" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-foreground">
                        Prix en Hausse dans 24h!
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Notre IA prédit les augmentations de prix imminentes. Achetez maintenant et économisez!
                    </p>
                </div>
            </div>

            {/* Urgency Banner */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-4 mb-6 flex items-center gap-4">
                <div className="flex-shrink-0 animate-bounce">
                    <Clock className="size-6 text-orange-500" />
                </div>
                <div className="flex-1">
                    <p className="text-sm font-semibold text-orange-800">
                        Prédictions basées sur l&apos;analyse des tendances, stocks et promotions
                    </p>
                    <p className="text-xs text-orange-600 mt-1">
                        Précision moyenne: 89% sur les 30 derniers jours
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-full transition-colors">
                    <Bell className="size-4" />
                    <span className="hidden sm:inline">Alertes</span>
                </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {priceIncreases.map((product) => (
                    <div 
                        key={product.id}
                        className="bg-card rounded-2xl border-2 border-orange-200 p-3 shadow-sm hover:shadow-lg transition-all hover:border-orange-400 relative overflow-hidden"
                    >
                        {/* Urgency Timer */}
                        <div className={`absolute top-0 left-0 right-0 ${getTimeUrgency(product.timeLeft)} text-white text-[9px] font-bold py-1 text-center flex items-center justify-center gap-1`}>
                            <Clock className="size-3" />
                            {product.timeLeft}
                        </div>

                        {/* Product Image */}
                        <div className="relative h-20 w-full mb-2 mt-6 rounded-xl overflow-hidden bg-muted/30">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                            <div className={`absolute bottom-2 left-2 ${shopColors[product.shop] || "bg-gray-500"} text-white text-[8px] font-bold px-2 py-0.5 rounded-full`}>
                                {product.shop}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="mb-2">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                                {product.brand}
                            </span>
                            <h3 className="text-[11px] font-semibold text-foreground line-clamp-2 leading-tight">
                                {product.name}
                            </h3>
                        </div>

                        {/* Price Prediction */}
                        <div className="space-y-2 p-2 bg-orange-50 rounded-lg">
                            {/* Current Price */}
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] text-green-700 font-medium">
                                    Prix actuel:
                                </span>
                                <span className="text-sm font-black text-green-600">
                                    {formatPrice(product.currentPrice)}
                                </span>
                            </div>

                            {/* Predicted Price */}
                            <div className="flex items-center justify-between border-t border-orange-200 pt-2">
                                <span className="text-[9px] text-red-600 font-medium">
                                    Prix prédit:
                                </span>
                                <div className="flex items-center gap-1">
                                    <ArrowUp className="size-3 text-red-500" />
                                    <span className="text-sm font-bold text-red-600">
                                        {formatPrice(product.predictedPrice)}
                                    </span>
                                </div>
                            </div>

                            {/* Increase Percentage */}
                            <div className="flex items-center justify-between bg-red-100 rounded px-2 py-1">
                                <span className="text-[9px] text-red-700 font-semibold">
                                    Hausse prévue:
                                </span>
                                <span className="text-[11px] font-bold text-red-600">
                                    +{product.increasePercent}%
                                </span>
                            </div>

                            {/* Confidence */}
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] text-muted-foreground">
                                    Confiance:
                                </span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${getConfidenceColor(product.confidence)}`}>
                                    {product.confidence}%
                                </span>
                            </div>
                        </div>

                        {/* Reason */}
                        <div className="mt-2 text-center">
                            <span className="text-[8px] text-muted-foreground flex items-center justify-center gap-1">
                                <AlertCircle className="size-3" />
                                {product.reason}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
