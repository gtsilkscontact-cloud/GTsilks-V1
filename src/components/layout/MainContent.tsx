'use client'

import { usePathname } from 'next/navigation'

export default function MainContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isHomePage = pathname === '/'

    return (
        <main className={`flex-grow bg-cream-50 ${isHomePage ? 'pt-0' : 'pt-20'}`}>
            {children}
        </main>
    )
}
