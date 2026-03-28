'use server';

import Stripe from 'stripe';
import { headers } from 'next/headers';

let stripeInstance: Stripe | null = null;

function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error('STRIPE_SECRET_KEY is missing. Please configure it in your environment variables.');
  }
  
  if (!stripeInstance) {
    stripeInstance = new Stripe(apiKey, {
      apiVersion: '2024-12-18.acacia' as any,
    });
  }
  return stripeInstance;
}

/**
 * Creates a hosted Stripe Checkout Session for custom amounts.
 * Enforces a minimum of €5.00 for technical and processing integrity.
 */
export async function createCheckoutSession(amount: number) {
  const headersList = await headers();
  const origin = headersList.get('origin');

  // Strict server-side validation
  if (amount < 5) {
    throw new Error('Minimum contribution is €5.00');
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: "Support Sheraz's Open Source Mission",
              description: 'Strategic contribution to fund high-fidelity AI tools and inclusive engineering.',
              images: ['https://synctech.ie/_next/image?url=%2Ffounder.jpg&w=640&q=75'],
            },
            unit_amount: Math.round(amount * 100), // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/support?success=true`,
      cancel_url: `${origin}/support?canceled=true`,
    });

    return { url: session.url };
  } catch (error: any) {
    console.error('Stripe Error:', error);
    throw new Error(error.message || 'Failed to create checkout session');
  }
}
