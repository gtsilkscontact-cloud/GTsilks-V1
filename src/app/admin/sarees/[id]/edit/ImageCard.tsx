'use client'

import { deleteImage, setPrimaryImage } from '../../actions'
import { useState } from 'react'

type ImageCardProps = {
    image: {
        id: string
        image_url: string
        is_primary: boolean
    }
    sareeId: string
}

export default function ImageCard({ image, sareeId }: ImageCardProps) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this image?')) return

        setIsDeleting(true)
        try {
            await deleteImage(image.id, sareeId)
        } catch (error) {
            alert('Failed to delete image')
            setIsDeleting(false)
        }
    }

    const handleSetPrimary = async () => {
        try {
            await setPrimaryImage(image.id, sareeId)
        } catch (error) {
            alert('Failed to set primary image')
        }
    }

    return (
        <div className="relative group">
            <img
                src={image.image_url}
                alt="Saree"
                className="h-32 w-32 object-cover rounded border"
            />
            {image.is_primary && (
                <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs px-2 py-1 rounded">
                    Primary
                </span>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                {!image.is_primary && (
                    <button
                        onClick={handleSetPrimary}
                        className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700"
                    >
                        Set Primary
                    </button>
                )}
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-red-600 text-white text-xs px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    )
}
