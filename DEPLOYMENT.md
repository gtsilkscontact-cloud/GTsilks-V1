# GT Silks - Vercel Deployment Guide

## Prerequisites
- ✅ Code pushed to a GitHub repository
- ✅ Supabase project created with database schema
- ✅ Vercel account (free tier works fine)

## Required Environment Variables

You'll need these from your Supabase project dashboard:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to find these in Supabase:**
1. Go to your Supabase project dashboard
2. Click "Settings" → "API"
3. Copy "Project URL" → `NEXT_PUBLIC_SUPABASE_URL`
4. Copy "anon public" key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Step-by-Step Deployment

### Step 1: Push Code to GitHub

```bash
# If not already done
git init
git add .
git commit -m "Initial commit - GT Silks e-commerce"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gt-silks.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. **Go to Vercel**: Visit [vercel.com](https://vercel.com) and sign in
2. **Import Project**: Click "Add New..." → "Project"
3. **Import Git Repository**: 
   - Select your GitHub account
   - Find and select your GT Silks repository
   - Click "Import"

### Step 3: Configure Project

1. **Framework Preset**: Vercel should auto-detect "Next.js" ✅
2. **Root Directory**: Leave as `./` (default)
3. **Build Command**: `npm run build` (default)
4. **Output Directory**: `.next` (default)

### Step 4: Add Environment Variables

**CRITICAL STEP** - In the Vercel project configuration:

1. Expand "Environment Variables" section
2. Add each variable:
   - **Key**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Your Supabase project URL
   - **Environments**: Check all (Production, Preview, Development)
   
3. Click "Add" then repeat for:
   - **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: Your Supabase anon key
   - **Environments**: Check all

### Step 5: Deploy

1. Click **"Deploy"** button
2. Wait 2-3 minutes for build to complete
3. You'll see "🎉 Congratulations!" when done

---

## Post-Deployment Configuration

### Update Supabase Settings

**Important**: Add your Vercel domain to Supabase allowed URLs:

1. Go to Supabase Dashboard → "Authentication" → "URL Configuration"
2. Add to "Site URL": `https://your-app.vercel.app`
3. Add to "Redirect URLs": `https://your-app.vercel.app/**`

---

## Testing Your Deployment

### Test Customer App

1. **Home Page**: Visit `https://your-app.vercel.app`
   - ✅ Hero section displays
   - ✅ Featured sarees load
   - ✅ Navbar and footer appear

2. **Product Listing**: Visit `https://your-app.vercel.app/sarees`
   - ✅ All sarees display
   - ✅ Filters work (by state/type)

3. **Product Detail**: Click any saree
   - ✅ Images load
   - ✅ "Add to Cart" works

4. **Cart & Checkout**: 
   - ✅ Add items to cart
   - ✅ Go to `/cart`
   - ✅ Proceed to `/checkout`
   - ✅ Place test order (use dummy data)

### Test Admin Panel

1. **Admin Login**: Visit `https://your-app.vercel.app/admin/login`
   - ✅ Login page loads
   - ✅ Login with your admin credentials

2. **Admin Dashboard**: After login
   - ✅ Dashboard shows stats
   - ✅ Sidebar navigation works

3. **Saree Management**: Visit `/admin/sarees`
   - ✅ Saree list displays
   - ✅ Search works
   - ✅ Create new saree
   - ✅ Upload images (test Supabase Storage)

4. **Order Management**: Visit `/admin/orders`
   - ✅ Orders display
   - ✅ Click order to view details
   - ✅ Update order status

---

## Common Deployment Issues & Fixes

### Issue 1: Build Fails - "Module not found"
**Fix**: Ensure all dependencies are in `package.json`
```bash
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### Issue 2: Environment Variables Not Working
**Symptoms**: Supabase errors, "Invalid API key"
**Fix**: 
- Double-check env vars in Vercel dashboard
- Ensure they start with `NEXT_PUBLIC_`
- Redeploy: Vercel Dashboard → Deployments → "..." → "Redeploy"

### Issue 3: Images Not Loading
**Symptoms**: Saree images show broken
**Fix**: 
- Check Supabase Storage bucket is public
- Verify RLS policies allow public read
- Test image URL directly in browser

### Issue 4: Admin Login Redirects to Login
**Symptoms**: Can't access admin pages
**Fix**:
- Check middleware is deployed (should be in `.next/server`)
- Verify admin user exists in `public.admins` table
- Check browser console for errors

### Issue 5: 404 on Dynamic Routes
**Symptoms**: `/sarees/[id]` shows 404
**Fix**: This shouldn't happen with Next.js App Router, but if it does:
- Ensure `output: 'standalone'` is NOT in `next.config.js`
- Check Vercel build logs for errors

---

## Continuous Deployment

**Good news**: Vercel automatically redeploys when you push to GitHub!

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push

# Vercel will automatically:
# 1. Detect the push
# 2. Build your app
# 3. Deploy to production
# 4. Update your live URL
```

---

## Production Checklist

Before going live:

- [ ] Test all customer flows (browse → cart → checkout)
- [ ] Test all admin flows (login → manage sarees → manage orders)
- [ ] Verify email/phone in footer are correct
- [ ] Add real saree data (not sample data)
- [ ] Set up custom domain (optional)
- [ ] Enable Vercel Analytics (optional)
- [ ] Test on mobile devices
- [ ] Set up Supabase backups

---

## Custom Domain (Optional)

To use your own domain (e.g., `gtsilks.com`):

1. Vercel Dashboard → Your Project → "Settings" → "Domains"
2. Add your domain
3. Follow DNS configuration instructions
4. Update Supabase allowed URLs to include your custom domain

---

## Monitoring & Logs

**View Deployment Logs:**
- Vercel Dashboard → Your Project → "Deployments"
- Click any deployment → "Building" → View logs

**View Runtime Logs:**
- Vercel Dashboard → Your Project → "Logs"
- Real-time logs of your app

**Supabase Logs:**
- Supabase Dashboard → "Logs" → "API Logs"
- Monitor database queries and errors

---

## Need Help?

**Build Errors**: Check Vercel build logs
**Runtime Errors**: Check Vercel runtime logs + browser console
**Database Errors**: Check Supabase logs
**Auth Issues**: Verify admin user in `public.admins` table

Your GT Silks app is now live! 🎉
