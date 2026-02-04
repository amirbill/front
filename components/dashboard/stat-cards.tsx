"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Loader2 } from "lucide-react"
import { API_URL } from "@/lib/api"

interface MergeStats {
    shop_totals: Record<string, number>
    common_products: number
}

interface MergeStatsResponse {
    para?: MergeStats
    retails?: MergeStats
}

export function StatCards() {
    const [stats, setStats] = useState<MergeStatsResponse | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch(`${API_URL}/analytics/merge-stats`)
                if (response.ok) {
                    const data = await response.json()
                    setStats(data)
                }
            } catch (error) {
                console.error("Error fetching merge stats:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="size-8 animate-spin text-purple" />
            </div>
        )
    }

    // Calculate totals
    const paraTotal = stats?.para
        ? Object.values(stats.para.shop_totals).reduce((sum, val) => sum + val, 0)
        : 0
    const retailsTotal = stats?.retails
        ? Object.values(stats.retails.shop_totals).reduce((sum, val) => sum + val, 0)
        : 0
    const totalProducts = paraTotal + retailsTotal
    const totalCommon = (stats?.para?.common_products || 0) + (stats?.retails?.common_products || 0)

    // Get shop count
    const paraShopCount = stats?.para ? Object.keys(stats.para.shop_totals).length : 0
    const retailsShopCount = stats?.retails ? Object.keys(stats.retails.shop_totals).length : 0
    const totalShops = paraShopCount + retailsShopCount

    return (
        <div className="grid grid-cols-3 gap-4">
            {/* Total Products */}
            <div className="rounded-xl border border-border bg-card p-4">
                <div className="mb-2 text-sm font-medium text-foreground">Total Produits</div>
                <div className="mb-2 text-xs text-muted-foreground">toutes les boutiques</div>
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">
                        {totalProducts.toLocaleString()}
                    </span>
                </div>
                {/* Progress bar */}
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-purple to-stock" />
                </div>
            </div>

            {/* Market Coverage */}
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-purple/10">
                    <svg viewBox="0 0 24 24" className="size-5 text-purple" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">Couverture du marché</div>
                    <div className="text-xs text-muted-foreground">Nombre des magasins</div>
                    <div className="mt-1 text-sm font-medium text-purple">
                        {paraShopCount} parapharmacies, {retailsShopCount} e-commerce
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">{totalShops}</div>
                </div>
            </div>

            {/* Common Products */}
            <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="text-3xl font-bold text-foreground">
                            {totalCommon.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-stock">
                            <TrendingUp className="size-3" />
                        </div>
                    </div>
                    {/* Mini chart */}
                    <svg viewBox="0 0 80 40" className="h-10 w-20">
                        <path
                            d="M0 35 Q20 30, 30 25 T50 20 T80 10"
                            fill="none"
                            stroke="oklch(0.75 0.15 165)"
                            strokeWidth="2"
                        />
                        <path
                            d="M0 38 Q20 35, 30 32 T50 28 T80 20"
                            fill="none"
                            stroke="oklch(0.55 0.2 300)"
                            strokeWidth="2"
                        />
                    </svg>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">Produits communs surveillés</div>
            </div>

            {/* Details for PARA shops */}
            {stats?.para && (
                <div className="col-span-3 rounded-xl border border-border bg-card p-4">
                    <h3 className="mb-3 text-sm font-semibold text-foreground">Parapharmacies</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {Object.entries(stats.para.shop_totals).map(([shopName, total]) => (
                            <div key={shopName} className="rounded-lg bg-muted/50 p-3">
                                <div className="text-xs text-muted-foreground capitalize">{shopName.replace(/_total$/, '')}</div>
                                <div className="text-lg font-bold text-foreground">{total.toLocaleString()}</div>
                            </div>
                        ))}
                        <div className="rounded-lg bg-purple/10 p-3">
                            <div className="text-xs text-muted-foreground">Produits communs</div>
                            <div className="text-lg font-bold text-purple">{stats.para.common_products.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Details for Retails shops */}
            {stats?.retails && (
                <div className="col-span-3 rounded-xl border border-border bg-card p-4">
                    <h3 className="mb-3 text-sm font-semibold text-foreground">E-commerce</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {Object.entries(stats.retails.shop_totals).map(([shopName, total]) => (
                            <div key={shopName} className="rounded-lg bg-muted/50 p-3">
                                <div className="text-xs text-muted-foreground capitalize">{shopName.replace(/_total$/, '')}</div>
                                <div className="text-lg font-bold text-foreground">{total.toLocaleString()}</div>
                            </div>
                        ))}
                        <div className="rounded-lg bg-stock/10 p-3">
                            <div className="text-xs text-muted-foreground">Produits communs</div>
                            <div className="text-lg font-bold text-stock">{stats.retails.common_products.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
