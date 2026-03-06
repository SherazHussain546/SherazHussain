
# Sheraz Hussain - Full-Stack & AI Developer Portfolio

This is the repository for the personal portfolio of Sheraz Hussain.

## 🚀 Automation & Integration

This app includes a **Genkit-powered LinkedIn Post Generator** that replaces the need for a separate n8n instance. The logic from your `linkedinpost.json` has been translated into code for easier hosting.

### 🛠️ How to Automate on Netlify (Free)

Netlify runs "Scheduled Functions," which are pieces of code that execute on a timer.

1.  **Deploy to Netlify**: Connect this GitHub repo to Netlify.
2.  **Environment Variables**: In Netlify UI, add `GOOGLE_GENAI_API_KEY` (your Gemini key).
3.  **Automatic Trigger**: Netlify will detect `netlify/functions/daily-post.ts` and run it every day at **7:00 AM UTC**.
4.  **Why no JSON?**: Netlify doesn't execute `.json` files. I have converted your JSON workflow into the `daily-post.ts` function so Netlify knows exactly what to do.

### ☁️ Hosting on Google Cloud (Free Tier)

You can host the app on **Firebase App Hosting** and automate it using **Cloud Scheduler**.

1.  **Deploy to Firebase**: Connect your GitHub repo to Firebase App Hosting.
2.  **Cloud Scheduler**:
    *   Go to the [Google Cloud Console](https://console.cloud.google.com/cloudscheduler).
    *   Create a job with frequency `0 7 * * *`.
    *   Target: HTTP POST to `https://your-app-url.web.app/api/cron/linkedin`.
3.  **Logic**: Just like Netlify, Google Cloud will trigger the internal API I built for you.

## Features
- **AI LinkedIn Post Generator**: Automated social media content creation via Google Genkit.
- **AI Resume Analyzer**: Tailors your portfolio content to specific job descriptions.
- **Portfolio Analytics**: Private dashboard tracking visitor metrics.
- **Responsive Design**: Built with Next.js, Tailwind CSS, and ShadCN UI.

## Tech Stack
- Next.js 15 (App Router)
- Google Genkit (Gemini 1.5 Flash)
- Firebase (Auth, Firestore, App Hosting)
- Framer Motion (Animations)
