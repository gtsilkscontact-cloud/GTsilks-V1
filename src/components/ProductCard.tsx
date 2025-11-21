'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useState } from 'react'
import { Heart, ShoppingCart } from 'lucide-react'

type Saree = {
    id: string
    name: string
    price: number
    type: string
    state?: string
    stock_quantity: number
    saree_images?: { image_url: string }[]
}

type ProductCardProps = {
    saree: Saree
}

/**
 * ProductCard - Reusable product card component with wishlist and cart actions
 * Features:
 * - Heart icon button for wishlist (top-right)
 * - Shopping cart icon button for quick add-to-cart (top-right)
 * - Hover effects and animations
 * - Premium maroon/gold/cream styling
 */
export default function ProductCard({ saree }: ProductCardProps) {
    const { addToCart } = useCart()
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
    const [showAddedToCart, setShowAddedToCart] = useState(false)

    const isWishlisted = isInWishlist(saree.id)

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (isWishlisted) {
            removeFromWishlist(saree.id)
        } else {
            const image = saree.saree_images?.[0]?.image_url || ''
            addToWishlist({
                id: saree.id,
                name: saree.name,
                price: saree.price,
                image: image,
                type: saree.type,
                state: saree.state,
            })
        }
    }

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (saree.stock_quantity === 0) return

        const image = saree.saree_images?.[0]?.image_url || ''
        addToCart({
            id: saree.id,
            name: saree.name,
            price: saree.price,
            image: image,
        })

        setShowAddedToCart(true)
        setTimeout(() => setShowAddedToCart(false), 2000)
    }

    return (
        <Link href={`/sarees/${saree.id}`} className="group block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-cream-300 transform hover:-translate-y-1">
                {/* Image Container with Action Buttons */}
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-cream-100 h-80 relative">
                    {/* Product Image */}
                    {saree.saree_images?.[0]?.image_url ? (
                        <img
                            src={saree.saree_images[0].image_url}
                            alt={saree.name}
                            className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            No Image
                        </div>
                    )}

                    {/* Action Buttons Overlay */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {/* Wishlist Button */}
                        <button
                            onClick={handleWishlistClick}
                            className={`
                p-2.5 rounded-full shadow-lg backdrop-blur-sm
                transition-all duration-300 hover:scale-110
                ${isWishlisted
                                    ? 'bg-red-500 text-white'
                                    : 'bg-white/90 text-maroon-700 hover:bg-red-50'
                                }
              `}
                            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                            <Heart
                                className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`}
                            />
                        </button>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={saree.stock_quantity === 0}
                            className={`
                p-2.5 rounded-full shadow-lg backdrop-blur-sm
                transition-all duration-300 hover:scale-110
                ${showAddedToCart
                                    ? 'bg-green-500 text-white'
                                    : saree.stock_quantity === 0
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-white/90 text-maroon-700 hover:bg-maroon-50'
                                }
              `}
                            aria-label="Add to cart"
                        >
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Out of Stock Badge */}
                    {saree.stock_quantity === 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                                Out of Stock
                            </span>
                        </div>
                    )}

                    {/* Added to Cart Notification */}
                    {showAddedToCart && (
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
                            Added to cart!
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-4 bg-cream-50">
                    <h3 className="text-lg font-serif font-semibold text-maroon-900 mb-2 group-hover:text-gold-700 transition-colors line-clamp-1">
                        {saree.name}
                    </h3>
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-xl font-bold text-maroon-800">
                            ₹{saree.price.toLocaleString('en-IN')}
                        </p>
                    </div>
                    <div className="flex gap-2 text-xs">
                        <span className="bg-gold-100 text-maroon-900 px-2 py-1 rounded">
                            {saree.type}
                        </span>
                        {saree.state && (
                            <span className="bg-cream-200 text-maroon-900 px-2 py-1 rounded">
                                {saree.state}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}
