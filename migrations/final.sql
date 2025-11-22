-- GT Silks Database Schema
-- This file contains the complete schema for the GT Silks application.

-- 1. Users Table (Extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT,
    role TEXT DEFAULT 'customer',
    address TEXT,
    city TEXT,
    state TEXT,
    pincode TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Sarees Table (Product Catalog)
CREATE TABLE IF NOT EXISTS public.sarees (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    mrp NUMERIC,
    cost_price NUMERIC,
    saree_type TEXT, -- e.g., 'Kanchipuram', 'Banarasi'
    images TEXT[], -- Array of image URLs
    stock_quantity INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id),
    status TEXT DEFAULT 'PENDING', -- PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED
    total_amount NUMERIC NOT NULL,
    payment_mode TEXT DEFAULT 'COD',
    shipping_address TEXT,
    contact_number TEXT,
    tracking_number TEXT,
    courier_name TEXT,
    tracking_link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    saree_id UUID REFERENCES public.sarees(id),
    quantity INTEGER DEFAULT 1,
    price_at_time NUMERIC NOT NULL, -- Price when ordered
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Map States Table (Interactive Map Data)
CREATE TABLE IF NOT EXISTS public.map_states (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    state_code TEXT,
    saree_type TEXT,
    description TEXT,
    shop_link TEXT,
    wiki_link TEXT, -- Link to "Know More"
    key_facts TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Site Pages Table (Dynamic Content)
CREATE TABLE IF NOT EXISTS public.site_pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sarees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.map_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_pages ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Basic Setup)

-- Users: Can view/edit their own profile
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Sarees: Public read, Admin write
CREATE POLICY "Public can view active sarees" ON public.sarees FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage sarees" ON public.sarees FOR ALL USING (
  auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
);

-- Orders: Users view own, Admins view all
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all orders" ON public.orders FOR SELECT USING (
  auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
);

-- Site Pages: Public read published, Admin write all
CREATE POLICY "Public can view published pages" ON public.site_pages FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage pages" ON public.site_pages FOR ALL USING (
  auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
);

