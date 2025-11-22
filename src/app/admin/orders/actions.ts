'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateOrderStatus(orderId: string, newStatus: string, trackingData?: { courier_name?: string, tracking_number?: string, tracking_link?: string }) {
    const supabase = await createClient()

    // Validate status
    const validStatuses = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED']
    if (!validStatuses.includes(newStatus)) {
        throw new Error('Invalid status')
    }

    const updateData: any = { status: newStatus }

    // Add tracking info if provided
    if (newStatus === 'SHIPPED' && trackingData) {
        if (trackingData.courier_name) updateData.courier_name = trackingData.courier_name
        if (trackingData.tracking_number) updateData.tracking_number = trackingData.tracking_number
        if (trackingData.tracking_link) updateData.tracking_link = trackingData.tracking_link
    }

    const { error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId)

    if (error) {
        console.error('Error updating order status:', error)
        throw new Error(error.message)
    }

    revalidatePath('/admin/orders')
    revalidatePath(`/admin/orders/${orderId}`)

    return { success: true }
}
