import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()

  const { data: sarees, error } = await supabase
    .from('sarees')
    .select('*, saree_images(image_url)')
    .eq('is_active', true)
    .limit(8)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching sarees:', error)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-700 text-cream-50 py-32 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-400 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-gold-400 mb-6 animate-fade-in">
            GT Silks
          </h1>
          <p className="text-2xl md:text-3xl text-cream-100 mb-4 font-light">
            Finest Pattu & Signature Sarees
          </p>
          <p className="text-lg md:text-xl text-cream-200 mb-12 max-w-2xl mx-auto">
            Discover the timeless elegance of handcrafted silk sarees from every state of India
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/sarees"
              className="group relative inline-flex items-center justify-center px-10 py-4 bg-gold-600 text-maroon-900 rounded-lg text-lg font-bold overflow-hidden transition-all duration-300 hover:bg-gold-500 hover:scale-105 shadow-2xl"
            >
              <span className="relative z-10">Explore Collections</span>
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Sarees */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-maroon-900 mb-4">Featured Sarees</h2>
          <p className="text-lg text-gray-600">Handpicked collection of our finest silk sarees</p>
        </div>

        {sarees && sarees.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {sarees.map((saree) => (
              <Link key={saree.id} href={`/sarees/${saree.id}`} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-cream-300">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-cream-100 h-80 relative">
                    {saree.saree_images?.[0]?.image_url ? (
                      <img
                        src={saree.saree_images[0].image_url}
                        alt={saree.name}
                        className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-cream-50">
                    <h3 className="text-lg font-serif font-semibold text-maroon-900 mb-2 group-hover:text-gold-700 transition-colors">
                      {saree.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-bold text-maroon-800">₹{saree.price}</p>
                      <span className="text-sm text-gray-600 bg-gold-100 px-2 py-1 rounded">{saree.type}</span>
                    </div>
                  </div>
                </div>
              </Link>
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
