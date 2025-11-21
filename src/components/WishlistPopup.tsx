'use client'

import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ShoppingCart, X } from 'lucide-react'

type WishlistPopupProps = {
    isOpen: boolean
    onClose: () => void
}

/**
 * WishlistPopup - A floating wishlist preview panel
 * Features:
 * - Displays wishlist items with thumbnails, names, prices
 * - Add to cart directly from wishlist
 * - Remove item functionality
 * - Click outside to close
 * - Premium maroon/gold/cream styling
 */
export default function WishlistPopup({ isOpen, onClose }: WishlistPopupProps) {
    const { wishlist, removeFromWishlist, wishlistCount } = useWishlist()
    const { addToCart } = useCart()
    const popupRef = useRef<HTMLDivElement>(null)

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, onClose])

    // Prevent rendering if not open
    if (!isOpen) return null

    const handleAddToCart = (item: typeof wishlist[0]) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
        })
    }

    return (
        <>
            {/* Backdrop overlay for mobile */}
            <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={onClose} />

            {/* Wishlist popup panel */}
            <div
                ref={popupRef}
                className={`
          fixed z-50
          bg-cream-50 
          rounded-2xl 
          shadow-2xl
          border border-red-100
          transition-all duration-300 ease-out
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
          
          /* Desktop: appears on right side, below cart popup */
          bottom-6 right-24
          w-96 max-w-[calc(100vw-3rem)]
          max-h-[500px]
          
          /* Mobile: full width panel from bottom */
          md:bottom-6 md:right-24 md:w-96
        `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-red-100">
                    <h3 className="text-lg font-semibold text-maroon-900">
                        Your Wishlist ({wishlistCount} {wishlistCount === 1 ? 'item' : 'items'})
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-maroon-600 hover:text-maroon-800 transition-colors"
                        aria-label="Close wishlist"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Wishlist items list - scrollable */}
                <div className="overflow-y-auto max-h-[500px] p-4 space-y-3">
                    {wishlist.length === 0 ? (
                        <div className="text-center py-8 text-maroon-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-16 h-16 mx-auto mb-3 opacity-40"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                />
                            </svg>
                            <p className="text-sm">Your wishlist is empty</p>
                        </div>
                    ) : (
                        wishlist.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-3 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* Product image */}
                                <Link href={`/sarees/${item.id}`} className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-cream-100">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-maroon-300">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-8 h-8"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </Link>

                                {/* Product details */}
                                <div className="flex-1 min-w-0">
                                    <Link href={`/sarees/${item.id}`}>
                                        <h4 className="text-sm font-medium text-maroon-900 truncate hover:text-gold-700">
                                            {item.name}
                                        </h4>
                                    </Link>
                                    <p className="text-sm text-gold-700 font-semibold mt-1">
                                        ₹{item.price.toLocaleString('en-IN')}
                                    </p>
                                    <div className="flex gap-1 mt-1">
                                        <span className="text-xs bg-gold-100 text-maroon-900 px-2 py-0.5 rounded">
                                            {item.type}
                                        </span>
                                        {item.state && (
                                            <span className="text-xs bg-cream-200 text-maroon-900 px-2 py-0.5 rounded">
                                                {item.state}
                                            </span>
                                        )}
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="mt-2 flex items-center gap-1 text-xs bg-maroon-700 hover:bg-maroon-800 text-white px-3 py-1.5 rounded-lg transition-colors"
                                    >
                                        <ShoppingCart className="w-3 h-3" />
                                        Add to Cart
                                    </button>
                                </div>

                                {/* Remove button */}
                                <button
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="text-red-400 hover:text-red-700 transition-colors self-start"
                                    aria-label="Remove from wishlist"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {wishlist.length > 0 && (
                    <div className="border-t border-red-100 p-4">
                        <Link
                            href="/sarees"
                            onClick={onClose}
                            className="
                block text-center
                bg-red-600 hover:bg-red-700 
                text-white 
                font-semibold 
                py-3 px-6 
                rounded-lg 
                transition-all duration-300
                hover:shadow-lg
                hover:scale-[1.02]
                active:scale-[0.98]
              "
                        >
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}
