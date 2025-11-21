'use client'

import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Button from '../ui/Button';

export default function Navbar() {
    const [user, setUser] = useState<any>(null)
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const supabase = createClient()

        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Always show white background on About page
    const shouldShowWhiteBg = isScrolled || pathname === '/about'

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${shouldShowWhiteBg
                ? 'bg-white shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className={`text-3xl font-serif font-bold transition-all duration-300 hover:scale-105 ${shouldShowWhiteBg ? 'text-maroon-800 hover:text-maroon-700 hover:shadow-[0_0_20px_rgba(139,26,26,0.3)]' : 'text-gold-600 hover:text-gold-700 hover:shadow-[0_0_20px_rgba(212,160,23,0.3)]'
                            } px-4 py-2 rounded-lg`}>
                            GT Silks
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className={`transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:scale-105 ${shouldShowWhiteBg ? 'text-gray-700 hover:text-maroon-700 hover:bg-maroon-50 hover:shadow-[0_0_15px_rgba(139,26,26,0.2)]' : 'text-maroon-800 hover:text-maroon-900 hover:bg-maroon-50 hover:shadow-[0_0_15px_rgba(139,26,26,0.2)]'
                            }`}>
                            Home
                        </Link>
                        <Link href="/sarees" className={`transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:scale-105 ${shouldShowWhiteBg ? 'text-gray-700 hover:text-maroon-700 hover:bg-maroon-50 hover:shadow-[0_0_15px_rgba(139,26,26,0.2)]' : 'text-maroon-800 hover:text-maroon-900 hover:bg-maroon-50 hover:shadow-[0_0_15px_rgba(139,26,26,0.2)]'
                            }`}>
                            Shop All
                        </Link>
                        <Link href="/about" className={`transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:scale-105 ${shouldShowWhiteBg ? 'text-gray-700 hover:text-maroon-700 hover:bg-maroon-50 hover:shadow-[0_0_15px_rgba(139,26,26,0.2)]' : 'text-maroon-800 hover:text-maroon-900 hover:bg-maroon-50 hover:shadow-[0_0_15px_rgba(139,26,26,0.2)]'
                            }`}>
                            About
                        </Link>
                        {user ? (
                            <Button href="/profile" variant="secondary" className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Profile
                            </Button>
                        ) : (
                            <Button href="/login" variant="secondary">
                                Login
                            </Button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        {user ? (
                            <Link href="/profile" className={shouldShowWhiteBg ? 'text-gray-700' : 'text-maroon-800'}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </Link>
                        ) : (
                            <Link href="/login" className={`font-semibold ${shouldShowWhiteBg ? 'text-maroon-800' : 'text-gold-600'
                                }`}>
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
