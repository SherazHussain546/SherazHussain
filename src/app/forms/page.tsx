'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquareQuote, 
  Laptop, 
  Zap, 
  ArrowRight, 
  ClipboardCheck, 
  ShieldCheck, 
  Users,
  AlertCircle,
  LifeBuoy
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const formCategories = [
  {
    title: 'Community Feedback',
    description: 'Help me improve the digital experience and tools I build for the global tech community.',
    forms: [
      {
        id: 'portfolio-feedback',
        name: 'Portfolio Feedback',
        description: 'A detailed survey about your experience on this site.',
        icon: MessageSquareQuote,
        link: '/survey',
        badge: 'Active',
        isInternal: true,
      }
    ]
  },
  {
    title: 'Service & Support',
    description: 'Resolution channels for technical issues or service feedback.',
    forms: [
      {
        id: 'complain-form',
        name: 'Official Complaint Form',
        description: 'Submit formal feedback or report issues regarding services or tools.',
        icon: AlertCircle,
        link: '/complaints',
        badge: 'Secure',
        isInternal: true,
      }
    ]
  },
  {
    title: 'Professional Engagement',
    description: 'Direct entry points for technical consulting and project collaborations via SYNC TECH Solutions.',
    forms: [
      {
        id: 'tech-consultation',
        name: 'Technical Consultation',
        description: 'Request a session for AI, Cloud, or Full-Stack architecture advice.',
        icon: Laptop,
        link: 'mailto:sheraz@synctech.ie?subject=Technical Consultation Request',
        badge: 'Priority',
        isInternal: false,
      },
      {
        id: 'project-inquiry',
        name: 'Project Collaboration',
        description: 'Propose a new project or partnership with SYNC TECH Solutions.',
        icon: Zap,
        link: 'mailto:sheraz@synctech.ie?subject=New Project Inquiry',
        badge: 'Fast-Track',
        isInternal: false,
      }
    ]
  }
];

export default function FormsHubPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFB]">
      <Header />
      <main className="flex-1 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-4 py-16 md:py-32 md:px-6">
          <div className="mx-auto max-w-4xl text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-8 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.3em] border-primary/40 text-primary bg-primary/5">
                Interaction & Strategy Hub
              </Badge>
              <h1 className="text-4xl font-extrabold tracking-tighter text-foreground md:text-7xl mb-8 leading-[1.1]">
                Forms <span className="text-primary italic">&</span> Surveys.
              </h1>
              <p className="mt-8 text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                As a <span className="font-bold text-foreground">Freelancer working with SYNC TECH Solutions</span>, I value every interaction. Choose a channel below to share your insights or initiate a professional engagement.
              </p>
            </motion.div>
          </div>

          <div className="mx-auto max-w-5xl space-y-24">
            {formCategories.map((category, catIdx) => (
              <section key={category.title} className="space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">{category.title}</h2>
                    <p className="text-muted-foreground text-sm max-w-md">{category.description}</p>
                  </div>
                  <div className="hidden md:block h-px flex-1 bg-border/40 mx-8 mb-3" />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {category.forms.map((form, formIdx) => (
                    <motion.div
                      key={form.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (catIdx * 0.1) + (formIdx * 0.1) }}
                    >
                      <Card className="group h-full flex flex-col border-border/40 bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <CardHeader className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                              <form.icon className="h-6 w-6" />
                            </div>
                            <Badge variant="secondary" className="bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest border-none">
                              {form.badge}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                              {form.name}
                            </CardTitle>
                            <CardDescription className="text-sm leading-relaxed">
                              {form.description}
                            </CardDescription>
                          </div>
                        </CardHeader>
                        <CardFooter className="mt-auto pt-6 border-t bg-muted/5 group-hover:bg-primary/5 transition-colors">
                          <Button asChild variant="ghost" className="w-full justify-between group/btn">
                            <Link href={form.link} className="flex items-center justify-between w-full">
                              <span className="font-bold uppercase tracking-widest text-[10px]">
                                {form.isInternal ? 'Open Channel' : 'Initiate Request'}
                              </span>
                              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Engagement Note */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-40 max-w-4xl text-center p-12 rounded-[2.5rem] bg-[#071739] text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
            <div className="relative z-10 space-y-6">
              <ClipboardCheck className="h-10 w-10 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Integrity-Driven Data</h2>
              <p className="text-white/70 text-lg font-light leading-relaxed">
                All information submitted through these forms is handled with the highest standard of data privacy. As part of my commitment to the open-source community, your feedback helps shape the future of tools that remain free from intrusive corporate tracking.
              </p>
              <div className="pt-6 flex justify-center gap-8">
                 <div className="flex flex-col items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span className="text-[10px] uppercase tracking-widest opacity-60">Secure</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-[10px] uppercase tracking-widest opacity-60">Focused</span>
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
