# Sheraz Hussain - Full-Stack & AI Developer Portfolio

This is the repository for the personal portfolio of Sheraz Hussain, a Freelancer working with SYNC TECH Solutions.

## Features
- **AI Resume Analyzer**: Tailors your portfolio content to specific job descriptions using Gemini 2.0 Flash.
- **Portfolio Analytics**: Private dashboard tracking visitor metrics via Firestore.
- **Support Hub**: Multi-channel support (BuyMeACoffee, Web3, GoFundMe, GitHub Sponsors) for community-driven innovation.
- **Responsive Design**: Built with Next.js 15, Tailwind CSS, and ShadCN UI.

## GitHub Sponsors Assets (Copy & Paste)

### Short Bio (Sidebar)
First-Class Honors Software Engineer & AI/Cloud Developer @ SYNC TECH Solutions. Building high-fidelity AI agents and scalable cloud infrastructure to empower the global tech community.

### Profile Introduction (Markdown)
```markdown
Hi, I'm **Sheraz Hussain**, a Freelancer working with **SYNC TECH Solutions**. I'm passionate about architecting high-performance enterprise systems and pushing the boundaries of what's possible with Generative AI and Cloud Computing.

By sponsoring my work, you are directly supporting:
- **Innovation at Scale**: The development of high-fidelity tools like *Market Genius* and *Job4You*.
- **Open-Source Integrity**: Keeping advanced AI utilities free and accessible for the global tech community.
- **Technical Mentorship**: Creating resources and documentation to empower the next generation of engineers.

Your support fuels my coffee-driven coding sessions and helps cover the infrastructure costs for the free AI tools I provide. Let's engineer a more intelligent and open digital future together! 🚀
```

## Social Media Assets (For Reference)

### Medium / LinkedIn Professional Bio
"Sheraz Hussain is a First-Class Honors Software Engineer and AI/Cloud Developer based in Dublin, Ireland. Working as a Freelancer with SYNC TECH Solutions, he specializes in architecting high-performance enterprise systems and scalable AI-driven applications. With a passion for technical integrity and innovation, Sheraz bridges the gap between complex engineering and strategic business growth. Graduate of Dublin Business School and developer of high-fidelity tools for the global tech community."

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
To keep your repository in sync and secure, use the following commands:

```bash
# Pull latest changes
git pull origin main

# If .env was previously committed, remove it from the index:
git rm --cached .env

# Add and commit your updates
git add .
git commit -m "Your description of changes"

# Push to the cloud
git push origin main
```

## Security Note
If your API keys have been leaked, please **rotate them immediately** in the Firebase Console and update your Netlify environment variables. The `.gitignore` file is configured to prevent future leaks of your `.env` file.
