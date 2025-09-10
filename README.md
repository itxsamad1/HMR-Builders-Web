# HMR Builders — RWA Tokenization Platform (Next.js 14)

HMR Builders is a professional, mobile‑first platform for tokenized real estate investing in Pakistan. It showcases HMR Waterfront projects and explains how investors participate via fractional tokens.

## Product Summary
- **Business model**: Each apartment = 1,000 tokens. Token price = apartment value ÷ 1,000. Target returns: **15–20% annually** (rental + appreciation).
- **Minimum investment**: Typically PKR 1M; pages show ranges per project/unit type.
- **Geography**: HMR Waterfront, Abdul Sattar Edhi Ave, DHA Phase 8, Karachi. H1 Tower is marked **ACTIVE**.
- **Theme**: Dark-only with HMR blues (`#315dca`, `#203a74`, `#0e1521`, `#dee0e5`).

## Tech Stack
- Next.js 14 (App Router) + React + TypeScript
- Tailwind CSS (with custom animations)
- NextAuth.js (Google OAuth) with session/JWT callbacks
- Vercel deployment

## Key Features
- Responsive pages: Home, Properties, Property Detail, How it Works, FAQs, Media, Login, Get Started
- Professional navbar with rounded container; mobile nav with full links
- Project data uses pricing ranges for token price and minimum investment
- Optimized images and accessible components

## Getting Started
1. Install dependencies:
```bash
npm install
```
2. Create `.env.local` in project root:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=YOUR_LONG_RANDOM_SECRET
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
```
3. Run dev server:
```bash
npm run dev
```

## Google OAuth Setup
Authorized redirect URLs:
- `http://localhost:3000/api/auth/callback/google`
- `https://YOUR_DEPLOYMENT_URL/api/auth/callback/google`

Vercel env vars:
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`

## Structure (highlights)
```
src/app/
  page.tsx                       # Home page
  properties/page.tsx            # Portfolio
  properties/h1-tower/page.tsx   # Property details
  login/page.tsx                 # Sign in
  get-started/page.tsx           # Concise Google onboarding
  api/auth/[...nextauth]/route.ts# NextAuth config
src/components/SessionProvider.tsx
public/projects/...              # Project images
```

## Token Economics Example
- 2‑BR (H1 Tower) price range: PKR 8.92–10.30 Cr ⇒ token ≈ PKR 89,200–103,000
- Cards and detail pages present ranges for transparency

## Deployment
Deploy to Vercel. Ensure production env vars match Google OAuth client configuration.

## License
Proprietary to HMR Builders.
