import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import AnimatedHero from '@/components/AnimatedHero'
import ProductCard from '@/components/ProductCard'
import TrustStrip from '@/components/ui/TrustStrip'

export default async function Home() {
  const supabase = await createClient()

  const { data: sarees, error } = await supabase
    .from('sarees')
    .select('*, saree_images(image_url)')
    .eq('is_active', true)
    .eq('is_featured', true)
    .limit(8)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching sarees:', error)
  }

  return (
    <div>
      {/* Hero Section */}
      <AnimatedHero />

      {/* Trust Strip */}
      <TrustStrip />

      {/* Featured Sarees */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-maroon-900 mb-4">Handpicked for You</h2>
          <p className="text-lg text-gray-600">Curated collection of our finest silk sarees</p>
        </div>

        {sarees && sarees.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {sarees.map((saree) => (
              <ProductCard key={saree.id} saree={saree} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No sarees available at the moment.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/sarees"
            className="inline-block bg-maroon-800 text-cream-50 px-8 py-3 rounded-lg font-semibold hover:bg-maroon-700 transition-colors"
          >
            View All Sarees
          </Link>
        </div>
      </section>
    </div>
  )
}
