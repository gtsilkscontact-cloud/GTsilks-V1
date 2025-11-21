'use client'

import { adminLogout } from './actions'
import { useState } from 'react'

export default function AdminLogoutButton() {
    const [loading, setLoading] = useState(false)

    async function handleLogout() {
        setLoading(true)
        try {
            await adminLogout()
        } catch (error) {
            console.error('Logout error:', error)
            setLoading(false)
        }
    }

    return (
        <form action={handleLogout}>
            <button
                type="submit"
                disabled={loading}
                className="flex items-center text-gray-700 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>{loading ? 'Logging out...' : 'Logout'}</span>
            </button>
        </form>
    )
}
