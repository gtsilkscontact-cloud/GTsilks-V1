'use client'

import { logout } from '../../(auth)/auth/actions'
import { useState } from 'react'

export default function LogoutButton() {
    const [loading, setLoading] = useState(false)

    async function handleLogout() {
        setLoading(true)
        try {
            await logout()
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
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Logging out...' : 'Logout'}
            </button>
        </form>
    )
}
