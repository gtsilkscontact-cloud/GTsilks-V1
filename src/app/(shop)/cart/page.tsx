'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart()

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
                <p className="text-gray-500 mb-8">Looks like you haven't added any sarees yet.</p>
                <Link href="/sarees" className="inline-block bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700">
                    Start Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul role="list" className="divide-y divide-gray-200">
                    {cart.map((item) => (
                        <li key={item.id} className="px-4 py-4 sm:px-6 flex items-center">
                            <div className="flex-shrink-0 h-24 w-24 border border-gray-200 rounded-md overflow-hidden">
                                {item.image ? (
                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                                ) : (
                                    <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400">No Img</div>
                                )}
                            </div>

                            <div className="ml-6 flex-1 flex flex-col">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                        <Link href={`/sarees/${item.id}`}>{item.name}</Link>
                                    </h3>
                                    <p className="ml-4">₹{item.price * item.quantity}</p>
                                </div>

                                <div className="flex-1 flex items-end justify-between text-sm">
                                    <div className="flex items-center border rounded">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-3 py-1 hover:bg-gray-100"
                                        >
                                            -
                                        </button>
                                        <span className="px-3 py-1 border-l border-r">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-3 py-1 hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="flex">
                                        <button
                                            type="button"
                                            onClick={() => removeFromCart(item.id)}
                                            className="font-medium text-pink-600 hover:text-pink-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>₹{cartTotal}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                        <Link
                            href="/checkout"
                            className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-pink-600 hover:bg-pink-700"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                        <p>
                            or{' '}
                            <Link href="/sarees" className="text-pink-600 font-medium hover:text-pink-500">
                                Continue Shopping<span aria-hidden="true"> &rarr;</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
