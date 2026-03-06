
# Sheraz Hussain - Full-Stack & AI Developer Portfolio

This is the repository for the personal portfolio of Sheraz Hussain.

## 🚀 Automation & Integration

This app includes a **Genkit-powered LinkedIn Post Generator** that replaces the need for a separate n8n instance. The logic from your `linkedinpost.json` has been translated into code for easier hosting.

### 🛠️ How to Automate on GitHub (Recommended & Free)

GitHub Actions can trigger your workflow automatically without you needing to touch a server.

1.  **Push to GitHub**: Upload this code to a GitHub repository.
2.  **Edit Workflow**: Open `.github/workflows/daily-post.yml`.
3.  **Update URL**: Replace `https://your-deployed-app-url.com` with your live Netlify or Firebase URL.
4.  **Automatic Trigger**: GitHub will now "ping" your site every day at **7:00 AM UTC** to generate a post.

### ☁️ Hosting on Netlify (Free)

Netlify runs "Scheduled Functions," which are pieces of code that execute on a timer.

1.  **Deploy to Netlify**: Connect your GitHub repo to Netlify.
2.  **Environment Variables**: Add `GOOGLE_GENAI_API_KEY` and your Firebase keys in the Netlify UI.
3.  **Logic**: Netlify will detect `netlify/functions/daily-post.ts` and run it every day at **7:00 AM UTC**.

### 📱 Local Testing on Android (Advanced)

If you want to try running the server on your Android phone for testing:
1.  Install **Termux** (available on F-Droid).
2.  Open Termux and run: `pkg install nodejs git`.
3.  Clone your repository: `git clone <your-repo-url>`.
4.  Enter the folder and run: `npm install` then `npm run dev`.
5.  Access your site at `http://localhost:9002` in your phone's browser.

**⚠️ Important Note on Lock Screens:**
Android's power management will "kill" the Termux process when the screen is locked. To run this reliably on a phone:
*   Enable a **"Wakelock"** from the Termux notification.
*   Set Battery to **"Unrestricted"** for Termux in Android Settings.
*   **Recommendation**: Use GitHub or Netlify for 24/7 automation as they are not affected by lock screens or battery life.

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
