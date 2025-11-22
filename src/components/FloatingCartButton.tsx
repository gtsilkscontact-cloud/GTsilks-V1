'use client'

import { useCart } from '@/context/CartContext'
import { useEffect, useState } from 'react'
import { ShoppingBag } from 'lucide-react'

type FloatingCartButtonProps = {
    onClick: () => void
}

/**
 * FloatingCartButton - Fixed-position cart button at bottom-right
 * Features:
 * - Shows cart item count badge
 * - Animates when items are added
 * - Premium maroon background with cream/white text
 * - Responsive on both desktop and mobile
 */
export default function FloatingCartButton({ onClick }: FloatingCartButtonProps) {
    const { cartCount } = useCart()
    const [prevCount, setPrevCount] = useState(0)
    const [shouldBump, setShouldBump] = useState(false)

    // Trigger bump animation when cart count increases
    useEffect(() => {
        if (cartCount > prevCount && prevCount > 0) {
            setShouldBump(true)
            setTimeout(() => setShouldBump(false), 500)
        }
        setPrevCount(cartCount)
    }, [cartCount, prevCount])

    return (
        <button
            onClick={onClick}
            className={`
        fixed bottom-6 right-6 z-50
        bg-maroon-700 hover:bg-maroon-800
        text-cream-50 
        rounded-full 
        h-14 px-6
        flex items-center justify-center gap-3
        shadow-lg hover:shadow-xl
        transition-all duration-300
        hover:scale-105
        ${shouldBump ? 'animate-bump' : ''}
      `}
            aria-label="Open cart"
        >
            {/* Shopping bag icon */}
            <div className="relative">
                <ShoppingBag className="w-6 h-6" />

                {/* Cart count badge */}
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gold-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount > 9 ? '9+' : cartCount}
                    </span>
                )}
            </div>
            <span className="font-semibold text-lg hidden sm:inline">Your Cart</span>
        </button>
    )
}
