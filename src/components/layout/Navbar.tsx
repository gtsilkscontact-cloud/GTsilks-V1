'use client'

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const { cartCount } = useCart()
    const [user, setUser] = useState<any>(null)
    const [isScrolled, setIsScrolled] = useState(false)

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

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white shadow-lg'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className={`text-3xl font-serif font-bold transition-colors ${isScrolled ? 'text-maroon-800 hover:text-maroon-700' : 'text-gold-400 hover:text-gold-300'
                            }`}>
                            GT Silks
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className={`transition-colors font-medium ${isScrolled ? 'text-gray-700 hover:text-maroon-700' : 'text-cream-50 hover:text-gold-300'
                            }`}>
                            Home
                        </Link>
                        <Link href="/sarees" className={`transition-colors font-medium ${isScrolled ? 'text-gray-700 hover:text-maroon-700' : 'text-cream-50 hover:text-gold-300'
                            }`}>
                            Shop All
                        </Link>
                        <Link href="/about" className={`transition-colors font-medium ${isScrolled ? 'text-gray-700 hover:text-maroon-700' : 'text-cream-50 hover:text-gold-300'
                            }`}>
                            About
                        </Link>
                        <Link href="/cart" className={`transition-colors font-medium relative ${isScrolled ? 'text-gray-700 hover:text-maroon-700' : 'text-cream-50 hover:text-gold-300'
                            }`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gold-600 text-maroon-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        {user ? (
                            <Link href="/profile" className="bg-gold-600 text-maroon-900 px-4 py-2 rounded-lg font-semibold hover:bg-gold-500 transition-colors flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Profile
                            </Link>
                        ) : (
                            <Link href="/login" className="bg-gold-600 text-maroon-900 px-4 py-2 rounded-lg font-semibold hover:bg-gold-500 transition-colors">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <Link href="/cart" className={`relative ${isScrolled ? 'text-gray-700' : 'text-cream-50'
                            }`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gold-600 text-maroon-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        {user ? (
                            <Link href="/profile" className={isScrolled ? 'text-gray-700' : 'text-cream-50'}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </Link>
                        ) : (
                            <Link href="/login" className={`font-semibold ${isScrolled ? 'text-maroon-800' : 'text-gold-300'
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
