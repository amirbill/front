"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import { API_URL } from "@/lib/api"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Search, SlidersHorizontal, X, Check, Grid3X3, List, Loader2, Pill, Heart } from "lucide-react"
import { ProductCard } from "@/components/ProductCard"
import { SearchBar } from "@/components/SearchBar"
import { UserMenu } from "@/components/UserMenu"

interface ShopPrice {
    shop: string
    price: number
    oldPrice?: number
    available: boolean
    url?: string
}

interface Product {
    id: string
    name: string
    brand: string
    bestPrice: number
    originalPrice?: number
    image: string
    description: string
    inStock: boolean
    category?: string
    topCategory?: string
    shopPrices: ShopPrice[]
}

interface ProductListResponse {
    products: Product[]
    total: number
    page: number
    limit: number
    totalPages: number
}

const PRICE_RANGES = [
    { label: "Tous les prix", min: undefined, max: undefined },
    { label: "Moins de 20 DT", min: undefined, max: 20 },
    { label: "20 - 50 DT", min: 20, max: 50 },
    { label: "50 - 100 DT", min: 50, max: 100 },
    { label: "100 - 200 DT", min: 100, max: 200 },
    { label: "Plus de 200 DT", min: 200, max: undefined },
]

const TOP_CATEGORIES = ["Maman et bébé", "Solaire", "Hygiène"]
const LOW_CATEGORIES = ["Visage"]

