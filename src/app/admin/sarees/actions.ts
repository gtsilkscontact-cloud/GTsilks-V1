'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createSaree(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const mrp = parseFloat(formData.get('mrp') as string)
    const cost_price = formData.get('cost_price') ? parseFloat(formData.get('cost_price') as string) : null
    const type = formData.get('type') as string
    const stock_quantity = parseInt(formData.get('stock_quantity') as string)

    // Create saree first
    const { data, error } = await supabase
        .from('sarees')
        .insert([
            {
                name,
                description,
                price,
                mrp,
                cost_price,
                type,
                stock_quantity,
            },
        ])
        .select()
        .single()

    if (error) {
        console.error('Error creating saree:', error)
        throw new Error(error.message)
    }

    // Handle multiple image uploads
    const imageFiles = formData.getAll('images') as File[]

    if (imageFiles && imageFiles.length > 0) {
        for (let i = 0; i < imageFiles.length; i++) {
            const imageFile = imageFiles[i]

            if (imageFile && imageFile.size > 0) {
                const filename = `${Date.now()}-${i}-${imageFile.name.replace(/[^a-zA-Z0-9.]/g, '')}`
                const { error: uploadError } = await supabase.storage
                    .from('sarees')
                    .upload(filename, imageFile, {
                        cacheControl: '3600',
                        upsert: false,
                    })

                if (uploadError) {
                    console.error('Error uploading image:', uploadError)
                    continue // Skip this image but continue with others
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('sarees')
                    .getPublicUrl(filename)

                // Insert into saree_images table
                await supabase
                    .from('saree_images')
                    .insert([
                        {
                            saree_id: data.id,
                            image_url: publicUrl,
                            is_primary: i === 0, // First image is primary
                        },
                    ])
            }
        }
    }

    revalidatePath('/admin/sarees')
    revalidatePath('/')
    redirect('/admin/sarees')
}

export async function updateSaree(id: string, formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const mrp = parseFloat(formData.get('mrp') as string)
    const cost_price = formData.get('cost_price') ? parseFloat(formData.get('cost_price') as string) : null
    const type = formData.get('type') as string
    const stock_quantity = parseInt(formData.get('stock_quantity') as string)

    // Update saree details
    const { error } = await supabase
        .from('sarees')
        .update({
            name,
            description,
            price,
            mrp,
            cost_price,
            type,
            stock_quantity,
        })
        .eq('id', id)

    if (error) {
        console.error('Error updating saree:', error)
        throw new Error(error.message)
    }

    // Handle new image uploads
    const imageFiles = formData.getAll('images') as File[]

    if (imageFiles && imageFiles.length > 0) {
        // Get existing images count to determine if new images should be primary
        const { data: existingImages } = await supabase
            .from('saree_images')
            .select('*')
            .eq('saree_id', id)

        const hasExistingImages = existingImages && existingImages.length > 0

        for (let i = 0; i < imageFiles.length; i++) {
            const imageFile = imageFiles[i]

            if (imageFile && imageFile.size > 0) {
                const filename = `${Date.now()}-${i}-${imageFile.name.replace(/[^a-zA-Z0-9.]/g, '')}`
                const { error: uploadError } = await supabase.storage
                    .from('sarees')
                    .upload(filename, imageFile, {
                        cacheControl: '3600',
                        upsert: false,
                    })

                if (uploadError) {
                    console.error('Error uploading image:', uploadError)
                    continue
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('sarees')
                    .getPublicUrl(filename)

                // Insert new image
                await supabase
                    .from('saree_images')
                    .insert([
                        {
                            saree_id: id,
                            image_url: publicUrl,
                            is_primary: !hasExistingImages && i === 0, // Only first new image is primary if no existing images
                        },
                    ])
            }
        }
    }

    revalidatePath('/admin/sarees')
    revalidatePath('/')
    redirect('/admin/sarees')
}

export async function deleteSaree(id: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('sarees').delete().eq('id', id)

    if (error) {
        console.error('Error deleting saree:', error)
        throw new Error(error.message)
    }

    revalidatePath('/admin/sarees')
    revalidatePath('/')
}

export async function deleteImage(imageId: string, sareeId: string) {
    const supabase = await createClient()

    // Get the image details first
    const { data: image } = await supabase
        .from('saree_images')
        .select('*')
        .eq('id', imageId)
        .single()

    if (!image) {
        throw new Error('Image not found')
    }

    // Delete from database
    const { error } = await supabase
        .from('saree_images')
        .delete()
        .eq('id', imageId)

    if (error) {
        console.error('Error deleting image:', error)
        throw new Error(error.message)
    }

    // If this was the primary image, set another image as primary
    if (image.is_primary) {
        const { data: remainingImages } = await supabase
            .from('saree_images')
            .select('*')
            .eq('saree_id', sareeId)
            .limit(1)

        if (remainingImages && remainingImages.length > 0) {
            await supabase
                .from('saree_images')
                .update({ is_primary: true })
                .eq('id', remainingImages[0].id)
        }
    }

    revalidatePath('/admin/sarees')
    revalidatePath(`/admin/sarees/${sareeId}/edit`)
}

export async function setPrimaryImage(imageId: string, sareeId: string) {
    const supabase = await createClient()

    // First, unset all primary images for this saree
    await supabase
        .from('saree_images')
        .update({ is_primary: false })
        .eq('saree_id', sareeId)

    // Then set the selected image as primary
    const { error } = await supabase
        .from('saree_images')
        .update({ is_primary: true })
        .eq('id', imageId)

    if (error) {
        console.error('Error setting primary image:', error)
        throw new Error(error.message)
    }

    revalidatePath('/admin/sarees')
    revalidatePath(`/admin/sarees/${sareeId}/edit`)
}
