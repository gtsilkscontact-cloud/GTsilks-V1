'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function cancelOrder(orderId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, message: 'Unauthorized' }
    }

    // Verify order belongs to user and is pending
    const { data: order } = await supabase
        .from('orders')
        .select('status')
        .eq('id', orderId)
        .eq('user_id', user.id)
        .single()

    if (!order) {
        return { success: false, message: 'Order not found' }
    }

    if (order.status !== 'PENDING') {
        return { success: false, message: 'Order cannot be cancelled' }
    }

    const { error } = await supabase
        .from('orders')
        .update({ status: 'CANCELLED' })
        .eq('id', orderId)

    if (error) {
        console.error('Error cancelling order:', error)
        return { success: false, message: 'Failed to cancel order' }
    }

    revalidatePath('/profile')
    return { success: true, message: 'Order cancelled successfully' }
}
