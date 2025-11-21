import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AddToCartButton from './AddToCartButton'

export default async function SareeDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const supabase = await createClient()

    const { data: saree, error } = await supabase
        .from('sarees')
        .select('*, saree_images(*)')
        .eq('id', id)
        .single()

    if (error || !saree) {
        notFound()
    }

    // Sort images so primary is first
    const images = saree.saree_images?.sort((a: any, b: any) => (b.is_primary ? 1 : -1)) || []
    const primaryImage = images.find((img: any) => img.is_primary)?.image_url || images[0]?.image_url

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                {/* Image Gallery */}
                <div className="flex flex-col-reverse">
                    <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                        <div className="grid grid-cols-4 gap-6">
                            {images.map((image: any) => (
                                <div key={image.id} className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50">
                                    <img src={image.image_url} alt="" className="w-full h-full object-center object-cover rounded-md" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full aspect-w-1 aspect-h-1">
                        {primaryImage ? (
                            <img
                                src={primaryImage}
                                alt={saree.name}
                                className="w-full h-full object-center object-cover sm:rounded-lg"
                            />
                        ) : (
                            <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
                                No Image Available
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{saree.name}</h1>

                    <div className="mt-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl text-gray-900">₹{saree.price}</p>
                        {saree.mrp > saree.price && (
                            <p className="text-lg text-gray-500 line-through">MRP: ₹{saree.mrp}</p>
                        )}
                    </div>

                    <div className="mt-6">
                        <h3 className="sr-only">Description</h3>
                        <div className="text-base text-gray-700 space-y-6">
                            <p>{saree.description}</p>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-200 pt-8">
                        <h3 className="text-sm font-medium text-gray-900">Details</h3>
                        <div className="mt-4 prose prose-sm text-gray-500">
                            <ul role="list" className="list-disc space-y-2 pl-4">
                                <li><strong>Type:</strong> {saree.type}</li>
                                <li><strong>State:</strong> {saree.state || 'N/A'}</li>
                                <li><strong>Fabric:</strong> {saree.fabric || 'Silk'}</li>
                                <li><strong>Occasion:</strong> {saree.occasion || 'Festive'}</li>
                                <li><strong>Stock:</strong> {saree.stock_quantity > 0 ? `${saree.stock_quantity} in stock` : 'Out of stock'}</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-10 flex sm:flex-col1">
                        <AddToCartButton saree={saree} />
                    </div>
                </div>
            </div>
        </div>
    )
}
