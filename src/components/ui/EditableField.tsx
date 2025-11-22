'use client'

import { useState } from 'react'
import { PencilIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'

interface EditableFieldProps {
    label: string
    name: string
    value: string
    type?: string
    isTextArea?: boolean
    onSave: (name: string, value: string) => Promise<void>
}

export default function EditableField({
    label,
    name,
    value,
    type = 'text',
    isTextArea = false,
    onSave
}: EditableFieldProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [currentValue, setCurrentValue] = useState(value)
    const [loading, setLoading] = useState(false)

    const handleSave = async () => {
        setLoading(true)
        await onSave(name, currentValue)
        setLoading(false)
        setIsEditing(false)
    }

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-pink-300 transition-colors shadow-sm">
            <div className="flex justify-between items-start mb-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-gray-400 hover:text-pink-600 transition-colors p-1 rounded-full hover:bg-pink-50"
                        title="Edit"
                    >
                        <PencilIcon className="w-4 h-4" />
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="mt-2 space-y-3">
                    {isTextArea ? (
                        <textarea
                            value={currentValue}
                            onChange={(e) => setCurrentValue(e.target.value)}
                            className="w-full p-2 border border-pink-300 rounded bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none text-gray-800 text-sm"
                            rows={3}
                        />
                    ) : (
                        <input
                            type={type}
                            value={currentValue}
                            onChange={(e) => setCurrentValue(e.target.value)}
                            className="w-full p-2 border border-pink-300 rounded bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none text-gray-800 text-sm"
                        />
                    )}
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => {
                                setIsEditing(false)
                                setCurrentValue(value)
                            }}
                            disabled={loading}
                            className="flex items-center px-3 py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
                        >
                            <XMarkIcon className="w-3 h-3 mr-1" />
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex items-center px-3 py-1 text-xs bg-pink-600 text-white hover:bg-pink-700 rounded transition-colors disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></span>
                            ) : (
                                <CheckIcon className="w-3 h-3 mr-1" />
                            )}
                            Save
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mt-1 text-gray-900 font-medium min-h-[24px] text-sm break-words">
                    {value || <span className="text-gray-400 italic">Not set</span>}
                </div>
            )}
        </div>
    )
}
