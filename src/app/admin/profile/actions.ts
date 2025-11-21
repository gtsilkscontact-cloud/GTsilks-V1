'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateAdminProfile(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const fullName = formData.get('fullName') as string
    const phone = formData.get('phone') as string

    if (!fullName) {
        return { error: 'Full name is required' }
    }

    const { error } = await supabase
        .from('users')
        .update({
            full_name: fullName,
            phone,
        })
        .eq('id', user.id)

    if (error) {
        return { error: 'Failed to update profile' }
    }

    revalidatePath('/admin/profile')
    return { success: true }
}

export async function adminLogout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/admin/login')
}
