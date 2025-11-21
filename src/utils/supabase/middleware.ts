import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Allow access to login page
        if (request.nextUrl.pathname === '/admin/login') {
            if (user) {
                // If already logged in, check if admin
                const { data: admin } = await supabase
                    .from('admins')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                if (admin) {
                    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
                }
            }
            return supabaseResponse
        }

        if (!user) {
            // If not logged in, redirect to login
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        // Check if user is an admin
        const { data: admin } = await supabase
            .from('admins')
            .select('*')
            .eq('id', user.id)
            .single()

        if (!admin) {
            // If not admin, redirect to home or show unauthorized
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return supabaseResponse
}
