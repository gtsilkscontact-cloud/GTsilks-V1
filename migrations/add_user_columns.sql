-- Migration to add missing columns to users table
-- Run this in your Supabase SQL Editor

-- Add missing columns to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS address text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS state text,
ADD COLUMN IF NOT EXISTS pincode text,
ADD COLUMN IF NOT EXISTS role text DEFAULT 'customer';

-- Update existing rows to have default role
UPDATE public.users 
SET role = 'customer' 
WHERE role IS NULL;
