'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Map } from 'lucide-react'

export default function AdminMapPage() {
    const [states, setStates] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStates()
    }, [])

    const fetchStates = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('map_states')
            .select('*')
            .order('name')

        if (error) {
            console.error('Error fetching states:', error)
        } else {
            setStates(data || [])
        }
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this state?')) return

        const supabase = createClient()
        const { error } = await supabase
            .from('map_states')
            .delete()
            .eq('id', id)

        if (error) {
            alert('Error deleting state')
        } else {
            fetchStates()
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <Map className="w-8 h-8" />
                    Interactive Map
                </h1>
                <Link
                    href="/admin/map/new"
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add State
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-600">State Name</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Code</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Saree Type</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        Loading states...
                                    </td>
                                </tr>
                            ) : states.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        No states found. Add one to get started.
                                    </td>
                                </tr>
                            ) : (
                                states.map((state) => (
                                    <tr key={state.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{state.name}</td>
                                        <td className="px-6 py-4 text-gray-600">{state.state_code}</td>
                                        <td className="px-6 py-4 text-gray-600">{state.saree_type}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={`/admin/map/${state.id}`}
                                                    className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(state.id)}
                                                    className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
