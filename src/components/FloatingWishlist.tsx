'use client'

import { useState } from 'react'
import FloatingWishlistButton from './FloatingWishlistButton'
import WishlistPopup from './WishlistPopup'

/**
 * FloatingWishlist - Wrapper component that manages the floating wishlist button and popup
 * This component handles the open/close state for the wishlist popup
 * 
 * Usage: Add this to your layout file so it appears on all pages
 */
export default function FloatingWishlist() {
    const [isWishlistOpen, setIsWishlistOpen] = useState(false)

    return (
        <>
            <FloatingWishlistButton onClick={() => setIsWishlistOpen(true)} />
            <WishlistPopup isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
        </>
    )
}
