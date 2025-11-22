'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Plus, Trash } from 'lucide-react'

export default function MapStateForm({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [isNew, setIsNew] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        state_code: '',
        saree_type: '',
        description: '',
        shop_link: '',
        key_facts: ['']
    })

    // Unwrap params using React.use()
    const { id } = use(params)

    useEffect(() => {
        if (id && id !== 'new') {
            setIsNew(false)
            fetchState(id)
        }
    }, [id])

    const fetchState = async (stateId: string) => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('map_states')
            .select('*')
            .eq('id', stateId)
            .single()

        if (error) {
            console.error('Error fetching state:', error)
            alert('Error fetching state details')
        } else if (data) {
            setFormData({
                name: data.name,
                state_code: data.state_code,
                saree_type: data.saree_type,
                description: data.description || '',
                shop_link: data.shop_link || '',
                key_facts: Array.isArray(data.key_facts) && data.key_facts.length > 0 ? data.key_facts : ['']
            })
        }
    }

    const handleKeyFactChange = (index: number, value: string) => {
        const newFacts = [...formData.key_facts]
        newFacts[index] = value
        setFormData({ ...formData, key_facts: newFacts })
    }

    const addKeyFact = () => {
        setFormData({ ...formData, key_facts: [...formData.key_facts, ''] })
    }

    const removeKeyFact = (index: number) => {
        const newFacts = formData.key_facts.filter((_, i) => i !== index)
        setFormData({ ...formData, key_facts: newFacts })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const supabase = createClient()
        const dataToSave = {
            ...formData,
            key_facts: formData.key_facts.filter(f => f.trim() !== '') // Remove empty facts
        }

        let error
        if (isNew) {
            const { error: insertError } = await supabase
                .from('map_states')
                .insert([dataToSave])
            error = insertError
        } else {
            const { error: updateError } = await supabase
                .from('map_states')
                .update(dataToSave)
                .eq('id', id)
            error = updateError
        }

        if (error) {
            console.error('Error saving state:', error)
            alert('Error saving state: ' + error.message)
        } else {
            router.push('/admin/map')
            router.refresh()
        }
        setLoading(false)
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/map"
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                >
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-bold text-gray-800">
                    {isNew ? 'Add New State' : 'Edit State'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            placeholder="e.g. Tamil Nadu"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State Code</label>
                        <input
                            type="text"
                            required
                            value={formData.state_code}
                            onChange={(e) => setFormData({ ...formData, state_code: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            placeholder="e.g. TN"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Saree Type</label>
                    <input
                        type="text"
                        required
                        value={formData.saree_type}
                        onChange={(e) => setFormData({ ...formData, saree_type: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="e.g. Kanchipuram Silk"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Brief description of the saree tradition..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shop Link</label>
                    <input
                        type="text"
                        value={formData.shop_link}
                        onChange={(e) => setFormData({ ...formData, shop_link: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="e.g. /sarees?state=Tamil+Nadu"
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">Key Facts</label>
                        <button
                            type="button"
                            onClick={addKeyFact}
                            className="text-sm text-pink-600 hover:text-pink-700 flex items-center gap-1"
                        >
                            <Plus className="w-4 h-4" /> Add Fact
                        </button>
                    </div>
                    <div className="space-y-3">
                        {formData.key_facts.map((fact, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={fact}
                                    onChange={(e) => handleKeyFactChange(index, e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    placeholder="e.g. Known for pure zari work"
                                />
                                {formData.key_facts.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeKeyFact(index)}
                                        className="text-red-500 hover:text-red-700 p-2"
                                    >
                                        <Trash className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 flex items-center gap-2 disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        {loading ? 'Saving...' : 'Save State'}
                    </button>
                </div>
            </form>
        </div>
    )
}
