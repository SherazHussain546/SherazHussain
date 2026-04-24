'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  HelpCircle, 
  ArrowLeft, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Users, 
  Globe,
  GraduationCap,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const faqCategories = [
  {
    id: 'technical',
    title: 'Technical Authority',
    icon: Cpu,
    questions: [
      {
        q: "What does an AI solutions architect do?",
        a: "An AI Solutions Architect bridge the gap between business objectives and technical implementation. I design cloud-native systems that treat AI as a first-class citizen, ensuring that LLM integrations like Gemini or OpenAI are scalable, secure, and integrated deeply into existing workflows to drive quantifiable growth."
      },
      {
        q: "What is your primary engineering focus?",
        a: "I specialize in architecting high-performance, AI-driven digital ecosystems. This includes Next.js 15, Google Genkit integration, and scalable cloud infrastructure on AWS and Google Cloud Platform. My goal is to build systems that prioritize technical integrity and sub-second user experiences."
      },
      {
        q: "How do you handle technical SEO and site performance?",
        a: "Performance is an engineering requirement, not an afterthought. I conduct deep-level optimization of Core Web Vitals, ensuring sub-2s load speeds globally through strategic caching, edge deployment, and metadata engineering."
      }
    ]
  },
  {
    id: 'partnership',
    title: 'Partnership & Engagement',
    icon: Users,
    questions: [
      {
        q: "Are you available for international consulting?",
        a: "Yes. I am based in Dublin, Ireland, but I operate a global delivery model. I am available for technical consulting, enterprise AI architecture engagements, and collaborative product development projects for partners worldwide."
      },
      {
        q: "What is the mission of SYNC TECH Solutions?",
        a: "SYNC TECH is my official vehicle for dismantling the barriers of technical complexity. Our mission is to translate elite, enterprise-grade technology into accessible, open-source tools that empower the global tech community."
      },
      {
        q: "How can I initiate a technical consultation?",
        a: "The most efficient way is to dispatch a request via the [Contact Page](/contact) or email the command center directly at sheraz@synctech.ie. I prioritize inquiries involving complex AI integrations and digital transformations."
      }
    ]
  },
  {
    id: 'security',
    title: 'Security & Infrastructure',
    icon: ShieldCheck,
    questions: [
      {
        q: "How do you ensure data sovereignty in your AI tools?",
        a: "I architect systems with a 'Privacy First' mindset. By utilizing Zero Trust Architecture and secure cloud configurations, I ensure that sensitive data remains encrypted and sovereign, particularly when integrating with LLMs like Gemini."
      },
      {
        q: "What payment standards do you utilize for support?",
        a: "All financial contributions are processed via Stripe, the gold standard in global payment security. This infrastructure is PCI-DSS Level 1 compliant, ensuring your transaction integrity is never compromised."
      },
      {
        q: "What is your commitment to climate sustainability?",
        a: "As part of my commitment to inclusive innovation, 1% of every contribution is automatically directed toward high-impact carbon removal technologies via Stripe Climate."
      }
    ]
  }
];

export default function FAQPage() {
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
              Technical Disclosure &nbsp;·&nbsp; Common Inquiries
            </p>
            <h1 className="font-playfair text-[clamp(2.5rem,8vw,5rem)] font-black leading-[1.05] tracking-tight mb-6">
              Frequently <span className="italic text-primary font-normal">Asked</span> <br />
              <em className="italic text-primary font-normal">Questions</em>
            </h1>
            <p className="font-playfair italic text-lg md:text-2xl text-background/70 max-w-2xl mx-auto leading-relaxed mb-10">
              Clear answers on engineering authority, professional collaboration, and technical infrastructure.
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
              Return to Control Center
            </Link>
          </Button>

          <div className="space-y-24">
            {faqCategories.map((category) => (
              <section key={category.id} className="space-y-8">
                <div className="flex items-center gap-4 border-b pb-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-playfair">{category.title}</h2>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Category Disclosure</p>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                  {category.questions.map((item, idx) => (
                    <AccordionItem key={idx} value={`${category.id}-${idx}`} className="border-b-2 border-primary/5">
                      <AccordionTrigger className="font-playfair text-lg font-bold text-left hover:text-primary transition-colors py-6">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="pb-8">
                        <p className="text-muted-foreground text-lg font-light leading-relaxed">
                          {item.a}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>

          {/* Contact Bridge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-32 p-10 rounded-[2rem] bg-[#071739] text-white text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
            <div className="relative z-10 space-y-6">
              <MessageSquare className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold font-playfair">Still have questions?</h3>
              <p className="text-white/60 font-light max-w-md mx-auto">
                If your specific inquiry wasn't addressed here, please initiate a direct technical consultation.
              </p>
              <div className="pt-4">
                <Button asChild className="h-14 px-10 font-bold uppercase tracking-widest text-[10px] rounded-none">
                  <Link href="/contact">Dispatch Request</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
