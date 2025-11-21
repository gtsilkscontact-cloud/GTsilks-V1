'use client'

import { useState } from 'react'
import FloatingCartButton from './FloatingCartButton'
import CartPopup from './CartPopup'

/**
 * FloatingCart - Wrapper component that manages the floating cart button and popup
 * This component handles the open/close state for the cart popup
 * 
 * Usage: Add this to your layout file so it appears on all pages
 */
export default function FloatingCart() {
    const [isCartOpen, setIsCartOpen] = useState(false)

    return (
        <>
            <FloatingCartButton onClick={() => setIsCartOpen(true)} />
            <CartPopup isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    )
}
