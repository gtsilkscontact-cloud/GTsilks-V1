import React from 'react'
import Link from 'next/link'

type ButtonProps = {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    className?: string
    href?: string
    onClick?: () => void
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    fullWidth?: boolean
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    href,
    onClick,
    disabled = false,
    type = 'button',
    fullWidth = false
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
        primary: 'bg-maroon-600 text-white hover:bg-maroon-700 focus:ring-maroon-500 hover:shadow-[0_0_20px_rgba(139,26,26,0.6)] hover:scale-105',
        secondary: 'bg-gold-600 text-maroon-950 hover:bg-gold-500 focus:ring-gold-500 hover:shadow-[0_0_20px_rgba(212,160,23,0.6)] hover:scale-105',
        outline: 'border-2 border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-maroon-950 focus:ring-gold-500 hover:shadow-[0_0_20px_rgba(212,160,23,0.4)] hover:scale-105',
        ghost: 'text-gray-700 hover:text-maroon-700 hover:bg-maroon-50'
    }

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    }

    const widthStyles = fullWidth ? 'w-full' : ''

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyles} ${className}`

    if (href) {
        // @ts-ignore - Next.js Link doesn't perfectly match standard anchor props in all versions but this is safe
        return (
            <Link href={href} className={combinedClassName}>
                {children}
            </Link>
        )
    }

    return (
        <button
            type={type}
            className={combinedClassName}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
