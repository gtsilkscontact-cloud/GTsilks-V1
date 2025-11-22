import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AdminProfileForm from './AdminProfileForm'
import AdminLogoutButton from './AdminLogoutButton'

export default async function AdminProfilePage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/admin/login')
    }

    // Get user profile
    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Admin Profile</h1>
                <p className="mt-2 text-gray-600">Manage your admin account settings</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Information */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
                        <AdminProfileForm profile={profile || { email: user.email }} />
                    </div>
                </div>

                {/* Account Details */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Account Details</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Account Type</p>
                                <p className="mt-1 text-sm text-gray-900">Administrator</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">User ID</p>
                                <p className="mt-1 text-xs text-gray-900 font-mono break-all">{user.id}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Account Created</p>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(user.created_at || '').toLocaleDateString('en-IN', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div className="pt-4 border-t border-gray-200">
                                <AdminLogoutButton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
