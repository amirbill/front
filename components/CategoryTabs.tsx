"use client"

import { useState, useEffect } from "react"

interface Category {
    id: string
    label: string
}

interface CategoryTabsProps {
    categories: Category[]
    activeCategory: string
    onCategoryChange?: (category: string) => void
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
    const [currentActive, setCurrentActive] = useState(activeCategory)

    useEffect(() => {
        setCurrentActive(activeCategory)
    }, [activeCategory])

    const handleCategoryClick = (categoryId: string) => {
        setCurrentActive(categoryId)
        onCategoryChange?.(categoryId)
    }

    if (categories.length === 0) {
        return <div className="text-muted-foreground">Loading categories...</div>
    }

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${currentActive === category.id
                        ? "bg-purple text-purple-foreground shadow-sm"
                        : "border border-border bg-card text-muted-foreground hover:bg-muted"
                        }`}
                >
                    {category.label}
                </button>
            ))}
        </div>
    )
}
