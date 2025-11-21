import Link from 'next/link'

export default async function OrderSuccessPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900">Order Placed Successfully!</h2>
            <p className="mt-2 text-lg text-gray-500">
                Thank you for shopping with GT Silks. Your order ID is <span className="font-mono font-bold text-gray-900">{id}</span>.
            </p>
            <p className="mt-1 text-gray-500">
                We will contact you shortly to confirm your order.
            </p>
            <div className="mt-8">
                <Link href="/sarees" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700">
                    Continue Shopping
                </Link>
            </div>
        </div>
    )
}
