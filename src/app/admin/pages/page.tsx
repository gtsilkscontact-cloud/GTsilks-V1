'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText, Edit } from 'lucide-react'

export default function AdminPagesList() {
    const [pages, setPages] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPages()
    }, [])

    const fetchPages = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('site_pages')
            .select('*')
            .order('title')

        if (error) {
            console.error('Error fetching pages:', error)
        } else {
            setPages(data || [])
        }
        setLoading(false)
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <FileText className="w-8 h-8" />
                    Pages & Policies
                </h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-600">Page Title</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Slug</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Last Updated</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    Loading pages...
                                </td>
                            </tr>
                        ) : pages.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    No pages found.
                                </td>
                            </tr>
                        ) : (
                            pages.map((page) => (
                                <tr key={page.slug} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{page.title}</td>
                                    <td className="px-6 py-4 text-gray-600">/{page.slug}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {new Date(page.updated_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            href={`/admin/pages/${page.slug}`}
                                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
                                        >
                                            <Edit className="w-4 h-4" /> Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
