"use client"

import { Check, Info } from "lucide-react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts"

const priceHistoryData = [
    { month: "Jan", price: 320 },
    { month: "Feb", price: 310 },
    { month: "Mar", price: 315 },
    { month: "Apr", price: 310 },
    { month: "May", price: 312 },
    { month: "Jun", price: 310 },
    { month: "Jul", price: 308 },
    { month: "Aug", price: 310 },
    { month: "Sep", price: 315 },
    { month: "Oct", price: 320 },
]

interface FakePriceAlertCardProps {
    productName: string
    storeName: string
    productImage: string
    announcedPrice: string
    promoPrice: string
    realPrice: string
    className?: string
}

export function FakePriceAlertCard({
    productName,
    storeName,
    productImage,
    announcedPrice,
    promoPrice,
    realPrice,
    className = "",
}: FakePriceAlertCardProps) {
    return (
        <div
            className={`w-[340px] rounded-[2.5rem] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col gap-5 ${className}`}
        >
            {/* Product Header */}
            <div className="flex items-center gap-4">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-[1.25rem] bg-[#F9FAFB] border border-gray-100 flex items-center justify-center p-2">
                    <img
                        src={productImage || "/placeholder.svg"}
                        alt={productName}
                        className="object-contain max-h-full max-w-full drop-shadow-md"
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <h3 className="font-bold text-[#111827] leading-tight line-clamp-1">{productName}</h3>
                    <div className="flex items-center gap-2">
                        <span className="inline-block rounded-full bg-destructive text-white px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm">
                            {storeName}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                            <Info className="size-3" />
                            Analyse prix
                        </div>
                    </div>
                </div>
            </div>

            {/* Price Comparison Block */}
            <div className="flex flex-col gap-4 rounded-[2rem] bg-[#F9FAFB] p-5 border border-gray-50">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                            Annoncé "Avant"
                        </p>
                        <p className="text-base font-black text-orange-500/60 line-through tracking-tight">
                            {announcedPrice}
                        </p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Prix "Promo"</p>
                        <p className="text-xl font-black text-[#111827] tracking-tight">
                            {promoPrice}
                        </p>
                    </div>
                </div>

                {/* Real Price Alert Box */}
                <div className="rounded-2xl border-2 border-[#22C55E] bg-white p-4 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-1 opacity-10">
                        <Check className="size-12 text-[#22C55E]" />
                    </div>
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-2">
                            <span className="flex size-5 items-center justify-center rounded-full bg-[#22C55E] shadow-sm">
                                <Check className="size-3 text-white stroke-[3px]" />
                            </span>
                            <span className="text-[11px] font-black text-[#22C55E] uppercase">
                                Prix réel détecté
                            </span>
                        </div>
                        <span className="text-xl font-black text-[#22C55E] tracking-tight">{realPrice}</span>
                    </div>
                    <p className="mt-2 text-[10px] font-medium text-[#22C55E]/80 leading-snug">
                        Ce produit n'a jamais été à {announcedPrice} durant les 6 derniers mois.
                    </p>
                </div>
            </div>

            {/* Price History Chart */}
            <div className="flex flex-col gap-3">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider px-2">Historique (6 mois)</h4>
                <div className="h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={priceHistoryData}>
                            <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 9, fill: "#9ca3af", fontWeight: 700 }}
                                interval={"preserveStartEnd"}
                            />
                            <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '10px', fontWeight: 'bold' }}
                                labelStyle={{ color: '#9ca3af' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#06b6d4"
                                strokeWidth={3}
                                dot={false}
                                activeDot={{ r: 4, strokeWidth: 0 }}
                                animationDuration={2000}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
