
'use server';

import Stripe from 'stripe';
import { headers } from 'next/headers';

let stripeInstance: Stripe | null = null;

function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  // Resilient check for placeholders
  if (!apiKey || apiKey.startsWith('YOUR_') || apiKey === 'sk_test_...') {
    throw new Error('STRIPE_SECRET_KEY is not configured with a valid key.');
  }
  
  if (!stripeInstance) {
    stripeInstance = new Stripe(apiKey, {
      apiVersion: '2024-12-18.acacia' as any, // Utilizing stable release for production integrity
    });
  }
  return stripeInstance;
}

/**
 * Creates an High-Fidelity Checkout Session for custom amounts.
 * Incorporates Automatic Tax, Tax ID collection, and Dynamic Payment Configurations.
 */
export async function createCheckoutSession(amount: number) {
  const headersList = await headers();
  const origin = headersList.get('origin');

  if (amount < 5) {
    throw new Error('Minimum contribution is €5.00');
  }

  try {
    const stripe = getStripe();
    
    // Creating session with full spectrum parameters for international compliance
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
      
      // Advanced Global Configuration for international tax compliance
      automatic_tax: { enabled: true },
      tax_id_collection: { enabled: true },
      
      // Payment Integrity Options
      submit_type: 'donate',
      
      // Custom Billing Info Collection to satisfy KYC/AML requirements
      billing_address_collection: 'required',
      
      // Phone number collection for high-trust verification
      phone_number_collection: {
        enabled: true,
      },
    });

    return { clientSecret: session.client_secret };
  } catch (error: any) {
    console.error('High-Fidelity Stripe Error:', error);
    throw new Error(error.message || 'Failed to initiate secure checkout pipeline.');
  }
}

/**
 * Retrieves the status of a checkout session.
 */
export async function getSessionStatus(sessionId: string) {
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return {
      status: session.status,
      customer_email: session.customer_details?.email
    };
  } catch (error: any) {
    console.error('Stripe Retrieve Error:', error);
    throw new Error('Failed to retrieve session status');
  }
}
