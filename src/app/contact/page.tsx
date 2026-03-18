'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Linkedin, 
  Github, 
  Heart, 
  MapPin, 
  Phone, 
  ArrowLeft, 
  Send, 
  Sparkles,
  MessageSquare,
  Globe,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Connection Initiated",
      description: "Directing your request to Sheraz's secure communication channel.",
    });
    window.location.href = "mailto:sheraz@synctech.ie?subject=High-Level Project Inquiry";
  };

  const contactMethods = [
    {
      title: 'Professional Email',
      value: 'sheraz@synctech.ie',
      link: 'mailto:sheraz@synctech.ie',
      icon: Mail,
      color: 'bg-primary/10 text-primary',
    },
    {
      title: 'LinkedIn Network',
      value: 'sherazhussain546',
      link: 'https://linkedin.com/in/sherazhussain546/',
      icon: Linkedin,
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      title: 'Innovation Group',
      value: 'Creativity & Sheraz',
      link: 'https://www.linkedin.com/groups/17913030/',
      icon: Users,
      color: 'bg-indigo-500/10 text-indigo-600',
    },
    {
      title: 'GitHub Repositories',
      value: 'SherazHussain546',
      link: 'https://github.com/SherazHussain546',
      icon: Github,
      color: 'bg-slate-800/10 text-slate-800',
    },
    {
      title: 'GitHub Sponsorship',
      value: 'Sponsor Profile',
      link: '/support',
      icon: Heart,
      color: 'bg-red-500/10 text-red-500',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFB]">
      <Header />
      
      <main className="flex-1 relative overflow-hidden">
        {/* Background Engineering */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(#A68858 1px, transparent 1px), linear-gradient(90deg, #A68858 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} 
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 py-8 md:py-16 md:px-6">
          <Button asChild variant="ghost" size="sm" className="mb-12 -ml-3 gap-2 text-muted-foreground hover:text-primary">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
          </Button>

          <div className="mx-auto max-w-6xl grid gap-16 lg:grid-cols-2 items-start">
            {/* Left: Content & Methods */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <Badge variant="outline" className="px-4 py-1 text-[10px] font-bold uppercase tracking-widest border-primary/40 text-primary">
                  Open for High-Impact Partnerships
                </Badge>
                <h1 className="text-5xl font-extrabold tracking-tighter text-foreground md:text-7xl leading-none">
                  Engineer Your <span className="text-primary italic">Dominance</span>.
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  I am <span className="font-bold text-foreground">Sheraz Hussain</span>, an elite engineer focused on architecting the next generation of AI and Cloud systems. Connect with me to discuss strategic technical implementations and global-scale innovation.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {contactMethods.map((method, idx) => (
                  <Link key={idx} href={method.link} target={method.link.startsWith('http') ? '_blank' : '_self'}>
                    <Card className="group h-full transition-all hover:shadow-lg hover:border-primary/30 border-border/40 bg-white/50 backdrop-blur-sm">
                      <CardHeader className="flex flex-row items-center gap-4 p-4">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${method.color}`}>
                          <method.icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{method.title}</p>
                          <p className="text-sm font-semibold truncate max-w-[140px]">{method.value}</p>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="pt-8 border-t space-y-6">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-foreground uppercase tracking-widest text-[10px]">Command Center</p>
                    <p>Dublin, Ireland (Global Delivery)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-foreground uppercase tracking-widest text-[10px]">Availability</p>
                    <p>International (Remote/Relocation Ready)</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Interaction Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="shadow-2xl border-primary/20 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                <CardHeader className="relative z-10 border-b pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <CardTitle className="text-2xl font-bold">Strategic Briefing</CardTitle>
                  </div>
                  <CardDescription>
                    Provide your project details to initiate a high-fidelity technical consultation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Lead Partner" required className="bg-muted/5" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Work Email</Label>
                        <Input id="email" type="email" placeholder="partner@enterprise.com" required className="bg-muted/5" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Technical Objective</Label>
                      <Input id="subject" placeholder="e.g. Next.js Migration & AI Integration" required className="bg-muted/5" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Project Blueprint</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Describe the technical challenges or architectural requirements..." 
                        className="min-h-[150px] bg-muted/5" 
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full h-12 font-bold group">
                      <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      Dispatch Request
                    </Button>
                  </form>
                </CardContent>
                <div className="p-6 bg-muted/5 border-t text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2">
                    <Sparkles className="h-3 w-3 text-primary" />
                    Sheraz Hussain | Engineering Technical Supremacy
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
