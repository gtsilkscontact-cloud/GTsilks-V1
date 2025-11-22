import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingCart from '@/components/FloatingCart'
import FloatingWishlist from '@/components/FloatingWishlist'
import MainContent from '@/components/layout/MainContent'

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <MainContent>
                {children}
            </MainContent>
            <Footer />
            {/* Floating cart button and popup - appears on all shop pages */}
            <FloatingCart />
            {/* Floating wishlist button and popup - appears on all shop pages */}
            <FloatingWishlist />
        </div>
    )
}
