# Sheraz Hussain - Full-Stack & AI Developer Portfolio

This is the repository for the personal portfolio of Sheraz Hussain, a Freelancer working with SYNC TECH Solutions.

## Features
- **AI Resume Analyzer**: Tailors your portfolio content to specific job descriptions using Gemini 1.5 Flash.
- **Portfolio Analytics**: Private dashboard tracking visitor metrics via Firestore.
- **Featured Posts**: Dynamic carousel for showcasing LinkedIn, GitHub, or blog updates.
- **Responsive Design**: Built with Next.js 15, Tailwind CSS, and ShadCN UI.

## Tech Stack
- Next.js 15 (App Router)
- Google Genkit (Gemini 1.5 Flash)
- Firebase (Auth, Firestore)
- Netlify (Hosting)

## Deployment

1. **Firebase Setup**:
   - Create a Firebase project.
   - Enable Email/Password Authentication.
   - Provision a Firestore database.
2. **Environment Variables**:
   - Add your Firebase config and `GOOGLE_GENAI_API_KEY` to your deployment environment (e.g., Netlify).
3. **Deploy**: Connect this repo to Netlify for automatic builds.
