# Migration Guide: HTML to Next.js

This document outlines the migration from the static HTML website to Next.js with TypeScript, Supabase, and modern patterns.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (replaces Netlify Functions)
│   │   ├── users/
│   │   ├── orders/
│   │   └── products/
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Header.tsx
│   ├── Navigation.tsx
│   ├── CartSidebar.tsx
│   ├── Products.tsx
│   ├── CheckoutModal.tsx
│   └── ...
├── lib/                   # Utilities and configuration
│   ├── config.ts          # Business configuration
│   ├── supabase.ts        # Supabase clients
│   ├── utils.ts           # Helper functions
│   └── notifications.ts   # Email/SMS utilities
├── stores/                # Zustand state management
│   ├── cartStore.ts
│   └── userStore.ts
├── types/                 # TypeScript types
│   ├── index.ts
│   └── supabase.ts
└── package.json           # Dependencies
```

## Key Changes

### 1. Database Migration (Airtable → Supabase)

**Current:** Uses Airtable via Netlify Functions
**New:** Uses Supabase with PostgreSQL

You'll need to:
1. Create a Supabase project at https://supabase.com
2. Set up the database schema (see `SUPABASE_SCHEMA.sql` below)
3. Update environment variables

### 2. API Routes

**Old:** `netlify/functions/createUser.js`
**New:** `app/api/users/route.ts`

All Netlify Functions have been converted to Next.js API routes following the pattern:
- GET/POST/PATCH/DELETE methods
- Error handling with try-catch
- NextResponse.json() for responses

### 3. State Management

**Old:** Vanilla JS with localStorage
**New:** Zustand with persist middleware

Cart and user state are now managed with Zustand stores that automatically persist to localStorage.

### 4. Components

**Old:** Single HTML file with inline CSS/JS
**New:** React components with Tailwind CSS

All UI has been split into reusable React components.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
ENABLE_EMAIL_NOTIFICATIONS=true

# SMS (Twilio) - Optional
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_phone
ENABLE_SMS_NOTIFICATIONS=true
```

### 3. Database Setup

Run this SQL in your Supabase SQL editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  zipcode TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  has_size BOOLEAN DEFAULT FALSE,
  size_options JSONB,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  order_type TEXT NOT NULL,
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL,
  delivery_address TEXT,
  delivery_zip TEXT,
  subtotal DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  size TEXT,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL
);

-- Indexes
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_pickup_date ON orders(pickup_date);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
```

### 4. Seed Products (Optional)

You can migrate your existing products to Supabase or add them via the admin dashboard.

### 5. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

### 6. Build for Production

```bash
npm run build
npm start
```

## Migration Checklist

- [x] Next.js project structure
- [x] TypeScript configuration
- [x] Tailwind CSS setup
- [x] Zustand stores
- [x] API routes (users, orders, products)
- [x] React components
- [x] Configuration management
- [x] Notification system
- [ ] CheckoutModal component (TODO)
- [ ] Login/Signup modals (TODO)
- [ ] Database migration script
- [ ] Environment variable setup guide
- [ ] Testing

## Remaining Work

1. **CheckoutModal**: Complete the checkout form with date/time picker, delivery validation, etc.
2. **Login/Signup Modals**: Convert the HTML modals to React components
3. **Time Slot Management**: Implement proper time slot booking (currently uses localStorage)
4. **Admin Dashboard**: Build admin interface for managing orders and products
5. **Image Upload**: Add product image upload functionality
6. **Testing**: Add unit and integration tests

## Deployment

The project is configured for Netlify deployment with `netlify.toml`. You can also deploy to Vercel, which has excellent Next.js support.

## Need Help?

Refer to the Next.js documentation: https://nextjs.org/docs
Supabase documentation: https://supabase.com/docs

