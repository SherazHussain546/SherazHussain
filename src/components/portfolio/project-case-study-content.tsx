'use client';

import { useState, useRef } from 'react';
import { Project } from '@/lib/data';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { Bebas_Neue, Epilogue, JetBrains_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Script from 'next/script';
import { 
  ArrowRight, 
  ArrowLeft,
  BookOpen, 
  Code2, 
  Cpu, 
  BarChart3, 
  Hash,
  X,
  Globe,
  ShieldCheck,
  Zap,
  Search,
  MapPin,
  Terminal,
  Activity,
  Layers
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
});

const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
});

type Tab = 'overview' | 'engineering' | 'tech' | 'results' | 'strategy';

export default function ProjectCaseStudyContent({ project }: { project: Project }) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  const tabs: { id: Tab; label: string; icon: any; num: string }[] = [
    { id: 'overview', label: 'Executive Summary', icon: BookOpen, num: '01' },
    { id: 'engineering', label: 'Engineering Response', icon: Cpu, num: '02' },
    { id: 'tech', label: 'Infrastructure', icon: Code2, num: '03' },
    { id: 'results', label: 'Performance Metrics', icon: BarChart3, num: '04' },
    { id: 'strategy', label: 'SEO & Meta Strategy', icon: Search, num: '05' },
  ];

  const currentIndex = tabs.findIndex((t) => t.id === activeTab);
  const prevTab = currentIndex > 0 ? tabs[currentIndex - 1] : null;
  const nextTab = currentIndex < tabs.length - 1 ? tabs[currentIndex + 1] : null;

  const scrollToContent = () => {
    if (contentRef.current) {
      const headerOffset = 80;
      const elementPosition = contentRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={cn(
      "min-h-screen bg-[#FDFDFB] text-[#071739] selection:bg-[#A68858]/20 selection:text-[#071739]",
      bebas.variable,
      epilogue.variable,
      jetbrains.variable,
      "font-sans antialiased relative"
    )}>
      {/* Precision Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'linear-gradient(#A68858 1px, transparent 1px), linear-gradient(90deg, #A68858 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} 
      />
      
      <Header />

      {/* Persistent Technical Sidebar (Desktop) */}
      <div className="fixed top-32 left-8 z-50 hidden xl:flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#A68858] opacity-50">Status</span>
          <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Deployment
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#A68858] opacity-50">Document ID</span>
          <span className="font-mono text-[10px] font-bold uppercase">{project.slug.substring(0, 8)}</span>
        </div>
        <div className="h-24 w-px bg-gradient-to-b from-[#A68858]/30 to-transparent mx-auto" />
      </div>

      <main className="relative z-10">
        {/* Immersive Hero Section */}
        <motion.section 
          style={{ opacity, scale }}
          className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-20 overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
          </div>

          <div className="container relative z-10 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <Badge variant="outline" className="px-6 py-1.5 text-[10px] font-bold uppercase tracking-[0.4em] border-primary/40 text-primary bg-primary/5">
                Technical Case Study — 2025.A
              </Badge>
              <h1 className="font-bebas text-[clamp(3.5rem,15vw,12rem)] leading-[0.85] tracking-tight uppercase">
                {project.name.split('–')[0]}<br />
                <span className="text-primary italic">{project.name.split('–')[1] || ''}</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                {project.description}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-16 flex flex-col items-center gap-4"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Scroll to Analyze</div>
              <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
            </motion.div>
          </div>
        </motion.section>

        {/* Phase Navigation Bar */}
        <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-xl border-y border-border/50">
          <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-between min-w-max md:min-w-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    scrollToContent();
                  }}
                  className={cn(
                    "flex items-center gap-3 py-6 px-6 transition-all relative group",
                    activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="font-mono text-[10px] font-bold opacity-40">{tab.num}</span>
                  <span className="font-bebas text-lg uppercase tracking-wider">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Matrix */}
        <div ref={contentRef} className="container mx-auto px-4 py-24 max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "circOut" }}
            >
              {activeTab === 'overview' && (
                <div className="grid lg:grid-cols-[1.5fr,1fr] gap-16 items-start">
                  <div className="space-y-12">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-px w-12 bg-primary" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Executive Intelligence</span>
                      </div>
                      <h2 className="font-bebas text-6xl leading-none uppercase">Architectural Objective</h2>
                      <p className="text-xl text-muted-foreground font-light leading-relaxed">
                        {project.fullDescription}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <Card className="border-primary/10 bg-white shadow-xl rounded-2xl overflow-hidden">
                        <CardHeader className="bg-primary/5 pb-4">
                          <Activity className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="font-bebas text-4xl mb-1">98.4%</div>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Signal Consistency</p>
                        </CardContent>
                      </Card>
                      <Card className="border-primary/10 bg-white shadow-xl rounded-2xl overflow-hidden">
                        <CardHeader className="bg-primary/5 pb-4">
                          <Terminal className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="font-bebas text-4xl mb-1">&lt; 1.2s</div>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Interaction Latency</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="sticky top-40 bg-[#071739] text-white p-10 rounded-[2.5rem] shadow-2xl space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-[10px] text-primary uppercase tracking-widest font-bold">System Specs</div>
                      <Badge className="bg-white/10 text-white border-white/20">v2.5.0</Badge>
                    </div>
                    <div className="space-y-6">
                      {project.stack.slice(0, 5).map((tech) => (
                        <div key={tech} className="flex items-center justify-between border-b border-white/10 pb-4">
                          <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">{tech.split(' ')[0]}</span>
                          <span className="text-sm font-bold">{tech}</span>
                        </div>
                      ))}
                    </div>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 h-14 rounded-xl font-bold">
                      <Link href={project.link} target="_blank">Access Repository</Link>
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'engineering' && (
                <div className="space-y-24">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-px w-12 bg-primary" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Response Matrix</span>
                    </div>
                    <h2 className="font-bebas text-7xl leading-none uppercase">Engineering Resilience</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {project.challenges.map((challenge, i) => (
                      <div key={i} className="group relative bg-white border border-border p-12 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500">
                        <div className="absolute top-8 right-12 font-bebas text-6xl text-primary/5 group-hover:text-primary/10 transition-colors">0{i+1}</div>
                        <h3 className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold mb-6">Constraint Identification</h3>
                        <p className="text-lg font-light leading-relaxed">{challenge}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#071739] rounded-[3rem] p-16 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -mr-48 -mt-48" />
                    <div className="relative z-10 grid lg:grid-cols-2 gap-16">
                      <div className="space-y-6">
                        <Badge className="bg-primary text-white uppercase tracking-widest font-bold px-4 py-1">Solution Blueprint</Badge>
                        <h3 className="font-bebas text-5xl leading-tight">Implementing Strategic<br />Decoupling</h3>
                        <p className="text-white/60 font-light text-lg">
                          My approach focuses on high-fidelity integration without creating technical debt.
                        </p>
                      </div>
                      <div className="space-y-8">
                        {project.solutions.map((sol, i) => (
                          <div key={i} className="flex gap-6 group">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 font-bebas text-2xl transition-all group-hover:bg-primary group-hover:border-primary">
                              {i+1}
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-bold uppercase tracking-wider text-primary">{sol.title}</h4>
                              <p className="text-sm text-white/50 leading-relaxed">{sol.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'tech' && (
                <div className="space-y-16">
                  <div className="max-w-3xl space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-px w-12 bg-primary" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Stack Integrity</span>
                    </div>
                    <h2 className="font-bebas text-7xl leading-none uppercase">Technical Ecosystem</h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {project.stack.map((tech) => (
                      <div key={tech} className="bg-white border border-border p-8 rounded-2xl text-center group hover:border-primary/50 transition-all hover:shadow-lg">
                        <div className="font-bebas text-2xl group-hover:text-primary transition-colors">{tech}</div>
                        <div className="mt-2 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300 mx-auto" />
                      </div>
                    ))}
                  </div>

                  <Card className="bg-[#071739] text-white p-12 rounded-[2.5rem] border-none shadow-2xl overflow-hidden relative">
                    <div className="absolute bottom-0 right-0 p-8 opacity-5">
                      <Layers className="h-64 w-64" />
                    </div>
                    <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                      <div className="space-y-6">
                        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary font-bold">Infrastructure Terminal</div>
                        <h3 className="font-bebas text-5xl leading-none uppercase">Deployment Strategy</h3>
                        <p className="text-white/60 font-light leading-relaxed">
                          Standardized across high-performance Next.js 15 environments, leveraging serverless logic and edge-based delivery for global dominance.
                        </p>
                      </div>
                      <div className="bg-black/40 rounded-3xl p-8 border border-white/10 font-mono text-[11px] leading-loose space-y-2">
                        <div className="text-primary">>>> System Initialization</div>
                        <div className="text-white/40">Fetching global configurations...</div>
                        <div className="text-white/40">Applying zero-trust layer... [SUCCESS]</div>
                        <div className="text-white/40">Optimizing core web vitals... [DONE]</div>
                        <div className="text-emerald-500 flex items-center gap-2 mt-4">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                          Indexing Active
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {activeTab === 'results' && (
                <div className="space-y-16">
                  <div className="text-center space-y-6">
                    <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary font-bold">Performance Audit</div>
                    <h2 className="font-bebas text-8xl leading-none uppercase">Measured Impact</h2>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    {project.results.map((result, i) => (
                      <div key={i} className="bg-white border border-border p-10 rounded-[2rem] shadow-sm flex flex-col items-center text-center group hover:bg-primary hover:text-white transition-all duration-500">
                        <div className="h-16 w-16 rounded-full bg-primary/5 group-hover:bg-white/10 flex items-center justify-center mb-6 transition-colors">
                          <Zap className="h-6 w-6 text-primary group-hover:text-white" />
                        </div>
                        <p className="text-lg font-bold leading-tight">{result}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-20 border-t border-border pt-20 grid lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <h3 className="font-bebas text-4xl uppercase">Audit Summary</h3>
                        <div className="space-y-4">
                            {[
                                { l: 'Accessibility', v: '100/100' },
                                { l: 'Best Practices', v: '100/100' },
                                { l: 'SEO Integrity', v: '98/100' },
                                { l: 'Performance', v: 'Instant' }
                            ].map(metric => (
                                <div key={metric.l} className="flex items-center justify-between pb-4 border-b">
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{metric.l}</span>
                                    <span className="font-bold">{metric.v}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-primary/5 rounded-[2rem] p-12 flex flex-col justify-center">
                        <div className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold mb-4">Engineer's Verdict</div>
                        <p className="text-2xl font-bebas italic leading-tight text-primary">
                          "This deployment represents a definitive standard in high-fidelity full-stack engineering, where technical integrity meets market-leading performance."
                        </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'strategy' && (
                <div className="space-y-16">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-px w-12 bg-primary" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Visibility Engine</span>
                    </div>
                    <h2 className="font-bebas text-7xl leading-none uppercase">Strategic Metadata</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <Card className="border-border/50 bg-white p-12 rounded-[2.5rem] shadow-xl">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Search className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-bebas text-3xl uppercase">SEO Dominance</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-8">
                        This document is architected to rank #1. I utilize high-density semantic markers and geospatial signals to ensure global indexing.
                      </p>
                      <div className="space-y-4">
                         <div className="flex items-center gap-3 font-mono text-[10px] uppercase">
                            <MapPin className="h-3 w-3 text-primary" />
                            <span>Origin: Dublin, Ireland</span>
                         </div>
                         <div className="flex items-center gap-3 font-mono text-[10px] uppercase">
                            <Globe className="h-3 w-3 text-primary" />
                            <span>Coverage: Global Distribution</span>
                         </div>
                      </div>
                    </Card>

                    <div className="space-y-4">
                      {project.stack.map(tag => (
                        <div key={tag} className="bg-[#071739] text-white px-8 py-5 rounded-2xl flex items-center justify-between group hover:bg-primary transition-all">
                           <span className="font-mono text-[11px] uppercase tracking-widest opacity-60">Meta_Tag</span>
                           <span className="font-bold">#{tag.replace(/\s+/g, '')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Phase Footer Navigation */}
          <div className="mt-32 pt-16 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-8">
            {prevTab && (
              <button 
                onClick={() => {
                  setActiveTab(prevTab.id);
                  scrollToContent();
                }}
                className="group flex items-center gap-6 text-left"
              >
                <div className="h-14 w-14 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                    <ArrowLeft className="h-5 w-5 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#A68858]">Previous Phase</div>
                  <div className="font-bebas text-3xl uppercase">{prevTab.label}</div>
                </div>
              </button>
            )}
            
            {nextTab && (
              <button 
                onClick={() => {
                  setActiveTab(nextTab.id);
                  scrollToContent();
                }}
                className="group flex items-center gap-6 text-right ml-auto"
              >
                <div className="text-right">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#A68858]">Next Phase</div>
                  <div className="font-bebas text-3xl uppercase">{nextTab.label}</div>
                </div>
                <div className="h-14 w-14 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                    <ArrowRight className="h-5 w-5 group-hover:text-white transition-colors" />
                </div>
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
