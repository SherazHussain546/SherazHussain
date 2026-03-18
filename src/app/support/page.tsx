
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
  Github
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Script from 'next/script';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { projectGoals } from '@/lib/data';

export default function SupportPage() {
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast({
      title: 'Copied!',
      description: `${label} has been copied to your clipboard.`,
    });
    setTimeout(() => setCopied(null), 2000);
  };

  const bankDetails = {
    beneficiary: 'Sheraz Hussain',
    iban: 'IE25 REVO 9903 6011 9835 69',
    bic: 'REVOIE23',
    bankName: 'Revolut Bank UAB',
    bankAddress: '2 Dublin Landings, North Dock, Dublin 1, D01 V4A3, Ireland',
    correspondentBic: 'CHASDEFX'
  };

  const supportMethods = [
    {
      title: 'GitHub Sponsors',
      description: 'Support my open-source journey and technical research directly through GitHub Sponsors.',
      icon: Github,
      actionLabel: 'Become a Sponsor',
      link: 'https://github.com/sponsors/SherazHussain546',
      color: 'bg-primary/10 text-primary',
      isSponsor: true
    },
    {
      title: 'Buy Me a Coffee',
      description: 'The quickest way to support daily AI tool development and coffee-fueled coding sessions.',
      icon: Coffee,
      actionLabel: 'Support via Coffee',
      link: 'https://www.buymeacoffee.com/sherazhussain546',
      color: 'bg-orange-500/10 text-orange-600',
      badge: true
    },
    {
      title: 'Web3 & Crypto',
      description: 'Support using decentralized finance via my Unstoppable Domain. Secure and borderless.',
      icon: Coins,
      value: 'sherazhussain.unstoppable',
      actionLabel: 'Pay via Web3 Profile',
      link: 'https://ud.me/sherazhussain.unstoppable',
      color: 'bg-blue-500/10 text-blue-600',
      isWeb3: true
    },
    {
      title: 'GoFundMe',
      description: 'Invest in long-term infrastructure, large-scale AI research, and open-source sustainability.',
      icon: Heart,
      actionLabel: 'Contribute to the Goal',
      link: 'https://www.gofundme.com/f/be-a-part-of-my-new-projects', 
      color: 'bg-emerald-500/10 text-emerald-600',
    },
    {
      title: 'Enterprise & Revolut',
      description: 'Direct Euro bank transfers and high-speed Revolut Pay checkout for professional consulting.',
      icon: Building2,
      actionLabel: 'Pay via Revolut',
      link: 'https://checkout.revolut.com/pay/2bdfa9a9-0137-484f-94c7-9ae333896e15',
      color: 'bg-purple-500/10 text-purple-600',
      isEnterprise: true
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFB]">
      <Header />
      <Script defer src="https://www.gofundme.com/static/js/embed.js" />
      
      <main className="flex-1 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-4 py-8 md:py-16 md:px-6">
          <Button asChild variant="ghost" size="sm" className="mb-12 -ml-3 gap-2 text-muted-foreground hover:text-primary">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-8 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.3em] border-primary/40 text-primary bg-primary/5">
                Patron of Modern Engineering
              </Badge>
              <h1 className="text-5xl font-extrabold tracking-tighter text-foreground md:text-8xl mb-8 leading-[1.1]">
                Empower the <span className="text-primary italic">Future</span> of AI.
              </h1>
              <p className="mt-8 text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                As a <span className="font-bold text-foreground">Freelancer working with SYNC TECH Solutions</span>, I dedicate my time to building high-performance AI tools and cloud infrastructure that helps the global tech community scale with integrity.
              </p>
            </motion.div>
          </div>

          {/* Active Project Goals Section */}
          <div className="mx-auto mt-32 max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
                  <Target className="h-4 w-4" />
                  Featured Campaign
              </div>
              <h2 className="text-4xl font-extrabold text-foreground md:text-5xl tracking-tight">Active Project Goals</h2>
            </div>
            
            <div className="grid gap-12 lg:grid-cols-2 items-start">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2.5rem] p-4 shadow-2xl border border-border/50 overflow-hidden h-fit"
              >
                <div 
                  className="gfm-embed" 
                  data-url="https://www.gofundme.com/f/be-a-part-of-my-new-projects/widget/medium?sharesheet=undefined&attribution_id=sl:4cfddb57-1fb9-4af0-896d-6e51bb8e9711"
                ></div>
              </motion.div>
              
              <div className="space-y-10 pt-4">
                {projectGoals.map((goal, idx) => {
                  const IconComponent = (Icons as any)[goal.iconName] || Icons.HelpCircle;
                  return (
                    <motion.div 
                      key={goal.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-6"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">{goal.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {goal.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Featured Posts Section - Strategic Update Feed */}
          <div className="mt-40">
            <PostsSection 
              title={<>Ongoing <span className="text-primary">Projects</span></>}
              subtitle="Strategic updates and progress reports on active engineering initiatives powered by your support."
              showImages={false}
            />
          </div>

          {/* Support Methods Grid */}
          <div className="mx-auto mt-40 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {supportMethods.map((method, idx) => (
              <motion.div 
                key={method.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (0.1 * idx) }}
              >
                <Card className="group flex flex-col h-full border-border/40 bg-white/70 backdrop-blur-md transition-all hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50">
                  <CardHeader className="space-y-4">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-inner transition-transform group-hover:scale-110 ${method.color}`}>
                      <method.icon className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-xl flex items-center gap-2">
                        {method.title}
                        {method.isWeb3 && <Zap className="h-3 w-3 text-blue-500 animate-pulse" />}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed font-medium">
                        {method.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    {method.isSponsor && (
                      <div className="flex justify-center py-4 bg-primary/5 rounded-xl border border-dashed border-primary/20">
                        <iframe 
                          src="https://github.com/sponsors/SherazHussain546/button" 
                          title="Sponsor SherazHussain546" 
                          height="32" 
                          width="114" 
                          style={{ border: 0, borderRadius: '6px' }}
                        ></iframe>
                      </div>
                    )}
                    {method.badge && (
                      <div className="flex justify-center py-2">
                        <Link href={method.link!} target="_blank" className="transition-transform hover:scale-105 active:scale-95">
                          <img 
                            src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=sherazhussain546&button_colour=004080&font_colour=ffffff&font_family=Arial&outline_colour=ffffff&coffee_colour=FFDD00" 
                            alt="Support Sheraz Hussain on Buy me a coffee"
                            className="h-11 shadow-md rounded-xl"
                          />
                        </Link>
                      </div>
                    )}
                    {method.value && (
                      <div className="flex items-center justify-between rounded-2xl border bg-muted/20 p-4 transition-colors hover:bg-muted/40 group/copy">
                        <code className="text-[11px] font-mono font-bold tracking-tight text-primary truncate max-w-[150px]">
                            {method.value}
                        </code>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => copyToClipboard(method.value!, 'Web3 Domain')}
                          className="h-8 w-8 p-0"
                        >
                          {copied === 'Web3 Domain' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto flex flex-col gap-2">
                    {method.isEnterprise ? (
                      <>
                        <Button asChild className="w-full h-12 rounded-xl font-bold tracking-wide shadow-lg hover:shadow-primary/20 bg-primary hover:bg-primary/90">
                          <Link href={method.link!} target="_blank">
                             <CreditCard className="mr-2 h-4 w-4" />
                             {method.actionLabel}
                          </Link>
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-2">
                              View Bank Details
                              <Building2 className="ml-2 h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md bg-white">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-primary" />
                                Bank Transfer Details
                              </DialogTitle>
                              <DialogDescription>
                                Use these details for direct contributions or enterprise consulting payments.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <div className="rounded-2xl border p-4 bg-muted/5 space-y-3">
                                <div className="flex flex-col gap-1">
                                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Beneficiary</span>
                                  <span className="text-sm font-semibold">{bankDetails.beneficiary}</span>
                                </div>
                                <div className="flex flex-col gap-1 relative group">
                                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">IBAN (Euro)</span>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-mono font-bold text-primary">{bankDetails.iban}</span>
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(bankDetails.iban, 'IBAN')}>
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">BIC / SWIFT</span>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-mono font-bold text-primary">{bankDetails.bic}</span>
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(bankDetails.bic, 'BIC')}>
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </>
                    ) : (
                      <Button asChild className="w-full h-12 rounded-xl font-bold tracking-wide shadow-lg hover:shadow-primary/20">
                        <Link href={method.link!} target={method.link!.startsWith('mailto') ? '_self' : '_blank'}>
                          {method.actionLabel}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Web3 Spotlight */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-40 max-w-5xl rounded-[3rem] bg-[#071739] p-12 text-white relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[120px]" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 space-y-8 text-center md:text-left">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-bold uppercase tracking-[0.4em]">
                  <Globe className="h-4 w-4" />
                  Decentralized Web3 Handle
                </div>
                <h2 className="text-4xl font-bold md:text-5xl tracking-tight">Censorship-Resistant Innovation</h2>
                <p className="text-white/70 text-lg leading-relaxed font-light">
                  By supporting my Web3 identity, you fund the research of decentralized AI tools that remain free from intrusive corporate data harvesting.
                </p>
                <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-4">
                  <Badge variant="outline" className="text-white border-[#F7931A] bg-[#F7931A] px-5 py-1.5 font-mono text-[10px] tracking-widest uppercase">Bitcoin</Badge>
                  <Badge variant="outline" className="text-white border-[#0033AD] bg-[#0033AD] px-5 py-1.5 font-mono text-[10px] tracking-widest uppercase">Cardano</Badge>
                  <Badge variant="outline" className="text-white border-[#9945FF] bg-[#9945FF] px-5 py-1.5 font-mono text-[10px] tracking-widest uppercase">Solana</Badge>
                </div>
              </div>
              <div className="w-full md:w-96">
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl text-center group transition-all hover:bg-white/10 border-t-white/20">
                  <div className="font-mono text-[10px] mb-3 opacity-40 uppercase tracking-[0.3em]">Universal Handle</div>
                  <div className="text-xl font-bold text-primary break-all leading-snug">sherazhussain.unstoppable</div>
                  <div className="mt-10 flex flex-col gap-3">
                    <Button asChild className="w-full h-14 rounded-2xl bg-white text-[#071739] hover:bg-primary hover:text-white font-bold transition-all">
                        <Link href="https://ud.me/sherazhussain.unstoppable" target="_blank">
                           View Web3 Profile
                           <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" className="w-full h-12 rounded-2xl border border-white/20 text-white hover:bg-white/10 font-bold transition-all" onClick={() => copyToClipboard('sherazhussain.unstoppable', 'Domain')}>
                        Copy Handle
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
