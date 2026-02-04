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
    shopPrices: ShopPrice[]
    specifications?: Record<string, string | number | boolean>
}

interface ProductSpecsProps {
    product: Product
}

export function ProductSpecs({ product }: ProductSpecsProps) {
    const specs = product.specifications || {}
    const specEntries = Object.entries(specs).filter(
        ([key, value]) => value !== null && value !== undefined && value !== ""
    )

    return (
        <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
            <h2 className="mb-6 text-xl font-bold text-foreground">
                Caractéristiques techniques
            </h2>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center justify-between py-3 px-4 bg-muted/30 rounded-xl">
                    <span className="text-sm text-muted-foreground">Référence</span>
                    <span className="text-sm font-semibold text-foreground">{product.id}</span>
                </div>
                <div className="flex items-center justify-between py-3 px-4 bg-muted/30 rounded-xl">
                    <span className="text-sm text-muted-foreground">Marque</span>
                    <span className="text-sm font-semibold text-foreground">{product.brand}</span>
                </div>
                {product.category && (
                    <div className="flex items-center justify-between py-3 px-4 bg-muted/30 rounded-xl">
                        <span className="text-sm text-muted-foreground">Catégorie</span>
                        <span className="text-sm font-semibold text-foreground">{product.category}</span>
                    </div>
                )}
                <div className="flex items-center justify-between py-3 px-4 bg-muted/30 rounded-xl">
                    <span className="text-sm text-muted-foreground">Disponibilité</span>
                    <span className={`text-sm font-semibold ${product.inStock ? "text-green-600" : "text-red-500"}`}>
                        {product.inStock ? "En stock" : "Rupture de stock"}
                    </span>
                </div>
            </div>

            {/* Specifications from Database */}
            {specEntries.length > 0 && (
                <>
                    <div className="h-px bg-border mb-6" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                        Fiche technique détaillée
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {specEntries.map(([key, value]) => (
                            <div 
                                key={key}
                                className="flex items-start justify-between py-3 px-4 bg-muted/20 rounded-xl gap-4"
                            >
                                <span className="text-sm text-muted-foreground flex-shrink-0">
                                    {key}
                                </span>
                                <span className="text-sm font-medium text-foreground text-right">
                                    {String(value)}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Description */}
            {product.description && product.description !== product.name && (
                <>
                    <div className="h-px bg-border my-6" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
                        Description
                    </h3>
                    <p className="text-sm text-foreground leading-relaxed">
                        {product.description}
                    </p>
                </>
            )}
        </div>
    )
}
