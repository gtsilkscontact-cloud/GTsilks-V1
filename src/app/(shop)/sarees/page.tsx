'use client'

import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Filter, X } from 'lucide-react'

function SareesContent() {
    const [sarees, setSarees] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isFiltersOpen, setIsFiltersOpen] = useState(false)
    const searchParams = useSearchParams()

    const stateFilter = searchParams.get('state')
    const typeFilter = searchParams.get('type')
    const sortBy = searchParams.get('sort')

    useEffect(() => {
        const fetchSarees = async () => {
            setLoading(true)
            const supabase = createClient()
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

            const { data, error } = await query
            if (error) {
                console.error('Error fetching sarees:', error)
            } else {
                setSarees(data || [])
            }
            setLoading(false)
        }

        fetchSarees()
    }, [stateFilter, typeFilter, sortBy])

    // Get unique states and types for filters (mock or fetch if needed, for now hardcoded or derived)
    // For simplicity in this client component refactor, we'll just use the fetched sarees to derive filters if possible, 
    // or better, fetch all distinct values. 
    // To keep it simple and robust, let's fetch all active sarees to get filter options.
    const [filterOptions, setFilterOptions] = useState<{ states: string[], types: string[] }>({ states: [], types: [] })

    useEffect(() => {
        const fetchFilters = async () => {
            const supabase = createClient()
            const { data: allSarees } = await supabase
                .from('sarees')
                .select('state, type')
                .eq('is_active', true)

            if (allSarees) {
                const states = [...new Set(allSarees.map(s => s.state).filter(Boolean))] as string[]
                const types = [...new Set(allSarees.map(s => s.type).filter(Boolean))] as string[]
                setFilterOptions({ states, types })
            }
        }
        fetchFilters()
    }, [])


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pt-24 md:pt-28">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Mobile Filter Toggle */}
                <div className="md:hidden mb-4">
                    <button
                        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-maroon-200 rounded-lg text-maroon-800 font-medium shadow-sm w-full justify-center"
                    >
                        {isFiltersOpen ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
                        {isFiltersOpen ? 'Close Filters' : 'Show Filters'}
                    </button>
                </div>

                {/* Sidebar Filters */}
                <aside className={`
                    w-full md:w-64 flex-shrink-0 
                    ${isFiltersOpen ? 'block' : 'hidden'} 
                    md:block
                `}>
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24 border border-cream-200">
                        <h3 className="text-xl font-serif font-bold text-maroon-900 mb-4">Filters</h3>

                        {/* Sort By */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-maroon-800 mb-3">Sort By</h4>
                            <div className="space-y-2">
                                <Link href="/sarees" className={`block px-3 py-2 rounded text-sm ${!sortBy ? 'bg-gold-100 text-maroon-900 font-medium' : 'text-gray-600 hover:bg-cream-100'}`}>
                                    Newest
                                </Link>
                                <Link href="/sarees?sort=price-low" className={`block px-3 py-2 rounded text-sm ${sortBy === 'price-low' ? 'bg-gold-100 text-maroon-900 font-medium' : 'text-gray-600 hover:bg-cream-100'}`}>
                                    Price: Low to High
                                </Link>
                                <Link href="/sarees?sort=price-high" className={`block px-3 py-2 rounded text-sm ${sortBy === 'price-high' ? 'bg-gold-100 text-maroon-900 font-medium' : 'text-gray-600 hover:bg-cream-100'}`}>
                                    Price: High to Low
                                </Link>
                            </div>
                        </div>

                        {/* Filter by State */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-maroon-800 mb-3">By State</h4>
                            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                                <Link href="/sarees" className={`block px-3 py-2 rounded text-sm ${!stateFilter ? 'bg-gold-100 text-maroon-900 font-medium' : 'text-gray-600 hover:bg-cream-100'}`}>
                                    All States
                                </Link>
                                {filterOptions.states.map(state => (
                                    <Link
                                        key={state}
                                        href={`/sarees?state=${state}`}
                                        className={`block px-3 py-2 rounded text-sm ${stateFilter === state ? 'bg-gold-100 text-maroon-900 font-medium' : 'text-gray-600 hover:bg-cream-100'}`}
                                    >
                                        {state}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Filter by Type */}
                        <div>
                            <h4 className="font-semibold text-maroon-800 mb-3">By Type</h4>
                            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                                <Link href="/sarees" className={`block px-3 py-2 rounded text-sm ${!typeFilter ? 'bg-gold-100 text-maroon-900 font-medium' : 'text-gray-600 hover:bg-cream-100'}`}>
                                    All Types
                                </Link>
                                {filterOptions.types.map(type => (
                                    <Link
                                        key={type}
                                        href={`/sarees?type=${type}`}
                                        className={`block px-3 py-2 rounded text-sm ${typeFilter === type ? 'bg-gold-100 text-maroon-900 font-medium' : 'text-gray-600 hover:bg-cream-100'}`}
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
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-maroon-900">
                            {stateFilter ? `${stateFilter} Sarees` : typeFilter ? `${typeFilter} Sarees` : 'All Sarees'}
                        </h1>
                        <p className="text-gray-600 mt-2">{sarees.length} Products</p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-lg shadow-sm h-96 animate-pulse">
                                    <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                                    <div className="p-4 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : sarees.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {sarees.map((saree) => (
                                <ProductCard key={saree.id} saree={saree} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
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

export default function SareesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-maroon-800">Loading...</div>}>
            <SareesContent />
        </Suspense>
    )
}
