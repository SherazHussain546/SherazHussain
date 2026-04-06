# Sheraz Hussain - Full-Stack & AI Developer Portfolio

This is the repository for the personal portfolio of Sheraz Hussain, a Freelancer working with SYNC TECH Solutions.

## Features
- **AI Resume Analyzer**: Tailors your portfolio content to specific job descriptions using Gemini 2.0 Flash.
- **Portfolio Analytics**: Private dashboard tracking visitor metrics via Firestore.
- **Support Hub**: Multi-channel support (Open Collective, BuyMeACoffee, Web3, GoFundMe, GitHub Sponsors) for community-driven innovation.
- **Stripe Global Checkout**: Secure, tax-compliant one-time contributions via Embedded Checkout.
- **Responsive Design**: Built with Next.js 15, Tailwind CSS, and ShadCN UI.

## Tech Stack
- Next.js 15 (App Router)
- Google Genkit (Gemini 2.0 Flash)
- Firebase (Auth, Firestore)
- Stripe (Payments, Automatic Tax)
- Netlify (Hosting)

## Production Deployment Checklist

### 1. Stripe Production Configuration
To enable live payments, follow these steps in your [Stripe Dashboard](https://dashboard.stripe.com):
- **API Keys**: Copy your `Live Secret Key` and `Live Publishable Key`.
- **Environment Variables**: Add them to your Netlify Environment:
  - `STRIPE_SECRET_KEY`: Your live secret key (Keep private).
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your live publishable key.
- **Domain Verification**: Add `sheraz.synctech.ie` to your "Allowed Domains" in Stripe → Settings → Checkout and Payment Links.

### 2. Firebase Setup
- Ensure your Firebase project is on the "Blaze" plan for production-grade scaling (GCP quotas).
- Enable Email/Password Authentication.
- Verify Firestore Security Rules are deployed (see `firestore.rules`).

### 3. Netlify Environment Variables
Ensure the following variables are set in your Netlify site settings:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `GOOGLE_GENAI_API_KEY` (For Gemini 2.0 Flash)
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## Git Workflow
To keep your repository secure, `.env` files are ignored. Use the following to sync:

```bash
# Pull latest changes
git pull origin main

# Add and commit your updates
git add .
git commit -m "Your description of changes"

# Push to the cloud
git push origin main
```

## Security Note
If your API keys have been leaked, rotate them immediately in the respective consoles. The `.gitignore` file and `netlify.toml` are configured to prevent exposure of sensitive keys.
