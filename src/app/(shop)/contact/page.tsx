'use client'

import { useState } from 'react'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate form submission
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 5000)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-serif font-bold text-maroon-900 mb-4">Contact Us</h1>
                <p className="text-lg text-gray-600">We’d love to help you pick your next saree.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="bg-cream-50 p-8 rounded-xl border border-cream-200">
                    <h2 className="text-2xl font-bold text-maroon-800 mb-6">Get in Touch</h2>
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-maroon-100 text-maroon-800">
                                    <EnvelopeIcon className="h-5 w-5" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                                <p className="mt-1 text-gray-600">support@gtsilks.com</p>
                                <p className="text-sm text-gray-500">We reply within 24 hours</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-maroon-100 text-maroon-800">
                                    <PhoneIcon className="h-5 w-5" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">Phone / WhatsApp</h3>
                                <p className="mt-1 text-gray-600">+91 98765 43210</p>
                                <p className="text-sm text-gray-500">Mon-Sat, 10am - 7pm</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-maroon-100 text-maroon-800">
                                    <MapPinIcon className="h-5 w-5" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">Store Address</h3>
                                <p className="mt-1 text-gray-600">
                                    GT Silks,<br />
                                    Weavers Colony, Dharmavaram,<br />
                                    Andhra Pradesh - 515671
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                    <h2 className="text-2xl font-bold text-maroon-800 mb-6">Send us a Message</h2>
                    {submitted ? (
                        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg text-center">
                            <p className="font-medium">Thank you for contacting us!</p>
                            <p className="text-sm mt-1">We will get back to you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-maroon-500 focus:ring-maroon-500 sm:text-sm p-2 border"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-maroon-500 focus:ring-maroon-500 sm:text-sm p-2 border"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone (Optional)</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-maroon-500 focus:ring-maroon-500 sm:text-sm p-2 border"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-maroon-500 focus:ring-maroon-500 sm:text-sm p-2 border"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-maroon-800 text-white py-2 px-4 rounded-md hover:bg-maroon-700 transition-colors font-medium shadow-sm"
                            >
                                Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
