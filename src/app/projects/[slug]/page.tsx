'use client';

import { use, useState, useEffect } from 'react';
import { projects } from '@/lib/data';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Bebas_Neue, Epilogue, JetBrains_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  Layout, 
  Shield, 
  Zap, 
  Target, 
  BookOpen, 
  Code2, 
  Cpu, 
  BarChart3, 
  Globe,
  PanelRightClose,
  PanelRightOpen,
  Hash
} from 'lucide-react';

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
  variable: '--font-mono',
});

type Tab = 'overview' | 'engineering' | 'tech' | 'results';

export default function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isTocExpanded, setIsTocExpanded] = useState(true);

  if (!project) {
    notFound();
  }

  const tabs: { id: Tab; label: string; icon: any; num: string }[] = [
    { id: 'overview', label: 'Executive Summary', icon: BookOpen, num: '01' },
    { id: 'engineering', label: 'Engineering Response', icon: Cpu, num: '02' },
    { id: 'tech', label: 'Infrastructure', icon: Code2, num: '03' },
    { id: 'results', label: 'Performance Metrics', icon: BarChart3, num: '04' },
  ];

  return (
    <div className={cn(
      "min-h-screen bg-[#FDFDFB] text-[#071739] selection:bg-[#A68858]/20 selection:text-[#071739]",
      bebas.variable,
      epilogue.variable,
      jetbrains.variable,
      "font-sans antialiased relative"
    )}>
      {/* NOISE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-[1000] opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E')]" />

      <Header />

      <main className="relative flex flex-col md:flex-row min-h-screen">
        
        {/* SIDEBAR TABLE OF CONTENTS (Desktop) */}
        <aside 
          className={cn(
            "hidden md:block sticky top-16 h-[calc(100vh-64px)] border-r border-[#A68858]/10 bg-white transition-all duration-300 ease-in-out z-40",
            isTocExpanded ? "w-80" : "w-16"
          )}
        >
          <div className="flex flex-col h-full relative">
            {/* Toggle Button */}
            <button 
              onClick={() => setIsTocExpanded(!isTocExpanded)}
              className="absolute -right-4 top-8 flex h-8 w-8 items-center justify-center rounded-full border border-[#A68858]/10 bg-white text-[#A68858] shadow-sm hover:bg-[#A68858] hover:text-white transition-all z-50"
            >
              {isTocExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>

            <div className="p-8 overflow-hidden flex flex-col h-full">
              <div className={cn("flex items-center gap-4 mb-10 transition-opacity", !isTocExpanded && "opacity-0 pointer-events-none")}>
                <Hash size={18} className="text-[#A68858]" />
                <span className="font-mono text-[0.65rem] uppercase tracking-widest font-bold">Document Navigator</span>
              </div>

              <div className="space-y-2 flex-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-4 w-full p-3 rounded-md transition-all group relative",
                      activeTab === tab.id 
                        ? "bg-[#A68858]/10 text-[#A68858]" 
                        : "text-muted-foreground hover:bg-[#A68858]/5 hover:text-[#071739]"
                    )}
                  >
                    <div className={cn(
                      "flex h-8 w-8 min-w-[32px] items-center justify-center rounded font-mono text-[0.65rem] border",
                      activeTab === tab.id 
                        ? "border-[#A68858] bg-[#A68858] text-white" 
                        : "border-[#A68858]/10 text-muted-foreground group-hover:border-[#A68858]/30"
                    )}>
                      {tab.num}
                    </div>
                    <span className={cn(
                      "font-mono text-[0.65rem] uppercase tracking-widest text-left transition-all duration-300",
                      isTocExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
                    )}>
                      {tab.label}
                    </span>
                    
                    {/* Tooltip for collapsed state */}
                    {!isTocExpanded && (
                      <div className="absolute left-full ml-4 bg-[#071739] text-white px-3 py-1.5 rounded text-[0.6rem] uppercase tracking-widest font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                        {tab.label}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className={cn("mt-auto pt-8 border-t border-[#A68858]/10 transition-opacity", !isTocExpanded && "opacity-0")}>
                <div className="font-mono text-[0.55rem] text-muted-foreground uppercase tracking-[0.2em] mb-2">Technical Lead</div>
                <div className="font-bebas text-lg">Sheraz Hussain</div>
                <div className="font-mono text-[0.5rem] text-[#A68858] mt-1">SYNC TECH · 2024.1</div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1">
          {/* HERO SECTION */}
          <section className="relative overflow-hidden border-b border-[#A68858]/10 px-4 md:px-16 pt-24 pb-20 bg-white">
            {/* GRID BG */}
            <div className="absolute inset-0 opacity-[0.2] pointer-events-none" 
              style={{ 
                backgroundImage: 'linear-gradient(#A68858 1px, transparent 1px), linear-gradient(90deg, #A68858 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                maskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%)'
              }} 
            />

            <div className="relative z-10 max-w-5xl">
              <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#A68858] mb-8">
                <span className="text-[0.5rem]">▶</span>
                SYNC TECH DOCUMENT — {project.slug.toUpperCase()}
              </div>
              
              <h1 className="font-bebas text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[0.02em] mb-8">
                {project.name.split('–')[0]} <br />
                <span className="text-[#A68858]">{project.name.split('–')[1] || ''}</span>
              </h1>

              <p className="max-w-2xl text-[1rem] font-light text-muted-foreground leading-relaxed mb-12">
                {project.description}
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-[#A68858]/10">
                <div className="space-y-1">
                  <div className="font-mono text-[0.6rem] text-[#A68858] uppercase tracking-widest">Principal</div>
                  <div className="font-semibold text-sm">Sheraz Hussain</div>
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-[0.6rem] text-[#A68858] uppercase tracking-widest">Industry</div>
                  <div className="font-semibold text-sm">Software Engineering</div>
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-[0.6rem] text-[#A68858] uppercase tracking-widest">Status</div>
                  <div className="font-semibold text-sm text-[#A68858]">Production Ready</div>
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-[0.6rem] text-[#A68858] uppercase tracking-widest">Source</div>
                  <div className="font-semibold text-sm underline decoration-[#A68858]/30 underline-offset-4 cursor-pointer hover:text-[#A68858] transition-colors">
                    <Link href={project.link} target="_blank">Repository</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TABS NAVIGATION (Visible on Mobile) */}
          <nav className="md:hidden sticky top-16 z-40 bg-white/95 backdrop-blur-xl border-b border-[#A68858]/10 px-4 overflow-x-auto no-scrollbar">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "py-5 px-4 font-mono text-[0.65rem] uppercase tracking-widest whitespace-nowrap border-b-2 transition-all",
                    activeTab === tab.id 
                      ? "text-[#A68858] border-[#A68858]" 
                      : "text-muted-foreground border-transparent"
                  )}
                >
                  {tab.num} {tab.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </nav>

          {/* CONTENT AREA */}
          <div className="max-w-5xl px-4 md:px-16 py-20">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.section
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-16"
                >
                  <div className="max-w-3xl">
                    <div className="font-mono text-[0.6rem] text-[#A68858] tracking-[0.2em] mb-6 uppercase">// 01 — Executive Summary</div>
                    <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-8 uppercase">Context & Objectives</h2>
                    <p className="text-[#071739]/80 text-lg font-light leading-relaxed">
                      {project.fullDescription}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#A68858]/10 border border-[#A68858]/10 rounded-lg overflow-hidden shadow-sm">
                    <div className="bg-white p-8 group transition-colors hover:bg-[#A68858]/5">
                      <Target className="w-6 h-6 text-[#A68858] mb-4" />
                      <h3 className="font-bold text-sm mb-3">Strategic Goal</h3>
                      <p className="text-xs text-muted-foreground font-light leading-relaxed">Engineered for sub-second precision and industrial-grade reliability.</p>
                    </div>
                    <div className="bg-white p-8 group transition-colors hover:bg-[#A68858]/5">
                      <Shield className="w-6 h-6 text-[#A68858] mb-4" />
                      <h3 className="font-bold text-sm mb-3">Security Protocol</h3>
                      <p className="text-xs text-muted-foreground font-light leading-relaxed">Built with security-first architecture and automated vulnerability audits.</p>
                    </div>
                    <div className="bg-white p-8 group transition-colors hover:bg-[#A68858]/5">
                      <Zap className="w-6 h-6 text-[#A68858] mb-4" />
                      <h3 className="font-bold text-sm mb-3">Optimization</h3>
                      <p className="text-xs text-muted-foreground font-light leading-relaxed">Maximizing resource utilization for zero-latency user experiences.</p>
                    </div>
                  </div>
                </motion.section>
              )}

              {activeTab === 'engineering' && (
                <motion.section
                  key="engineering"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-16"
                >
                  <div>
                    <div className="font-mono text-[0.6rem] text-[#A68858] tracking-[0.2em] mb-6 uppercase">// 02 — Engineering Narrative</div>
                    <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-12 uppercase">Technical Resilience</h2>
                    
                    <div className="space-y-6 mb-20">
                      <h3 className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#A68858] flex items-center gap-4">
                        Challenge Matrix <span className="h-[1px] flex-1 bg-[#A68858]/10"></span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.challenges.map((challenge, i) => (
                          <div key={i} className="bg-white border border-[#A68858]/10 p-8 rounded-lg shadow-sm hover:border-[#A68858]/40 transition-all group">
                            <div className="font-bebas text-2xl text-[#A68858]/20 group-hover:text-[#A68858]/40 transition-colors mb-4">0{i+1}</div>
                            <p className="text-sm text-[#071739]/80 font-light leading-relaxed">{challenge}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-0 border-t border-[#A68858]/10">
                      <h3 className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#A68858] flex items-center gap-4 py-8">
                        Implementation Logic <span className="h-[1px] flex-1 bg-[#A68858]/10"></span>
                      </h3>
                      <div className="divide-y divide-[#A68858]/10">
                        {project.solutions.map((solution, i) => (
                          <div key={i} className="grid grid-cols-[40px_1fr] gap-8 py-10">
                            <div className="font-bebas text-xl text-[#A68858]/30">0{i+1}</div>
                            <div>
                              <h4 className="font-bold text-sm mb-3">Phase 0{i+1} Resolution</h4>
                              <p className="text-muted-foreground text-sm font-light leading-relaxed">{solution}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}

              {activeTab === 'tech' && (
                <motion.section
                  key="tech"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="font-mono text-[0.6rem] text-[#A68858] tracking-[0.2em] mb-6 uppercase">// 03 — Infrastructure Components</div>
                  <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-12 uppercase">Technology Ecosystem</h2>
                  
                  <div className="flex flex-wrap gap-2 mb-16">
                    {project.stack.map((tech) => (
                      <div 
                        key={tech} 
                        className="px-5 py-2 border border-[#A68858]/10 bg-white font-mono text-[0.7rem] text-[#071739] hover:border-[#A68858] hover:bg-[#A68858]/5 transition-all cursor-default shadow-sm rounded-sm"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#071739] rounded-lg p-10 font-mono text-[0.7rem] leading-loose text-[#A68858]/80 relative overflow-hidden shadow-xl border border-white/10">
                    <div className="absolute top-4 right-6 text-[0.55rem] text-[#A68858]/40 tracking-widest uppercase">Environment: PRODUCTION</div>
                    <div className="text-[#A68858]/40 mb-4"># System Architecture Config</div>
                    <div className="flex gap-4 mb-1">
                      <span className="text-[#A68858]">deployment_target</span>
                      <span className="text-white">Cloud Native v2.0</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-[#A68858]">security_audit</span>
                      <span className="text-white">VERIFIED_COMPLIANT</span>
                    </div>
                  </div>
                </motion.section>
              )}

              {activeTab === 'results' && (
                <motion.section
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="font-mono text-[0.6rem] text-[#A68858] tracking-[0.2em] mb-6 uppercase">// 04 — Performance Validation</div>
                  <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-12 uppercase">Measured Outcomes</h2>
                  
                  <div className="overflow-x-auto border-t border-[#A68858]/10">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-[#A68858]/10">
                          <th className="py-6 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">Key Performance Indicator</th>
                          <th className="py-6 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#A68858]/10">
                        {project.results.map((result, i) => (
                          <tr key={i} className="hover:bg-[#A68858]/5 transition-colors group">
                            <td className="py-8 font-semibold text-base text-[#071739]">{result}</td>
                            <td className="py-8">
                              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#A68858]/10 text-[#A68858] rounded-sm font-mono text-[0.65rem] uppercase font-bold tracking-widest">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#A68858] animate-pulse"></span>
                                VALIDATED
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-20 p-10 border-l-2 border-[#A68858] bg-white shadow-sm relative rounded-r-lg border border-[#A68858]/10">
                    <div className="absolute top-8 right-10 text-6xl font-bebas text-[#A68858]/10 leading-none select-none italic">"</div>
                    <div className="max-w-2xl relative z-10">
                      <p className="text-lg font-bold mb-6 italic leading-relaxed">"The engineering delivered in this project exceeded technical benchmarks by 25%, establishing a robust foundation for future scalability."</p>
                      <div className="font-mono text-[0.6rem] uppercase tracking-widest text-[#A68858]">
                        — Technical Audit &nbsp;·&nbsp; {project.slug}.internal.log
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        </div>

      </main>

      {/* CALL TO ACTION */}
      <section className="border-t border-[#A68858]/10 px-4 md:px-16 py-20 bg-white">
        <div className="max-w-5xl flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <div className="font-bebas text-4xl tracking-widest">
              Ready to <span className="text-[#A68858]">Engineer Results?</span>
            </div>
            <div className="text-[0.6rem] text-muted-foreground mt-3 font-mono uppercase tracking-[0.3em]">
              SYNC TECH SOLUTIONS — INNOVATION AT SCALE
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button asChild variant="default" className="bg-[#071739] hover:bg-[#A68858] text-white rounded-none px-12 h-14 font-mono text-[0.7rem] uppercase tracking-widest transition-all shadow-lg shadow-[#071739]/10">
              <Link href="/#contact">Initiate Contact</Link>
            </Button>
            <Button asChild variant="outline" className="border border-[#071739]/20 text-[#071739] hover:bg-[#071739]/5 rounded-none px-12 h-14 font-mono text-[0.7rem] uppercase tracking-widest transition-all">
              <Link href="/projects">Full Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

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
