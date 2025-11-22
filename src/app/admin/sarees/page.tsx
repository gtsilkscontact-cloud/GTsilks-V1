import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import DeleteSareeButton from './DeleteSareeButton'
import FeaturedToggle from './FeaturedToggle'

const ITEMS_PER_PAGE = 10

export default async function SareeList({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const query = (params.query as string) || ''
    const page = parseInt((params.page as string) || '1')
    const offset = (page - 1) * ITEMS_PER_PAGE

    const supabase = await createClient()

    // Build query with search and pagination
    let dbQuery = supabase
        .from('sarees')
        .select('*, saree_images(image_url)', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + ITEMS_PER_PAGE - 1)

    if (query) {
        dbQuery = dbQuery.or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    }

    const { data: sarees, error, count } = await dbQuery

    if (error) {
        return <div className="text-red-500">Error loading sarees</div>
    }

    const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE)

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Sarees</h1>
                <Link
                    href="/admin/sarees/new"
                    className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
                >
                    Add New Saree
                </Link>
            </div>

            {/* Search Bar */}
            <form method="get" className="mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        name="query"
                        defaultValue={query}
                        placeholder="Search sarees by name or description..."
                        className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                    <button
                        type="submit"
                        className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
                    >
                        Search
                    </button>
                    {query && (
                        <Link
                            href="/admin/sarees"
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                        >
                            Clear
                        </Link>
                    )}
                </div>
            </form>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Image
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Stock
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Featured
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sarees?.map((saree) => (
                            <tr key={saree.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {saree.saree_images?.[0]?.image_url && (
                                        <img
                                            src={saree.saree_images[0].image_url}
                                            alt={saree.name}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {saree.name}
                                    </div>
                                    <div className="text-sm text-gray-500">{saree.type}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">₹{saree.price}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${saree.stock_quantity > 0
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        {saree.stock_quantity}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <FeaturedToggle id={saree.id} initialIsFeatured={saree.is_featured} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link
                                        href={`/admin/sarees/${saree.id}/edit`}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Edit
                                    </Link>
                                    <DeleteSareeButton id={saree.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            {page > 1 && (
                                <Link
                                    href={`/admin/sarees?page=${page - 1}${query ? `&query=${query}` : ''}`}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Previous
                                </Link>
                            )}
                            {page < totalPages && (
                                <Link
                                    href={`/admin/sarees?page=${page + 1}${query ? `&query=${query}` : ''}`}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{offset + 1}</span> to{' '}
                                    <span className="font-medium">{Math.min(offset + ITEMS_PER_PAGE, count || 0)}</span> of{' '}
                                    <span className="font-medium">{count}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    {page > 1 && (
                                        <Link
                                            href={`/admin/sarees?page=${page - 1}${query ? `&query=${query}` : ''}`}
                                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                        Page {page} of {totalPages}
                                    </span>
                                    {page < totalPages && (
                                        <Link
                                            href={`/admin/sarees?page=${page + 1}${query ? `&query=${query}` : ''}`}
                                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
