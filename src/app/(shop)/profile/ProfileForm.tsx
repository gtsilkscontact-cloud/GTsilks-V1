'use client'

import { updateProfile } from '../../(auth)/auth/actions'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import EditableField from '@/components/ui/EditableField'

export default function ProfileForm({ profile }: { profile: any }) {
    const router = useRouter()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSave = async (fieldName: string, value: string) => {
        const formData = new FormData()
        formData.append('fullName', fieldName === 'fullName' ? value : profile?.full_name || '')
        formData.append('phone', fieldName === 'phone' ? value : profile?.phone || '')
        formData.append('address', fieldName === 'address' ? value : profile?.address || '')
        formData.append('city', fieldName === 'city' ? value : profile?.city || '')
        formData.append('state', fieldName === 'state' ? value : profile?.state || '')
        formData.append('pincode', fieldName === 'pincode' ? value : profile?.pincode || '')

        const result = await updateProfile(formData)
        if (result?.error) {
            setError(result.error)
        } else {
            setSuccess(true)
            router.refresh() // Reload the page to show updated data
        }
        setTimeout(() => setSuccess(false), 3000)
    }

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

            <EditableField
                label="Full Name"
                name="fullName"
                value={profile?.full_name || ''}
                onSave={handleSave}
            />

            <EditableField
                label="Phone"
                name="phone"
                value={profile?.phone || ''}
                type="tel"
                onSave={handleSave}
            />

            <EditableField
                label="Address"
                name="address"
                value={profile?.address || ''}
                isTextArea
                onSave={handleSave}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <EditableField
                    label="City"
                    name="city"
                    value={profile?.city || ''}
                    onSave={handleSave}
                />
                <EditableField
                    label="State"
                    name="state"
                    value={profile?.state || ''}
                    onSave={handleSave}
                />
                <EditableField
                    label="Pincode"
                    name="pincode"
                    value={profile?.pincode || ''}
                    onSave={handleSave}
                />
            </div>
        </div>
    )
}
