import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export default async function Footer() {
    const supabase = await createClient()
    const { data: settingsData } = await supabase.from('site_settings').select('*')

    const settings: Record<string, string> = {}
    if (settingsData) {
        settingsData.forEach(item => {
            settings[item.key] = item.value
        })
    }

    return (
        <footer className="bg-maroon-900 text-cream-100 mt-16 border-t-4 border-gold-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-gold-500 mb-2">GT Silks</h3>
                        <p className="text-gold-200 text-sm font-medium mb-4">
                            Finest Pattu & Signature Sarees from Every State
                        </p>
                        <p className="text-cream-200 text-sm leading-relaxed">
                            Gayathri Silks – Curated silk sarees with love from South India. We bring you the elegance of tradition woven into every thread.
                        </p>
                        <div className="flex gap-4 mt-4">
                            {settings['social_facebook'] && (
                                <a href={settings['social_facebook']} target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-white transition-colors" aria-label="Facebook">
                                    <Facebook className="w-5 h-5" />
                                </a>
                            )}
                            {settings['social_instagram'] && (
                                <a href={settings['social_instagram']} target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-white transition-colors" aria-label="Instagram">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            )}
                            {settings['social_twitter'] && (
                                <a href={settings['social_twitter']} target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-white transition-colors" aria-label="Twitter">
                                    <Twitter className="w-5 h-5" />
                                </a>
                            )}
                            {settings['social_youtube'] && (
                                <a href={settings['social_youtube']} target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-white transition-colors" aria-label="YouTube">
                                    <Youtube className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-gold-400 mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-gold-300 transition-colors">Home</Link></li>
                            <li><Link href="/sarees" className="hover:text-gold-300 transition-colors">Shop All</Link></li>
                            <li><Link href="/sarees" className="hover:text-gold-300 transition-colors">Shop by State</Link></li>
                            <li><Link href="/about" className="hover:text-gold-300 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-gold-300 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h4 className="font-semibold text-gold-400 mb-4 uppercase tracking-wider text-sm">Customer Care</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/policies/shipping" className="hover:text-gold-300 transition-colors">Shipping & Delivery</Link></li>
                            <li><Link href="/policies/returns" className="hover:text-gold-300 transition-colors">Returns & Exchanges</Link></li>
                            <li><Link href="/faq" className="hover:text-gold-300 transition-colors">FAQ</Link></li>
                            <li><Link href="/order-tracking" className="hover:text-gold-300 transition-colors">Order Tracking</Link></li>
                        </ul>
                    </div>

                    {/* Trust & Contact */}
                    <div>
                        <h4 className="font-semibold text-gold-400 mb-4 uppercase tracking-wider text-sm">Trust & Assurance</h4>
                        <ul className="space-y-2 text-sm mb-6">
                            <li className="flex items-center"><span className="text-gold-500 mr-2">✓</span> 100% Genuine Fabrics</li>
                            <li className="flex items-center"><span className="text-gold-500 mr-2">✓</span> Quality Checked</li>
                            <li className="flex items-center"><span className="text-gold-500 mr-2">✓</span> Secure Payments</li>
                        </ul>

                        <h4 className="font-semibold text-gold-400 mb-2 uppercase tracking-wider text-sm">Contact Us</h4>
                        <ul className="space-y-1 text-sm text-cream-200">
                            <li>{settings['contact_email'] || 'support@gtsilks.com'}</li>
                            <li>{settings['contact_phone'] || '+91 98765 43210'}</li>
                            <li>{settings['contact_address'] || 'Dharmavaram, Andhra Pradesh'}</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-maroon-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-cream-400">
                    <p>&copy; {new Date().getFullYear()} GT Silks. All rights reserved.</p>
                    <div className="mt-4 md:mt-0 space-x-4">
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
