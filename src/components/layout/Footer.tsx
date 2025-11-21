import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-maroon-900 text-cream-100 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-gold-500 mb-4">GT Silks</h3>
                        <p className="text-cream-200 text-sm">
                            Finest Pattu & Signature Sarees from Every State
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gold-400 mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/sarees" className="hover:text-gold-400 transition-colors">All Sarees</Link></li>
                            <li><Link href="/sarees?type=Kanchipuram" className="hover:text-gold-400 transition-colors">Kanchipuram</Link></li>
                            <li><Link href="/sarees?type=Banarasi" className="hover:text-gold-400 transition-colors">Banarasi</Link></li>
                            <li><Link href="/sarees?type=Dharmavaram" className="hover:text-gold-400 transition-colors">Dharmavaram</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gold-400 mb-4">Customer Service</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-gold-400 transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-gold-400 transition-colors">Shipping Info</Link></li>
                            <li><Link href="#" className="hover:text-gold-400 transition-colors">Returns</Link></li>
                            <li><Link href="#" className="hover:text-gold-400 transition-colors">FAQs</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gold-400 mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm text-cream-200">
                            <li>Email: info@gtsilks.com</li>
                            <li>Phone: +91 12345 67890</li>
                            <li>Dharmavaram, Andhra Pradesh</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-maroon-700 mt-8 pt-8 text-center text-sm text-cream-300">
                    <p>&copy; {new Date().getFullYear()} GT Silks. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
