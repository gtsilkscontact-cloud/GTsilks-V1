'use client'

import { useWishlist } from '@/context/WishlistContext'
import { Heart } from 'lucide-react'
import Button from '@/components/ui/Button'

type AddToWishlistButtonProps = {
    saree: {
        id: string
        name: string
        price: number
        type: string
        state?: string
        saree_images: { image_url: string; is_primary: boolean }[]
    }
}

export default function AddToWishlistButton({ saree }: AddToWishlistButtonProps) {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
    const isWishlisted = isInWishlist(saree.id)

    const handleWishlistToggle = () => {
        if (isWishlisted) {
            removeFromWishlist(saree.id)
        } else {
            const image = saree.saree_images?.find((img) => img.is_primary)?.image_url || saree.saree_images?.[0]?.image_url || ''
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

    return (
        <Button
            onClick={handleWishlistToggle}
            className={`max-w-xs flex-1 sm:w-full flex items-center justify-center gap-2 ${isWishlisted
                    ? 'bg-red-600 hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]'
                    : 'bg-white text-maroon-800 border-2 border-maroon-800 hover:bg-maroon-50'
                }`}
            variant={isWishlisted ? 'primary' : 'secondary'}
        >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </Button>
    )
}
