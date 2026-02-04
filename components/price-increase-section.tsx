"use client"

import { Check, Star, Info, TrendingUp, ArrowUpRight } from "lucide-react"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

const priceHistoryData = [
    { month: "Jan", history: 3800, predicted: null },
    { month: "Fev", history: 3900, predicted: null },
    { month: "Mar", history: 4000, predicted: null },
    { month: "Avr", history: 3950, predicted: null },
    { month: "Mai", history: 4100, predicted: null },
    { month: "Juin", history: 4299, predicted: 4299 },
    { month: "Demain", history: null, predicted: 4899 },
]

export function PriceIncreaseSection() {
    return (
        <section className="mt-24 mb-12">
            <div className="mx-auto max-w-7xl px-4">
                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-2xl">
                        <div className="mb-4 flex items-center gap-2 text-destructive font-black uppercase tracking-widest text-xs">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                            </span>
                            Prédiction IA
                        </div>
                        <h2 className="mb-4 text-4xl md:text-6xl font-black text-[#111827] tracking-tighter italic">
                            Prix en <span className="text-destructive not-italic italic">Hausse dans 24h !</span>
                        </h2>
                        <p className="text-base font-medium text-gray-500 max-w-xl leading-relaxed">
                            Notre algorithme prédictif a détecté une augmentation imminente des prix.
                            <span className="text-[#111827] font-bold"> Achetez maintenant</span> pour économiser avant le changement de tarif.
                        </p>
                    </div>
                    <div className="hidden md:flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-black italic">
                            <TrendingUp className="size-4" />
                            +14% Prédit
                        </div>
                    </div>
                </div>

                {/* Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Featured Product Card */}
                    <div className="lg:col-span-4 rounded-[3rem] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <TrendingUp className="size-32 text-destructive" />
                        </div>

                        {/* Images Stack */}
                        <div className="relative h-64 w-full flex items-center justify-center">
                            <div className="absolute -translate-x-12 scale-90 opacity-40 blur-[1px]">
                                <img src="https://images.samsung.com/is/image/samsung/p6pim/tn/2401/gallery/tn-galaxy-s24-s928-sm-s928bztctun-thumb-539304918" alt="Side" className="h-48 object-contain" />
                            </div>
                            <div className="absolute translate-x-12 scale-90 opacity-40 blur-[1px]">
                                <img src="https://images.samsung.com/is/image/samsung/p6pim/tn/2401/gallery/tn-galaxy-s24-s928-sm-s928bztctun-thumb-539304918" alt="Side" className="h-48 object-contain" />
                            </div>
                            <img
                                src="https://images.samsung.com/is/image/samsung/p6pim/tn/2401/gallery/tn-galaxy-s24-s928-sm-s928bztctun-thumb-539304918"
                                alt="Main"
                                className="h-56 object-contain relative z-10 drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-2xl font-black text-[#111827] tracking-tight">Galaxy S24 Ultra</h3>
                                    <p className="text-sm font-bold text-gray-400">Samsung • Titanium Gray</p>
                                </div>
                                <span className="flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-3 py-1 text-[10px] font-black uppercase text-[#10B981] tracking-wider border border-[#D1FAE5]">
                                    <Check className="size-3 stroke-[3px]" />
                                    En stock
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4].map((i) => (
                                        <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                                    ))}
                                    <Star className="size-4 fill-amber-400/30 text-amber-400" />
                                </div>
                                <span className="text-[11px] font-bold text-gray-400">
                                    4.3 <span className="opacity-50">• 11k avis</span>
                                </span>
                            </div>

                            <div className="flex flex-col gap-1 py-4 border-y border-gray-50">
                                <div className="flex items-baseline gap-2">
                                    <p className="text-3xl font-black text-[#111827] tracking-tighter">4 299,00 TND</p>
                                    <p className="text-sm font-bold text-gray-400 line-through opacity-60">5 999,00 TND</p>
                                </div>
                                <p className="text-xs font-black text-destructive uppercase tracking-widest flex items-center gap-1">
                                    <TrendingUp className="size-3" />
                                    Prix après hausse: 4 899,00 TND
                                </p>
                            </div>

                            <button className="w-full flex items-center justify-center gap-3 rounded-full bg-[#111827] py-4 text-sm font-black text-white transition-all hover:bg-[#111827]/90 hover:shadow-xl">
                                VOIR L'OFFRE
                                <div className="flex size-7 items-center justify-center rounded-full bg-white/20">
                                    <ArrowUpRight className="size-4 text-white" />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Prediction Analysis Panel */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Status Bar */}
                        <div className="flex flex-wrap items-center gap-4 rounded-[2rem] bg-[#F9FAFB] border border-gray-100 px-8 py-6">
                            <div className="flex size-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                                <Info className="size-6 text-orange" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-black text-[#111827] uppercase tracking-wide">Alerte de Prix IA</p>
                                <p className="text-sm font-medium text-gray-500">
                                    Délai d'achat optimal estimé: <span className="text-destructive font-black">12 Heures 43 Minutes</span>
                                </p>
                            </div>
                            <button className="px-6 py-2.5 rounded-full bg-white text-[11px] font-black text-[#111827] border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors uppercase tracking-wider">
                                Être notifié
                            </button>
                        </div>

                        {/* Main Prediction Chart */}
                        <div className="flex-1 rounded-[3rem] bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col gap-8">
                            <div className="flex items-center justify-between">
                                <h4 className="text-lg font-black text-[#111827] uppercase tracking-tighter flex items-center gap-3">
                                    <div className="size-2 rounded-full bg-destructive animate-pulse" />
                                    Courbe Prédictive des Prix
                                </h4>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="size-3 rounded-full bg-orange/20 border border-orange" />
                                        <span className="text-[11px] font-bold text-gray-400 uppercase">Historique</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="size-3 rounded-full bg-destructive/20 border-2 border-dashed border-destructive" />
                                        <span className="text-[11px] font-bold text-gray-400 uppercase">Prédiction</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 min-h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={priceHistoryData}
                                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                    >
                                        <defs>
                                            <linearGradient id="colorHistory" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#F97316" stopOpacity={0.15} />
                                                <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.25} />
                                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid vertical={false} stroke="#F3F4F6" strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fill: "#9CA3AF", fontWeight: 900 }}
                                            dy={15}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fill: "#9CA3AF", fontWeight: 900 }}
                                            dx={-10}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "#111827",
                                                border: "none",
                                                borderRadius: "16px",
                                                padding: "12px 16px",
                                                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                                            }}
                                            itemStyle={{ color: "#fff", fontSize: "12px", fontWeight: "900" }}
                                            labelStyle={{ color: "#9CA3AF", fontSize: "10px", fontWeight: "700", marginBottom: "4px" }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="history"
                                            stroke="#F97316"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorHistory)"
                                            animationDuration={2500}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="predicted"
                                            stroke="#EF4444"
                                            strokeWidth={4}
                                            strokeDasharray="8 8"
                                            fillOpacity={1}
                                            fill="url(#colorPredicted)"
                                            animationDuration={3000}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
