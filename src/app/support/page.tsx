'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import PostsSection from '@/components/portfolio/posts-section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Coffee, 
  Heart, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck,
  Zap,
  Globe,
  Target,
  CreditCard,
  ArrowLeft,
  Github,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { useState, useEffect, Suspense } from 'react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Script from 'next/script';
import { projectGoals } from '@/lib/data';
import StripePaymentForm from '@/components/support/stripe-payment-form';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

/**
 * SupportPageContent - The core engagement layer.
 * Wrapped in Suspense to handle useSearchParams in static/dynamic hybrid environments.
 */
function SupportPageContent() {
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('success')) {
      toast({
        title: 'Mission Supported!',
        description: 'Thank you for your generous contribution to inclusive innovation.',
      });
    }
    if (searchParams.get('canceled')) {
      toast({
        variant: 'destructive',
        title: 'Payment Canceled',
        description: 'The transaction was not completed.',
      });
    }
  }, [searchParams, toast]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast({
      title: 'Copied!',
      description: `${label} has been copied to your clipboard.`,
    });
    setTimeout(() => setCopied(null), 2000);
  };

  const supportMethods = [
    {
      title: 'GitHub Sponsors',
      description: 'The definitive platform for supporting open-source engineers.',
      icon: Github,
      actionLabel: 'Sponsor Profile',
      link: 'https://github.com/sponsors/SherazHussain546',
      color: 'bg-slate-900 text-slate-100',
    },
    {
      title: 'Buy Me a Coffee',
      description: 'Fueling late-night engineering sessions and research.',
      icon: Coffee,
      actionLabel: 'Fuel the Code',
      link: 'https://www.buymeacoffee.com/sherazhussain546',
      color: 'bg-[#FF813F]/10 text-[#FF813F]',
    },
    {
      title: 'GoFundMe Campaign',
      description: 'Crowdfunding infrastructure for large-scale AI tools.',
      icon: Heart,
      actionLabel: 'View Campaign',
      link: 'https://www.gofundme.com/f/be-a-part-of-my-new-projects', 
      color: 'bg-emerald-500/10 text-emerald-600',
    }
  ];

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-20">
      <Button asChild variant="ghost" size="sm" className="mb-12 -ml-3 gap-2 text-muted-foreground hover:text-primary font-mono text-[10px] uppercase tracking-widest">
        <Link href="/">
          <ArrowLeft className="h-3 w-3" />
          Return to Portfolio
        </Link>
      </Button>

      <div className="grid gap-16 lg:grid-cols-12 items-start mb-32">
        {/* Left: Narrative & Mission (7 cols) */}
        <div className="lg:col-span-7 space-y-12">
          <section className="drop-cap font-sans font-light text-lg md:text-xl leading-relaxed text-foreground/90 space-y-6">
            <p>
              I believe that the power of Artificial Intelligence should not be locked behind corporate paywalls or technical jargon. As an elite engineer, my mission is to build high-fidelity, open-source platforms that simplify complex processes—from financial analysis to career development.
            </p>
            <p>
              Your support directly funds the infrastructure, compute power, and research time required to keep these resources free, fast, and secure for the global community. Whether it's scaling GPU clusters for real-time AI reasoning or maintaining open-source integrity, every contribution fuels a more accessible digital future.
            </p>
          </section>

          <div className="thick-rule" />

          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-primary" />
              <h2 className="font-playfair text-2xl font-bold">Technical Milestones</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {projectGoals.map((goal, idx) => (
                <Card key={idx} className="bg-muted/5 border-border/50 hover:bg-muted/10 transition-colors rounded-none">
                  <CardHeader className="p-6">
                    <Badge variant="outline" className="w-fit mb-2 text-[8px] font-mono tracking-widest rounded-none">PHASE 0{idx + 1}</Badge>
                    <CardTitle className="text-lg font-playfair">{goal.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{goal.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Web3 Module */}
          <div className="bg-[#071739] text-white rounded-none p-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-[9px] font-bold uppercase tracking-[0.3em]">
                <Globe className="h-3 w-3" />
                Borderless Innovation
              </div>
              <h3 className="text-3xl font-playfair font-bold">Decentralized Support</h3>
              <p className="text-white/70 font-light text-lg">
                Support the mission via my Unstoppable Domain handle. Decentralized identity ensures your contributions remain free from corporate harvesting.
              </p>
              <div className="flex items-center justify-between rounded-none border border-white/10 bg-white/5 p-4 group">
                <code className="text-xs font-mono font-bold text-primary truncate max-w-[200px]">
                    sherazhussain.unstoppable
                </code>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => copyToClipboard('sherazhussain.unstoppable', 'Web3 Handle')}
                  className="text-white hover:bg-white/10"
                >
                  {copied === 'Web3 Handle' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Stripe & Contribution (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="shadow-2xl border-primary/20 bg-white sticky top-24 rounded-none">
            <CardHeader className="border-b pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-none bg-primary/10 text-primary">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold font-playfair">Stripe Secure</CardTitle>
                    <CardDescription className="text-xs font-mono uppercase tracking-widest">Encrypted Pipeline</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 font-bold uppercase tracking-widest text-[8px] border-none rounded-none">
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-8 space-y-8">
              <StripePaymentForm />
              
              <div className="pt-6 border-t border-dashed">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4 font-mono">Enterprise Tiers (Future)</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-none border border-border/50 opacity-50 grayscale cursor-not-allowed">
                    <div className="flex items-center gap-3">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="text-xs font-bold font-mono">Strategic Partner</span>
                    </div>
                    <span className="text-[10px] font-mono">SOON</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-none border border-border/50 opacity-50 grayscale cursor-not-allowed">
                    <div className="flex items-center gap-3">
                      <Cpu className="h-4 w-4 text-primary" />
                      <span className="text-xs font-bold font-mono">Infrastructure Patron</span>
                    </div>
                    <span className="text-[10px] font-mono">SOON</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Other methods */}
          <div className="grid gap-4">
            {supportMethods.map((method, idx) => (
              <Link key={idx} href={method.link} target="_blank">
                <Card className="group border-border/40 hover:border-primary/30 transition-all hover:shadow-lg bg-card/50 backdrop-blur-sm rounded-none">
                  <CardHeader className="flex flex-row items-center gap-4 p-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-none ${method.color}`}>
                      <method.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-muted-foreground">{method.title}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold font-playfair">{method.actionLabel}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-40">
        <PostsSection 
          title={<>Mission <span className="text-primary italic">Updates</span></>}
          subtitle="Real-time progress on open-source engineering initiatives."
          showImages={false}
        />
      </div>
    </div>
  );
}

export default function SupportPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans antialiased">
      <Header />
      <Script defer src="https://www.gofundme.com/static/js/embed.js" />
      
      <main className="flex-1">
        {/* MASTHEAD */}
        <header className="bg-foreground text-background py-16 md:py-24 px-6 text-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto max-w-4xl relative z-10"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-6">
              Strategic Mission &nbsp;·&nbsp; {new Date().getFullYear()} Edition
            </p>
            <h1 className="font-playfair text-[clamp(2.5rem,8vw,5rem)] font-black leading-[1.05] tracking-tight mb-6">
              Support the <br />
              <em className="italic text-primary font-normal">Mission of Inclusive Innovation</em>
            </h1>
            <p className="font-playfair italic text-lg md:text-2xl text-background/70 max-w-2xl mx-auto leading-relaxed mb-10">
              Engineering a bridge across the digital divide. Translating elite technology into accessible tools for everyone.
            </p>
            <div className="flex items-center justify-center gap-6 flex-wrap font-mono text-[10px] tracking-widest uppercase text-background/55">
              <span>By Sheraz Hussain</span>
              <span className="text-primary">·</span>
              <span>Open Source Advocate</span>
              <span className="text-primary">·</span>
              <span>AI for All</span>
            </div>
          </motion.div>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} 
          />
        </header>

        <Suspense fallback={<div className="container mx-auto p-20 text-center font-mono text-xs uppercase tracking-widest animate-pulse">Initializing Engagement Layer...</div>}>
          <SupportPageContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
