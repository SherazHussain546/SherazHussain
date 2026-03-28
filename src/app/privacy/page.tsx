'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShieldCheck, Lock, Globe, CreditCard, ArrowLeft, Info } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  const paymentMethods = [
    { 
      id: 'apple-pay', 
      name: 'Apple Pay', 
      banks: 'Major Irish and international banks including AIB, Bank of Ireland, Revolut, and N26.',
      security: 'Apple Pay uses a device-specific number and a unique transaction code. Your card number is never stored on your device or Apple servers.'
    },
    { 
      id: 'google-pay', 
      name: 'Google Pay', 
      banks: 'Supports most major credit and debit cards from banks globally, including AIB, Ulster Bank, and digital-first banks.',
      security: 'Google Pay protects your payment info with multiple layers of security, using one of the world’s most advanced security infrastructures.'
    },
    { 
      id: 'cards', 
      name: 'Visa, Mastercard & Amex', 
      banks: 'All globally recognized banking institutions providing credit, debit, or prepaid cards.',
      security: 'Processed through Stripe’s PCI Service Provider Level 1 infrastructure—the most stringent level of security available in the payments industry.'
    },
    { 
      id: 'klarna', 
      name: 'Klarna', 
      banks: 'Most consumer banks that support direct debit and card-linked accounts.',
      security: 'Klarna uses high-level encryption and anti-fraud systems to protect your identity and credit information during deferred payments.'
    },
    { 
      id: 'revolut-pay', 
      name: 'Revolut Pay', 
      banks: 'Exclusively for Revolut account holders globally.',
      security: 'Utilizes biometric authentication (FaceID/TouchID) or passcodes within the Revolut app to verify every single transaction.'
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFB]">
      <Header />
      
      <main className="flex-1">
        {/* ──────────────── MASTHEAD ──────────────── */}
        <header className="bg-foreground text-background py-16 md:py-24 px-6 text-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto max-w-4xl relative z-10"
          >
            <p className="font-space-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-6">
              Legal & Technical Integrity &nbsp;·&nbsp; {new Date().getFullYear()} Edition
            </p>
            <h1 className="font-playfair text-[clamp(2.5rem,8vw,5rem)] font-black leading-[1.05] tracking-tight mb-6">
              Privacy <span className="italic text-primary font-normal">&</span> Data <br />
              <em className="italic text-primary font-normal">Sovereignty Protocols</em>
            </h1>
            <p className="font-playfair italic text-lg md:text-2xl text-background/70 max-w-2xl mx-auto leading-relaxed mb-10">
              Engineering absolute transparency. Our commitment to secure AI integration and high-fidelity transaction integrity.
            </p>
          </motion.div>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} 
          />
        </header>

        {/* ──────────────── CONTENT BODY ──────────────── */}
        <div className="max-w-[860px] mx-auto px-6 py-12 md:py-20">
          <Button asChild variant="ghost" size="sm" className="mb-12 -ml-3 gap-2 text-muted-foreground hover:text-primary font-mono text-[10px] uppercase tracking-widest">
            <Link href="/">
              <ArrowLeft className="h-3 w-3" />
              Return to Archives
            </Link>
          </Button>

          <section className="drop-cap font-sans font-light text-lg md:text-xl leading-relaxed text-foreground/90 space-y-8">
            <p>
              I believe that digital privacy is not a luxury—it is a fundamental engineering requirement. As an elite AI Solutions Engineer, I architect systems that prioritize **Data Sovereignty** and **Zero Trust Architecture**. This policy outlines how your information is handled with the highest standards of technical integrity.
            </p>
            <p>
              Every transaction processed through this platform is powered by **Stripe**, ensuring that your sensitive financial data never touches our local servers. We leverage industry-leading encryption and decentralized authentication to protect your identity while you support our mission of inclusive innovation.
            </p>
          </section>

          <hr className="thick-rule" />

          {/* SECURITY PILLARS */}
          <div className="grid gap-8 md:grid-cols-2 mb-20">
            <div className="space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-none bg-primary/10 text-primary mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-playfair text-xl font-bold">Encrypted Pipeline</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All data transfers utilize TLS 1.3 encryption. We employ strict transport security (HSTS) to prevent man-in-the-middle attacks across all project domains.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-none bg-primary/10 text-primary mb-4">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="font-playfair text-xl font-bold">Payment Integrity</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our payment infrastructure is PCI-DSS Level 1 compliant via Stripe. We do not store credit card numbers, CVVs, or biometric data on our infrastructure.
              </p>
            </div>
          </div>

          <section id="faq" className="mt-24">
            <p className="section-label">Payment Intelligence FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Understanding the Secure Payment Matrix</h2>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {paymentMethods.map((method) => (
                <AccordionItem key={method.id} value={method.id} className="border-b-2 border-primary/5">
                  <AccordionTrigger className="font-playfair text-lg font-bold hover:text-primary transition-colors py-6">
                    Payment Architecture: {method.name}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 pb-8">
                    <div className="space-y-2">
                      <h4 className="font-mono text-[10px] uppercase font-bold text-primary tracking-widest">How do I use {method.name}?</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Simply select {method.name} during the secure checkout process. Our Stripe-powered embedded interface will guide you through the native authentication flow on your device.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-mono text-[10px] uppercase font-bold text-primary tracking-widest">How secure is {method.name}?</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {method.security} This ensures your credentials remain sovereign and protected from third-party harvesting.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-mono text-[10px] uppercase font-bold text-primary tracking-widest">Which banks support {method.name}?</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {method.banks}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}

              <AccordionItem value="stripe-cost" className="border-b-2 border-primary/5">
                <AccordionTrigger className="font-playfair text-lg font-bold hover:text-primary transition-colors py-6">
                  Stripe Infrastructure & Logistics
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pb-8">
                  <div className="space-y-2">
                    <h4 className="font-mono text-[10px] uppercase font-bold text-primary tracking-widest">Does it cost extra to use Stripe?</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      No. There are zero additional fees for supporters using Stripe. We absorb the standard transaction processing costs to ensure your contribution directly fuels our open-source AI projects.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-mono text-[10px] uppercase font-bold text-primary tracking-widest">How can we accept these methods?</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      As a high-fidelity engineering platform, we utilize Stripe’s Global Payments Engine. This allows us to dynamically enable local payment methods like Revolut Pay and Klarna to ensure international accessibility.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <div className="pull-quote mt-20">
            <blockquote className="font-playfair italic text-xl md:text-2xl leading-snug">
              "Technical authority is meaningless without trust. We build for privacy first, so innovation can happen without compromise."
            </blockquote>
            <cite className="font-space-mono text-[10px] tracking-widest uppercase text-muted-foreground mt-4 block">
              — Sheraz Hussain, Principal Software Architect
            </cite>
          </div>

          <div className="mt-20 pt-12 border-t text-center">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.2em] mb-4">
              Last Updated: March 2026
            </p>
            <p className="text-[10px] text-muted-foreground/60 max-w-lg mx-auto">
              If you have specific questions regarding data integrity or payment security, please contact the Command Center at sheraz@synctech.ie.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
