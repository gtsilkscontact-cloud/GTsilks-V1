# Adding Sample Saree Data to GT Silks

## Generated Saree Images

I've generated 5 realistic saree images for you:

1. **Kanchipuram Silk Saree** - Deep maroon with golden zari
2. **Banarasi Silk Saree** - Royal blue with golden brocade
3. **Dharmavaram Silk Saree** - Vibrant green with red border
4. **Pattu Silk Saree** - Golden yellow with maroon border
5. **Kanjeevaram Silk Saree** - Purple with golden border

## Steps to Add Data to Your Database

### Step 1: Upload Images to Supabase Storage

1. Go to your Supabase Dashboard
2. Navigate to **Storage** → **sarees** bucket
3. Click **Upload** and upload the 5 generated saree images
4. After upload, click on each image and copy the public URL

### Step 2: Run the Sample Data SQL

1. Go to Supabase Dashboard → **SQL Editor**
2. Open the file `sample_sarees_data.sql` from your project
3. Click **Run** to insert the 10 sample sarees

### Step 3: Link Images to Sarees

After inserting sarees, you need to link the images. Run this SQL (replace URLs with your actual Supabase Storage URLs):

```sql
-- Get the saree IDs first
SELECT id, name FROM public.sarees ORDER BY id;

-- Then insert images (replace saree_id and image_url with actual values)
INSERT INTO public.saree_images (saree_id, image_url, is_primary) VALUES
(1, 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/sarees/kanchipuram_silk_saree_1.png', true),
(2, 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/sarees/banarasi_silk_saree_1.png', true),
(3, 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/sarees/dharmavaram_silk_saree_1.png', true),
(4, 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/sarees/pattu_silk_saree_1.png', true),
(5, 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/sarees/kanjeevaram_silk_saree_1.png', true);
```

### Step 4: Verify Data

1. Visit your app at `http://localhost:3000`
2. Check the home page - featured sarees should display
3. Go to `/sarees` - all sarees should be listed
4. Test filters by state and type

## Sample Data Includes:

- **10 Sarees** across different types:
  - Kanchipuram (Tamil Nadu)
  - Banarasi (Uttar Pradesh)
  - Dharmavaram (Andhra Pradesh)
  - Pattu (Andhra Pradesh)
  - Mysore Silk (Karnataka)

- **Price Range**: ₹14,500 - ₹35,000
- **Stock Quantities**: 2-10 pieces
- **Featured Sarees**: 4 sarees marked as featured
- **Realistic Descriptions**: Each saree has detailed description

## Alternative: Use Admin Panel

You can also add sarees through the Admin Panel:

1. Login to `/admin/login`
2. Go to `/admin/sarees`
3. Click "Add New Saree"
4. Fill in details and upload images
5. This is the recommended way for production data!

## Tips

- Upload high-quality images (at least 800x800px)
- Use descriptive filenames for images
- Ensure all images are in the `sarees` bucket
- Make the bucket public for read access
- Test image URLs in browser before adding to database
