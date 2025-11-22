import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AdminLogoutButton from './profile/AdminLogoutButton'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/admin/login')
    }

    // Get user profile for display
    const { data: profile } = await supabase
        .from('users')
        .select('full_name, email')
        .eq('id', user.id)
        .single()

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md hidden md:flex md:flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-pink-600">GT Admin</h1>
                </div>
                <nav className="mt-6 flex-1">
                    <Link
                        href="/admin/dashboard"
                        className="block px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/sarees"
                        className="block px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                    >
                        Sarees
                    </Link>
                    <Link
                        href="/admin/orders"
                        className="block px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                    >
                        Orders
                    </Link>
                    <Link
                        href="/admin/users"
                        className="block px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                    >
                        Customers
                    </Link>
                    <Link
                        href="/admin/profile"
                        className="block px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                    >
                        Profile
                    </Link>
                    <div className="px-6 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Content
                    </div>
                    <Link
                        href="/admin/map"
                        className="block px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                    >
                        Interactive Map
                    </Link>
                    <Link
                        href="/admin/pages"
                        className="block px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                    >
                        Pages & Policies
                    </Link>
                    <Link
                        href="/admin/settings"
                        className="block px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                    >
                        Site Settings
                    </Link>
                </nav>
                <div className="border-t p-6">
                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {profile?.full_name || 'Admin'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{profile?.email || user.email}</p>
                    </div>
                    <AdminLogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    )
}
