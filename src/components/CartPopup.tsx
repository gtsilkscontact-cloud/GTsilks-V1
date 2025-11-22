'use client'

import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { X, Minus, Plus } from 'lucide-react'

type CartPopupProps = {
    isOpen: boolean
    onClose: () => void
}

/**
 * CartPopup - A floating cart preview panel
 * Features:
 * - Displays cart items with thumbnails, names, prices, quantities
 * - Update quantity controls
 * - Remove item functionality
 * - Shows subtotal
 * - Click outside to close
 * - Premium maroon/gold/cream styling
 */
export default function CartPopup({ isOpen, onClose }: CartPopupProps) {
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()
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

    return (
        <>
            {/* Backdrop overlay for mobile */}
            <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={onClose} />

            {/* Cart popup panel */}
            <div
                ref={popupRef}
                className={`
          fixed z-50
          bg-cream-50 
          rounded-t-2xl md:rounded-2xl 
          shadow-2xl
          border border-maroon-100
          transition-all duration-300 ease-out
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full md:translate-y-4 pointer-events-none'}
          
          /* Desktop: appears above the floating button */
          md:bottom-24 md:right-6 md:left-auto
          md:w-96 md:max-w-[calc(100vw-3rem)]
          md:max-h-[600px]
          
          /* Mobile: full width panel from bottom */
          bottom-0 left-0 right-0 w-full
          max-h-[85vh]
        `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-maroon-100">
                    <h3 className="text-lg font-semibold text-maroon-900">
                        Your Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-maroon-600 hover:text-maroon-800 transition-colors"
                        aria-label="Close cart"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Cart items list - scrollable */}
                <div className="overflow-y-auto max-h-[400px] p-4 space-y-3">
                    {cart.length === 0 ? (
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
                                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                            <p className="text-sm">Your cart is empty</p>
                        </div>
                    ) : (
                        cart.map((item) => (
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

                                    {/* Quantity controls */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            className="p-1 rounded bg-cream-200 hover:bg-cream-300 text-maroon-800 transition-colors"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="text-sm font-medium text-maroon-900 w-8 text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 rounded bg-cream-200 hover:bg-cream-300 text-maroon-800 transition-colors"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>

                                {/* Remove button */}
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-400 hover:text-red-700 transition-colors self-start"
                                    aria-label="Remove from cart"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer with total and checkout */}
                {cart.length > 0 && (
                    <div className="border-t border-maroon-100 p-4 space-y-3">
                        <div className="flex justify-between items-center text-lg font-semibold">
                            <span className="text-maroon-900">Total:</span>
                            <span className="text-gold-700">₹{cartTotal.toLocaleString('en-IN')}</span>
                        </div>
                        <Link
                            href="/cart"
                            onClick={onClose}
                            className="
                block text-center
                bg-maroon-700 hover:bg-maroon-800 
                text-cream-50 
                font-semibold 
                py-3 px-6 
                rounded-lg 
                transition-all duration-300
                hover:shadow-lg
                hover:scale-[1.02]
                active:scale-[0.98]
              "
                        >
                            Go to Checkout
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}
