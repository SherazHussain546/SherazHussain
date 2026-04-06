# Sheraz Hussain - Full-Stack & AI Developer Portfolio

This is the repository for the personal portfolio of Sheraz Hussain, a Freelancer working with SYNC TECH Solutions.

## 🚀 High-Fidelity Operations
For detailed instructions on managing the A/B Testing Matrix, AI Agents, and the Dynamic Registry, refer to the **[System Operations Guide](./docs/SYSTEM_OPERATIONS.md)**.

## Features
- **Dynamic Registry CMS**: Manage Experiences, Projects, Education, and Certifications via Firestore.
- **A/B Testing Matrix**: Real-time narrative experimentation via Firebase Remote Config.
- **AI Resume Analyzer**: Tailors portfolio content to job descriptions using Gemini 2.0 Flash.
- **Portfolio Analytics**: Private dashboard tracking visitor metrics and experiment performance.
- **Stripe Global Checkout**: Secure, tax-compliant one-time contributions.
- **Climate Integrity**: 1% carbon removal contribution built into the payment pipeline.

## Tech Stack
- Next.js 15 (App Router)
- Google Genkit (Gemini 2.0 Flash)
- Firebase (Auth, Firestore, Remote Config, FCM)
- Stripe (Payments, Automatic Tax)
- Tailwind CSS & ShadCN UI

## Production Deployment Checklist

### 1. Environment Variables (Netlify)
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

### 2. Firebase Setup
- Enable **Email/Password** Authentication.
- Deploy **Firestore Security Rules** (included in `firestore.rules`).
- Initialize **Remote Config** parameters as defined in the Operations Guide.

## Security Note
If your API keys have been leaked, rotate them immediately in the respective consoles. The `.gitignore` file is configured to prevent exposure of sensitive keys.