-- SEED DATA: Site Pages
INSERT INTO site_pages (slug, title, content, is_published) VALUES
(
    'shipping', 
    'Shipping & Delivery', 
    '<div class="space-y-6"><section><h3 class="text-2xl font-serif text-maroon-800 mb-3">Shipping Policy</h3><p class="text-gray-700 leading-relaxed">At GT Silks, we take great care in delivering your handwoven sarees. We partner with reputed courier services to ensure your order reaches you in perfect condition.</p></section><section><h4 class="text-xl font-semibold text-maroon-700 mb-2">Domestic Shipping (India)</h4><ul class="list-disc pl-5 space-y-2 text-gray-700"><li><strong>Free Shipping:</strong> We offer free shipping on all orders above ₹5,000 within India.</li><li><strong>Standard Delivery:</strong> For orders below ₹5,000, a flat shipping fee of ₹100 applies.</li><li><strong>Delivery Time:</strong> Most orders are delivered within 5-7 business days. Remote locations may take 10-12 days.</li></ul></section><section><h4 class="text-xl font-semibold text-maroon-700 mb-2">International Shipping</h4><p class="text-gray-700 mb-2">We currently ship to select countries (USA, UK, Canada, Australia, UAE, Singapore).</p><ul class="list-disc pl-5 space-y-2 text-gray-700"><li><strong>Shipping Charges:</strong> Calculated at checkout based on weight and destination.</li><li><strong>Customs & Duties:</strong> Any import duties or taxes levied by the destination country are the responsibility of the customer.</li><li><strong>Delivery Time:</strong> International shipments typically take 10-15 business days.</li></ul></section></div>',
    true
),
(
    'returns', 
    'Returns & Exchanges', 
    '<div class="space-y-6"><section><h3 class="text-2xl font-serif text-maroon-800 mb-3">Returns & Exchange Policy</h3><p class="text-gray-700 leading-relaxed">We want you to love your saree! However, given the delicate nature of handloom products, we have a specific return policy.</p></section><section><h4 class="text-xl font-semibold text-maroon-700 mb-2">Eligibility for Returns</h4><ul class="list-disc pl-5 space-y-2 text-gray-700"><li>Returns are accepted only for <strong>defective or damaged products</strong>.</li><li>You must raise a return request within <strong>48 hours</strong> of delivery.</li><li>The product must be unused, unwashed, and with all original tags intact.</li><li>Slight color variations due to screen resolution or photography are not considered defects.</li></ul></section><section><h4 class="text-xl font-semibold text-maroon-700 mb-2">How to Initiate a Return</h4><ol class="list-decimal pl-5 space-y-2 text-gray-700"><li>Email us at <strong>support@gtsilks.com</strong> with your Order ID and photos of the defect.</li><li>Our team will review your request within 24 hours.</li><li>If approved, we will arrange a reverse pickup.</li><li>Once we receive the item and verify the defect, we will initiate a refund or exchange.</li></ol></section></div>',
    true
),
(
    'faq', 
    'Frequently Asked Questions', 
    '<div class="space-y-8"><section><h3 class="text-2xl font-serif text-maroon-800 mb-4">Frequently Asked Questions</h3><div class="space-y-6"><div><h4 class="text-lg font-semibold text-maroon-900 mb-1">Are your sarees pure silk?</h4><p class="text-gray-700">Yes, all our Kanchipuram, Banarasi, and Mysore silk sarees are certified with Silk Mark. We also offer high-quality art silk and cotton blends, which are clearly mentioned in the product description.</p></div><div><h4 class="text-lg font-semibold text-maroon-900 mb-1">Do you provide blouse stitching?</h4><p class="text-gray-700">Currently, we do not offer stitching services. All sarees come with an unstitched blouse piece (unless specified otherwise).</p></div><div><h4 class="text-lg font-semibold text-maroon-900 mb-1">How do I maintain my silk saree?</h4><p class="text-gray-700">We recommend dry cleaning only for all pure silk sarees. Store them wrapped in a muslin cloth and change folds every few months to prevent creasing.</p></div><div><h4 class="text-lg font-semibold text-maroon-900 mb-1">Can I cancel my order?</h4><p class="text-gray-700">Yes, you can cancel your order from the "My Profile" section as long as the status is "PENDING". Once shipped, orders cannot be cancelled.</p></div></div></section></div>',
    true
),
(
    'order-tracking', 
    'Order Tracking', 
    '<div class="space-y-6"><section><h3 class="text-2xl font-serif text-maroon-800 mb-3">Track Your Order</h3><p class="text-gray-700 leading-relaxed">You can easily track the status of your order in real-time.</p></section><section><div class="bg-cream-50 p-6 rounded-lg border border-gold-200"><h4 class="text-xl font-semibold text-maroon-700 mb-4">How to Track</h4><ol class="list-decimal pl-5 space-y-3 text-gray-700"><li>Go to <strong>My Profile</strong> (click the user icon in the top right).</li><li>Scroll down to <strong>Order History</strong>.</li><li>Find your order and check the status badge (Pending, Confirmed, Shipped, Delivered).</li><li>If your order is <strong>Shipped</strong>, you will see a tracking number and courier link (if available).</li></ol><div class="mt-6"><a href="/profile" class="inline-block bg-maroon-800 text-white px-6 py-2 rounded-md hover:bg-maroon-700 transition-colors">Go to My Orders</a></div></div></section></div>',
    true
),
(
    'privacy-policy', 
    'Privacy Policy', 
    '<div class="space-y-6"><section><h3 class="text-2xl font-serif text-maroon-800 mb-3">Privacy Policy</h3><p class="text-sm text-gray-500 mb-4">Last Updated: November 2025</p><p class="text-gray-700 leading-relaxed">At GT Silks, we value your trust and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.</p></section><section><h4 class="text-xl font-semibold text-maroon-700 mb-2">Information We Collect</h4><ul class="list-disc pl-5 space-y-2 text-gray-700"><li><strong>Personal Information:</strong> Name, email address, phone number, and shipping address when you place an order or sign up.</li><li><strong>Payment Information:</strong> We do not store your credit/debit card details. All payments are processed through secure third-party gateways.</li><li><strong>Usage Data:</strong> Information about how you browse our store (e.g., pages visited, time spent) to help us improve your experience.</li></ul></section><section><h4 class="text-xl font-semibold text-maroon-700 mb-2">How We Use Your Information</h4><p class="text-gray-700">We use your data to:</p><ul class="list-disc pl-5 space-y-2 text-gray-700"><li>Process and deliver your orders.</li><li>Send order updates and tracking information.</li><li>Respond to your customer service requests.</li><li>Send promotional emails (only if you opt-in).</li></ul></section></div>',
    true
),
(
    'terms-of-service', 
    'Terms of Service', 
    '<div class="space-y-6"><section><h3 class="text-2xl font-serif text-maroon-800 mb-3">Terms of Service</h3><p class="text-gray-700 leading-relaxed">Welcome to GT Silks. By accessing or using our website, you agree to be bound by these Terms of Service.</p></section><section><h4 class="text-xl font-semibold text-maroon-700 mb-2">1. Product Descriptions</h4><p class="text-gray-700 mb-2">We strive to display our products as accurately as possible. However, colors may vary slightly due to lighting and screen settings. We do not warrant that product descriptions are error-free.</p></section><section><h4 class="text-xl font-semibold text-maroon-700 mb-2">2. Pricing</h4><p class="text-gray-700 mb-2">All prices are listed in Indian Rupees (INR) and are inclusive of GST. We reserve the right to change prices at any time without prior notice.</p></section><section><h4 class="text-xl font-semibold text-maroon-700 mb-2">3. User Accounts</h4><p class="text-gray-700 mb-2">You are responsible for maintaining the confidentiality of your account password. You agree to accept responsibility for all activities that occur under your account.</p></section><section><h4 class="text-xl font-semibold text-maroon-700 mb-2">4. Governing Law</h4><p class="text-gray-700 mb-2">These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Dharmavaram, Andhra Pradesh.</p></section></div>',
    true
)
ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    content = EXCLUDED.content,
    is_published = EXCLUDED.is_published;

