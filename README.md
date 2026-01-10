# The Daily Batch Bakery 🍞

A beautiful, responsive Next.js website for The Daily Batch Bakery - a home-based micro-bakery offering handcrafted breads, rolls, and sweet treats.

## 🌟 Features

- **Next.js 14**: Modern React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Zustand**: Client-side state management
- **Supabase**: PostgreSQL database with real-time capabilities
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Order Management**: Full order system with notifications
- **Cart System**: Persistent shopping cart
- **User Authentication**: Phone-based login system

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- (Optional) Resend account for emails
- (Optional) Twilio account for SMS

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (see `.env.example`):
```bash
cp .env.example .env.local
```

3. Set up Supabase database (see `MIGRATION_GUIDE.md` for SQL schema)

4. Run development server:
```bash
npm run dev
```

Visit http://localhost:3000

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
├── lib/                   # Utilities and config
├── stores/                # Zustand state stores
├── types/                 # TypeScript types
└── package.json
```

## 🛠️ Technologies

- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Zustand**: State management
- **Supabase**: Database and backend
- **Resend**: Email notifications
- **Twilio**: SMS notifications (optional)

## 📋 API Routes

- `GET/POST /api/users` - User management
- `GET/POST /api/orders` - Order management
- `GET/PATCH/DELETE /api/products` - Product management

## 🚀 Deployment

This website can be deployed on:
- **Netlify**: Uses `netlify.toml` configuration
- **Vercel**: Native Next.js support

### Deployment Workflow

1. Set environment variables in your hosting platform
2. Connect your Git repository
3. Deploy automatically on push to main branch

## 📝 Migration

This project has been migrated from a static HTML site to Next.js. See `MIGRATION_GUIDE.md` for details.

## 📱 Contact

- **Email**: thedailybatchbakery@gmail.com
- **Phone**: (702) 512-9594

## 📝 License

© 2025 The Daily Batch Bakery. All rights reserved.
