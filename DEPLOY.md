# LedgerOS — Deployment Guide

## Quick Setup (5 minutes)

### Step 1: Create Supabase Project
1. Go to https://supabase.com/dashboard → New Project
2. Name: `ledgeros`, Password: generate one, Region: pick closest
3. Wait for project to provision (~2 min)

### Step 2: Run Database Migrations
In Supabase SQL Editor, run these files **in order**:
1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_categories.sql`
3. `supabase/migrations/003_rules_subscriptions.sql`
4. `supabase/migrations/004_views.sql`
5. `supabase/seed.sql` (optional — seed data)

### Step 3: Get API Keys
Go to Project Settings → API:
- Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- Copy **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copy **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### Step 4: Deploy to Vercel
```bash
cd ~/Desktop/vibecode/ledgeros/app
npx vercel --prod
```
When prompted, add the 3 env vars from Step 3.

Or use the Vercel dashboard:
1. Import from GitHub: `bugbabacodes/ledgeros`
2. Root directory: `app`
3. Add env vars
4. Deploy

### Step 5: Update App URL
Set `NEXT_PUBLIC_APP_URL` to your Vercel domain in Vercel env vars.

## Alternative: Supabase CLI Setup
```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npx supabase db push
```

## That's it! 🚀
