# Sheraz Hussain - Full-Stack & AI Developer Portfolio

This is the repository for the personal portfolio of Sheraz Hussain, a Freelancer working with SYNC TECH Solutions.

## Features
- **AI Resume Analyzer**: Tailors your portfolio content to specific job descriptions using Gemini 2.0 Flash.
- **Portfolio Analytics**: Private dashboard tracking visitor metrics via Firestore.
- **Support Hub**: Multi-channel support (BuyMeACoffee, Web3, GoFundMe) for community-driven innovation.
- **Responsive Design**: Built with Next.js 15, Tailwind CSS, and ShadCN UI.

## Tech Stack
- Next.js 15 (App Router)
- Google Genkit (Gemini 2.0 Flash)
- Firebase (Auth, Firestore)
- Netlify (Hosting)

## Deployment & Maintenance

### 1. Firebase Setup
- Create a Firebase project.
- Enable Email/Password Authentication.
- Provision a Firestore database.

### 2. Environment Variables
- Add your Firebase config and `GOOGLE_GENAI_API_KEY` to your deployment environment (e.g., Netlify).
- **CRITICAL**: Never commit your `.env` file. It is now ignored by `.gitignore`.

### 3. Git Workflow
To keep your repository in sync, use the following commands:
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
If your API keys have been leaked, please **rotate them immediately** in the Firebase Console and update your Netlify environment variables.
