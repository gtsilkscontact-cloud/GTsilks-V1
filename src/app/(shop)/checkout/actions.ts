'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function placeOrder(formData: FormData, cartItems: any[]) {
    const supabase = await createClient()

    const rawFormData = {
        customer_name: formData.get('customer_name') as string,
        customer_email: formData.get('customer_email') as string,
        customer_phone: formData.get('customer_phone') as string,
        address_line1: formData.get('address_line1') as string,
        address_line2: formData.get('address_line2') as string,
        city: formData.get('city') as string,
        state: formData.get('state') as string,
        pincode: formData.get('pincode') as string,
    }

    // Calculate total
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    // 1. Create Order
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
            customer_name: rawFormData.customer_name,
            customer_email: rawFormData.customer_email,
            customer_phone: rawFormData.customer_phone,
            shipping_address: `${rawFormData.address_line1}, ${rawFormData.address_line2}, ${rawFormData.city}, ${rawFormData.state} - ${rawFormData.pincode}`,
            total_amount: totalAmount,
            status: 'PENDING',
            payment_status: 'PENDING',
            payment_mode: 'COD',
        })
        .select()
        .single()

    if (orderError) {
        console.error('Order creation failed:', orderError)
        return { success: false, message: 'Failed to create order. Please try again.' }
    }

    // 2. Create Order Items
    const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        saree_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price,
    }))

    const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

    if (itemsError) {
        console.error('Order items creation failed:', itemsError)
        // Ideally we should rollback the order here, but for simplicity we'll just return error
        return { success: false, message: 'Failed to add items to order.' }
    }

    revalidatePath('/admin/orders')
    return { success: true, orderId: order.id }
}
