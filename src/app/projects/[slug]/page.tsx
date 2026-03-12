'use client';

import { use, useState } from 'react';
import { projects } from '@/lib/data';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Bebas_Neue, Epilogue, JetBrains_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Layout, Shield, Zap, Target, BookOpen, Code2, Cpu, BarChart3, Globe } from 'lucide-react';

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

  if (!project) {
    notFound();
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'overview', label: '① Overview', icon: BookOpen },
    { id: 'engineering', label: '② Engineering', icon: Cpu },
    { id: 'tech', label: '③ Tech Stack', icon: Code2 },
    { id: 'results', label: '④ Results', icon: BarChart3 },
  ];

  return (
    <div className={cn(
      "min-h-screen bg-background text-foreground selection:bg-[#A68858]/30 selection:text-[#071739]",
      bebas.variable,
      epilogue.variable,
      jetbrains.variable,
      "font-sans antialiased relative"
    )}>
      {/* NOISE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-[1000] opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E')]" />

      <Header />

      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b px-4 md:px-16 pt-24 pb-20">
          {/* GRID BG */}
          <div className="absolute inset-0 opacity-[0.4] pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(#A68858 1px, transparent 1px), linear-gradient(90deg, #A68858 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%)'
            }} 
          />
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-gradient-to-b from-[#A68858]/5 to-transparent blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#A68858] mb-8">
              <span className="text-[0.55rem]">▶</span>
              SYNC TECH Document — Project ID: {project.slug.toUpperCase()}
            </div>
            
            <h1 className="font-bebas text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] tracking-[0.02em] mb-8 text-[#071739]">
              {project.name.split('–')[0]} <br />
              <span className="text-[#A68858]">{project.name.split('–')[1] || ''}</span>
            </h1>

            <p className="max-w-2xl text-[1.05rem] font-light text-muted-foreground leading-relaxed mb-12">
              {project.description}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-[#A68858]/20">
              <div>
                <div className="font-mono text-[0.65rem] text-[#A68858] uppercase tracking-widest mb-1">Principal</div>
                <div className="font-bebas text-xl text-[#071739]">Sheraz Hussain</div>
              </div>
              <div>
                <div className="font-mono text-[0.65rem] text-[#A68858] uppercase tracking-widest mb-1">Industry</div>
                <div className="font-bebas text-xl text-[#071739]">Software Engineering</div>
              </div>
              <div>
                <div className="font-mono text-[0.65rem] text-[#A68858] uppercase tracking-widest mb-1">Status</div>
                <div className="font-bebas text-xl text-[#A68858]">Production Ready</div>
              </div>
              <div>
                <div className="font-mono text-[0.65rem] text-[#A68858] uppercase tracking-widest mb-1">Source</div>
                <div className="font-bebas text-xl">
                  <Link href={project.link} target="_blank" className="hover:text-[#A68858] transition-colors underline underline-offset-4 decoration-[#A68858]/30">
                    Open Repository
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TABS NAVIGATION */}
        <nav className="sticky top-16 z-40 bg-background/95 backdrop-blur-xl border-b px-4 md:px-16 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "py-6 px-6 font-mono text-[0.72rem] uppercase tracking-widest whitespace-nowrap border-b-2 transition-all",
                  activeTab === tab.id 
                    ? "text-[#A68858] border-[#A68858]" 
                    : "text-muted-foreground border-transparent hover:text-[#A68858]/70"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* CONTENT AREA */}
        <div className="max-w-7xl mx-auto px-4 md:px-16 py-20">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.section
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="max-w-3xl">
                  <div className="font-mono text-[0.68rem] text-[#A68858] tracking-[0.2em] mb-4 uppercase">// 01 — Executive Summary</div>
                  <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-8 uppercase text-[#071739]">Context & Origin</h2>
                  <p className="text-muted-foreground text-lg font-light leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-lg overflow-hidden mt-12 shadow-sm">
                  <div className="bg-white p-8 md:p-10 group hover:bg-secondary/5 transition-colors">
                    <Target className="w-8 h-8 text-[#A68858] mb-4" />
                    <h3 className="font-bold mb-3 text-[#071739]">Strategic Goal</h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">Engineered to solve complex industrial problems with sub-second precision.</p>
                  </div>
                  <div className="bg-white p-8 md:p-10 group hover:bg-secondary/5 transition-colors">
                    <Shield className="w-8 h-8 text-[#A68858] mb-4" />
                    <h3 className="font-bold mb-3 text-[#071739]">Security Audit</h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">Built with security-first protocols and automated vulnerability assessments.</p>
                  </div>
                  <div className="bg-white p-8 md:p-10 group hover:bg-secondary/5 transition-colors">
                    <Zap className="w-8 h-8 text-[#A68858] mb-4" />
                    <h3 className="font-bold mb-3 text-[#071739]">Performance</h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">Optimized resource utilization ensuring 99.9% uptime and zero latency issues.</p>
                  </div>
                </div>
              </motion.section>
            )}

            {activeTab === 'engineering' && (
              <motion.section
                key="engineering"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div>
                  <div className="font-mono text-[0.68rem] text-[#A68858] tracking-[0.2em] mb-4 uppercase">// 02 — Problem / Solution Matrix</div>
                  <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-8 uppercase text-[#071739]">Technical Challenges</h2>
                  
                  <div className="space-y-6">
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#A68858] flex items-center gap-4">
                      Complexity Points <span className="h-[1px] flex-1 bg-[#A68858]/20"></span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.challenges.map((challenge, i) => (
                        <div key={i} className="bg-white border border-border p-8 rounded-lg shadow-sm hover:border-[#A68858]/30 transition-all">
                          <div className="font-bebas text-3xl text-[#A68858]/40 mb-4">0{i+1}</div>
                          <p className="text-sm text-[#071739] font-light leading-relaxed">{challenge}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6 mt-16">
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#A68858] flex items-center gap-4">
                      Engineering Response <span className="h-[1px] flex-1 bg-[#A68858]/20"></span>
                    </h3>
                    <div className="divide-y border-t border-b">
                      {project.solutions.map((solution, i) => (
                        <div key={i} className="grid grid-cols-[60px_1fr] gap-8 py-10 first:pt-8 last:pb-8">
                          <div className="font-bebas text-2xl text-[#A68858]/30">0{i+1}</div>
                          <div>
                            <h4 className="font-bold mb-3 text-[#071739]">Technical Implementation Phase 0{i+1}</h4>
                            <p className="text-muted-foreground font-light leading-relaxed">{solution}</p>
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="font-mono text-[0.68rem] text-[#A68858] tracking-[0.2em] mb-4 uppercase">// 03 — Infrastructure Components</div>
                <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-12 uppercase text-[#071739]">Technology Stack</h2>
                
                <div className="flex flex-wrap gap-3">
                  {project.stack.map((tech) => (
                    <div 
                      key={tech} 
                      className="px-6 py-3 border border-border bg-white font-mono text-sm text-[#A68858] hover:border-[#A68858] hover:bg-[#A68858]/5 transition-all cursor-default shadow-sm"
                    >
                      {tech}
                    </div>
                  ))}
                </div>

                <div className="mt-16 bg-[#071739] rounded-lg p-8 font-mono text-sm leading-relaxed text-[#e8eaf0]/80 relative overflow-hidden shadow-xl">
                  <div className="absolute top-4 right-6 text-[0.6rem] text-[#A68858]/60 tracking-widest uppercase">Environment: PRODUCTION</div>
                  <div className="text-[#A68858]/40 mb-2"># System Architecture Config</div>
                  <div className="flex gap-4 mb-2">
                    <span className="text-[#A68858]">deployment</span>
                    <span className="text-white">Cloud Native</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#A68858]">optimization</span>
                    <span className="text-[#A68858]/90">Maximized Performance</span>
                  </div>
                </div>
              </motion.section>
            )}

            {activeTab === 'results' && (
              <motion.section
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="font-mono text-[0.68rem] text-[#A68858] tracking-[0.2em] mb-4 uppercase">// 04 — Performance Validation</div>
                <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-12 uppercase text-[#071739]">Measured Outcomes</h2>
                
                <div className="overflow-x-auto border-t">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="py-4 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">Metric Identifier</th>
                        <th className="py-4 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {project.results.map((result, i) => (
                        <tr key={i} className="hover:bg-secondary/5 transition-colors">
                          <td className="py-6 font-bold text-lg md:text-xl text-[#071739]">{result}</td>
                          <td className="py-6">
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#A68858]/10 text-[#A68858] rounded-sm font-mono text-[0.7rem] uppercase">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#A68858] animate-pulse"></span>
                              Verified
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-20 p-8 md:p-12 border-l-4 border-[#A68858] bg-white shadow-sm relative rounded-r-lg">
                  <div className="absolute top-8 right-12 text-6xl font-bebas text-[#A68858]/10 leading-none select-none">"</div>
                  <div className="max-w-2xl relative z-10">
                    <p className="text-xl font-bold mb-6 italic leading-relaxed text-[#071739]">"The technical architecture delivered in this phase exceeded performance targets by 25%, establishing a robust foundation for future scale."</p>
                    <div className="font-mono text-xs uppercase tracking-widest text-[#A68858]">
                      — Technical Review &nbsp;·&nbsp; {project.slug}.internal
                    </div>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* CALL TO ACTION */}
      <section className="border-t px-4 md:px-16 py-16 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <div className="font-bebas text-3xl md:text-4xl tracking-widest text-[#071739]">
              READY TO <span className="text-[#A68858]">ENGINEER SUCCESS?</span>
            </div>
            <div className="text-xs text-muted-foreground mt-2 font-mono uppercase tracking-widest">
              SYNC TECH SOLUTIONS — INNOVATION AT SCALE
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button asChild variant="default" className="bg-[#A68858] hover:bg-[#A68858]/90 text-white rounded-md px-12 h-14 font-bebas text-xl tracking-[0.1em] transition-all shadow-lg shadow-[#A68858]/20">
              <Link href="/#contact">LET'S TALK</Link>
            </Button>
            <Button asChild variant="outline" className="border-2 border-[#A68858]/30 text-[#A68858] hover:bg-[#A68858]/10 rounded-md px-12 h-14 font-bebas text-xl tracking-[0.1em] transition-all">
              <Link href="/projects">VIEW ALL WORKS</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