-- SEED DATA: Sarees (Sample Products)
INSERT INTO public.sarees (name, description, price, mrp, saree_type, state, stock_quantity, is_active, is_featured, images) VALUES
('Royal Maroon Kanchipuram Silk', 'Exquisite Kanchipuram silk saree in deep maroon with intricate golden zari work. Features traditional temple border and rich pallu with peacock motifs. Perfect for weddings and special occasions.', 18500, 22000, 'Kanchipuram', 'Tamil Nadu', 5, true, true, ARRAY['https://jnhaenzsfgoviyibkcyv.supabase.co/storage/v1/object/public/sarees/kanchipuram_silk_saree_1_1763722844959.png']),
('Blue Banarasi Brocade Silk', 'Luxurious Banarasi silk saree in royal blue with heavy golden brocade work. Intricate floral patterns throughout with traditional Mughal-inspired designs. A timeless piece of elegance.', 22000, 28000, 'Banarasi', 'Uttar Pradesh', 3, true, true, ARRAY['https://jnhaenzsfgoviyibkcyv.supabase.co/storage/v1/object/public/sarees/banarasi_silk_saree_1_1763722872846.png']),
('Green Dharmavaram Pattu', 'Vibrant green Dharmavaram silk saree with contrasting red border and golden zari work. Features traditional temple border design. Handwoven by master artisans from Andhra Pradesh.', 15000, 18000, 'Dharmavaram', 'Andhra Pradesh', 8, true, true, ARRAY['https://jnhaenzsfgoviyibkcyv.supabase.co/storage/v1/object/public/sarees/dharmavaram_silk_saree_1_1763722895025.png']),
('Golden Yellow Pattu Silk', 'Stunning golden yellow Pattu silk saree with maroon border. Adorned with traditional peacock and elephant motifs in rich zari work. Perfect for festive celebrations.', 16500, 20000, 'Pattu', 'Andhra Pradesh', 6, true, false, ARRAY['https://jnhaenzsfgoviyibkcyv.supabase.co/storage/v1/object/public/sarees/pattu_silk_saree_1_1763722918068.png']),
('Purple Kanjeevaram Checks', 'Premium Kanjeevaram silk saree in regal purple with golden border. Features traditional checks pattern and heavy zari pallu. A classic choice for traditional occasions.', 19500, 24000, 'Kanchipuram', 'Tamil Nadu', 4, true, false, ARRAY['https://jnhaenzsfgoviyibkcyv.supabase.co/storage/v1/object/public/sarees/kanjeevaram_silk_saree_1_1763722942293.png']);



-- Migration: Allow admins to view all users (full_name, email)
CREATE POLICY "Admins can view all users" ON public.users
FOR SELECT USING (
  auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
);



-- Migration: Add Cost Price and Tracking Columns

-- 1. Add cost_price to sarees table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sarees' AND column_name = 'cost_price') THEN
        ALTER TABLE public.sarees ADD COLUMN cost_price NUMERIC;
    END IF;
END $$;

-- 2. Add tracking columns to orders table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'tracking_number') THEN
        ALTER TABLE public.orders ADD COLUMN tracking_number TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'courier_name') THEN
        ALTER TABLE public.orders ADD COLUMN courier_name TEXT;
    END IF;
END $$;


-- Add tracking_link column to orders table
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tracking_link TEXT;


