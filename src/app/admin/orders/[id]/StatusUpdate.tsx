'use client'

import { updateOrderStatus } from '../actions'
import { useState } from 'react'

type StatusUpdateProps = {
    orderId: string
    currentStatus: string
}

export default function StatusUpdate({ orderId, currentStatus }: StatusUpdateProps) {
    const [status, setStatus] = useState(currentStatus)
    const [isUpdating, setIsUpdating] = useState(false)
    const [message, setMessage] = useState('')

    const statuses = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED']

    const handleUpdate = async () => {
        if (status === currentStatus) {
            setMessage('Status unchanged')
            return
        }

        setIsUpdating(true)
        setMessage('')

        try {
            await updateOrderStatus(orderId, status)
            setMessage('✓ Status updated successfully!')
            setTimeout(() => setMessage(''), 3000)
        } catch (error) {
            setMessage('✗ Failed to update status')
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Update Order Status</h2>
            <div className="flex gap-4 items-center">
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-pink-500 focus:border-pink-500"
                >
                    {statuses.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isUpdating ? 'Updating...' : 'Update Status'}
                </button>
            </div>
            {message && (
                <p className={`mt-2 text-sm ${message.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
            )}
        </div>
    )
}
