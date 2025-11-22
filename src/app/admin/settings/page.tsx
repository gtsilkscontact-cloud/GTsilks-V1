'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { Save, Settings } from 'lucide-react'

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [settings, setSettings] = useState<Record<string, string>>({})

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')

        if (error) {
            console.error('Error fetching settings:', error)
        } else if (data) {
            const settingsMap: Record<string, string> = {}
            data.forEach(item => {
                settingsMap[item.key] = item.value
            })
            setSettings(settingsMap)
        }
        setLoading(false)
    }

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        const supabase = createClient()
        const updates = Object.entries(settings).map(([key, value]) => ({
            key,
            value,
            updated_at: new Date().toISOString()
        }))

        const { error } = await supabase
            .from('site_settings')
            .upsert(updates)

        if (error) {
            alert('Error saving settings: ' + error.message)
        } else {
            alert('Settings saved successfully!')
        }
        setSaving(false)
    }

    if (loading) return <div className="p-8 text-center text-gray-500">Loading settings...</div>

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <Settings className="w-8 h-8 text-gray-700" />
                <h1 className="text-3xl font-bold text-gray-800">Site Settings</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
                        Contact Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                            <input
                                type="email"
                                value={settings['contact_email'] || ''}
                                onChange={(e) => handleChange('contact_email', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                            <input
                                type="text"
                                value={settings['contact_phone'] || ''}
                                onChange={(e) => handleChange('contact_phone', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <textarea
                                rows={3}
                                value={settings['contact_address'] || ''}
                                onChange={(e) => handleChange('contact_address', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
                        Social Media Links
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                            <input
                                type="url"
                                value={settings['social_facebook'] || ''}
                                onChange={(e) => handleChange('social_facebook', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="https://facebook.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                            <input
                                type="url"
                                value={settings['social_instagram'] || ''}
                                onChange={(e) => handleChange('social_instagram', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="https://instagram.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter/X URL</label>
                            <input
                                type="url"
                                value={settings['social_twitter'] || ''}
                                onChange={(e) => handleChange('social_twitter', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="https://twitter.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Youtube URL</label>
                            <input
                                type="url"
                                value={settings['social_youtube'] || ''}
                                onChange={(e) => handleChange('social_youtube', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="https://youtube.com/..."
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 flex items-center gap-2 disabled:opacity-50 text-lg font-medium shadow-md"
                    >
                        <Save className="w-5 h-5" />
                        {saving ? 'Saving Changes...' : 'Save All Settings'}
                    </button>
                </div>
            </form>
        </div>
    )
}
