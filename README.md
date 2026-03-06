.dd # Sheraz Hussain - Full-Stack & AI Developer Portfolio

This is the repository for the personal portfolio of Sheraz Hussain.

## 🚀 Automation & Netlify Integration

This app includes a **Genkit-powered LinkedIn Post Generator** (based on your n8n workflow). You can automate this on Netlify to run every day.

### How to set up Daily Automation on Netlify:

1.  **Deploy to Netlify**: Push your code to a GitHub repo and connect it to Netlify.
2.  **Set Environment Variables**: In Netlify UI, add your `GOOGLE_GENAI_API_KEY` and other credentials.
3.  **Configure Scheduled Functions**:
    *   Create a file at `netlify/functions/daily-post.js`.
    *   Use this snippet to call your new API route:
    ```javascript
    const fetch = require('node-fetch');

    exports.handler = async function(event, context) {
        // Replace with your actual live URL
        const url = 'https://your-site.netlify.app/api/cron/linkedin';
        
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                postDescription: "Daily Tech Update: Exploring the latest in AI and Cloud.",
                instructions: "Write a professional post with 3 bullet points."
            })
        });

        return { statusCode: 200 };
    };

    // Netlify Cron Syntax (Every day at 7:00 AM)
    // exports.handler.schedule = "0 7 * * *"; 
    ```
4.  **Monitor**: Check the "Functions" tab in Netlify to see the logs and successful executions.

## Features
- **AI LinkedIn Post Generator**: Automated social media content creation via Google Genkit.
- **AI Resume Analyzer**: Tailors your portfolio content to specific job descriptions.
- **Portfolio Analytics**: Private dashboard tracking visitor metrics.
- **Responsive Design**: Built with Next.js, Tailwind CSS, and ShadCN UI.

## Tech Stack
- Next.js 15 (App Router)
- Google Genkit (Gemini 1.5 Flash)
- Firebase (Auth, Firestore)
- Framer Motion (Animations)
