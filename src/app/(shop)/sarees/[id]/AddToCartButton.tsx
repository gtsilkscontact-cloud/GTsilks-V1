'use client'

import { useCart } from '@/context/CartContext'
import { useState } from 'react'

type AddToCartButtonProps = {
    saree: {
        id: string
        name: string
        price: number
        saree_images: { image_url: string; is_primary: boolean }[]
        stock_quantity: number
    }
}

export default function AddToCartButton({ saree }: AddToCartButtonProps) {
    const { addToCart } = useCart()
    const [isAdded, setIsAdded] = useState(false)

    const handleAddToCart = () => {
        const image = saree.saree_images?.find((img) => img.is_primary)?.image_url || saree.saree_images?.[0]?.image_url || ''

        addToCart({
            id: saree.id,
            name: saree.name,
            price: saree.price,
            image: image,
        })

        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
    }

    if (saree.stock_quantity === 0) {
        return (
            <button
                disabled
                className="max-w-xs flex-1 bg-gray-400 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white cursor-not-allowed sm:w-full"
            >
                Out of Stock
            </button>
        )
    }

    return (
        <button
            onClick={handleAddToCart}
            className={`max-w-xs flex-1 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-pink-500 sm:w-full transition-colors ${isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-pink-600 hover:bg-pink-700'
                }`}
        >
            {isAdded ? 'Added to Cart!' : 'Add to Cart'}
        </button>
    )
}
