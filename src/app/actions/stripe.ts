
'use server';

import Stripe from 'stripe';
import { headers } from 'next/headers';

let stripeInstance: Stripe | null = null;

function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  // resiliant check for placeholders
  if (!apiKey || apiKey.startsWith('YOUR_') || apiKey === 'sk_test_...') {
    throw new Error('STRIPE_SECRET_KEY is not configured with a valid key.');
  }
  
  if (!stripeInstance) {
    stripeInstance = new Stripe(apiKey, {
      apiVersion: '2024-12-18.acacia' as any,
    });
  }
  return stripeInstance;
}

/**
 * Creates an Embedded Checkout Session for custom amounts.
 * Enforces a minimum of €5.00 for technical and processing integrity.
 */
export async function createCheckoutSession(amount: number) {
  const headersList = await headers();
  const origin = headersList.get('origin');

  if (amount < 5) {
    throw new Error('Minimum contribution is €5.00');
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: "Support Sheraz's Open Source Mission",
              description: 'Strategic contribution to fund high-fidelity AI tools and inclusive engineering.',
              images: [`${origin}/founder.jpg`],
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `${origin}/support?success=true&session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: true },
    });

    return { clientSecret: session.client_secret };
  } catch (error: any) {
    console.error('Stripe Error:', error);
    throw new Error(error.message || 'Failed to create checkout session');
  }
}
