"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";

// Shop logo mapping
const SHOP_IMAGES: { [key: string]: string } = {
    "mytek": "/images/téléchargement (4).png",
    "tunisianet": "/images/téléchargement (6).png",
    "spacenet": "/images/spacenet-removebg-preview.png",
    "parafendri": "/images/parafendri-removebg-preview.png",
    "parashop": "/images/parashop-removebg-preview.png",
    "pharma-shop": "/images/pharmashop-removebg-preview.png",
};

// Display names for shops
const SHOP_DISPLAY_NAMES: { [key: string]: string } = {
    "mytek": "MyTek",
    "tunisianet": "Tunisianet",
    "spacenet": "Spacenet",
    "parafendri": "ParaFendri",
    "parashop": "ParaShop",
    "pharma-shop": "Pharma-Shop",
};

interface ShopRanking {
    shop: string;
    avg_price: number;
    min_price: number;
    max_price: number;
    product_count: number;
}

interface CategoryAnalytics {
    category: string;
    cheapest_shop: string;
    cheapest_avg_price: number;
    shop_rankings: ShopRanking[];
    only_available: boolean;
}

interface ShopPriceComparisonTableProps {
    type: "para" | "products";
    title: string;
    accentColor: string;
}

export function ShopPriceComparisonTable({ type, title, accentColor }: ShopPriceComparisonTableProps) {
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [analytics, setAnalytics] = useState<CategoryAnalytics | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${API_URL}/${type}/analytics/categories`);
                if (!res.ok) throw new Error("Failed to fetch categories");
                const data = await res.json();
                setCategories(data);
                if (data.length > 0) {
                    setSelectedCategory(data[0]);
                }
            } catch (error) {
                console.error("Error fetching analytics categories:", error);
            }
        };
        fetchCategories();
    }, [type]);

    // Fetch analytics when category changes
    useEffect(() => {
        if (!selectedCategory) return;

        const fetchAnalytics = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API_URL}/${type}/analytics/by-category?category=${encodeURIComponent(selectedCategory)}`);
                if (!res.ok) throw new Error("Failed to fetch analytics");
                const data = await res.json();
                setAnalytics(data);
            } catch (error) {
                console.error("Error fetching category analytics:", error);
                setAnalytics(null);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, [selectedCategory, type]);

    // Get all unique shops from analytics
    const shops = analytics?.shop_rankings || [];

    // Determine accent classes based on type
    const accentClasses = {
        border: accentColor === "purple" ? "border-purple-500" : "border-teal-500",
        bg: accentColor === "purple" ? "bg-purple-50" : "bg-teal-50",
        text: accentColor === "purple" ? "text-purple-600" : "text-teal-600",
        hoverBg: accentColor === "purple" ? "hover:bg-purple-100" : "hover:bg-teal-100",
        headerBg: accentColor === "purple" ? "bg-purple-600" : "bg-teal-600",
    };

    return (
        <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className={`${accentClasses.headerBg} px-6 py-4`}>
                <h3 className="text-white font-bold text-lg">{title}</h3>
            </div>

            {/* Category Pills - Horizontal Scrollable */}
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    <span className="text-sm font-medium text-slate-500 whitespace-nowrap">Catégorie:</span>
                    <div className="flex gap-2">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${cat === selectedCategory
                                    ? `${accentClasses.headerBg} text-white shadow-md scale-105`
                                    : `bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:shadow-sm`
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                    {/* Shop Headers */}
                    <thead>
                        <tr className="border-b border-slate-100">
                            <th className="px-4 py-4 text-left text-sm font-semibold text-slate-600 w-48">
                                Boutiques
                            </th>
                            {shops.map((shop, idx) => (
                                <th key={idx} className="px-3 py-4 text-center min-w-[100px]">
                                    <div className="flex flex-col items-center gap-2">
                                        {SHOP_IMAGES[shop.shop.toLowerCase()] ? (
                                            <img
                                                src={SHOP_IMAGES[shop.shop.toLowerCase()]}
                                                alt={shop.shop}
                                                className="h-8 w-auto object-contain"
                                            />
                                        ) : (
                                            <span className="font-bold text-sm text-slate-700">
                                                {SHOP_DISPLAY_NAMES[shop.shop.toLowerCase()] || shop.shop}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {/* Price Row */}
                        <tr className="border-b border-slate-100">
                            <td className="px-4 py-4">
                                <span className={`text-sm font-semibold ${accentClasses.text}`}>
                                    Prix moyen
                                </span>
                            </td>

                            {/* Price cells */}
                            {loading ? (
                                shops.map((_, idx) => (
                                    <td key={idx} className="px-3 py-4 text-center">
                                        <div className="h-5 w-16 mx-auto bg-slate-200 rounded animate-pulse"></div>
                                    </td>
                                ))
                            ) : (
                                shops.map((shop, idx) => {
                                    const isCheapest = shop.shop === analytics?.cheapest_shop;
                                    return (
                                        <td key={idx} className="px-3 py-4 text-center">
                                            <span className={`font-bold text-sm ${isCheapest
                                                    ? `${accentClasses.text} bg-gradient-to-r ${accentColor === "purple" ? "from-purple-100 to-purple-50" : "from-teal-100 to-teal-50"} px-3 py-1.5 rounded-full shadow-sm`
                                                    : "text-slate-700"
                                                }`}>
                                                {shop.avg_price.toFixed(2)} DT
                                            </span>
                                        </td>
                                    );
                                })
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Footer Info */}
            {analytics && (
                <div className={`px-6 py-3 ${accentClasses.bg} border-t border-slate-100`}>
                    <p className={`text-sm ${accentClasses.text}`}>
                        <span className="font-semibold">Meilleur prix:</span>{" "}
                        {SHOP_DISPLAY_NAMES[analytics.cheapest_shop.toLowerCase()] || analytics.cheapest_shop}{" "}
                        avec une moyenne de <span className="font-bold">{analytics.cheapest_avg_price.toFixed(2)} DT</span>
                    </p>
                </div>
            )}
        </div>
    );
}
