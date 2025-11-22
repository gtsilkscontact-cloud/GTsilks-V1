'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'

export default function PageEditor({ params }: { params: Promise<{ slug: string }> }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [page, setPage] = useState<any>(null)
    const [content, setContent] = useState('')

    const { slug } = use(params)

    useEffect(() => {
        fetchPage()
    }, [slug])

    const fetchPage = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('site_pages')
            .select('*')
            .eq('slug', slug)
            .single()

        if (error) {
            console.error('Error fetching page:', error)
            alert('Page not found')
            router.push('/admin/pages')
        } else {
            setPage(data)
            setContent(data.content || '')
        }
        setLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        const supabase = createClient()
        const { error } = await supabase
            .from('site_pages')
            .update({
                content,
                updated_at: new Date().toISOString()
            })
            .eq('slug', slug)

        if (error) {
            alert('Error saving page: ' + error.message)
        } else {
            alert('Page saved successfully!')
            router.refresh()
        }
        setSaving(false)
    }

    if (loading) return <div className="p-8 text-center">Loading editor...</div>

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/pages"
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                >
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Edit Page: {page?.title}</h1>
                    <p className="text-gray-500 text-sm">/{slug}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Page Content (HTML/Text)</label>
                    <div className="text-xs text-gray-500 mb-2">
                        You can use basic HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt; etc.
                    </div>
                    <textarea
                        rows={20}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-mono text-sm"
                        placeholder="Enter page content here..."
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 flex items-center gap-2 disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {saving ? 'Saving...' : 'Save Content'}
                    </button>
                </div>
            </form>
        </div>
    )
}
