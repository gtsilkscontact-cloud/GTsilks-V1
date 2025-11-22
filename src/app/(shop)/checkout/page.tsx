'use client'

import { useCart } from '@/context/CartContext'
import { placeOrder } from './actions'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import { createClient } from '@/utils/supabase/client'

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart()
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loadingProfile, setLoadingProfile] = useState(true)
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        pincode: ''
    })

    useEffect(() => {
        async function loadProfile() {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const { data: profile } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                if (profile) {
                    setFormData({
                        customer_name: profile.full_name || '',
                        customer_email: user.email || '',
                        customer_phone: profile.phone || '',
                        address_line1: profile.address || '',
                        address_line2: '',
                        city: profile.city || '',
                        state: profile.state || '',
                        pincode: profile.pincode || ''
                    })
                } else {
                    // If no profile but user exists, at least fill email
                    setFormData(prev => ({ ...prev, customer_email: user.email || '' }))
                }
            }
            setLoadingProfile(false)
        }
        loadProfile()
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
                <p className="text-gray-500">Please add items to your cart before checking out.</p>
            </div>
        )
    }

    async function handleSubmit(formDataObj: FormData) {
        setIsSubmitting(true)
        setError(null)

        const result = await placeOrder(formDataObj, cart)

        if (result.success) {
            clearCart()
            router.push(`/order-success/${result.orderId}`)
        } else {
            setError(result.message || 'Something went wrong')
            setIsSubmitting(false)
        }
    }

    if (loadingProfile) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <p className="text-gray-500">Loading checkout details...</p>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                <div>
                    <h2 className="text-lg font-medium text-gray-900">Contact Information</h2>
                    <form action={handleSubmit} className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div className="sm:col-span-2">
                            <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="customer_name"
                                id="customer_name"
                                required
                                value={formData.customer_name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-maroon-500 focus:border-maroon-500 border p-2"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="customer_email"
                                id="customer_email"
                                required
                                value={formData.customer_email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-maroon-500 focus:border-maroon-500 border p-2"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="customer_phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                name="customer_phone"
                                id="customer_phone"
                                required
                                value={formData.customer_phone}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-maroon-500 focus:border-maroon-500 border p-2"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="address_line1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
                            <input
                                type="text"
                                name="address_line1"
                                id="address_line1"
                                required
                                value={formData.address_line1}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-maroon-500 focus:border-maroon-500 border p-2"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="address_line2" className="block text-sm font-medium text-gray-700">Address Line 2</label>
                            <input
                                type="text"
                                name="address_line2"
                                id="address_line2"
                                value={formData.address_line2}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-maroon-500 focus:border-maroon-500 border p-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                required
                                value={formData.city}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-maroon-500 focus:border-maroon-500 border p-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                            <input
                                type="text"
                                name="state"
                                id="state"
                                required
                                value={formData.state}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-maroon-500 focus:border-maroon-500 border p-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                id="pincode"
                                required
                                value={formData.pincode}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-maroon-500 focus:border-maroon-500 border p-2"
                            />
                        </div>

                        <div className="sm:col-span-2 pt-4">
                            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                fullWidth
                                className={isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}
                            >
                                {isSubmitting ? 'Placing Order...' : 'Place Order (COD)'}
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="mt-10 lg:mt-0">
                    <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                    <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <ul role="list" className="divide-y divide-gray-200">
                            {cart.map((item) => (
                                <li key={item.id} className="flex py-6 px-4 sm:px-6">
                                    <div className="flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-center object-cover" />
                                    </div>
                                    <div className="ml-6 flex-1 flex flex-col">
                                        <div className="flex">
                                            <div className="min-w-0 flex-1">
                                                <h4 className="text-sm font-medium text-gray-700 hover:text-gray-800">{item.name}</h4>
                                            </div>
                                        </div>
                                        <div className="flex-1 pt-2 flex items-end justify-between">
                                            <p className="mt-1 text-sm font-medium text-gray-900">₹{item.price} x {item.quantity}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">₹{cartTotal}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Shipping</dt>
                                <dd className="text-sm font-medium text-gray-900">
                                    {cartTotal > 5000 ? (
                                        <span className="text-green-600">Free</span>
                                    ) : (
                                        <span>₹100</span>
                                    )}
                                </dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                <dt className="text-base font-medium text-gray-900">Grand Total</dt>
                                <dd className="text-base font-medium text-gray-900">
                                    ₹{cartTotal > 5000 ? cartTotal : cartTotal + 100}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}
