'use client';

import { Project } from '@/lib/data';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { Playfair_Display, DM_Sans, Space_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Target, Cpu, ShieldCheck, TrendingUp, Code2 } from 'lucide-react';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
});

export default function ProjectCaseStudyContent({ project }: { project: Project }) {
  return (
    <article className={cn(
      "min-h-screen bg-background text-foreground",
      playfair.variable,
      dmSans.variable,
      spaceMono.variable,
      "font-sans antialiased"
    )}>
      <style jsx global>{`
        :root {
          --ink: hsl(var(--foreground));
          --paper: hsl(var(--background));
          --accent-journal: hsl(var(--primary));
          --gold-journal: hsl(var(--accent));
          --muted-journal: hsl(var(--muted-foreground));
          --rule-journal: hsl(var(--border));
        }

        .drop-cap p:first-child::first-letter {
          font-family: var(--font-playfair), serif;
          font-size: 5.2em;
          font-weight: 900;
          float: left;
          line-height: 0.78;
          margin: 0.06em 0.1em 0 0;
          color: var(--accent-journal);
        }

        .thick-rule {
          border: none;
          border-top: 3px double var(--ink);
          margin: 56px 0 48px;
        }

        .section-label {
          font-family: var(--font-space-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold-journal);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--rule-journal);
          max-width: 60px;
        }

        .pull-quote {
          border-left: 4px solid var(--accent-journal);
          padding: 20px 28px;
          margin: 40px 0;
          background: hsla(var(--primary) / 0.04);
        }
      `}</style>

      <Header />

      <main>
        {/* ──────────────── MASTHEAD ──────────────── */}
        <header className="bg-[#071739] text-white py-16 md:py-24 px-6 text-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto max-w-4xl relative z-10"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-6">
              Engineering Case Study &nbsp;·&nbsp; {new Date().getFullYear()} Edition
            </p>
            <h1 className="font-serif text-[clamp(2.5rem,8vw,5rem)] font-black leading-[1.05] tracking-tight mb-6">
              {project.name.split('–')[0]} <br />
              <em className="italic text-primary font-normal">{project.name.split('–')[1] || ''}</em>
            </h1>
            <p className="font-serif italic text-lg md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
              {project.description}
            </p>
            <div className="flex items-center justify-center gap-6 flex-wrap font-mono text-[10px] tracking-widest uppercase text-white/50">
              <span>By Sheraz Hussain</span>
              <span className="text-primary">·</span>
              <span>Principal Architect</span>
              <span className="text-primary">·</span>
              <span>Dublin, Ireland</span>
            </div>
          </motion.div>
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} 
          />
        </header>

        {/* ──────────────── ARTICLE BODY ──────────────── */}
        <div className="max-w-[860px] mx-auto px-6 py-12 md:py-20">
          
          <nav aria-label="Breadcrumb">
            <Button asChild variant="ghost" size="sm" className="mb-12 -ml-3 gap-2 text-muted-foreground hover:text-primary font-mono text-[10px] uppercase tracking-widest">
              <Link href="/projects">
                <ArrowLeft className="h-3 w-3" />
                Return to Archives
              </Link>
            </Button>
          </nav>

          {/* Opening Narrative */}
          <section className="opening mb-16">
            <header className="location-tag font-mono text-[10px] tracking-[0.25em] uppercase text-primary mb-8 flex items-center gap-3">
              <span className="w-5 h-px bg-primary" />
              High-Fidelity Technical Report
            </header>

            <div className="drop-cap font-sans font-light text-lg md:text-xl leading-relaxed text-foreground/90 space-y-6">
              <p>{project.fullDescription}</p>
            </div>
          </section>

          <hr className="thick-rule" />

          {/* Challenges & Constraints */}
          <section className="mb-16">
            <p className="section-label" aria-hidden="true">Technical Audit</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 flex items-center gap-4">
              <Target className="h-8 w-8 text-primary" />
              Identifying the Structural Bottlenecks
            </h2>
            <div className="space-y-6">
              {project.challenges.map((challenge, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <span className="font-mono text-xs font-bold text-primary pt-1">0{i+1}.</span>
                  <p className="text-lg font-light leading-relaxed">{challenge}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-t border-border my-12" />

          {/* Engineering Response */}
          <section className="mb-16">
            <p className="section-label" aria-hidden="true">Engineering Response</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 flex items-center gap-4">
              <Cpu className="h-8 w-8 text-primary" />
              Architecting for Resilience & Scale
            </h2>
            <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
              {project.solutions.map((sol, i) => (
                <div key={i} className="bg-background p-8 hover:bg-muted/30 transition-colors">
                  <h4 className="font-serif font-bold text-xl mb-3">{sol.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{sol.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pull Quote */}
          <aside className="pull-quote">
            <blockquote className="font-serif italic text-xl md:text-2xl leading-snug mb-4">
              "The gap between a working prototype and a production-grade system is where most engineers stop. I am interested in closing that gap — every time."
            </blockquote>
            <cite className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
              — Sheraz Hussain, Principal Architect
            </cite>
          </aside>

          {/* Infrastructure & Stack */}
          <section className="mb-16">
            <p className="section-label" aria-hidden="true">Infrastructure Matrix</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 flex items-center gap-4">
              <Code2 className="h-8 w-8 text-primary" />
              The High-Fidelity Technical Ecosystem
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span key={tech} className="font-mono text-[10px] tracking-tight border border-border px-3 py-1.5 uppercase bg-muted/20">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <hr className="thick-rule" />

          {/* Impact / Results */}
          <section className="mb-16">
            <p className="section-label" aria-hidden="true">Measured Impact</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              Verification of Success Metrics
            </h2>
            <div className="flex flex-col border border-border bg-muted/5">
              {project.results.map((result, i) => (
                <div key={i} className="p-6 border-b last:border-none border-border flex justify-between items-center gap-4 hover:bg-muted/30 transition-all">
                  <span className="text-base font-medium">{result}</span>
                  <span className="font-mono text-[10px] text-primary font-bold uppercase shrink-0">Verified {new Date().getFullYear()}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Repository Access */}
          <section className="mt-20 pt-12 border-t-4 border-foreground bg-primary/5 p-8 rounded-lg">
            <p className="section-label text-primary" aria-hidden="true">Secure Access</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 flex items-center gap-4">
              <ShieldCheck className="h-8 w-8 text-primary" />
              Inspect the Source Integrity
            </h2>
            <p className="text-lg font-light mb-10 leading-relaxed">
              True technical authority is built on transparency. I invite you to explore the architectural choices and implementation details of this project through the secure links below.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-[#071739] hover:bg-[#0d214d] text-white font-mono text-[10px] uppercase tracking-[0.2em] px-8 h-14 rounded-none">
                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub Repository
                </Link>
              </Button>
              {project.liveLink && (
                <Button asChild variant="outline" size="lg" className="border-foreground text-foreground hover:bg-foreground hover:text-background font-mono text-[10px] uppercase tracking-[0.2em] px-8 h-14 rounded-none transition-all">
                  <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Deployment
                  </Link>
                </Button>
              )}
            </div>
          </section>

          {/* Footer Navigation */}
          <footer className="mt-32 pt-16 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
            <Button asChild variant="ghost" className="group">
              <Link href="/projects" className="flex items-center gap-4 text-left">
                <div className="h-12 w-12 rounded-full border border-border flex items-center justify-center transition-colors group-hover:bg-primary group-hover:border-primary">
                  <ArrowLeft className="h-4 w-4 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Previous Archive</div>
                  <div className="font-serif text-lg font-bold">Project Index</div>
                </div>
              </Link>
            </Button>
            
            <Button asChild variant="ghost" className="group ml-auto">
              <Link href="/contact" className="flex items-center gap-4 text-right">
                <div className="text-right">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Next Phase</div>
                  <div className="font-serif text-lg font-bold">Initiate Partnership</div>
                </div>
                <div className="h-12 w-12 rounded-full border border-border flex items-center justify-center transition-colors group-hover:bg-primary group-hover:border-primary">
                  <ArrowRight className="h-4 w-4 group-hover:text-white transition-colors" />
                </div>
              </Link>
            </Button>
          </footer>
        </div>
      </main>

      <Footer />
    </article>
  );
}
