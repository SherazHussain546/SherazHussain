
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
  Wallet, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck,
  Zap,
  Globe,
  Coins,
  Cpu,
  Users,
  Target,
  Building2,
  Info,
  CreditCard,
  ArrowLeft,
  Github,
  Sparkles
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Script from 'next/script';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { projectGoals } from '@/lib/data';
import StripePaymentForm from '@/components/support/stripe-payment-form';
import { useSearchParams } from 'next/navigation';

export default function SupportPage() {
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
      title: 'Stripe Secure',
      description: 'Direct, custom contributions processed via Stripe. High-fidelity and secure.',
      icon: CreditCard,
      color: 'bg-indigo-500/10 text-indigo-600',
      isStripe: true,
      priority: true
    },
    {
      title: 'GitHub Sponsors',
      description: 'Support the development of elite open-source AI tools and infrastructure.',
      icon: Github,
      actionLabel: 'Become a Sponsor',
      link: 'https://github.com/sponsors/SherazHussain546',
      color: 'bg-slate-900 text-slate-100',
    },
    {
      title: 'Buy Me a Coffee',
      description: 'The most direct way to fuel daily development sessions and technical research.',
      icon: Coffee,
      actionLabel: 'Fuel the Code',
      link: 'https://www.buymeacoffee.com/sherazhussain546',
      color: 'bg-orange-500/10 text-orange-600',
      badge: true
    },
    {
      title: 'Web3 & Decentralized',
      description: 'Support borderless innovation via my Unstoppable Domain handle.',
      icon: Coins,
      value: 'sherazhussain.unstoppable',
      actionLabel: 'View Web3 Profile',
      link: 'https://ud.me/sherazhussain.unstoppable',
      color: 'bg-blue-500/10 text-blue-600',
      isWeb3: true
    },
    {
      title: 'GoFundMe Campaign',
      description: 'Contribute to long-term infrastructure and large-scale AI research initiatives.',
      icon: Heart,
      actionLabel: 'View Campaign',
      link: 'https://www.gofundme.com/f/be-a-part-of-my-new-projects', 
      color: 'bg-emerald-500/10 text-emerald-600',
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFB]">
      <Header />
      <Script defer src="https://www.gofundme.com/static/js/embed.js" />
      
      <main className="flex-1 relative overflow-hidden">
        {/* Engineering Background Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-4 py-8 md:py-16 md:px-6">
          <Button asChild variant="ghost" size="sm" className="mb-12 -ml-3 gap-2 text-muted-foreground hover:text-primary transition-all">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="mx-auto max-w-4xl text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-8 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.3em] border-primary/40 text-primary bg-primary/5">
                Objective: Inclusive Innovation
              </Badge>
              <h1 className="text-4xl font-extrabold tracking-tighter text-foreground md:text-8xl mb-8 leading-[1.1]">
                Support the <span className="text-primary italic">Mission</span>.
              </h1>
              <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                I am engineering a bridge across the digital divide. By building high-fidelity, open-source AI platforms, I translate elite technology into accessible tools for everyone. Your support directly funds the infrastructure and time required to keep these resources free, fast, and secure.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 items-start mb-32">
            {/* Main Stripe Contribution Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <Card className="shadow-2xl border-primary/20 bg-white relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                <CardHeader className="relative z-10 border-b pb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">Stripe Secure Command</CardTitle>
                        <CardDescription>Instant card processing for strategic contributions.</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 font-bold uppercase tracking-widest text-[9px] border-none">
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-10 pb-12">
                  <div className="max-w-md mx-auto space-y-8">
                    <div className="text-center space-y-2 mb-10">
                      <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">Custom Contribution</h3>
                      <p className="text-xs text-muted-foreground">Select or enter an amount to fund ongoing AI research.</p>
                    </div>
                    <StripePaymentForm />
                    <div className="pt-8 mt-8 border-t border-dashed space-y-4">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="text-xs font-medium">Future: Subscription models for Enterprise support incoming.</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        <span className="text-xs font-medium">Encrypted & Secure: Powered by Stripe technical integrity.</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Campaign Sidebar */}
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-emerald-500/20 bg-emerald-500/[0.02] overflow-hidden">
                  <CardHeader className="pb-4">
                    <Badge className="w-fit mb-2 bg-emerald-500 text-white border-none uppercase text-[9px] tracking-widest">Active Campaign</Badge>
                    <CardTitle className="text-lg">Technical Milestones</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="gfm-embed h-[400px] overflow-hidden rounded-xl border" data-url="https://www.gofundme.com/f/be-a-part-of-my-new-projects/widget/medium"></div>
                    <p className="text-xs text-muted-foreground leading-relaxed italic">
                      Tracking large-scale infrastructure goals including GPU cluster expansion and global CDN deployment.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-widest font-bold text-primary">Impact Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projectGoals.map((goal, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                        <Target className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold leading-none mb-1">{goal.title}</p>
                        <p className="text-[10px] text-muted-foreground leading-tight">{goal.description.split('.')[0]}.</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Support Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-32">
            {supportMethods.filter(m => !m.isStripe).map((method, idx) => (
              <motion.div 
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Card className="group h-full border-border/40 bg-white hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader className="space-y-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${method.color}`}>
                      <method.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {method.title}
                        {method.isWeb3 && <Badge variant="outline" className="text-[8px] h-4 border-blue-200 text-blue-600 bg-blue-50 uppercase tracking-widest">Web3</Badge>}
                      </CardTitle>
                      <CardDescription className="text-xs leading-relaxed">
                        {method.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {method.badge && (
                      <Link href={method.link!} target="_blank" className="block transition-transform hover:scale-[1.02] active:scale-95">
                        <img 
                          src="https://img.buymeacoffee.com/button-api/?text=Fuel Sheraz's Code&emoji=☕&slug=sherazhussain546&button_colour=004080&font_colour=ffffff&font_family=Arial&outline_colour=ffffff&coffee_colour=FFDD00" 
                          alt="Support Sheraz Hussain"
                          className="h-10 w-full object-contain shadow-md rounded-xl"
                        />
                      </Link>
                    )}
                    {method.value && (
                      <div className="flex items-center justify-between rounded-xl border bg-muted/20 p-3 transition-colors hover:bg-muted/40 group/copy">
                        <code className="text-[10px] font-mono font-bold tracking-tight text-primary truncate max-w-[180px]">
                            {method.value}
                        </code>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => copyToClipboard(method.value!, 'Handle')}
                          className="h-8 w-8 p-0"
                        >
                          {copied === 'Handle' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <Button asChild className="w-full h-10 rounded-xl font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-primary/20">
                      <Link href={method.link!} target="_blank">
                        {method.actionLabel}
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Decentralized AI Future Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-5xl rounded-[3rem] bg-[#071739] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
            <div className="relative z-10 grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-bold uppercase tracking-[0.4em]">
                  <Globe className="h-4 w-4" />
                  Censorship-Resistant Innovation
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Decentralized AI Future</h2>
                <p className="text-white/70 text-lg leading-relaxed font-light">
                  Supporting my decentralized identity funds the development of AI tools that remain open, secure, and free from corporate harvesting. We are engineering a future where elite tech belongs to the community.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="text-white border-white/20 bg-white/5 px-4 py-1.5 font-mono text-[9px] uppercase tracking-widest">Bitcoin Verified</Badge>
                  <Badge variant="outline" className="text-white border-white/20 bg-white/5 px-4 py-1.5 font-mono text-[9px] uppercase tracking-widest">Solana Ready</Badge>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl text-center">
                <div className="font-mono text-[10px] mb-4 opacity-40 uppercase tracking-[0.3em]">Universal Handle</div>
                <div className="text-xl md:text-2xl font-bold text-primary break-all mb-8">sherazhussain.unstoppable</div>
                <div className="flex flex-col gap-3">
                  <Button asChild className="w-full h-12 rounded-2xl bg-white text-[#071739] hover:bg-primary hover:text-white font-bold transition-all">
                      <Link href="https://ud.me/sherazhussain.unstoppable" target="_blank">
                         Inspect Profile
                         <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                  </Button>
                  <Button variant="ghost" className="w-full h-12 rounded-2xl border border-white/20 text-white hover:bg-white/10 font-bold transition-all" onClick={() => copyToClipboard('sherazhussain.unstoppable', 'Domain')}>
                      Copy Handle
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-40">
            <PostsSection 
              title={<>Mission <span className="text-primary">Updates</span></>}
              subtitle="Real-time insights and progress reports on open-source engineering initiatives powered by your contributions."
              showImages={false}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
