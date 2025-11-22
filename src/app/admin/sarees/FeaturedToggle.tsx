'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { Star } from 'lucide-react'

export default function FeaturedToggle({ id, initialIsFeatured }: { id: string, initialIsFeatured: boolean }) {
    const [isFeatured, setIsFeatured] = useState(initialIsFeatured)
    const [loading, setLoading] = useState(false)

    const toggleFeatured = async () => {
        setLoading(true)
        const supabase = createClient()
        const newValue = !isFeatured

        const { error } = await supabase
            .from('sarees')
            .update({ is_featured: newValue })
            .eq('id', id)

        if (error) {
            alert('Error updating featured status')
        } else {
            setIsFeatured(newValue)
        }
        setLoading(false)
    }

    return (
        <button
            onClick={toggleFeatured}
            disabled={loading}
            className={`p-1 rounded-full transition-colors ${isFeatured ? 'text-yellow-500 bg-yellow-50' : 'text-gray-300 hover:text-gray-400'}`}
            title={isFeatured ? 'Remove from Featured' : 'Add to Featured'}
        >
            <Star className={`w-5 h-5 ${isFeatured ? 'fill-current' : ''}`} />
        </button>
    )
}
