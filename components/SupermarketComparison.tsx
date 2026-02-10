import { ArrowRight } from "lucide-react"
import { SHOP_CONFIG } from "@/lib/shops"
import Link from "next/link"
import Image from "next/image"

interface SupermarketComparisonProps {
    products: any[]
}

const FALLBACK_PRODUCTS = [
    {
        id: "fallback-1",
        name: "PHYTEAL FLORELLA GEL DE TOILETTE INTIME ET...",
        brand: "PHYTÉAL",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200",
        shopPrices: [
            { shop: "Parafendri", price: 17.000 },
            { shop: "Pharma Shop", price: 17.769 },
            { shop: "Parashop", price: 19.227 }
        ],
        source: "para"
    },
    {
        id: "fallback-2",
        name: "TARTREX Dentifrice Aux Fluor et Sels Mineraux - Soin...",
        brand: "PHYTÉAL",
        image: "https://images.unsplash.com/photo-1559594882-72365c697814?w=200",
        shopPrices: [
            { shop: "Parafendri", price: 10.500 },
            { shop: "Pharma Shop", price: 10.709 },
            { shop: "Parashop", price: 10.710 }
        ],
        source: "para"
    },
    {
        id: "fallback-3",
        name: "GUM JUNIOR BROSSE A DENT SOUPLE 6 ans + - 902",
        brand: "GUM",
        image: "https://images.unsplash.com/photo-1559594882-72365c697814?w=200",
        shopPrices: [
            { shop: "Parafendri", price: 10.524 },
            { shop: "Pharma Shop", price: 10.839 },
            { shop: "Parashop", price: 11.000 }
        ],
        source: "para"
    },
    {
        id: "fallback-4",
        name: "GUM SENSIVITAL+ Dentifrice 75ML",
        brand: "GUM",
        image: "https://images.unsplash.com/photo-1559594882-72365c697814?w=200",
        shopPrices: [
            { shop: "Parafendri", price: 14.000 },
            { shop: "Pharma Shop", price: 14.137 },
            { shop: "Parashop", price: 14.662 }
        ],
        source: "para"
    },
    {
        id: "fallback-5",
        name: "ELGYDIUM CLINIC FLEX 2 MIX NARROW",
        brand: "PIERREFABRE ORALCARE",
        image: "https://images.unsplash.com/photo-1559594882-72365c697814?w=200",
        shopPrices: [
            { shop: "Parafendri", price: 23.000 },
            { shop: "Pharma Shop", price: 23.645 },
            { shop: "Parashop", price: 25.967 }
        ],
        source: "para"
    },
    {
        id: "fallback-6",
        name: "SAFORELLE SOIN LAVANT DOUX APAISANT 100ML",
        brand: "SAFORELLE",
        image: "https://images.unsplash.com/photo-1559594882-72365c697814?w=200",
        shopPrices: [
            { shop: "Parafendri", price: 10.000 },
            { shop: "Pharma Shop", price: 12.355 },
            { shop: "Parashop", price: 12.355 }
        ],
        source: "para"
    },
    {
        id: "fallback-7",
        name: "TARTREX BAIN DE BOUCHE 125ML",
        brand: "PHYTÉAL",
        image: "https://images.unsplash.com/photo-1559594882-72365c697814?w=200",
        shopPrices: [
            { shop: "Parafendri", price: 9.500 },
            { shop: "Pharma Shop", price: 9.510 },
            { shop: "Parashop", price: 9.523 }
        ],
        source: "para"
    },
    {
        id: "fallback-8",
        name: "GUM BI DIRECTION Brossette interdentaire 1.4MM 2714",
        brand: "GUM",
        image: "https://images.unsplash.com/photo-1559594882-72365c697814?w=200",
        shopPrices: [
            { shop: "Pharma Shop", price: 20.944 },
            { shop: "Parafendri", price: 21.000 },
            { shop: "Parashop", price: 21.049 }
        ],
        source: "para"
    },
    {
        id: "fallback-9",
        name: "GUM AFTACLEAR BAIN DE BOUCHE 120ML",
        brand: "GUM",
        image: "https://images.unsplash.com/photo-1559594882-72365c697814?w=200",
        shopPrices: [
            { shop: "Parafendri", price: 29.500 },
            { shop: "Pharma Shop", price: 29.782 },
            { shop: "Parashop", price: 30.096 }
        ],
        source: "para"
    }
];

export function SupermarketComparison({ products: initialProducts }: SupermarketComparisonProps) {
    const products = (!initialProducts || initialProducts.length === 0) ? FALLBACK_PRODUCTS : initialProducts;

    const formatPrice = (price: number) => {
        return price.toFixed(3) + "DT"
    }

    return (
        <section className="w-full max-w-[1400px] mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
                    // Find the cheapest shop
                    const sortedPrices = [...(product.shopPrices || [])].sort((a, b) => a.price - b.price);
                    const cheapestShop = sortedPrices[0];
                    const detailUrl = product.source === 'para' ? `/para/${product.id}` : `/products/${product.id}`;

                    return (
                        <div
                            key={product.id}
                            className="bg-[#F8F9FA] rounded-[2rem] p-6 border border-slate-100 flex gap-6 hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Product Image Container */}
                            <div className="w-1/3 bg-white rounded-3xl p-4 flex items-center justify-center relative overflow-hidden shrink-0">
                                <div className="relative aspect-square w-full">
                                    <Image
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Product Details Container */}
                            <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                                <div className="min-w-0">
                                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider truncate">
                                        {product.brand}
                                    </h3>
                                    <h4 className="text-base font-bold text-slate-800 leading-tight line-clamp-2 mt-1">
                                        {product.name}
                                    </h4>
                                    <p className="text-[10px] text-slate-400 font-medium mt-1">Disponible à</p>
                                </div>

                                {/* Store Prices */}
                                <div className="flex justify-between items-end mt-4 mb-2 gap-2">
                                    {sortedPrices.slice(0, 3).map((sp, idx) => {
                                        const config = SHOP_CONFIG[sp.shop.toLowerCase()];
                                        return (
                                            <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
                                                <div className="h-8 w-8 relative flex items-center justify-center bg-white rounded-lg p-1 border border-slate-100 shadow-sm">
                                                    {config?.image ? (
                                                        <img src={config.image} alt={sp.shop} className="max-h-full max-w-full object-contain" />
                                                    ) : (
                                                        <div className="text-slate-400 font-black text-[10px] uppercase">{sp.shop.charAt(0)}</div>
                                                    )}
                                                </div>
                                                <span className={`text-[10px] font-black truncate w-full text-center ${idx === 0 ? 'text-[#ED1C24]' : 'text-slate-500'}`}>
                                                    {formatPrice(sp.price)}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Comparison Note */}
                                <div className="mt-1">
                                    <p className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                                        Moins cher chez {cheapestShop?.shop}
                                    </p>
                                </div>

                                {/* View More */}
                                <Link href={detailUrl} className="mt-3 flex items-center gap-2 text-blue-600 font-bold text-xs group/btn">
                                    Voir plus <ArrowRight className="size-3 transition-transform group-hover/btn:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    )
}
