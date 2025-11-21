'use client'

import { deleteSaree } from './actions'

export default function DeleteSareeButton({ id }: { id: string }) {
    return (
        <form action={deleteSaree.bind(null, id)} className="inline">
            <button
                type="submit"
                className="text-red-600 hover:text-red-900"
                onClick={(e) => {
                    if (!confirm('Are you sure you want to delete this saree?')) {
                        e.preventDefault()
                    }
                }}
            >
                Delete
            </button>
        </form>
    )
}
