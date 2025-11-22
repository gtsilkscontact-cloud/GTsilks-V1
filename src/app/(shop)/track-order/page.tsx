'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Button from '@/components/ui/Button'

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState('')
    const [order, setOrder] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setOrder(null)

        const supabase = createClient()

        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*, order_items(*, sarees(name))')
                .eq('id', orderId)
                .single()

            if (error) throw error
            if (!data) throw new Error('Order not found')

            setOrder(data)
        } catch (err: any) {
            setError('Order not found. Please check the Order ID.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-serif font-bold text-maroon-900 mb-8 text-center">Track Your Order</h1>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <form onSubmit={handleTrack} className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Enter Order ID (e.g. 123e4567...)"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
                        required
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Tracking...' : 'Track'}
                    </Button>
                </form>
                {error && <p className="text-red-600 mt-2">{error}</p>}
            </div>

            {order && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-cream-300">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-maroon-900">Order Status</h2>
                            <p className="text-gray-600">Order ID: {order.id}</p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                            order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'CONFIRMED' ? 'bg-yellow-100 text-yellow-800' :
                                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                        'bg-gray-100 text-gray-800'
                            }`}>
                            {order.status}
                        </span>
                    </div>

                    {order.status === 'SHIPPED' && (
                        <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-100">
                            <h3 className="font-semibold text-blue-900 mb-2">Tracking Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-blue-700">Courier Name</p>
                                    <p className="font-medium text-blue-900">{order.courier_name || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-blue-700">Tracking Number</p>
                                    <p className="font-medium text-blue-900">{order.tracking_number || 'N/A'}</p>
                                </div>
                            </div>
                            {order.tracking_link && (
                                <div className="mt-4">
                                    <a
                                        href={order.tracking_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                                    >
                                        Track Shipment
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                        <div className="space-y-3">
                            {order.order_items?.map((item: any) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-800">{item.sarees?.name} × {item.quantity}</span>
                                    <span className="font-medium">₹{item.price_at_time}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between font-bold text-maroon-900">
                            <span>Total Amount</span>
                            <span>₹{order.total_amount}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
