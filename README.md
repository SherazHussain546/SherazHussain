# Sheraz Hussain - Full-Stack & AI Developer Portfolio

This is the repository for the personal portfolio of Sheraz Hussain.

## 🚀 Automation & Integration

This app includes a **Genkit-powered LinkedIn Post Generator** that replaces the need for a separate n8n instance.

### 🛠️ Final Steps to Go Live

1.  **Deploy**: Connect this repo to [Netlify](https://app.netlify.com).
2.  **Environment Variables**: Add `GOOGLE_GENAI_API_KEY` (from Google AI Studio) to your Netlify site settings.
3.  **Start your Runner**: On your Windows PC, open PowerShell in your `actions-runner` folder and run `./run.cmd`.
4.  **Update the URL**: In `.github/workflows/daily-post.yml`, change `https://your-deployed-app-url.com` to your live Netlify address.

### 💻 Self-Hosted GitHub Runner Setup (Windows)

You have already initialized your runner. To keep it active:
1.  Open the `actions-runner` folder.
2.  Run `./run.cmd`.
3.  Ensure your PC stays on and connected to the internet around **7:00 AM UTC** for the daily post to trigger.

### ☁️ Hosting on Netlify (Alternative)

If you prefer not to keep your PC on, Netlify "Scheduled Functions" are already set up in `netlify/functions/daily-post.ts`. They will run automatically on Netlify's servers without needing your PC.

## Features
- **AI LinkedIn Post Generator**: Automated social media content creation via Google Genkit.
- **AI Resume Analyzer**: Tailors your portfolio content to specific job descriptions.
- **Portfolio Analytics**: Private dashboard tracking visitor metrics.
- **Responsive Design**: Built with Next.js, Tailwind CSS, and ShadCN UI.

## Tech Stack
- Next.js 15 (App Router)
- Google Genkit (Gemini 1.5 Flash)
- Firebase (Auth, Firestore)
- Netlify (Hosting & Scheduled Functions)