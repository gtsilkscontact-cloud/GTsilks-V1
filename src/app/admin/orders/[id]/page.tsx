import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import StatusUpdate from './StatusUpdate'

export default async function OrderDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const supabase = await createClient()

    // Fetch order with items
    const { data: order, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !order) {
        notFound()
    }

    // Fetch order items with saree details
    const { data: items } = await supabase
        .from('order_items')
        .select('*, sarees(name, type)')
        .eq('order_id', id)

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800'
            case 'CONFIRMED':
                return 'bg-blue-100 text-blue-800'
            case 'SHIPPED':
                return 'bg-purple-100 text-purple-800'
            case 'DELIVERED':
                return 'bg-green-100 text-green-800'
            case 'CANCELLED':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-6">
                <Link href="/admin/orders" className="text-pink-600 hover:text-pink-800">
                    ← Back to Orders
                </Link>
            </div>

            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
                    <p className="text-sm text-gray-500 mt-1 font-mono">ID: {order.id}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Customer Information */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
                    <dl className="space-y-2">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                            <dd className="text-sm text-gray-900">{order.customer_name}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd className="text-sm text-gray-900">{order.email || 'N/A'}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                            <dd className="text-sm text-gray-900">{order.phone || 'N/A'}</dd>
                        </div>
                    </dl>
                </div>

                {/* Order Information */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Order Information</h2>
                    <dl className="space-y-2">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Order Date</dt>
                            <dd className="text-sm text-gray-900">
                                {new Date(order.created_at).toLocaleString()}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Payment Mode</dt>
                            <dd className="text-sm text-gray-900">{order.payment_mode}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Payment Status</dt>
                            <dd className="text-sm text-gray-900">{order.payment_status}</dd>
                        </div>
                    </dl>
                </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                <p className="text-sm text-gray-900">
                    {order.address_line1}<br />
                    {order.address_line2 && <>{order.address_line2}<br /></>}
                    {order.city}, {order.state} - {order.pincode}
                </p>
            </div>

            {/* Order Items */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-lg font-semibold mb-4">Order Items</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Saree
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Quantity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Subtotal
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {items?.map((item: any) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {item.sarees?.name || 'Unknown'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.sarees?.type || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {item.quantity}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    ₹{item.price_at_purchase}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                    ₹{item.quantity * item.price_at_purchase}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                        <tr>
                            <td colSpan={4} className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                                Total:
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                ₹{order.total_amount}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Status Update */}
            <StatusUpdate orderId={order.id} currentStatus={order.status} />
        </div>
    )
}
