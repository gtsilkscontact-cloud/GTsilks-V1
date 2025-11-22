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

    // Always show white background on scroll, otherwise transparent
    const shouldShowWhiteBg = isScrolled

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

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
                        <Link href="/" className={`text-2xl md:text-3xl font-serif font-bold transition-all duration-300 hover:scale-105 ${shouldShowWhiteBg ? 'text-maroon-800 hover:text-maroon-700 hover:shadow-[0_0_20px_rgba(139,26,26,0.3)]' : 'text-gold-600 hover:text-gold-700 hover:shadow-[0_0_20px_rgba(212,160,23,0.3)]'
                            } px-2 md:px-4 py-2 rounded-lg`}>
                            GT Silks
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
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
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`p-2 rounded-md ${shouldShowWhiteBg ? 'text-maroon-800' : 'text-gold-600'}`}
                        >
                            <span className="sr-only">Open menu</span>
                            {isMobileMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-maroon-800 hover:bg-maroon-50">
                            Home
                        </Link>
                        <Link href="/sarees" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-maroon-800 hover:bg-maroon-50">
                            Shop All
                        </Link>
                        <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-maroon-800 hover:bg-maroon-50">
                            About
                        </Link>
                        <div className="pt-4 border-t border-gray-100">
                            {user ? (
                                <Link href="/profile" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-maroon-800 hover:bg-maroon-50">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Profile
                                </Link>
                            ) : (
                                <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-maroon-800 bg-gold-100 hover:bg-gold-200 text-center">
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
