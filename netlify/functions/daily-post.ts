
import { Config, Context } from "@netlify/functions";

/**
 * Netlify Scheduled Function to trigger the LinkedIn post generation daily.
 * This is the "code" version of your n8n workflow logic.
 */
export default async (req: Request, context: Context) => {
  // The URL of your deployed site's cron endpoint
  // Netlify provides the URL in process.env.URL
  const siteUrl = process.env.URL || "http://localhost:9002";
  const endpoint = `${siteUrl}/api/cron/linkedin`;

  console.log(`[Cron] Triggering daily LinkedIn post at: ${endpoint}`);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postDescription: "Daily Tech Update: Exploring the latest in AI and Cloud.",
        instructions: "Write a professional LinkedIn post sharing an insight about AI or Cloud computing. Include 3 bullet points and a call to action."
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to trigger cron: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("[Cron] Post generated successfully:", result);
  } catch (error) {
    console.error("[Cron] Error during daily post trigger:", error);
  }
};

/**
 * Configure the function to run daily at 7:00 AM UTC (matching your n8n JSON).
 */
export const config: Config = {
  schedule: "0 7 * * *",
};
