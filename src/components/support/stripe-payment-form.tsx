
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Sparkles, Loader2, Zap } from 'lucide-react';
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
    <div className="space-y-8">
      <div className="space-y-4">
        <Label htmlFor="amount" className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
          <CreditCard className="h-3 w-3" />
          Contribution Amount (EUR)
        </Label>
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-primary group-focus-within:text-primary transition-colors">€</span>
          <Input
            id="amount"
            type="number"
            min="1"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-10 h-16 rounded-2xl border-2 border-primary/10 focus:border-primary transition-all font-bold text-2xl shadow-inner bg-muted/5"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {quickAmounts.map((q) => (
          <Button
            key={q}
            variant="outline"
            onClick={() => setAmount(q)}
            className={`h-12 rounded-xl font-bold border-2 transition-all ${
              amount === q 
                ? 'border-primary bg-primary text-white hover:bg-primary hover:text-white' 
                : 'hover:border-primary/30 hover:bg-primary/5 text-muted-foreground'
            }`}
          >
            €{q}
          </Button>
        ))}
      </div>

      <Button 
        onClick={handlePayment} 
        disabled={loading}
        className="w-full h-16 rounded-2xl font-bold text-lg tracking-wide shadow-2xl shadow-primary/20 bg-primary hover:bg-primary/90 text-white transition-all hover:scale-[1.02] active:scale-95"
      >
        {loading ? (
          <Loader2 className="mr-3 h-6 w-6 animate-spin" />
        ) : (
          <Zap className="mr-3 h-6 w-6" />
        )}
        {loading ? 'Processing...' : 'Deploy Contribution'}
      </Button>

      <div className="flex items-center justify-center gap-6 opacity-40 grayscale group-hover:grayscale-0 transition-all">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] flex items-center gap-2">
          <ShieldCheck className="h-3 w-3" />
          Stripe Verified
        </p>
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] flex items-center gap-2">
          <Sparkles className="h-3 w-3" />
          Elite Engineering
        </p>
      </div>
    </div>
  );
}
