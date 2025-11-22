import { createClient } from '@/utils/supabase/server'
import { updateSaree } from '../../actions'
import { notFound } from 'next/navigation'
import ImageCard from './ImageCard'

export default async function EditSareePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: saree } = await supabase
        .from('sarees')
        .select('*, saree_images(*)')
        .eq('id', id)
        .single()

    if (!saree) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Saree</h1>

            {/* Image Gallery Section */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">Image Gallery</h2>

                {saree.saree_images && saree.saree_images.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                        {saree.saree_images.map((image: any) => (
                            <ImageCard key={image.id} image={image} sareeId={saree.id} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 mb-4">No images uploaded yet.</p>
                )}

                <form action={updateSaree.bind(null, saree.id)} className="border-t pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Add More Images</label>
                    <input
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                    />
                    <p className="mt-1 text-sm text-gray-500">Select multiple images to add to this saree.</p>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Upload Images
                        </button>
                    </div>
                </form>
            </div>

            {/* Saree Details Form */}
            <form action={updateSaree.bind(null, saree.id)} className="space-y-6 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Saree Details</h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" defaultValue={saree.name} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 border p-2" />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="description" rows={3} defaultValue={saree.description || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 border p-2"></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                        <input type="number" name="price" defaultValue={saree.price} required min="0" step="0.01" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 border p-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">MRP (₹)</label>
                        <input type="number" name="mrp" defaultValue={saree.mrp} required min="0" step="0.01" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 border p-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cost Price (₹) <span className="text-xs text-gray-500">(Private)</span></label>
                        <input type="number" name="cost_price" defaultValue={saree.cost_price} min="0" step="0.01" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 border p-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select name="type" defaultValue={saree.type || 'Kanchipuram'} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 border p-2">
                            <option value="Kanchipuram">Kanchipuram</option>
                            <option value="Banarasi">Banarasi</option>
                            <option value="Dharmavaram">Dharmavaram</option>
                            <option value="Cotton">Cotton</option>
                            <option value="Georgette">Georgette</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                        <input type="number" name="stock_quantity" defaultValue={saree.stock_quantity} required min="0" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 border p-2" />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="submit"
                        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                        Update Saree
                    </button>
                </div>
            </form>
        </div>
    )
}
