'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Coffee, 
  Heart, 
  Wallet, 
  Banknote, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck,
  Activity,
  Zap,
  Globe,
  Coins
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

  const supportMethods = [
    {
      title: 'Buy Me a Coffee',
      description: 'The quickest way to support daily AI tool development and coffee-fueled coding sessions.',
      icon: Coffee,
      actionLabel: 'Support on Buy Me a Coffee',
      link: 'https://www.buymeacoffee.com/sherazhussain546',
      color: 'bg-orange-500/10 text-orange-600',
      badge: true
    },
    {
      title: 'Web3 & Crypto',
      description: 'Support using decentralized finance via my Unstoppable Domain. Secure and borderless.',
      icon: Coins,
      value: 'sherazhussain.unstoppable',
      actionLabel: 'Copy Web3 Domain',
      color: 'bg-blue-500/10 text-blue-600',
      isWeb3: true
    },
    {
      title: 'GoFundMe',
      description: 'Invest in long-term infrastructure, large-scale AI research, and open-source sustainability.',
      icon: Heart,
      actionLabel: 'Contribute via GoFundMe',
      link: 'https://www.gofundme.com/', 
      color: 'bg-emerald-500/10 text-emerald-600',
    },
    {
      title: 'Enterprise Support',
      description: 'Professional sponsorship and bank transfers for high-level consulting and architecture.',
      icon: Banknote,
      details: 'Invoicing available for corporate and professional partners.',
      actionLabel: 'Inquire via Email',
      link: 'mailto:sheraz@synctech.ie',
      color: 'bg-purple-500/10 text-purple-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFB]">
      <Header />
      <main className="flex-1 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 py-16 md:py-32 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-6 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] border-primary/30 text-primary bg-primary/5">
                Support the Mission
              </Badge>
              <h1 className="text-5xl font-extrabold tracking-tight text-foreground md:text-7xl mb-8">
                Empower the <span className="text-primary italic">Future</span> of AI
              </h1>
              <p className="mt-6 text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                As a <span className="font-semibold text-foreground">Freelancer working with SYNC TECH Solutions</span>, I build tools that democratize AI and cloud technology for everyone.
              </p>
            </motion.div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto mt-20 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {supportMethods.map((method) => (
              <motion.div key={method.title} variants={itemVariants}>
                <Card className="group flex flex-col h-full border-border/50 bg-white/50 backdrop-blur-sm transition-all hover:shadow-2xl hover:-translate-y-1 hover:border-primary/30">
                  <CardHeader className="space-y-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3 ${method.color}`}>
                      <method.icon className="h-7 w-7" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-xl flex items-center gap-2">
                        {method.title}
                        {method.isWeb3 && <Zap className="h-3 w-3 text-blue-500 animate-pulse" />}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{method.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    {method.badge && (
                      <div className="flex justify-center py-2">
                        <Link href={method.link!} target="_blank" className="transition-transform hover:scale-105 active:scale-95">
                          <img 
                            src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=sherazhussain546&button_colour=004080&font_colour=ffffff&font_family=Arial&outline_colour=ffffff&coffee_colour=FFDD00" 
                            alt="Buy me a coffee"
                            className="h-10 shadow-sm rounded-lg"
                          />
                        </Link>
                      </div>
                    )}
                    {method.value && (
                      <div className="flex items-center justify-between rounded-xl border bg-muted/30 p-4 transition-colors hover:bg-muted/50">
                        <code className="text-[11px] font-mono font-bold tracking-tight text-primary">{method.value}</code>
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
                    {method.details && (
                      <div className="text-xs font-medium text-muted-foreground bg-muted/20 p-3 rounded-lg border border-dashed italic">
                        {method.details}
                      </div>
                    )}
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    {method.link ? (
                      <Button asChild className="w-full shadow-md">
                        <Link href={method.link} target={method.link.startsWith('mailto') ? '_self' : '_blank'}>
                          {method.actionLabel}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" onClick={() => copyToClipboard(method.value!, 'Web3 Domain')}>
                        {method.actionLabel}
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Web3 Spotlight Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-32 max-w-5xl rounded-[2.5rem] bg-[#071739] p-12 text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-bold uppercase tracking-[0.3em]">
                  <Globe className="h-4 w-4" />
                  Web3 Verified Identity
                </div>
                <h2 className="text-3xl font-bold md:text-4xl">Decentralized Support</h2>
                <p className="text-white/70 text-lg leading-relaxed font-light">
                  Direct support through the blockchain using my Unstoppable Domain. By supporting my Web3 identity, you help build a future of decentralized AI tools and censorship-resistant software.
                </p>
                <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-4">
                  <Badge variant="outline" className="text-white border-white/20 px-4 py-1">Ethereum</Badge>
                  <Badge variant="outline" className="text-white border-white/20 px-4 py-1">Polygon</Badge>
                  <Badge variant="outline" className="text-white border-white/20 px-4 py-1">Bitcoin</Badge>
                </div>
              </div>
              <div className="w-full md:w-80 space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md text-center group transition-all hover:bg-white/10">
                  <div className="w-16 h-16 bg-primary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform">
                    <Wallet className="h-8 w-8 text-[#071739]" />
                  </div>
                  <div className="font-mono text-sm mb-2 opacity-50 uppercase tracking-widest">Universal Handle</div>
                  <div className="text-xl font-bold text-primary break-all">sherazhussain.unstoppable</div>
                  <Button 
                    className="mt-8 w-full bg-white text-[#071739] hover:bg-primary hover:text-[#071739]"
                    onClick={() => copyToClipboard('sherazhussain.unstoppable', 'Domain')}
                  >
                    Copy Address
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Live Activity Section */}
          <div className="mx-auto mt-32 max-w-5xl">
             <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                    <Activity className="h-4 w-4 animate-pulse" />
                    Real-time Support Hub
                </div>
                <h2 className="text-4xl font-bold text-foreground">Community Impact</h2>
                <p className="text-lg text-muted-foreground mt-4 max-w-xl mx-auto">See the live heartbeat of the community supporting this engineering journey.</p>
             </div>
             
             <div className="relative aspect-[16/7] w-full overflow-hidden rounded-[2rem] border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white">
                <iframe 
                  src="https://studio.buymeacoffee.com/stream-alert/page/sherazhussain546?user_key=3eed59c9-dc4b-4e84-b034-0a89bd538775"
                  className="absolute top-0 left-0 h-full w-full pointer-events-none"
                  frameBorder="0"
                />
                <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-[2rem]" />
             </div>
          </div>

          {/* Engagement Section */}
          <div className="mx-auto mt-32 max-w-5xl rounded-[3rem] border border-primary/10 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 p-12 md:p-20 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-[#FDFDFB] mx-auto mb-10 shadow-xl shadow-primary/20">
                <ShieldCheck className="h-8 w-8" />
             </div>
             <h2 className="text-4xl font-extrabold text-foreground mb-12">The ROI of Supporting Me</h2>
             <div className="grid gap-12 md:grid-cols-3 text-left">
                <div className="space-y-4 group">
                   <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Zap className="h-5 w-5" />
                   </div>
                   <h4 className="text-lg font-bold">Innovation Velocity</h4>
                   <p className="text-sm text-muted-foreground leading-relaxed">Your support directly covers the significant compute costs of running Gemini 2.0 Flash and Cloud infrastructure.</p>
                </div>
                <div className="space-y-4 group">
                   <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <ShieldCheck className="h-5 w-5" />
                   </div>
                   <h4 className="text-lg font-bold">Open-Source Integrity</h4>
                   <p className="text-sm text-muted-foreground leading-relaxed">It allows me to keep building tools that remain free from intrusive corporate data harvesting and tracking.</p>
                </div>
                <div className="space-y-4 group">
                   <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Globe className="h-5 w-5" />
                   </div>
                   <h4 className="text-lg font-bold">Global Community</h4>
                   <p className="text-sm text-muted-foreground leading-relaxed">Directly funds the research that leads to career tools used by hundreds of students and developers worldwide.</p>
                </div>
             </div>
             <div className="mt-20 pt-12 border-t border-primary/10 flex flex-col items-center gap-6">
                <p className="text-2xl font-medium italic text-foreground/80 max-w-2xl">"Every bit of support fuels the next breakthrough. Thank you for being a patron of modern engineering."</p>
                <div className="flex items-center gap-4">
                  <div className="h-px w-8 bg-primary/30" />
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.5em]">Sheraz Hussain — Freelancer @ SYNC TECH</p>
                  <div className="h-px w-8 bg-primary/30" />
                </div>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}