'use server';

import Stripe from 'stripe';
import { headers } from 'next/headers';

let stripeInstance: Stripe | null = null;

/**
 * Initializes and returns a singleton instance of the Stripe client.
 * Configured with the latest stable API version for technical integrity.
 */
function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  
  // Production Integrity Check: Ensure key exists and is not a placeholder
  if (!apiKey || apiKey.startsWith('YOUR_') || apiKey === 'sk_test_...') {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('CRITICAL: STRIPE_SECRET_KEY is missing or invalid in production environment.');
    }
  }
  
  if (!stripeInstance && apiKey) {
    stripeInstance = new Stripe(apiKey, {
      apiVersion: '2024-12-18.acacia' as any,
    });
  }
  return stripeInstance;
}

/**
 * Creates a High-Fidelity Embedded Checkout Session.
 * Incorporates Global Tax Compliance, Tax ID collection, and Dynamic Payment Configurations.
 */
export async function createCheckoutSession(amount: number) {
  const headersList = await headers();
  const origin = headersList.get('origin');

  if (amount < 5) {
    throw new Error('Minimum contribution threshold is €5.00');
  }

  const stripe = getStripe();
  if (!stripe) {
    throw new Error('Stripe infrastructure is not initialized. Verify server-side environment variables.');
  }

  try {
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
      
      // Global Compliance & Security Architecture
      automatic_tax: { enabled: true },
      tax_id_collection: { enabled: true },
      submit_type: 'donate',
      billing_address_collection: 'required',
      
      // Phone number collection for high-trust verification
      phone_number_collection: {
        enabled: true,
      },

      // Custom metadata for tracking and analytics integrity
      metadata: {
        type: 'portfolio_support',
        source: 'sheraz.synctech.ie',
        timestamp: new Date().toISOString(),
      }
    });

    return { clientSecret: session.client_secret };
  } catch (error: any) {
    console.error('High-Fidelity Stripe Error:', error);
    throw new Error(error.message || 'Failed to initiate secure checkout pipeline.');
  }
}

/**
 * Retrieves the status of a specific checkout session.
 */
export async function getSessionStatus(sessionId: string) {
  const stripe = getStripe();
  if (!stripe) throw new Error('Stripe not initialized');
  
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return {
      status: session.status,
      customer_email: session.customer_details?.email
    };
  } catch (error: any) {
    console.error('Stripe Retrieve Error:', error);
    throw new Error('Failed to verify session status.');
  }
}
