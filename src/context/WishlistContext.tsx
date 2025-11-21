'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type WishlistItem = {
    id: string
    name: string
    price: number
    image: string
    type: string
    state?: string
}

type WishlistContextType = {
    wishlist: WishlistItem[]
    addToWishlist: (item: WishlistItem) => void
    removeFromWishlist: (id: string) => void
    isInWishlist: (id: string) => boolean
    clearWishlist: () => void
    wishlistCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Load from LocalStorage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('gt_wishlist')
        if (savedWishlist) {
            try {
                setWishlist(JSON.parse(savedWishlist))
            } catch (e) {
                console.error('Failed to parse wishlist', e)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save to LocalStorage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('gt_wishlist', JSON.stringify(wishlist))
        }
    }, [wishlist, isLoaded])

    const addToWishlist = (item: WishlistItem) => {
        setWishlist((prev) => {
            const existing = prev.find((i) => i.id === item.id)
            if (existing) {
                return prev // Already in wishlist
            }
            return [...prev, item]
        })
    }

    const removeFromWishlist = (id: string) => {
        setWishlist((prev) => prev.filter((i) => i.id !== id))
    }

    const isInWishlist = (id: string) => {
        return wishlist.some((i) => i.id === id)
    }

    const clearWishlist = () => {
        setWishlist([])
    }

    const wishlistCount = wishlist.length

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                clearWishlist,
                wishlistCount,
            }}
        >
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    const context = useContext(WishlistContext)
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider')
    }
    return context
}
