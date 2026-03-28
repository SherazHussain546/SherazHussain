'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Zap, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { createCheckoutSession } from '@/app/actions/stripe';
import { useToast } from '@/hooks/use-toast';

export default function StripePaymentForm() {
  const [amount, setAmount] = useState<string>('25');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount) || numAmount < 1) {
      toast({
        variant: 'destructive',
        title: 'Invalid Amount',
        description: 'Please enter an amount of at least €1.00',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await createCheckoutSession(numAmount);
      if (response.url) {
        window.location.href = response.url;
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Payment Error',
        description: 'Could not initiate Stripe checkout. Please verify environment variables or try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = ['10', '25', '50', '100'];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="amount" className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
          <CreditCard className="h-3 w-3" />
          Contribution Amount (EUR)
        </Label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-primary">€</span>
          <Input
            id="amount"
            type="number"
            min="1"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-10 h-14 rounded-xl border-2 border-primary/10 focus:border-primary transition-all font-bold text-xl bg-muted/5"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {quickAmounts.map((q) => (
          <Button
            key={q}
            variant="outline"
            size="sm"
            onClick={() => setAmount(q)}
            className={cn(
              "h-10 rounded-lg font-bold transition-all",
              amount === q 
                ? "border-primary bg-primary text-white hover:bg-primary" 
                : "hover:border-primary/30 hover:bg-primary/5"
            )}
          >
            €{q}
          </Button>
        ))}
      </div>

      <Button 
        onClick={handlePayment} 
        disabled={loading}
        className="w-full h-14 rounded-xl font-bold text-md tracking-wider shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white transition-all hover:scale-[1.02] active:scale-95"
      >
        {loading ? (
          <Loader2 className="mr-3 h-5 w-5 animate-spin" />
        ) : (
          <Zap className="mr-3 h-5 w-5" />
        )}
        {loading ? 'Initiating Secure Command...' : 'Deploy Contribution'}
      </Button>

      <div className="flex items-center justify-center gap-4 opacity-30 grayscale hover:grayscale-0 transition-all pt-2">
        <p className="text-[8px] font-bold uppercase tracking-widest flex items-center gap-1.5">
          <ShieldCheck className="h-2.5 w-2.5" />
          Stripe Secured
        </p>
        <p className="text-[8px] font-bold uppercase tracking-widest flex items-center gap-1.5">
          <Sparkles className="h-2.5 w-2.5" />
          Sheraz Hussain Approved
        </p>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
