'use client'

import { updateProfile } from '../../(auth)/auth/actions'
import { useState } from 'react'

export default function ProfileForm({ profile }: { profile: any }) {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError('')
        setSuccess(false)
        const result = await updateProfile(formData)
        if (result?.error) {
            setError(result.error)
        } else if (result?.success) {
            setSuccess(true)
        }
        setLoading(false)
    }

    return (
        <>
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                    {error}
                </div>
            )}
            {success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
                    Profile updated successfully!
                </div>
            )}

            <form action={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        name="fullName"
                        type="text"
                        defaultValue={profile?.full_name || ''}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                        name="phone"
                        type="tel"
                        defaultValue={profile?.phone || ''}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                        name="address"
                        defaultValue={profile?.address || ''}
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                        name="city"
                        type="text"
                        defaultValue={profile?.city || ''}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                        name="state"
                        type="text"
                        defaultValue={profile?.state || ''}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input
                        name="pincode"
                        type="text"
                        defaultValue={profile?.pincode || ''}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-maroon-800 text-cream-50 py-2 rounded-lg font-semibold hover:bg-maroon-700 transition-colors disabled:opacity-50 text-sm"
                >
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </>
    )
}
