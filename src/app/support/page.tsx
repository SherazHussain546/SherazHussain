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
  Coins,
  Cpu,
  Users,
  Target,
  Building2,
  Info,
  CreditCard
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
      actionLabel: 'Copy Web3 Domain',
      color: 'bg-blue-500/10 text-blue-600',
      isWeb3: true,
      badgeUrl: 'https://ipfs.io/ipfs/QmXuoUmUstZbRv1LFKp3XgUiemzMJ2VmtZnMGv9xcNjj5c'
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

  const valueProps = [
    {
      icon: Zap,
      title: 'Innovation Velocity',
      description: 'Your support directly covers the significant compute costs of running Gemini 2.0 Flash and Cloud infrastructure.'
    },
    {
      icon: ShieldCheck,
      title: 'Open-Source Integrity',
      description: 'It allows me to keep building tools that remain free from intrusive corporate data harvesting and tracking.'
    },
    {
      icon: Users,
      title: 'Global Community',
      description: 'Directly funds the research that leads to career tools used by hundreds of students and developers worldwide.'
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFB]">
      <Header />
      <Script defer src="https://www.gofundme.com/static/js/embed.js" />
      
      <main className="flex-1 relative overflow-hidden">
        <section className="sr-only">
          <h1>Support Sheraz Hussain - SYNC TECH Solutions</h1>
          <p>Support the development of high-performance AI tools, open-source software, and cloud infrastructure.</p>
        </section>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 py-16 md:py-32 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-8 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.3em] border-primary/40 text-primary bg-primary/5">
                Patron of Modern Engineering
              </Badge>
              <h2 className="text-5xl font-extrabold tracking-tighter text-foreground md:text-8xl mb-8 leading-[1.1]">
                Empower the <span className="text-primary italic">Future</span> of AI.
              </h2>
              <p className="mt-8 text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                As a <span className="font-bold text-foreground">Freelancer working with SYNC TECH Solutions</span>, I dedicate my time to building high-performance AI tools, open-source software, and cloud infrastructure that helps the global tech community scale with integrity.
              </p>
            </motion.div>
          </div>

          <div className="mx-auto mt-24 grid max-w-5xl gap-8 md:grid-cols-3">
             {valueProps.map((prop, idx) => (
                <motion.div 
                    key={prop.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-border/50 shadow-sm hover:shadow-xl transition-all"
                >
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                        <prop.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-3">{prop.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{prop.description}</p>
                </motion.div>
             ))}
          </div>

          <div className="mx-auto mt-32 max-w-2xl text-center">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
                <Target className="h-4 w-4" />
                Featured Campaign
            </div>
            <h2 className="text-4xl font-extrabold text-foreground md:text-5xl tracking-tight mb-12">New Project Goals</h2>
            <div className="bg-white rounded-[2.5rem] p-4 shadow-2xl border border-border/50 overflow-hidden">
              <div 
                className="gfm-embed" 
                data-url="https://www.gofundme.com/f/be-a-part-of-my-new-projects/widget/medium?sharesheet=undefined&attribution_id=sl:4cfddb57-1fb9-4af0-896d-6e51bb8e9711"
              ></div>
            </div>
          </div>

          <div className="mx-auto mt-32 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                    {method.isWeb3 && method.badgeUrl && (
                        <div className="flex justify-center py-4">
                            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-blue-500/20 shadow-lg group-hover:border-blue-500/50 transition-all">
                                <Image 
                                    src={method.badgeUrl}
                                    alt="Unstoppable Domains Verified Badge"
                                    fill
                                    className="object-contain p-1"
                                />
                            </div>
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
                    {method.isEnterprise && (
                      <div className="text-[11px] font-semibold text-muted-foreground bg-primary/5 p-4 rounded-xl border border-primary/10 border-dashed">
                        Revolut Pay for fast checkout or Direct SEPA transfers.
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
                                <div className="flex flex-col gap-1">
                                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Bank Name & Address</span>
                                  <span className="text-xs leading-relaxed">{bankDetails.bankName}<br />{bankDetails.bankAddress}</span>
                                </div>
                                <div className="flex flex-col gap-1 pt-2 border-t border-dashed">
                                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-1">
                                    Correspondent BIC <Info className="h-3 w-3" />
                                  </span>
                                  <span className="text-xs font-mono">{bankDetails.correspondentBic}</span>
                                </div>
                              </div>
                              <p className="text-[10px] text-center text-muted-foreground italic">
                                * All transfers are handled securely via Revolut Bank UAB.
                              </p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </>
                    ) : method.link ? (
                      <Button asChild className="w-full h-12 rounded-xl font-bold tracking-wide shadow-lg hover:shadow-primary/20">
                        <Link href={method.link} target={method.link.startsWith('mailto') ? '_self' : '_blank'}>
                          {method.actionLabel}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-2" onClick={() => copyToClipboard(method.value!, 'Web3 Domain')}>
                        {method.actionLabel}
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-32 max-w-5xl rounded-[3rem] bg-[#071739] p-12 text-white relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px]" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 space-y-8 text-center md:text-left">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-bold uppercase tracking-[0.4em]">
                  <Globe className="h-4 w-4" />
                  Decentralized Web3 Handle
                </div>
                <h2 className="text-4xl font-bold md:text-5xl tracking-tight">Censorship-Resistant Innovation</h2>
                <p className="text-white/70 text-lg leading-relaxed font-light">
                  By supporting my Web3 identity, you fund the research of decentralized AI tools and cloud infrastructure that remains free from intrusive corporate data harvesting.
                </p>
                <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-4">
                  <Badge variant="outline" className="text-white border-white/20 px-5 py-1.5 font-mono text-[10px] tracking-widest uppercase">Ethereum</Badge>
                  <Badge variant="outline" className="text-white border-white/20 px-5 py-1.5 font-mono text-[10px] tracking-widest uppercase">Polygon</Badge>
                  <Badge variant="outline" className="text-white border-white/20 px-5 py-1.5 font-mono text-[10px] tracking-widest uppercase">Solana</Badge>
                </div>
              </div>
              <div className="w-full md:w-96">
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl text-center group transition-all hover:bg-white/10 border-t-white/20">
                  <div className="w-20 h-20 bg-primary rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform">
                    <Wallet className="h-10 w-10 text-[#071739]" />
                  </div>
                  <div className="font-mono text-[10px] mb-3 opacity-40 uppercase tracking-[0.3em]">Universal Handle</div>
                  <div className="text-xl font-bold text-primary break-all leading-snug">sherazhussain.unstoppable</div>
                  <Button 
                    className="mt-10 w-full h-14 rounded-2xl bg-white text-[#071739] hover:bg-primary hover:text-white font-bold transition-all"
                    onClick={() => copyToClipboard('sherazhussain.unstoppable', 'Domain')}
                  >
                    Copy Handle
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mx-auto mt-32 max-w-5xl">
             <div className="mb-16 text-center">
                <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
                    <Activity className="h-4 w-4 animate-pulse" />
                    Community Pulse
                </div>
                <h2 className="text-4xl font-extrabold text-foreground md:text-5xl tracking-tight">Live Impact Feed</h2>
                <p className="text-lg text-muted-foreground mt-6 max-wxl mx-auto font-medium">See the real-time heartbeat of the community supporting this engineering journey.</p>
             </div>
             
             <div className="relative aspect-[16/8] w-full overflow-hidden rounded-[3rem] border-8 border-white shadow-[0_40px_100px_rgba(0,0,0,0.1)] bg-white">
                <iframe 
                  src="https://studio.buymeacoffee.com/stream-alert/page/sherazhussain546?user_key=3eed59c9-dc4b-4e84-b034-0a89bd538775"
                  className="absolute top-0 left-0 h-full w-full pointer-events-none"
                  frameBorder="0"
                  title="Sheraz Hussain BuyMeACoffee Stream Alert"
                />
                <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-[3rem]" />
             </div>
          </div>

          <div className="mx-auto mt-40 max-w-4xl text-center border-t pt-20">
             <div className="flex justify-center mb-10">
                <div className="h-px w-16 bg-primary/30" />
                <Cpu className="mx-4 h-6 w-6 text-primary/50" />
                <div className="h-px w-16 bg-primary/30" />
             </div>
             <p className="text-3xl font-medium italic text-foreground/90 leading-relaxed">
                "Every line of code I write is a commitment to a more intelligent, open, and efficient digital future. Your support allows me to keep these tools accessible to everyone."
             </p>
             <div className="mt-12 flex flex-col items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.5em] text-primary">Sheraz Hussain</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">Freelancer @ SYNC TECH Solutions</span>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
