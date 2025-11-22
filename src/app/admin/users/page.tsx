import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function UsersPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const query = (params.query as string) || ''
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/admin/login')
    }

    // Fetch users with search
    let dbQuery = supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

    if (query) {
        dbQuery = dbQuery.or(`full_name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%`)
    }

    const { data: users, error } = await dbQuery

    if (error) {
        console.error('Error fetching users:', error)
    }

    return (
        <div>
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
                    <p className="mt-2 text-gray-600">Manage your customer base</p>
                </div>
            </div>

            {/* Search Bar */}
            <form method="get" className="mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        name="query"
                        defaultValue={query}
                        placeholder="Search by name, email, or phone..."
                        className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                    <button
                        type="submit"
                        className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
                    >
                        Search
                    </button>
                    {query && (
                        <a
                            href="/admin/users"
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 flex items-center"
                        >
                            Clear
                        </a>
                    )}
                </div>
            </form>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Contact
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Joined
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users?.map((customer) => (
                            <tr key={customer.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{customer.full_name || 'N/A'}</div>
                                    <div className="text-xs text-gray-500 font-mono">{customer.id.substring(0, 8)}...</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{customer.email}</div>
                                    <div className="text-sm text-gray-500">{customer.phone || 'No phone'}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{customer.city || 'N/A'}</div>
                                    <div className="text-xs text-gray-500">{customer.state}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${customer.role === 'admin' ? 'bg-pink-100 text-pink-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                        {customer.role || 'customer'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(customer.created_at).toLocaleDateString('en-IN', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </td>
                            </tr>
                        ))}
                        {(!users || users.length === 0) && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    No customers found matching "{query}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
