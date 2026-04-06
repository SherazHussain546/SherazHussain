'use client';

import { Button } from '@/components/ui/button';
import { Zap, ShieldCheck, Sparkles, Heart } from 'lucide-react';
import Link from 'next/link';

/**
 * StripePaymentForm - The High-Fidelity Engagement Layer.
 * Re-engineered to utilize a direct Stripe Payment Link for global scalability and maximum security.
 */
export default function StripePaymentForm() {
  const stripeLink = "https://donate.stripe.com/3cI9ATfTL8112VB0pBbMQ00";

  return (
    <div className="space-y-8 py-4">
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Heart className="h-8 w-8 text-primary fill-primary/20" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold font-playfair">Strategic Contribution</h3>
          <p className="text-sm text-muted-foreground leading-relaxed px-4">
            Direct your support through our verified global pipeline. You will be redirected to our secure Stripe payment portal to complete your transaction.
          </p>
        </div>
      </div>

      <Button 
        asChild
        className="w-full h-16 rounded-none font-bold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white transition-all hover:scale-[1.02] active:scale-95 group"
      >
        <Link href={stripeLink} target="_blank">
          <Zap className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
          Initiate Secure Support
        </Link>
      </Button>

      <div className="flex flex-col items-center gap-4 pt-4">
        <div className="flex items-center justify-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all">
          <p className="text-[9px] font-mono font-bold uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck className="h-3 w-3 text-emerald-600" />
            Stripe Secured
          </p>
          <p className="text-[9px] font-mono font-bold uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="h-3 w-3 text-primary" />
            Verified Integrity
          </p>
        </div>
        <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 text-center max-w-[200px]">
          By clicking, you agree to our privacy protocols and high-fidelity transaction standards.
        </p>
      </div>
    </div>
  );
}
