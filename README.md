# GT Silks - E-commerce Application

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: App Router pages and layouts
- `src/components`: Reusable UI components
- `src/migrations`: Database schema and seed data
- `public`: Static assets

---

## Deployment Guide (Vercel)

### Prerequisites
- ✅ Code pushed to a GitHub repository
- ✅ Supabase project created with database schema
- ✅ Vercel account (free tier works fine)

### Required Environment Variables

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

### Step-by-Step Deployment

1. **Push Code to GitHub**
2. **Connect to Vercel**: Import your GitHub repository.
3. **Configure Project**: Vercel auto-detects Next.js. Leave default settings.
4. **Add Environment Variables**: Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. **Deploy**: Click "Deploy".

### Post-Deployment Configuration

**Important**: Add your Vercel domain to Supabase allowed URLs:
1. Go to Supabase Dashboard → "Authentication" → "URL Configuration"
2. Add to "Site URL": `https://your-app.vercel.app`
3. Add to "Redirect URLs": `https://your-app.vercel.app/**`

---

## Sample Data Guide

### Generated Saree Images

We have generated 5 realistic saree images for you (Kanchipuram, Banarasi, Dharmavaram, Pattu, Kanjeevaram).

### Steps to Add Data to Your Database

1. **Upload Images to Supabase Storage**
   - Go to Supabase Dashboard → **Storage** → **sarees** bucket.
   - Upload the generated saree images.
   - Make sure the bucket is public.

2. **Run the Final SQL Migration**
   - Go to Supabase Dashboard → **SQL Editor**.
   - Open `migrations/final.sql` from this project.
   - Run the script. This will create all tables and populate them with sample data (including sarees and content pages).

3. **Verify Data**
   - Visit your app at `http://localhost:3000`.
   - Check the home page - featured sarees should display.
   - Go to `/sarees` - all sarees should be listed.

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
