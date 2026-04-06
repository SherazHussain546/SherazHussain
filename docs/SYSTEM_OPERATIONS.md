# High-Fidelity Portfolio: System Operations Guide

This document outlines the protocols for managing the AI-powered portfolio ecosystem, ensuring absolute technical integrity and maximum reach.

## 1. Firebase Console Configuration (Strategic Setup)

### A. Remote Config (A/B Testing)
To utilize the dynamic narrative engine, you must define parameters in the cloud:
1. Go to **Firebase Console** > **Release & Monitor** > **Remote Config**.
2. Click **Create Configuration**.
3. Add the following parameters:
   - `hero_narrative_style` (String): Default `supremacy`. Values: `frontier`, `supremacy`.
   - `cta_button_color` (String): Default `primary`.
   - `show_support_popup` (Boolean): Default `true`.
4. **CRITICAL**: Click **Publish changes** at the top of the console.
5. **Start an Experiment**: Click **Create experiment** > **Remote Config**. Target `hero_narrative_style` to compare "Frontier" vs "Supremacy" conversion rates.

### B. Cloud Messaging (Push Notifications)
1. Go to **Project Settings** > **Cloud Messaging**.
2. Under **Web configuration**, generate a **Web Push certificate (VAPID Key)**.
3. Copy this key and update it in `src/components/admin/system-strategy.tsx`.
4. In the Admin Portal, click **Register Device for Testing** to authorize your browser.

## 2. Professional Registry Management (Admin Portal)

### Login & Security
- Portal: `/admin/login`.
- Authentication is governed by the `isAdmin()` function in `firestore.rules`. Ensure your email is in the authorized list.

### Visibility & Drafting
- **Draft Mode**: Use the "Live/Draft" toggle on any entry (Experience, Project, etc.) to stage content.
- **Sorting**: The system implements a strict "Newest on Top" architecture. Dynamic Firestore entries are merged with static "System" data automatically.

### High-Fidelity Case Studies
- When adding projects, use the **Technical Deep Dive** fields.
- **Solutions Format**: Enter as `Title | Description` (one per line). The system parses the vertical bar `|` to create the professional grid layout.

## 3. AI Workplace (Strategic Agents)

### AI Resume Analyzer
- The analyzer uses your entire portfolio data files as the **Source of Truth**.
- Paste a Job Description to generate ATS-optimized LaTeX source code and a tailored reach-out email.

### LinkedIn Post Generator
- Describe a breakthrough. The Gemini 2.0 Flash engine will generate high-performing social content designed to drive traffic back to your registry.

## 4. Financial & Climate Integrity

- **Stripe**: Contributions are processed via secure Embedded Checkout.
- **Carbon Removal**: 1% of every transaction is automatically directed to carbon removal via Stripe Climate.
- Ensure `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` are set in your hosting environment (Netlify).
