export default function AboutPage() {
    return (
        <div className="bg-cream-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-700 text-cream-50 py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-serif font-bold text-gold-400 mb-4">About GT Silks</h1>
                    <p className="text-xl text-cream-100">
                        Preserving Tradition, Celebrating Elegance
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                    <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-6">Our Story</h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p>
                            GT Silks was founded with a passion for preserving the rich heritage of Indian silk sarees.
                            For generations, silk sarees have been an integral part of Indian culture, representing elegance,
                            tradition, and craftsmanship.
                        </p>
                        <p>
                            We work directly with master weavers from across India - from the looms of Kanchipuram in Tamil Nadu
                            to the silk centers of Dharmavaram in Andhra Pradesh, and the ancient weaving traditions of Banarasi
                            in Uttar Pradesh. Each saree in our collection tells a story of skilled artisanship passed down through
                            generations.
                        </p>
                        <p>
                            Our mission is to bring these exquisite handwoven silk sarees directly to you, ensuring that every
                            piece meets the highest standards of quality and authenticity.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="bg-white py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-12 text-center">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-gold-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-maroon-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif font-semibold text-maroon-900 mb-2">Authenticity</h3>
                            <p className="text-gray-600">
                                Every saree is sourced directly from authentic weavers, ensuring genuine handwoven quality.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-gold-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-maroon-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif font-semibold text-maroon-900 mb-2">Fair Trade</h3>
                            <p className="text-gray-600">
                                We ensure fair compensation for artisans, supporting their craft and livelihood.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-gold-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-maroon-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif font-semibold text-maroon-900 mb-2">Quality</h3>
                            <p className="text-gray-600">
                                Each saree undergoes rigorous quality checks to meet our exacting standards.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                    <h2 className="text-3xl font-serif font-bold text-maroon-900 mb-6">Get in Touch</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-maroon-800 mb-3">Contact Information</h3>
                            <div className="space-y-3 text-gray-700">
                                <p className="flex items-center">
                                    <svg className="w-5 h-5 mr-3 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    info@gtsilks.com
                                </p>
                                <p className="flex items-center">
                                    <svg className="w-5 h-5 mr-3 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    +91 12345 67890
                                </p>
                                <p className="flex items-start">
                                    <svg className="w-5 h-5 mr-3 text-gold-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>
                                        GT Silks<br />
                                        Dharmavaram, Andhra Pradesh<br />
                                        India - 515671
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-maroon-800 mb-3">Business Hours</h3>
                            <div className="space-y-2 text-gray-700">
                                <p>Monday - Saturday: 10:00 AM - 7:00 PM</p>
                                <p>Sunday: Closed</p>
                            </div>
                            <div className="mt-6">
                                <h3 className="font-semibold text-maroon-800 mb-3">Follow Us</h3>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-maroon-800 hover:text-gold-600 transition-colors">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-maroon-800 hover:text-gold-600 transition-colors">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
