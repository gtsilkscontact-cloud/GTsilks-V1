import { createClient } from '@/utils/supabase/server'

export default async function AdminDashboard() {
    const supabase = await createClient()

    // Fetch stats
    const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true })
    const { count: sareeCount } = await supabase.from('sarees').select('*', { count: 'exact', head: true }).eq('is_active', true)

    // Calculate revenue (simple sum for now)
    const { data: orders } = await supabase.from('orders').select('total_amount').eq('payment_status', 'PAID')
    const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
                    <p className="text-3xl font-bold text-pink-600 mt-2">{orderCount || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
                    <p className="text-3xl font-bold text-pink-600 mt-2">₹{totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700">Active Sarees</h3>
                    <p className="text-3xl font-bold text-pink-600 mt-2">{sareeCount || 0}</p>
                </div>
            </div>
        </div>
    )
}