function ParaProductListingContent() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [totalProducts, setTotalProducts] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [showFilters, setShowFilters] = useState(false)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    // Filters
    const [selectedPriceRange, setSelectedPriceRange] = useState(0)
    const [inStockOnly, setInStockOnly] = useState(false)
    const [selectedTopCategory, setSelectedTopCategory] = useState<string | null>(null)
    const [selectedLowCategory, setSelectedLowCategory] = useState<string | null>(null)

    // Get search params
    const searchQuery = searchParams.get("search") || ""
    const categoryParam = searchParams.get("category") || ""
    const categoryType = searchParams.get("type") || "top"

    // Fetch products
    const fetchProducts = useCallback(async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams()

            if (searchQuery) params.set("search", searchQuery)
            if (categoryParam) {
                params.set("category", categoryParam)
                params.set("category_type", categoryType)
            } else if (selectedTopCategory) {
                params.set("category", selectedTopCategory)
                params.set("category_type", "top")
            } else if (selectedLowCategory) {
                params.set("category", selectedLowCategory)
                params.set("category_type", "low")
            }

            const priceRange = PRICE_RANGES[selectedPriceRange]
            if (priceRange.min !== undefined) params.set("min_price", priceRange.min.toString())
            if (priceRange.max !== undefined) params.set("max_price", priceRange.max.toString())
            if (inStockOnly) params.set("in_stock", "true")

            params.set("page", currentPage.toString())
            params.set("limit", "20")

            const res = await fetch(
                `${API_URL}/para/listing?${params.toString()}`
            )

            if (res.ok) {
                const data: ProductListResponse = await res.json()
                setProducts(Array.isArray(data.products) ? data.products : [])
                setTotalProducts(data.total || 0)
                setTotalPages(data.totalPages || 1)
            }
        } catch (error) {
            console.error("Error fetching para products:", error)
        } finally {
            setLoading(false)
        }
    }, [searchQuery, categoryParam, categoryType, selectedTopCategory, selectedLowCategory, selectedPriceRange, inStockOnly, currentPage])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, categoryParam, selectedTopCategory, selectedLowCategory, selectedPriceRange, inStockOnly])

    const clearFilters = () => {
        setSelectedPriceRange(0)
        setInStockOnly(false)
        setSelectedTopCategory(null)
        setSelectedLowCategory(null)
        router.push("/para")
    }

    const hasActiveFilters = selectedPriceRange > 0 || inStockOnly || selectedTopCategory || selectedLowCategory || searchQuery || categoryParam

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/images/Logo 1111.svg"
                                alt="1111.tn"
                                width={120}
                                height={40}
                                className="h-10 w-auto object-contain bg-white/90 rounded-lg px-2 py-1"
                            />
                        </Link>

                        <div className="flex-1 max-w-2xl">
                            <SearchBar
                                variant="header"
                                placeholder="Rechercher un produit parapharmacie..."
                                searchEndpoint="/api/v1/para/search"
                                linkPrefix="/para"
                                accentColor="teal"
                            />
                        </div>

                        {/* User Menu */}
                        <div className="flex-shrink-0">
                            <UserMenu />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Page Title & Breadcrumb */}
                <div className="mb-6">
                    <nav className="text-sm text-gray-500 mb-2">
                        <Link href="/" className="hover:text-teal-600">Accueil</Link>
                        <span className="mx-2">/</span>
                        <Link href="/para" className="hover:text-teal-600">Parapharmacie</Link>
                        {categoryParam && (
                            <>
                                <span className="mx-2">/</span>
                                <span className="text-gray-900">{categoryParam}</span>
                            </>
                        )}
                    </nav>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="size-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center">
                                <Heart className="size-5 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {categoryParam || (searchQuery ? `Résultats pour "${searchQuery}"` : "Parapharmacie")}
                            </h1>
                        </div>
                        <span className="text-sm text-gray-500">
                            {totalProducts} produit{totalProducts > 1 ? "s" : ""} trouvé{totalProducts > 1 ? "s" : ""}
                        </span>
                    </div>
                </div>

                <div className="flex gap-6">
                    {/* Sidebar Filters - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sticky top-24">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-bold text-gray-900">Filtres</h2>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-xs text-teal-600 hover:underline"
                                    >
                                        Réinitialiser
                                    </button>
                                )}
                            </div>

                            {/* Price Filter */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Prix</h3>
                                <div className="space-y-2">
                                    {PRICE_RANGES.map((range, idx) => (
                                        <label
                                            key={idx}
                                            className="flex items-center gap-2 cursor-pointer group"
                                            onClick={() => setSelectedPriceRange(idx)}
                                        >
                                            <div className={`size-4 rounded border-2 flex items-center justify-center transition-colors ${selectedPriceRange === idx
                                                ? "bg-teal-600 border-teal-600"
                                                : "border-gray-300 group-hover:border-teal-400"
                                                }`}>
                                                {selectedPriceRange === idx && (
                                                    <Check className="size-3 text-white" />
                                                )}
                                            </div>
                                            <span className="text-sm text-gray-600 group-hover:text-gray-900">
                                                {range.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Availability Filter */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Disponibilité</h3>
                                <label
                                    className="flex items-center gap-2 cursor-pointer group"
                                    onClick={() => setInStockOnly(!inStockOnly)}
                                >
                                    <div className={`size-4 rounded border-2 flex items-center justify-center transition-colors ${inStockOnly
                                        ? "bg-teal-600 border-teal-600"
                                        : "border-gray-300 group-hover:border-teal-400"
                                        }`}>
                                        {inStockOnly && <Check className="size-3 text-white" />}
                                    </div>
                                    <span className="text-sm text-gray-600 group-hover:text-gray-900">
                                        En stock uniquement
                                    </span>
                                </label>
                            </div>

                            {/* Top Category Filter */}
                            {!categoryParam && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Catégorie principale</h3>
                                    <div className="space-y-2">
                                        {TOP_CATEGORIES.map((cat) => (
                                            <label
                                                key={cat}
                                                className="flex items-center gap-2 cursor-pointer group"
                                                onClick={() => setSelectedTopCategory(cat === selectedTopCategory ? null : cat)}
                                            >
                                                <div className={`size-4 rounded border-2 flex items-center justify-center transition-colors ${selectedTopCategory === cat
                                                    ? "bg-teal-600 border-teal-600"
                                                    : "border-gray-300 group-hover:border-teal-400"
                                                    }`}>
                                                    {selectedTopCategory === cat && (
                                                        <Check className="size-3 text-white" />
                                                    )}
                                                </div>
                                                <span className="text-sm text-gray-600 group-hover:text-gray-900 truncate">
                                                    {cat}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Low Category Filter */}
                            {!categoryParam && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Sous-catégorie</h3>
                                    <div className="space-y-2">
                                        {LOW_CATEGORIES.map((cat) => (
                                            <label
                                                key={cat}
                                                className="flex items-center gap-2 cursor-pointer group"
                                                onClick={() => setSelectedLowCategory(cat === selectedLowCategory ? null : cat)}
                                            >
                                                <div className={`size-4 rounded border-2 flex items-center justify-center transition-colors ${selectedLowCategory === cat
                                                    ? "bg-teal-600 border-teal-600"
                                                    : "border-gray-300 group-hover:border-teal-400"
                                                    }`}>
                                                    {selectedLowCategory === cat && (
                                                        <Check className="size-3 text-white" />
                                                    )}
                                                </div>
                                                <span className="text-sm text-gray-600 group-hover:text-gray-900 truncate">
                                                    {cat}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Mobile Filter Toggle & View Options */}
                        <div className="flex items-center justify-between mb-4 lg:justify-end gap-3">
                            <button
                                onClick={() => setShowFilters(true)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium"
                            >
                                <SlidersHorizontal className="size-4" />
                                Filtres
                                {hasActiveFilters && (
                                    <span className="size-5 bg-teal-600 text-white rounded-full text-xs flex items-center justify-center">
                                        !
                                    </span>
                                )}
                            </button>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === "grid"
                                        ? "bg-teal-100 text-teal-600"
                                        : "bg-white text-gray-400 hover:text-gray-600"
                                        }`}
                                >
                                    <Grid3X3 className="size-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === "list"
                                        ? "bg-teal-100 text-teal-600"
                                        : "bg-white text-gray-400 hover:text-gray-600"
                                        }`}
                                >
                                    <List className="size-5" />
                                </button>
                            </div>
                        </div>

                        {/* Active Filters Pills */}
                        {hasActiveFilters && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {searchQuery && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                                        Recherche: {searchQuery}
                                        <button onClick={() => router.push("/para")}>
                                            <X className="size-3" />
                                        </button>
                                    </span>
                                )}
                                {categoryParam && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                                        {categoryParam}
                                        <button onClick={() => router.push("/para")}>
                                            <X className="size-3" />
                                        </button>
                                    </span>
                                )}
                                {selectedTopCategory && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                                        {selectedTopCategory}
                                        <button onClick={() => setSelectedTopCategory(null)}>
                                            <X className="size-3" />
                                        </button>
                                    </span>
                                )}
                                {selectedLowCategory && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">
                                        {selectedLowCategory}
                                        <button onClick={() => setSelectedLowCategory(null)}>
                                            <X className="size-3" />
                                        </button>
                                    </span>
                                )}
                                {selectedPriceRange > 0 && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                                        {PRICE_RANGES[selectedPriceRange].label}
                                        <button onClick={() => setSelectedPriceRange(0)}>
                                            <X className="size-3" />
                                        </button>
                                    </span>
                                )}
                                {inStockOnly && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                        En stock
                                        <button onClick={() => setInStockOnly(false)}>
                                            <X className="size-3" />
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Loading State */}
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="size-8 text-teal-600 animate-spin" />
                            </div>
                        ) : products.length === 0 ? (
                            /* Empty State */
                            <div className="bg-white rounded-2xl p-12 text-center">
                                <div className="size-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="size-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Aucun produit trouvé
                                </h3>
                                <p className="text-gray-500 mb-4">
                                    Essayez de modifier vos filtres ou votre recherche
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-2 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-700 transition-colors"
                                >
                                    Réinitialiser les filtres
                                </button>
                            </div>
                        ) : (
                            /* Product Grid */
                            <div className={`grid gap-4 ${viewMode === "grid"
                                ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                                : "grid-cols-1"
                                }`}>
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        name={product.name}
                                        brand={product.brand}
                                        bestPrice={product.bestPrice}
                                        originalPrice={product.originalPrice}
                                        image={product.image}
                                        description={product.description}
                                        inStock={product.inStock}
                                        shopPrices={product.shopPrices}
                                        linkPrefix="/para"
                                    />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-8">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    Précédent
                                </button>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        let page: number
                                        if (totalPages <= 5) {
                                            page = i + 1
                                        } else if (currentPage <= 3) {
                                            page = i + 1
                                        } else if (currentPage >= totalPages - 2) {
                                            page = totalPages - 4 + i
                                        } else {
                                            page = currentPage - 2 + i
                                        }

                                        return (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`size-10 rounded-lg text-sm font-medium ${currentPage === page
                                                    ? "bg-teal-600 text-white"
                                                    : "bg-white border border-gray-200 hover:bg-gray-50"
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        )
                                    })}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    Suivant
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Filter Modal */}
                {showFilters && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
                        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-bold text-lg">Filtres</h2>
                                <button onClick={() => setShowFilters(false)}>
                                    <X className="size-6" />
                                </button>
                            </div>

                            {/* Price Filter */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Prix</h3>
                                <div className="space-y-2">
                                    {PRICE_RANGES.map((range, idx) => (
                                        <label
                                            key={idx}
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <div className={`size-5 rounded border-2 flex items-center justify-center ${selectedPriceRange === idx
                                                ? "bg-teal-600 border-teal-600"
                                                : "border-gray-300"
                                                }`}>
                                                {selectedPriceRange === idx && (
                                                    <Check className="size-3 text-white" />
                                                )}
                                            </div>
                                            <span className="text-gray-700">{range.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="mb-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <div className={`size-5 rounded border-2 flex items-center justify-center ${inStockOnly
                                        ? "bg-teal-600 border-teal-600"
                                        : "border-gray-300"
                                        }`}>
                                        {inStockOnly && <Check className="size-3 text-white" />}
                                    </div>
                                    <span className="text-gray-700">En stock uniquement</span>
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4 border-t">
                                <button
                                    onClick={clearFilters}
                                    className="flex-1 py-3 border border-gray-200 rounded-full font-medium"
                                >
                                    Réinitialiser
                                </button>
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="flex-1 py-3 bg-teal-600 text-white rounded-full font-medium"
                                >
                                    Appliquer
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function ParaProductsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="size-8 text-teal-600 animate-spin" />
            </div>
        }>
            <ParaProductListingContent />
        </Suspense>
    )
}

