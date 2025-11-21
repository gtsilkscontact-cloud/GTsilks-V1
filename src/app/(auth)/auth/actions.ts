'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Email and password are required' }
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string
    const phone = formData.get('phone') as string
    const address = formData.get('address') as string
    const city = formData.get('city') as string
    const state = formData.get('state') as string
    const pincode = formData.get('pincode') as string

    // Validate required fields
    if (!email || !password || !fullName || !phone) {
        return { error: 'Please fill in all required fields' }
    }

    if (password.length < 6) {
        return { error: 'Password must be at least 6 characters long' }
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    })

    if (authError) {
        return { error: authError.message }
    }

    if (authData.user) {
        // Create user profile
        const { error: profileError } = await supabase
            .from('users')
            .insert({
                id: authData.user.id,
                email,
                full_name: fullName,
                phone,
                address,
                city,
                state,
                pincode,
            })

        if (profileError) {
            // If profile creation fails, we should ideally delete the auth user
            // but for now just return an error
            return { error: 'Failed to create user profile. Please contact support.' }
        }
    }

    revalidatePath('/', 'layout')
    redirect('/login?message=Account created! Please login.')
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/')
}

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const fullName = formData.get('fullName') as string
    const phone = formData.get('phone') as string
    const address = formData.get('address') as string
    const city = formData.get('city') as string
    const state = formData.get('state') as string
    const pincode = formData.get('pincode') as string

    const { error } = await supabase
        .from('users')
        .update({
            full_name: fullName,
            phone,
            address,
            city,
            state,
            pincode,
        })
        .eq('id', user.id)

    if (error) {
        return { error: 'Failed to update profile' }
    }

    revalidatePath('/profile')
    return { success: true }
}
