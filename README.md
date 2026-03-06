
# Sheraz Hussain - Full-Stack & AI Developer Portfolio

This is the repository for the personal portfolio of Sheraz Hussain.

## 🚀 Automation & Integration

This app includes a **Genkit-powered LinkedIn Post Generator**. You can automate this for free on either Netlify or Google Cloud.

### Option 1: Automation on Netlify (Scheduled Functions)

1.  **Deploy to Netlify**: Push your code to a GitHub repo and connect it to Netlify.
2.  **Set Environment Variables**: In Netlify UI, add your `GOOGLE_GENAI_API_KEY` and other credentials.
3.  **Automatic Trigger**: This project includes a file at `netlify/functions/daily-post.ts`. Netlify will automatically detect this and run it every day at 9:00 AM UTC.
4.  **Monitoring**: Check the "Functions" tab in your Netlify dashboard to see logs of each daily post generation.

### Option 2: Self-Hosting on Google Cloud (Free Tier)

You can host the app on **Firebase App Hosting** and automate it using **Cloud Scheduler**.

1.  **Deploy to Firebase**: Connect your GitHub repo to Firebase App Hosting in the Firebase Console.
2.  **Cloud Scheduler (The "Cron" part)**:
    *   Go to the [Google Cloud Console](https://console.cloud.google.com/cloudscheduler).
    *   Create a new job.
    *   **Frequency**: `0 7 * * *` (7:00 AM daily).
    *   **Target Type**: HTTP.
    *   **URL**: `https://your-app-url.web.app/api/cron/linkedin`
    *   **HTTP Method**: POST.
    *   **Body**: `{"postDescription": "Your daily topic", "instructions": "Write a post."}`
3.  **Monitoring**: View logs in the Google Cloud Console under the "Logs Explorer" tab.

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
