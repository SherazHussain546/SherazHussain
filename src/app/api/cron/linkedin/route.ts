import { NextResponse } from 'next/server';
import { generateLinkedInPost } from '@/ai/flows/generate-linkedin-post';

/**
 * @fileOverview API Route for automated LinkedIn post generation.
 * This endpoint can be called by Netlify Scheduled Functions or an external Cron service.
 */

export async function POST(req: Request) {
  // Optional: You can add a secret key check here for security
  // const authHeader = req.headers.get('authorization');
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new NextResponse('Unauthorized', { status: 401 });
  // }

  try {
    const body = await req.json();
    const { postDescription, instructions } = body;

    if (!postDescription) {
      return NextResponse.json({ error: 'Post description is required' }, { status: 400 });
    }

    // Trigger the Genkit flow with the provided data
    const result = await generateLinkedInPost({ 
      postDescription, 
      instructions: instructions || 'Write an engaging and professional LinkedIn post.' 
    });

    return NextResponse.json({
      success: true,
      generatedContent: result.postContent,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: "Active",
    message: "LinkedIn Post Generation API is ready.",
    usage: "Send a POST request with 'postDescription' and 'instructions' to trigger generation."
  });
}
