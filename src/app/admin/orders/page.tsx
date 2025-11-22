import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function OrdersPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const statusFilter = (params.status as string) || 'ALL'
    const query = ((params.query as string) || '').trim()

    const supabase = await createClient()

    let dbQuery = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

    if (statusFilter !== 'ALL') {
        dbQuery = dbQuery.eq('status', statusFilter)
    }

    if (query) {
        // Search only by Customer Name or Phone
        dbQuery = dbQuery.or(
            `customer_name.ilike.%${query}%,phone.ilike.%${query}%`
        )
    }

    const { data: orders, error } = await dbQuery

    if (error) {
        console.error('Error loading orders:', error)
        return <div className="text-red-500">Error loading orders</div>
    }

    const statuses = ['ALL', 'PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED']

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
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            </div>

            {/* Search and Filter */}
            <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <form method="get" className="flex gap-2">
                    <input
                        type="text"
                        name="query"
                        defaultValue={query}
                        placeholder="Search by Customer Name or Phone..."
                        className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                    {statusFilter !== 'ALL' && (
                        <input type="hidden" name="status" value={statusFilter} />
                    )}
                    <button
                        type="submit"
                        className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
                    >
                        Search
                    </button>
                    {query && (
                        <a
                            href={`/admin/orders${statusFilter !== 'ALL' ? `?status=${statusFilter}` : ''}`}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 flex items-center"
                        >
                            Clear
                        </a>
                    )}
                </form>

                {/* Status Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {statuses.map((status) => (
                        <a
                            key={status}
                            href={
                                status === 'ALL'
                                    ? `/admin/orders${query ? `?query=${query}` : ''}`
                                    : `/admin/orders?status=${status}${query ? `&query=${query}` : ''}`
                            }
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${statusFilter === status
                                    ? 'bg-pink-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {status}
                        </a>
                    ))}
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders && orders.length > 0 ? (
                            orders.map((order: any) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-mono text-gray-900">
                                            {order.id.substring(0, 8)}...
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(order.created_at).toLocaleTimeString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {order.customer_name || 'Unknown'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-xs text-gray-500">
                                            {order.phone || 'No phone'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-gray-900">
                                            ₹{order.total_amount}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            href={`/admin/orders/${order.id}`}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
