import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function ShippingPage() {
    const supabase = await createClient()
    const { data: page } = await supabase
        .from('site_pages')
        .select('*')
        .eq('slug', 'shipping')
        .single()

    return (
        <div className="min-h-screen bg-cream-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/" className="inline-flex items-center text-maroon-600 hover:text-maroon-800 mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                <div className="bg-white rounded-lg shadow-sm p-8">
                    <h1 className="text-4xl font-serif font-bold text-maroon-900 mb-6">
                        {page?.title || 'Shipping & Delivery'}
                    </h1>

                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        {page?.content ? (
                            <div dangerouslySetInnerHTML={{ __html: page.content }} />
                        ) : (
                            <div className="space-y-4">
                                <p>We are currently updating our shipping and delivery information.</p>
                                <p>For any queries, please <Link href="/contact" className="text-maroon-600 hover:underline">contact us</Link>.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
