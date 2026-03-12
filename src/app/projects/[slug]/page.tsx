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
import { ArrowRight, ChevronRight, Layout, Shield, Zap, Target, BookOpen } from 'lucide-react';

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

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: '① Overview' },
    { id: 'engineering', label: '② Engineering' },
    { id: 'tech', label: '③ Tech Stack' },
    { id: 'results', label: '④ Results' },
  ];

  return (
    <div className={cn(
      "min-h-screen bg-[#071739] text-[#e8eaf0] selection:bg-[#A68858] selection:text-[#071739]",
      bebas.variable,
      epilogue.variable,
      jetbrains.variable,
      "font-sans antialiased relative"
    )}>
      {/* NOISE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-[1000] opacity-[0.05] bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E')]" />

      <Header />

      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-[#A68858]/20 px-4 md:px-16 pt-24 pb-20">
          {/* GRID BG */}
          <div className="absolute inset-0 opacity-[0.1] pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(#A68858 1px, transparent 1px), linear-gradient(90deg, #A68858 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%)'
            }} 
          />
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-gradient-to-b from-[#A68858]/10 to-transparent blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#A68858] mb-8">
              <span className="text-[0.55rem]">▶</span>
              Technical Case Study — Document 01
            </div>
            
            <h1 className="font-bebas text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[0.02em] mb-8">
              {project.name.split('–')[0]} <br />
              <span className="text-[#A68858]">{project.name.split('–')[1] || ''}</span>
            </h1>

            <p className="max-w-2xl text-[1rem] md:text-[1.1rem] font-light text-[#A68858]/70 leading-relaxed mb-12">
              {project.description}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-[#A68858]/20">
              <div>
                <div className="font-mono text-[0.65rem] text-[#A68858]/60 uppercase tracking-widest mb-1">Principal</div>
                <div className="font-bebas text-xl text-[#e8eaf0]">Sheraz Hussain</div>
              </div>
              <div>
                <div className="font-mono text-[0.65rem] text-[#A68858]/60 uppercase tracking-widest mb-1">Industry</div>
                <div className="font-bebas text-xl text-[#e8eaf0]">Information Technology</div>
              </div>
              <div>
                <div className="font-mono text-[0.65rem] text-[#A68858]/60 uppercase tracking-widest mb-1">Status</div>
                <div className="font-bebas text-xl text-[#A68858]">Live Production</div>
              </div>
              <div>
                <div className="font-mono text-[0.65rem] text-[#A68858]/60 uppercase tracking-widest mb-1">Source</div>
                <div className="font-bebas text-xl">
                  <Link href={project.link} target="_blank" className="hover:text-[#A68858] transition-colors underline underline-offset-4 decoration-[#A68858]/30">
                    Access Repository
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TABS NAVIGATION */}
        <nav className="sticky top-16 z-40 bg-[#071739]/95 backdrop-blur-xl border-b border-[#A68858]/20 px-4 md:px-16 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "py-6 px-6 font-mono text-[0.72rem] uppercase tracking-widest whitespace-nowrap border-b-2 transition-all",
                  activeTab === tab.id 
                    ? "text-[#A68858] border-[#A68858]" 
                    : "text-[#A68858]/40 border-transparent hover:text-[#A68858]/70"
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
                  <div className="font-mono text-[0.68rem] text-[#A68858] tracking-[0.2em] mb-4 uppercase">// 01 — Contextual Narrative</div>
                  <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-8 uppercase">Project Genesis</h2>
                  <p className="text-[#A68858]/70 text-lg font-light leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#A68858]/20 border border-[#A68858]/20 rounded-sm overflow-hidden mt-12">
                  <div className="bg-[#071739] p-8 md:p-10 group hover:bg-[#071739]/80 transition-colors">
                    <Target className="w-8 h-8 text-[#A68858] mb-4" />
                    <h3 className="font-bold mb-3 text-white">Objective</h3>
                    <p className="text-sm text-[#A68858]/60 font-light leading-relaxed">Engineered for high-performance delivery within complex technical ecosystems.</p>
                  </div>
                  <div className="bg-[#071739] p-8 md:p-10 group hover:bg-[#071739]/80 transition-colors border-[#A68858]/20">
                    <Shield className="w-8 h-8 text-[#A68858] mb-4" />
                    <h3 className="font-bold mb-3 text-white">Architecture</h3>
                    <p className="text-sm text-[#A68858]/60 font-light leading-relaxed">Zero-trust principles applied to every layer of the infrastructure stack.</p>
                  </div>
                  <div className="bg-[#071739] p-8 md:p-10 group hover:bg-[#071739]/80 transition-colors border-[#A68858]/20">
                    <Zap className="w-8 h-8 text-[#A68858] mb-4" />
                    <h3 className="font-bold mb-3 text-white">Efficiency</h3>
                    <p className="text-sm text-[#A68858]/60 font-light leading-relaxed">Optimized for sub-2s response times and maximum availability targets.</p>
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
                  <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-8 uppercase">Technical Execution</h2>
                  
                  <div className="space-y-6">
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#A68858]/40 flex items-center gap-4">
                      Critical Challenges <span className="h-[1px] flex-1 bg-[#A68858]/20"></span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.challenges.map((challenge, i) => (
                        <div key={i} className="bg-[#0d1117] border border-[#A68858]/20 p-8 rounded-sm">
                          <div className="font-bebas text-3xl text-[#A68858] mb-4">0{i+1}</div>
                          <p className="text-sm text-[#A68858]/70 font-light leading-relaxed">{challenge}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6 mt-16">
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#A68858]/40 flex items-center gap-4">
                      Strategic Implementation <span className="h-[1px] flex-1 bg-[#A68858]/20"></span>
                    </h3>
                    <div className="divide-y divide-[#A68858]/20">
                      {project.solutions.map((solution, i) => (
                        <div key={i} className="grid grid-cols-[60px_1fr] gap-8 py-10 first:pt-0">
                          <div className="font-bebas text-2xl text-[#A68858]/40">0{i+1}</div>
                          <div>
                            <h4 className="font-bold mb-3 text-white">Technical Response Phase 0{i+1}</h4>
                            <p className="text-[#A68858]/70 font-light leading-relaxed">{solution}</p>
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
                <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-12 uppercase">Technology Stack</h2>
                
                <div className="flex flex-wrap gap-3">
                  {project.stack.map((tech) => (
                    <div 
                      key={tech} 
                      className="px-6 py-3 border border-[#A68858]/20 bg-[#0d1117] font-mono text-sm text-[#A68858] hover:border-[#A68858] hover:bg-[#A68858]/5 transition-all cursor-default"
                    >
                      {tech}
                    </div>
                  ))}
                </div>

                <div className="mt-16 bg-[#0d1117] border-l-4 border-[#A68858] p-8 font-mono text-sm leading-relaxed text-[#A68858]/80 relative overflow-hidden">
                  <div className="absolute top-4 right-6 text-[0.6rem] text-[#A68858]/40 tracking-widest uppercase">System Config</div>
                  <div className="text-[#A68858]/30 mb-2"># Stack Architecture Overview</div>
                  <div className="flex gap-4 mb-2">
                    <span className="text-[#A68858]">environment</span>
                    <span className="text-[#E3CCAC]">production</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#A68858]">status</span>
                    <span className="text-[#A68858]/90">optimized</span>
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
                <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-12 uppercase">Measured Outcomes</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b-2 border-[#A68858]/30">
                        <th className="py-4 font-mono text-[0.65rem] uppercase tracking-widest text-[#A68858]/40">Metric Identifier</th>
                        <th className="py-4 font-mono text-[0.65rem] uppercase tracking-widest text-[#A68858]/40">Verification Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#A68858]/10">
                      {project.results.map((result, i) => (
                        <tr key={i} className="hover:bg-[#A68858]/5 transition-colors">
                          <td className="py-6 font-bold text-lg md:text-xl text-[#e8eaf0]">{result}</td>
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

                <div className="mt-20 p-8 md:p-12 border border-[#A68858]/20 bg-[#0d1117] relative">
                  <div className="absolute top-8 right-12 text-6xl font-bebas text-[#A68858]/10 leading-none select-none">"</div>
                  <div className="max-w-2xl relative z-10">
                    <p className="text-xl font-bold mb-6 italic leading-relaxed text-white">"The technical implementation exceeded all project requirements, providing a scalable and secure foundation for future iteration."</p>
                    <div className="font-mono text-xs uppercase tracking-widest text-[#A68858]/60">
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
      <section className="border-t border-[#A68858]/20 px-4 md:px-16 py-16 bg-[#0d1117]/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <div className="font-bebas text-3xl md:text-4xl tracking-widest text-white">
              READY TO <span className="text-[#A68858]">ENGINEER SUCCESS?</span>
            </div>
            <div className="text-xs text-[#A68858]/60 mt-2 font-mono uppercase tracking-widest">
              SYNC TECH SOLUTIONS — INNOVATION AT SCALE
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button asChild variant="default" className="bg-[#A68858] hover:bg-[#A68858]/90 text-white rounded-none px-12 h-14 font-bebas text-xl tracking-[0.1em] transition-all">
              <Link href="/#contact">LET'S TALK</Link>
            </Button>
            <Button asChild variant="outline" className="border-2 border-[#A68858]/30 text-[#A68858] hover:bg-[#A68858]/10 rounded-none px-12 h-14 font-bebas text-xl tracking-[0.1em] transition-all">
              <Link href="/projects">ALL PROJECTS</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}