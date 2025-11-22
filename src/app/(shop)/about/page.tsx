import Image from 'next/image'

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-serif font-bold text-maroon-900 mb-4">Our Story</h1>
                <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                <div className="prose prose-lg text-gray-700">
                    <p className="mb-4">
                        GT Silks (Gayathri Silks) was born from a deep love for the timeless elegance of Indian handlooms. Growing up in South India, the rustle of a Kanchipuram silk saree was not just a sound—it was a feeling of celebration, tradition, and grace.
                    </p>
                    <p>
                        We started with a simple mission: to bring the finest authentic silk sarees from the weavers' looms directly to your wardrobe. We believe that every saree tells a story, and we want to help you find the one that speaks to yours.
                    </p>
                </div>
                <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                        src="/images/brand-story.png"
                        alt="GT Silks Weaving Tradition"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 to-transparent flex items-end p-8">
                        <p className="text-gold-100 text-lg font-medium italic">
                            "Every thread tells a story of tradition, woven with love and dedication."
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 mb-16 border border-cream-200">
                <h2 className="text-2xl font-serif font-bold text-maroon-800 mb-6 text-center">What Makes GT Silks Different</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="text-gold-600 text-4xl mb-2">✦</div>
                        <h3 className="font-bold text-lg mb-2">Curated Selection</h3>
                        <p className="text-sm text-gray-600">We don't just sell sarees; we curate masterpieces. Each piece is handpicked for its unique design and quality.</p>
                    </div>
                    <div className="text-center">
                        <div className="text-gold-600 text-4xl mb-2">✦</div>
                        <h3 className="font-bold text-lg mb-2">Authenticity Guaranteed</h3>
                        <p className="text-sm text-gray-600">We source directly from trusted weaving clusters. When we say Silk, we mean 100% Pure Silk.</p>
                    </div>
                    <div className="text-center">
                        <div className="text-gold-600 text-4xl mb-2">✦</div>
                        <h3 className="font-bold text-lg mb-2">Customer Happiness</h3>
                        <p className="text-sm text-gray-600">From the moment you browse to the unboxing experience, we ensure every step is delightful.</p>
                    </div>
                </div>
            </div>

            <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-serif font-bold text-maroon-800 mb-4">Our Promise to You</h2>
                <p className="text-gray-700 leading-relaxed">
                    At GT Silks, we promise transparency and quality. We understand that buying a saree online requires trust. That's why we quality check every single piece before dispatching it to you. If it's not perfect, it doesn't leave our store.
                </p>
                <p className="mt-6 font-serif text-xl text-gold-600 italic">
                    "Weaving traditions into your life."
                </p>
            </div>
        </div>
    )
}
