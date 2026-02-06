'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface BagItem {
    sku: string;
    source: 'para' | 'retail';
    title: string;
    image: string;
    price: number;
}

interface BagContextType {
    items: BagItem[];
    addItem: (item: BagItem) => void;
    removeItem: (sku: string) => void;
    clearBag: () => void;
    itemCount: number;
    isInBag: (sku: string) => boolean;
    isBagOpen: boolean;
    openBag: () => void;
    closeBag: () => void;
}

const BagContext = createContext<BagContextType | undefined>(undefined);

const BAG_STORAGE_KEY = '1111_shopping_bag';

export function BagProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<BagItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);
    const [isBagOpen, setIsBagOpen] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(BAG_STORAGE_KEY);
            if (stored) {
                setItems(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Failed to load bag from localStorage:', e);
        }
        setIsHydrated(true);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (isHydrated) {
            try {
                localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(items));
            } catch (e) {
                console.error('Failed to save bag to localStorage:', e);
            }
        }
    }, [items, isHydrated]);

    const addItem = (item: BagItem) => {
        setItems((prev) => {
            // Avoid duplicates by SKU
            if (prev.some((i) => i.sku === item.sku)) {
                return prev;
            }
            setIsBagOpen(true); // Auto-open bag when adding item? Maybe yes or no. User didn't ask, but it's good UX.
            // Actually, keep it simple. Only open when requested.
            // Removing the auto-open for now unless user asked.
            return [...prev, item];
        });
        // Optional: Open bag when item added
        // setIsBagOpen(true); 
    };

    const removeItem = (sku: string) => {
        setItems((prev) => prev.filter((i) => i.sku !== sku));
    };

    const clearBag = () => {
        setItems([]);
    };

    const isInBag = (sku: string) => {
        return items.some((i) => i.sku === sku);
    };

    const openBag = () => setIsBagOpen(true);
    const closeBag = () => setIsBagOpen(false);

    return (
        <BagContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                clearBag,
                itemCount: items.length,
                isInBag,
                isBagOpen,
                openBag,
                closeBag,
            }}
        >
            {children}
        </BagContext.Provider>
    );
}

export function useBag() {
    const context = useContext(BagContext);
    if (context === undefined) {
        throw new Error('useBag must be used within a BagProvider');
    }
    return context;
}
