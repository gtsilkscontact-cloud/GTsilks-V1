-- Sample Saree Data for GT Silks
-- Note: After running this, you'll need to upload the generated images to Supabase Storage
-- and update the image_url references in saree_images table

-- Insert Sample Sarees
INSERT INTO public.sarees (name, description, price, mrp, type, state, stock_quantity, is_active, is_featured) VALUES
('Royal Maroon Kanchipuram Silk', 'Exquisite Kanchipuram silk saree in deep maroon with intricate golden zari work. Features traditional temple border and rich pallu with peacock motifs. Perfect for weddings and special occasions.', 18500, 22000, 'Kanchipuram', 'Tamil Nadu', 5, true, true),
('Blue Banarasi Brocade Silk', 'Luxurious Banarasi silk saree in royal blue with heavy golden brocade work. Intricate floral patterns throughout with traditional Mughal-inspired designs. A timeless piece of elegance.', 22000, 28000, 'Banarasi', 'Uttar Pradesh', 3, true, true),
('Green Dharmavaram Pattu', 'Vibrant green Dharmavaram silk saree with contrasting red border and golden zari work. Features traditional temple border design. Handwoven by master artisans from Andhra Pradesh.', 15000, 18000, 'Dharmavaram', 'Andhra Pradesh', 8, true, true),
('Golden Yellow Pattu Silk', 'Stunning golden yellow Pattu silk saree with maroon border. Adorned with traditional peacock and elephant motifs in rich zari work. Perfect for festive celebrations.', 16500, 20000, 'Pattu', 'Andhra Pradesh', 6, true, false),
('Purple Kanjeevaram Checks', 'Premium Kanjeevaram silk saree in regal purple with golden border. Features traditional checks pattern and heavy zari pallu. A classic choice for traditional occasions.', 19500, 24000, 'Kanchipuram', 'Tamil Nadu', 4, true, false),
('Emerald Green Kanchipuram', 'Breathtaking emerald green Kanchipuram silk with gold zari border. Traditional mango (paisley) motifs and temple border. Handwoven with pure silk threads.', 20000, 25000, 'Kanchipuram', 'Tamil Nadu', 5, true, true),
('Crimson Red Banarasi', 'Rich crimson red Banarasi silk saree with intricate gold brocade work. Features traditional butis (small motifs) all over and elaborate pallu design.', 24000, 30000, 'Banarasi', 'Uttar Pradesh', 2, true, false),
('Peacock Blue Dharmavaram', 'Mesmerizing peacock blue Dharmavaram silk with contrasting gold border. Traditional temple architecture inspired border design with rich zari work.', 17000, 21000, 'Dharmavaram', 'Andhra Pradesh', 7, true, false),
('Magenta Mysore Silk', 'Elegant magenta Mysore silk saree with golden border and pallu. Known for its soft texture and lustrous finish. Perfect for both formal and festive occasions.', 14500, 18000, 'Mysore Silk', 'Karnataka', 10, true, false),
('Ivory Kanjivaram Bridal', 'Exquisite ivory Kanjivaram bridal silk saree with heavy gold zari work. Features traditional peacock and mango motifs. A treasured heirloom piece.', 35000, 45000, 'Kanchipuram', 'Tamil Nadu', 2, true, true);

-- Insert Saree Images
-- First, let's get the saree IDs that were just inserted
-- Run this query first to see the IDs:
-- SELECT id, name FROM public.sarees ORDER BY created_at DESC LIMIT 10;

-- Then, replace the UUIDs below with the actual IDs from your sarees table
-- For now, this uses a subquery to match by name (run after sarees are inserted)

INSERT INTO public.saree_images (saree_id, image_url, is_primary)
SELECT id, image_url, is_primary FROM (
  VALUES
    ((SELECT id FROM public.sarees WHERE name = 'Royal Maroon Kanchipuram Silk'), 'https://jnhaenzsfgoviyibkcyv.supabase.co/storage/v1/object/public/sarees/kanchipuram_silk_saree_1_1763722844959.png', true),
    ((SELECT id FROM public.sarees WHERE name = 'Blue Banarasi Brocade Silk'), 'https://jnhaenzsfgoviyibkcyv.supabase.co/storage/v1/object/public/sarees/banarasi_silk_saree_1_1763722872846.png', true),
    ((SELECT id FROM public.sarees WHERE name = 'Green Dharmavaram Pattu'), 'https://jnhaenzsfgoviyibkcyv.supabase.co/storage/v1/object/public/sarees/dharmavaram_silk_saree_1_1763722895025.png', true),
    ((SELECT id FROM public.sarees WHERE name = 'Golden Yellow Pattu Silk'), 'https://jnhaenzsfgoviyibkcyv.supabase.co/storage/v1/object/public/sarees/pattu_silk_saree_1_1763722918068.png', true),
    ((SELECT id FROM public.sarees WHERE name = 'Purple Kanjeevaram Checks'), 'https://jnhaenzsfgoviyibkcyv.supabase.co/storage/v1/object/public/sarees/kanjeevaram_silk_saree_1_1763722942293.png', true)
) AS v(id, image_url, is_primary);

-- Note: Sarees 6-10 don't have images yet. You can add more images later through the admin panel.
