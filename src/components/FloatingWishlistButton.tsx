'use client'

import { useWishlist } from '@/context/WishlistContext'
import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'

type FloatingWishlistButtonProps = {
    onClick: () => void
}

/**
 * FloatingWishlistButton - Fixed-position wishlist button at bottom-right (below cart)
 * Features:
 * - Shows wishlist item count badge
 * - Animates when items are added
 * - Premium red background with white text
 * - Responsive on both desktop and mobile
 */
export default function FloatingWishlistButton({ onClick }: FloatingWishlistButtonProps) {
    const { wishlistCount } = useWishlist()
    const [prevCount, setPrevCount] = useState(0)
    const [shouldBump, setShouldBump] = useState(false)

    // Trigger bump animation when wishlist count increases
    useEffect(() => {
        if (wishlistCount > prevCount && prevCount > 0) {
            setShouldBump(true)
            setTimeout(() => setShouldBump(false), 500)
        }
        setPrevCount(wishlistCount)
    }, [wishlistCount, prevCount])

    return (
        <button
            onClick={onClick}
            className={`
        fixed bottom-24 right-6 z-50
        bg-red-600 hover:bg-red-700
        text-white 
        rounded-full 
        w-14 h-14
        flex items-center justify-center
        shadow-lg hover:shadow-xl
        transition-all duration-300
        hover:scale-110
        ${shouldBump ? 'animate-bump' : ''}
      `}
            aria-label="Open wishlist"
        >
            {/* Heart icon */}
            <div className="relative">
                <Heart className="w-6 h-6 fill-current" />

                {/* Wishlist count badge */}
                {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gold-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {wishlistCount > 9 ? '9+' : wishlistCount}
                    </span>
                )}
            </div>
        </button>
    )
}
