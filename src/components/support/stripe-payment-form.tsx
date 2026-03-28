
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Sparkles, Loader2 } from 'lucide-react';
import { createCheckoutSession } from '@/app/actions/stripe';
import { useToast } from '@/hooks/use-toast';

export default function StripePaymentForm() {
  const [amount, setAmount] = useState<string>('10');
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
        description: 'Could not initiate Stripe checkout. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = ['5', '10', '25', '50'];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Custom Amount (EUR)
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">€</span>
          <Input
            id="amount"
            type="number"
            min="1"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-8 h-12 rounded-xl border-2 focus:border-primary/50 transition-all font-bold text-lg"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {quickAmounts.map((q) => (
          <Button
            key={q}
            variant="outline"
            size="sm"
            onClick={() => setAmount(q)}
            className={`rounded-lg font-bold border-2 transition-all ${
              amount === q ? 'border-primary bg-primary/5 text-primary' : 'hover:border-primary/30'
            }`}
          >
            €{q}
          </Button>
        ))}
      </div>

      <Button 
        onClick={handlePayment} 
        disabled={loading}
        className="w-full h-12 rounded-xl font-bold tracking-wide shadow-lg hover:shadow-primary/20 bg-[#635BFF] hover:bg-[#5851e5] text-white"
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <CreditCard className="mr-2 h-4 w-4" />
        )}
        {loading ? 'Processing...' : 'Secure Pay with Stripe'}
      </Button>

      <p className="text-[9px] text-center text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-2">
        <Sparkles className="h-3 w-3" />
        Powered by Stripe Secure Engineering
      </p>
    </div>
  );
}
