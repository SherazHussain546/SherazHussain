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
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

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
      description: 'A simple way to show appreciation for the tools and content I create.',
      icon: Coffee,
      actionLabel: 'Support on Buy Me a Coffee',
      link: 'https://www.buymeacoffee.com/sherazhussain', // Placeholder
      color: 'bg-yellow-500/10 text-yellow-600',
    },
    {
      title: 'GoFundMe',
      description: 'Support larger-scale infrastructure and ongoing AI research projects.',
      icon: Heart,
      actionLabel: 'Contribute via GoFundMe',
      link: 'https://www.gofundme.com/', // Placeholder
      color: 'bg-emerald-500/10 text-emerald-600',
    },
    {
      title: 'Crypto Transfer',
      description: 'Support my work using decentralized currency via my Unstoppable Domain.',
      icon: Wallet,
      value: 'sherazhussain.unstoppable',
      actionLabel: 'Copy Domain',
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      title: 'Bank Transfer',
      description: 'Direct support for major professional consulting and engineering work.',
      icon: Banknote,
      details: 'Available upon request for professional sponsorship.',
      actionLabel: 'Contact for Details',
      link: 'mailto:sheraz@synctech.ie',
      color: 'bg-purple-500/10 text-purple-600',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4 px-4 py-1 text-[10px] font-bold uppercase tracking-widest border-primary/30 text-primary">
              Support the Mission
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
              Support My <span className="text-foreground">Work</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              As a <span className="font-semibold text-foreground">Freelancer working with SYNC TECH Solutions</span>, I dedicate my time to building high-performance AI tools, open-source software, and cloud infrastructure that helps the global tech community.
            </p>
            <p className="mt-4 text-muted-foreground">
              Your support helps cover server costs, API fees (like Gemini and OpenAI), and allows me to keep these resources free and accessible for everyone.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
            {supportMethods.map((method) => (
              <Card key={method.title} className="flex flex-col border-border/50 bg-card/50 transition-all hover:shadow-xl hover:shadow-primary/5">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${method.color}`}>
                    <method.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  {method.value && (
                    <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-3 mt-2">
                      <code className="text-sm font-mono font-semibold">{method.value}</code>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(method.value!, 'Domain')}
                        className="h-8 px-2"
                      >
                        {copied === 'Domain' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  )}
                  {method.details && (
                    <p className="text-sm italic text-muted-foreground mt-2">{method.details}</p>
                  )}
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  {method.link ? (
                    <Button asChild className="w-full">
                      <Link href={method.link} target={method.link.startsWith('mailto') ? '_self' : '_blank'}>
                        {method.actionLabel}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" onClick={() => copyToClipboard(method.value!, 'Domain')}>
                      {method.actionLabel}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Engagement Section */}
          <div className="mx-auto mt-20 max-w-4xl rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-8 md:p-12 text-center">
             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary mx-auto mb-6">
                <ShieldCheck className="h-6 w-6" />
             </div>
             <h2 className="text-2xl font-bold text-foreground md:text-3xl">Why Support?</h2>
             <div className="mt-8 grid gap-8 md:grid-cols-3 text-left">
                <div className="space-y-2">
                   <h4 className="font-bold text-primary">Sustainability</h4>
                   <p className="text-sm text-muted-foreground leading-relaxed">Covers the high costs of running generative AI models and cloud architecture.</p>
                </div>
                <div className="space-y-2">
                   <h4 className="font-bold text-primary">Independence</h4>
                   <p className="text-sm text-muted-foreground leading-relaxed">Allows me to build tools based on user needs rather than corporate profit.</p>
                </div>
                <div className="space-y-2">
                   <h4 className="font-bold text-primary">Innovation</h4>
                   <p className="text-sm text-muted-foreground leading-relaxed">Directly funds the research and development of new AI career tools.</p>
                </div>
             </div>
             <div className="mt-10 pt-8 border-t border-primary/10 flex flex-col items-center gap-4">
                <p className="text-foreground font-medium italic">"Small contributions fuel massive innovations. Thank you for being part of this journey."</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">— Sheraz Hussain</p>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
