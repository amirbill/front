"use client";

import { GroceryPriceCard } from "./grocery-price-card";

const groceryProducts = [
    {
        name: "Tomate",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop",
        prices: [
            { store: "carrefour" as const, price: "1 DT 200", isBestPrice: true },
            { store: "mg" as const, price: "1 DT 500" },
            { store: "geant" as const, price: "2 DT 100" },
        ],
    },
    {
        name: "Poivron",
        image: "https://images.unsplash.com/photo-1566311084547-45a714468d32?q=80&w=400&auto=format&fit=crop",
        prices: [
            { store: "carrefour" as const, price: "1 DT 200", isBestPrice: true },
            { store: "mg" as const, price: "1 DT 500" },
            { store: "geant" as const, price: "2 DT 100" },
        ],
    },
    {
        name: "Oeufs",
        image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=400&auto=format&fit=crop",
        prices: [
            { store: "carrefour" as const, price: "1 DT 200", isBestPrice: true },
            { store: "mg" as const, price: "1 DT 500" },
            { store: "geant" as const, price: "2 DT 100" },
        ],
    },
    {
        name: "Huile végétale",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacabc88c5?q=80&w=400&auto=format&fit=crop",
        prices: [
            { store: "carrefour" as const, price: "1 DT 200", isBestPrice: true },
            { store: "mg" as const, price: "1 DT 500" },
            { store: "geant" as const, price: "2 DT 100" },
        ],
    },
    {
        name: "L'ail",
        image: "https://images.unsplash.com/photo-1544650558-d11964032177?q=80&w=400&auto=format&fit=crop",
        prices: [
            { store: "carrefour" as const, price: "1 DT 200", isBestPrice: true },
            { store: "mg" as const, price: "1 DT 500" },
            { store: "geant" as const, price: "2 DT 100" },
        ],
    },
];

export function GroceryPriceSection() {
    return (
        <section className="w-full py-12 px-4 bg-[#F9FAFB]/50">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <h2 className="text-3xl md:text-5xl font-black mb-12 text-[#8B5CF6] tracking-tight">
                    9offet Ettounsi: <span className="text-[#111827]">3eja</span>
                </h2>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {groceryProducts.map((product) => (
                        <GroceryPriceCard
                            key={product.name}
                            name={product.name}
                            image={product.image}
                            prices={product.prices}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
