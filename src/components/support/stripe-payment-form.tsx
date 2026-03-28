'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Zap, Loader2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { createCheckoutSession } from '@/app/actions/stripe';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function StripePaymentForm() {
  const [amount, setAmount] = useState<string>('25');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount) || numAmount < 5) {
      toast({
        variant: 'destructive',
        title: 'Threshold Not Met',
        description: 'Please enter an amount of at least €5.00 to support the mission.',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await createCheckoutSession(numAmount);
      if (response.url) {
        window.location.href = response.url;
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Pipeline Error',
        description: error.message || 'Could not initiate Stripe checkout. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = ['10', '25', '50', '100'];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="amount" className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
          <CreditCard className="h-3 w-3" />
          Contribution (EUR)
        </Label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-primary">€</span>
          <Input
            id="amount"
            type="number"
            min="5"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-10 h-14 rounded-none border-2 border-primary/10 focus:border-primary transition-all font-bold text-xl bg-muted/5 font-sans"
            placeholder="5.00"
          />
        </div>
        <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 opacity-60">
          <AlertCircle className="h-3 w-3" />
          Minimum support threshold: €5.00
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {quickAmounts.map((q) => (
          <Button
            key={q}
            variant="outline"
            size="sm"
            type="button"
            onClick={() => setAmount(q)}
            className={cn(
              "h-10 rounded-none font-bold transition-all font-mono text-[10px]",
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
        className="w-full h-14 rounded-none font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white transition-all hover:scale-[1.02] active:scale-95"
      >
        {loading ? (
          <Loader2 className="mr-3 h-5 w-5 animate-spin" />
        ) : (
          <Zap className="mr-3 h-5 w-5" />
        )}
        {loading ? 'Processing...' : 'Deploy Contribution'}
      </Button>

      <div className="flex items-center justify-center gap-4 opacity-30 grayscale hover:grayscale-0 transition-all pt-2">
        <p className="text-[8px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5">
          <ShieldCheck className="h-2.5 w-2.5" />
          Stripe Secured
        </p>
        <p className="text-[8px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5">
          <Sparkles className="h-2.5 w-2.5" />
          Verified Integrity
        </p>
      </div>
    </div>
  );
}
