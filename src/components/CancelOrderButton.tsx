'use client'

import { cancelOrder } from '@/app/actions/orderActions'
import { useState } from 'react'

export default function CancelOrderButton({ orderId }: { orderId: string }) {
    const [loading, setLoading] = useState(false)

    const handleCancel = async () => {
        if (!confirm('Are you sure you want to cancel this order?')) return

        setLoading(true)
        const result = await cancelOrder(orderId)
        setLoading(false)

        if (result.success) {
            alert('Order cancelled successfully')
        } else {
            alert(result.message)
        }
    }

    return (
        <button
            onClick={handleCancel}
            disabled={loading}
            className="text-sm text-red-600 hover:text-red-800 font-medium underline disabled:opacity-50 disabled:no-underline"
        >
            {loading ? 'Cancelling...' : 'Cancel Order'}
        </button>
    )
}
