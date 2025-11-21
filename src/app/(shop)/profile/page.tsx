import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ProfileForm from './ProfileForm'
import LogoutButton from './LogoutButton'

export default async function ProfilePage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Get user profile
    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

    // Get user orders
    const { data: orders } = await supabase
        .from('orders')
        .select('*, order_items(*, sarees(name))')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-serif font-bold text-maroon-900">My Profile</h1>
                <LogoutButton />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Information */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-serif font-bold text-maroon-900 mb-6">Profile Details</h2>
                        <ProfileForm profile={profile} />
                    </div>
                </div>

                {/* Order History */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-serif font-bold text-maroon-900 mb-6">Order History</h2>
                        {orders && orders.length > 0 ? (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="border border-cream-300 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <p className="font-semibold text-maroon-900">Order #{order.id}</p>
                                                <p className="text-sm text-gray-600">
                                                    {new Date(order.created_at).toLocaleDateString('en-IN', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'CONFIRMED' ? 'bg-yellow-100 text-yellow-800' :
                                                            order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                                'bg-gray-100 text-gray-800'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            {order.order_items?.map((item: any) => (
                                                <p key={item.id} className="text-sm text-gray-700">
                                                    {item.sarees?.name} × {item.quantity}
                                                </p>
                                            ))}
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-cream-200 flex justify-between items-center">
                                            <p className="font-semibold text-maroon-900">Total: ₹{order.total_amount.toLocaleString()}</p>
                                            <p className="text-sm text-gray-600">{order.payment_mode}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 mb-4">No orders yet</p>
                                <a href="/sarees" className="text-maroon-800 hover:text-gold-700 font-semibold">
                                    Start Shopping →
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
