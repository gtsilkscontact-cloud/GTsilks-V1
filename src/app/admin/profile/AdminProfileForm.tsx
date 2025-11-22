'use client'

import { updateAdminProfile } from './actions'
import { useState } from 'react'
import EditableField from '@/components/ui/EditableField'

export default function AdminProfileForm({ profile }: { profile: any }) {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    return (
        <div className="space-y-6">
            {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                    {error}
                </div>
            )}
            {success && (
                <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
                    Profile updated successfully!
                </div>
            )}

            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</label>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-500 text-sm">
                    {profile?.email || ''}
                    <span className="ml-2 text-xs text-gray-400 italic">(Cannot be changed)</span>
                </div>
            </div>

            <EditableField
                label="Full Name"
                name="fullName"
                value={profile?.full_name || ''}
                onSave={async (name, value) => {
                    const formData = new FormData()
                    formData.append('fullName', value)
                    formData.append('phone', profile?.phone || '')

                    const result = await updateAdminProfile(formData)
                    if (result?.error) setError(result.error)
                    else setSuccess(true)
                    setTimeout(() => setSuccess(false), 3000)
                }}
            />

            <EditableField
                label="Phone"
                name="phone"
                value={profile?.phone || ''}
                type="tel"
                onSave={async (name, value) => {
                    const formData = new FormData()
                    formData.append('fullName', profile?.full_name || '')
                    formData.append('phone', value)

                    const result = await updateAdminProfile(formData)
                    if (result?.error) setError(result.error)
                    else setSuccess(true)
                    setTimeout(() => setSuccess(false), 3000)
                }}
            />

            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Role</label>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-500 text-sm">
                    {profile?.role || 'Admin'}
                    <span className="ml-2 text-xs text-gray-400 italic">(Read-only)</span>
                </div>
            </div>
        </div>
    )
}
