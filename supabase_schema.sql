-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. USERS TABLE (Public profiles for customers)
-- Linked to Supabase Auth (auth.users)
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  phone text,
  address text,
  city text,
  state text,
  pincode text,
  role text default 'customer',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. ADMINS TABLE (Whitelisted admin users)
-- Linked to Supabase Auth. Only users in this table can access admin area.
create table public.admins (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. SAREES TABLE (Product Catalog)
create table public.sarees (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price numeric(10, 2) not null, -- Selling price
  mrp numeric(10, 2) not null,   -- Maximum Retail Price
  state text,                    -- e.g., Andhra Pradesh, Tamil Nadu
  type text,                     -- e.g., Kanchipuram, Banarasi
  colour text,
  fabric text,
  occasion text,                 -- e.g., Wedding, Party
  stock_quantity integer default 0 not null,
  is_featured boolean default false,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. SAREE IMAGES TABLE (Gallery)
create table public.saree_images (
  id uuid default uuid_generate_v4() primary key,
  saree_id uuid references public.sarees(id) on delete cascade not null,
  image_url text not null,
  is_primary boolean default false
);

-- 5. ORDERS TABLE
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete set null, -- Can be null for guest checkout if needed, or strictly linked
  customer_name text not null,
  phone text not null,
  email text,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  pincode text not null,
  total_amount numeric(10, 2) not null,
  status text default 'PENDING' check (status in ('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED')),
  payment_status text default 'PENDING' check (payment_status in ('PENDING', 'PAID', 'FAILED')),
  payment_mode text default 'COD', -- Cash on Delivery, RAZORPAY, STRIPE
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. ORDER ITEMS TABLE
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  saree_id uuid references public.sarees(id) on delete set null, -- Keep order history even if saree is deleted
  quantity integer default 1 not null,
  price_at_purchase numeric(10, 2) not null -- Price at the time of booking
);

-- Row Level Security (RLS) Recommendations:
-- 1. Enable RLS on all tables:
--    alter table public.users enable row level security;
--    alter table public.admins enable row level security;
--    alter table public.sarees enable row level security;
--    alter table public.saree_images enable row level security;
--    alter table public.orders enable row level security;
--    alter table public.order_items enable row level security;

-- 2. Policies (Examples):
--    - Sarees/Images: Public read access. Admin write access.
--    - Orders: Users can see their own orders. Admins can see all.
--    - Admins: Only readable by super-admin or self.
