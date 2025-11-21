import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'

export default async function SareesPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const supabase = await createClient()
    const params = await searchParams
    const stateFilter = params.state as string | undefined
    const typeFilter = params.type as string | undefined
    const sortBy = params.sort as string | undefined

    let query = supabase
        .from('sarees')
        .select('*, saree_images(image_url)')
        .eq('is_active', true)

    if (stateFilter) {
        query = query.eq('state', stateFilter)
    }

    if (typeFilter) {
        query = query.eq('type', typeFilter)
    }

    // Sorting
    if (sortBy === 'price-low') {
        query = query.order('price', { ascending: true })
    } else if (sortBy === 'price-high') {
        query = query.order('price', { ascending: false })
    } else {
        query = query.order('created_at', { ascending: false })
    }

    const { data: sarees, error } = await query

    // Get unique states and types for filters
    const { data: allSarees } = await supabase
        .from('sarees')
        .select('state, type')
        .eq('is_active', true)

    const states = [...new Set(allSarees?.map(s => s.state).filter(Boolean))]
    const types = [...new Set(allSarees?.map(s => s.type).filter(Boolean))]

    if (error) {
        console.error('Error fetching sarees:', error)
        return <div className="text-center py-10 text-red-500">Error loading sarees</div>
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                        <h3 className="text-xl font-serif font-bold text-maroon-900 mb-4">Filters</h3>

                        {/* Sort By */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-maroon-800 mb-3">Sort By</h4>
                            <div className="space-y-2">
                                <Link href="/sarees" className={`block px-3 py-2 rounded ${!sortBy ? 'bg-gold-100 text-maroon-900' : 'hover:bg-cream-100'}`}>
                                    Newest
                                </Link>
                                <Link href="/sarees?sort=price-low" className={`block px-3 py-2 rounded ${sortBy === 'price-low' ? 'bg-gold-100 text-maroon-900' : 'hover:bg-cream-100'}`}>
                                    Price: Low to High
                                </Link>
                                <Link href="/sarees?sort=price-high" className={`block px-3 py-2 rounded ${sortBy === 'price-high' ? 'bg-gold-100 text-maroon-900' : 'hover:bg-cream-100'}`}>
                                    Price: High to Low
                                </Link>
                            </div>
                        </div>

                        {/* Filter by State */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-maroon-800 mb-3">By State</h4>
                            <div className="space-y-2">
                                <Link href="/sarees" className={`block px-3 py-2 rounded ${!stateFilter ? 'bg-gold-100 text-maroon-900' : 'hover:bg-cream-100'}`}>
                                    All States
                                </Link>
                                {states.map(state => (
                                    <Link
                                        key={state}
                                        href={`/sarees?state=${state}`}
                                        className={`block px-3 py-2 rounded ${stateFilter === state ? 'bg-gold-100 text-maroon-900' : 'hover:bg-cream-100'}`}
                                    >
                                        {state}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Filter by Type */}
                        <div>
                            <h4 className="font-semibold text-maroon-800 mb-3">By Type</h4>
                            <div className="space-y-2">
                                <Link href="/sarees" className={`block px-3 py-2 rounded ${!typeFilter ? 'bg-gold-100 text-maroon-900' : 'hover:bg-cream-100'}`}>
                                    All Types
                                </Link>
                                {types.map(type => (
                                    <Link
                                        key={type}
                                        href={`/sarees?type=${type}`}
                                        className={`block px-3 py-2 rounded ${typeFilter === type ? 'bg-gold-100 text-maroon-900' : 'hover:bg-cream-100'}`}
                                    >
                                        {type}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="mb-6">
                        <h1 className="text-4xl font-serif font-bold text-maroon-900">
                            {stateFilter ? `${stateFilter} Sarees` : typeFilter ? `${typeFilter} Sarees` : 'All Sarees'}
                        </h1>
                        <p className="text-gray-600 mt-2">{sarees?.length || 0} Products</p>
                    </div>

                    {sarees && sarees.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sarees.map((saree) => (
                                <ProductCard key={saree.id} saree={saree} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-500 mb-4">No sarees found matching your criteria.</p>
                            <Link href="/sarees" className="text-maroon-800 hover:text-gold-700 font-semibold">
                                Clear Filters →
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
