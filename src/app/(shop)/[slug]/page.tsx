import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const supabase = await createClient()

    const { data: page } = await supabase
        .from('site_pages')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single()

    if (!page) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-serif font-bold text-maroon-900 mb-8">{page.title}</h1>
            <div
                className="prose prose-lg prose-headings:font-serif prose-headings:text-maroon-900 prose-a:text-maroon-700 max-w-none"
                dangerouslySetInnerHTML={{ __html: page.content || '' }}
            />
        </div>
    )
}
