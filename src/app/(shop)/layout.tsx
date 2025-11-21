import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingCart from '@/components/FloatingCart'
import FloatingWishlist from '@/components/FloatingWishlist'

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-cream-50">
                {children}
            </main>
            <Footer />
            {/* Floating cart button and popup - appears on all shop pages */}
            <FloatingCart />
            {/* Floating wishlist button and popup - appears on all shop pages */}
            <FloatingWishlist />
        </div>
    )
}
