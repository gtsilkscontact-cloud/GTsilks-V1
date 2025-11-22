'use client'

import { updateOrderStatus } from '../actions'
import { useState } from 'react'
import Button from '@/components/ui/Button'

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
            let trackingData = {}
            if (status === 'SHIPPED') {
                const courierName = (document.getElementById('courier_name') as HTMLInputElement)?.value
                const trackingNumber = (document.getElementById('tracking_number') as HTMLInputElement)?.value
                const trackingLink = (document.getElementById('tracking_link') as HTMLInputElement)?.value
                if (courierName && trackingNumber) {
                    trackingData = {
                        courier_name: courierName,
                        tracking_number: trackingNumber,
                        tracking_link: trackingLink
                    }
                }
            }

            await updateOrderStatus(orderId, status, trackingData)
            setMessage('✓ Status updated successfully!')
            setTimeout(() => setMessage(''), 3000)
        } catch (error) {
            setMessage('✗ Failed to update status')
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-cream-200">
            <h2 className="text-xl font-serif font-bold text-maroon-900 mb-4">Update Order Status</h2>
            <div className="flex gap-4 items-end flex-wrap">
                <div className="flex-1 min-w-[200px]">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
                        disabled={isUpdating}
                    >
                        {statuses.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>
                {status === 'SHIPPED' && (
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                            <label htmlFor="courier_name" className="block text-sm font-medium text-gray-700 mb-1">Courier Name</label>
                            <input
                                type="text"
                                id="courier_name"
                                placeholder="e.g. BlueDart"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="tracking_number" className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                            <input
                                type="text"
                                id="tracking_number"
                                placeholder="e.g. TRK12345"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="tracking_link" className="block text-sm font-medium text-gray-700 mb-1">Tracking Link (Optional)</label>
                            <input
                                type="url"
                                id="tracking_link"
                                placeholder="https://..."
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
                            />
                        </div>
                    </div>
                )}
                <Button
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    className="bg-maroon-800 hover:bg-maroon-700 text-white"
                >
                    {isUpdating ? 'Updating...' : 'Update Status'}
                </Button>
            </div>
            {message && (
                <p className={`mt-2 text-sm ${message.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
            )}
        </div>
    )
}
