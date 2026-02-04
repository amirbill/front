"use client"

import { RefreshCw } from "lucide-react"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

const performanceData = [
    { x: 100, visitors: 200, price: 350 },
    { x: 200, visitors: 280, price: 320 },
    { x: 300, visitors: 250, price: 380 },
    { x: 400, visitors: 320, price: 450 },
    { x: 500, visitors: 380, price: 520 },
    { x: 600, visitors: 420, price: 600 },
    { x: 700, visitors: 350, price: 480 },
    { x: 800, visitors: 300, price: 420 },
    { x: 900, visitors: 280, price: 380 },
    { x: 1000, visitors: 320, price: 350 },
    { x: 1100, visitors: 350, price: 320 },
]

const predictionData = [
    { brand: "samsung", historique: 320, prevision: 450 },
    { brand: "oppo", historique: 280, prevision: 350 },
    { brand: "iphone", historique: 180, prevision: 300 },
    { brand: "Nokia", historique: 220, prevision: 380 },
    { brand: "xiomi", historique: 150, prevision: 280 },
    { brand: "Honor", historique: 250, prevision: 420 },
    { brand: "Realme", historique: 300, prevision: 480 },
]

export function PerformanceChart() {
    return (
        <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                    Performance site & prix du marché
                </h3>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <RefreshCw className="size-3" />
                    Chaque 5min
                </button>
            </div>

            <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={performanceData}>
                    <defs>
                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="oklch(0.55 0.2 300)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="oklch(0.55 0.2 300)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="oklch(0.75 0.15 165)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="oklch(0.75 0.15 165)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.91 0 0)" />
                    <XAxis
                        dataKey="x"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "oklch(0.5 0 0)" }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "oklch(0.5 0 0)" }}
                        domain={[0, 700]}
                        ticks={[0, 200, 400, 600]}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "oklch(1 0 0)",
                            border: "1px solid oklch(0.91 0 0)",
                            borderRadius: "8px",
                            fontSize: "12px",
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="visitors"
                        stroke="oklch(0.55 0.2 300)"
                        strokeWidth={2}
                        fill="url(#colorVisitors)"
                        name="Visiteurs en ligne"
                    />
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke="oklch(0.75 0.15 165)"
                        strokeWidth={2}
                        fill="url(#colorPrice)"
                        name="Prix du marché"
                    />
                </AreaChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="mt-2 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-purple" />
                    <span className="text-xs text-muted-foreground">Visiteurs en ligne</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-stock" />
                    <span className="text-xs text-muted-foreground">Prix du marché</span>
                </div>
            </div>
        </div>
    )
}

export function PredictionChart() {
    return (
        <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                    Prédiction de demande des produits (smartphones) - 7 prochains jours
                </h3>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <RefreshCw className="size-3" />
                    Chaque 5min
                </button>
            </div>

            {/* Legend */}
            <div className="mb-4 flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-stock" />
                    <span className="text-xs text-muted-foreground">Historique</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-purple" />
                    <span className="text-xs text-muted-foreground">Prévision</span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={predictionData} barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.91 0 0)" />
                    <XAxis
                        dataKey="brand"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "oklch(0.5 0 0)" }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "oklch(0.5 0 0)" }}
                        domain={[0, 500]}
                        ticks={[0, 100, 200, 300, 400, 500]}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "oklch(1 0 0)",
                            border: "1px solid oklch(0.91 0 0)",
                            borderRadius: "8px",
                            fontSize: "12px",
                        }}
                    />
                    <Bar
                        dataKey="historique"
                        fill="oklch(0.75 0.15 165)"
                        radius={[4, 4, 0, 0]}
                        name="Historique"
                    />
                    <Bar
                        dataKey="prevision"
                        fill="oklch(0.55 0.2 300)"
                        radius={[4, 4, 0, 0]}
                        name="Prévision"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
