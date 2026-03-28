import React from 'react';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

const paymentMethods = [
  { name: 'Apple Pay', data: placeholderImages.payments.applePay },
  { name: 'Google Pay', data: placeholderImages.payments.googlePay },
  { name: 'Visa', data: placeholderImages.payments.visa },
  { name: 'Mastercard', data: placeholderImages.payments.mastercard },
  { name: 'American Express', data: placeholderImages.payments.amex },
  { name: 'Klarna', data: placeholderImages.payments.klarna },
  { name: 'Revolut Pay', data: placeholderImages.payments.revolutPay }
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/50 py-12 px-6 text-center border-t">
      <div className="max-w-[860px] mx-auto space-y-8">
        
        {/* Payment Methods Section */}
        <div className="space-y-4">
          <p className="font-space-mono text-[8px] uppercase tracking-[0.3em] opacity-40">
            Secure Payments Accepted Via
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 transition-all duration-500">
            {paymentMethods.map((method) => (
              <div key={method.name} className="relative h-6 w-14 md:h-8 md:w-16 flex items-center justify-center">
                <Image
                  src={method.data.src}
                  alt={method.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 56px, 64px"
                  data-ai-hint={method.data.hint}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="thick-rule !my-8 opacity-10" />

        <div className="space-y-4">
          <p className="font-space-mono text-[10px] uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} <strong className="text-primary">Sheraz Hussain</strong> · Dublin, Ireland · First-Class Honours Software Engineer & AI Architect
          </p>
          <p className="font-space-mono text-[9px] uppercase tracking-widest opacity-60">
            github.com/SherazHussain546 · linkedin.com/in/sherazhussain546 · synctech.ie
          </p>
        </div>
      </div>
    </footer>
  );
}
