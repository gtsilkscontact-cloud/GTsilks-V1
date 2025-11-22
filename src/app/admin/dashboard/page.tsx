import { createClient } from '@/utils/supabase/server'

export default async function AdminDashboard() {
    const supabase = await createClient()

    // Fetch stats
    const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true })
    const { count: sareeCount } = await supabase.from('sarees').select('*', { count: 'exact', head: true }).eq('is_active', true)
    const { count: pendingCount } = await supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'PENDING')

    // Calculate revenue (simple sum for now)
    const { data: orders } = await supabase.from('orders').select('total_amount, status, created_at')
    const totalRevenue = orders?.filter(o => o.status !== 'CANCELLED').reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0

    // Order Status Distribution
    const statusCounts = orders?.reduce((acc: any, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1
        return acc
    }, {}) || {}

    // Recent Orders
    const { data: recentOrders } = await supabase
        .from('orders')
        .select('*, users(full_name)')
        .order('created_at', { ascending: false })
        .limit(5)

    const maxCount = Math.max(...Object.values(statusCounts) as number[], 1)

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pink-600">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">Total Revenue</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">₹{totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">Total Orders</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{orderCount || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">Pending Orders</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{pendingCount || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">Active Sarees</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{sareeCount || 0}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Orders by Status Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Orders by Status</h3>
                    <div className="space-y-4">
                        {Object.entries(statusCounts).map(([status, count]: [string, any]) => (
                            <div key={status}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-700">{status}</span>
                                    <span className="text-gray-500">{count}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className={`h-2.5 rounded-full ${status === 'PENDING' ? 'bg-yellow-500' :
                                                status === 'CONFIRMED' ? 'bg-blue-500' :
                                                    status === 'SHIPPED' ? 'bg-purple-500' :
                                                        status === 'DELIVERED' ? 'bg-green-500' :
                                                            'bg-red-500'
                                            }`}
                                        style={{ width: `${(count / maxCount) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                        {Object.keys(statusCounts).length === 0 && (
                            <p className="text-gray-500 text-center py-4">No data available</p>
                        )}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
                    <div className="flow-root">
                        <ul role="list" className="-my-5 divide-y divide-gray-200">
                            {recentOrders?.map((order) => (
                                <li key={order.id} className="py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                Order #{order.id.substring(0, 8)}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {order.users?.full_name || 'Unknown Customer'}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                            ₹{order.total_amount}
                                        </div>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'SHIPPED' ? 'bg-purple-100 text-purple-800' :
                                                        order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                                            'bg-red-100 text-red-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </li>
                            ))}
                            {(!recentOrders || recentOrders.length === 0) && (
                                <p className="text-gray-500 text-center py-4">No recent activity</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
