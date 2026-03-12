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

  const tabs: { id: Tab; label: string } = [
    { id: 'overview', label: '① Overview' },
    { id: 'engineering', label: '② Engineering' },
    { id: 'tech', label: '③ Tech Stack' },
    { id: 'results', label: '④ Results' },
  ];

  return (
    <div className={cn(
      "min-h-screen bg-[#060810] text-[#e8eaf0] selection:bg-[#00e5ff] selection:text-[#060810]",
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
        <section className="relative overflow-hidden border-b border-[#1e2836] px-6 md:px-16 pt-24 pb-20">
          {/* GRID BG */}
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(#1e2836 1px, transparent 1px), linear-gradient(90deg, #1e2836 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%)'
            }} 
          />
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#00e5ff]/10 to-transparent blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#00e5ff] mb-8">
              <span className="text-[0.55rem]">▶</span>
              Engineering Case Study
            </div>
            
            <h1 className="font-bebas text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] tracking-[0.02em] mb-8">
              {project.name.split('–')[0]} <br />
              <span className="text-[#00e5ff]">{project.name.split('–')[1] || ''}</span>
            </h1>

            <p className="max-w-2xl text-[1.05rem] font-light text-[#6b7a94] leading-relaxed mb-12">
              {project.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-[#1e2836]">
              <div>
                <div className="font-mono text-[0.65rem] text-[#6b7a94] uppercase tracking-widest mb-1">Principal</div>
                <div className="font-bebas text-xl">Sheraz Hussain</div>
              </div>
              <div>
                <div className="font-mono text-[0.65rem] text-[#6b7a94] uppercase tracking-widest mb-1">Industry</div>
                <div className="font-bebas text-xl">Information Technology</div>
              </div>
              <div>
                <div className="font-mono text-[0.65rem] text-[#6b7a94] uppercase tracking-widest mb-1">Status</div>
                <div className="font-bebas text-xl text-[#b8ff57]">Live Production</div>
              </div>
              <div>
                <div className="font-mono text-[0.65rem] text-[#6b7a94] uppercase tracking-widest mb-1">Source</div>
                <div className="font-bebas text-xl">
                  <Link href={project.link} target="_blank" className="hover:text-[#00e5ff] transition-colors underline underline-offset-4 decoration-[#1e2836]">
                    GitHub Repo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TABS NAVIGATION */}
        <nav className="sticky top-16 z-40 bg-[#060810]/92 backdrop-blur-xl border-b border-[#1e2836] px-6 md:px-16">
          <div className="max-w-7xl mx-auto flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "py-6 px-6 font-mono text-[0.72rem] uppercase tracking-widest whitespace-nowrap border-b-2 transition-all",
                  activeTab === tab.id 
                    ? "text-[#00e5ff] border-[#00e5ff]" 
                    : "text-[#6b7a94] border-transparent hover:text-[#e8eaf0]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* CONTENT AREA */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">
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
                  <div className="font-mono text-[0.68rem] text-[#00e5ff] tracking-[0.2em] mb-4 uppercase">// 01 — Context</div>
                  <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-8 uppercase">Project Background</h2>
                  <p className="text-[#6b7a94] text-lg font-light leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-[#1e2836] border border-[#1e2836] rounded-sm overflow-hidden mt-12">
                  <div className="bg-[#0d1117] p-10 group hover:bg-[#131921] transition-colors">
                    <div className="text-3xl mb-4">🎯</div>
                    <h3 className="font-bold mb-3">Objective</h3>
                    <p className="text-sm text-[#6b7a94] font-light leading-relaxed">Engineered for high-performance and clear value communication within the technical landscape.</p>
                  </div>
                  <div className="bg-[#0d1117] p-10 group hover:bg-[#131921] transition-colors border-l border-[#1e2836]">
                    <div className="text-3xl mb-4">🛡️</div>
                    <h3 className="font-bold mb-3">Security</h3>
                    <p className="text-sm text-[#6b7a94] font-light leading-relaxed">Zero-trust architecture and best practices implemented at every layer of the stack.</p>
                  </div>
                  <div className="bg-[#0d1117] p-10 group hover:bg-[#131921] transition-colors border-l border-[#1e2836]">
                    <div className="text-3xl mb-4">⚡</div>
                    <h3 className="font-bold mb-3">Performance</h3>
                    <p className="text-sm text-[#6b7a94] font-light leading-relaxed">Optimized for sub-2s load times and 95+ PageSpeed scores across all metrics.</p>
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
                  <div className="font-mono text-[0.68rem] text-[#ff4d6d] tracking-[0.2em] mb-4 uppercase">// 02 — Problem / Solution</div>
                  <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-8 uppercase">The Engineering Narrative</h2>
                  
                  <div className="space-y-6">
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#6b7a94] flex items-center gap-4">
                      Critical Challenges <span className="h-[1px] flex-1 bg-[#1e2836]"></span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.challenges.map((challenge, i) => (
                        <div key={i} className="bg-[#0d1117] border border-[#1e2836] p-8 rounded-sm">
                          <div className="font-bebas text-3xl text-[#ff4d6d] mb-4">0{i+1}</div>
                          <p className="text-sm text-[#6b7a94] font-light leading-relaxed">{challenge}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6 mt-16">
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#6b7a94] flex items-center gap-4">
                      Strategic Implementation <span className="h-[1px] flex-1 bg-[#1e2836]"></span>
                    </h3>
                    <div className="divide-y divide-[#1e2836]">
                      {project.solutions.map((solution, i) => (
                        <div key={i} className="grid grid-cols-[60px_1fr] gap-8 py-10 first:pt-0">
                          <div className="font-bebas text-2xl text-[#6b7a94]">0{i+1}</div>
                          <div>
                            <h4 className="font-bold mb-3 text-[#e8eaf0]">Response Phase 0{i+1}</h4>
                            <p className="text-[#6b7a94] font-light leading-relaxed">{solution}</p>
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
                <div className="font-mono text-[0.68rem] text-[#b8ff57] tracking-[0.2em] mb-4 uppercase">// 03 — Infrastructure</div>
                <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-12 uppercase">Technology Stack</h2>
                
                <div className="flex flex-wrap gap-4">
                  {project.stack.map((tech) => (
                    <div 
                      key={tech} 
                      className="px-6 py-3 border border-[#1e2836] bg-[#0d1117] font-mono text-sm text-[#e8eaf0] hover:border-[#b8ff57] hover:text-[#b8ff57] transition-all cursor-default"
                    >
                      {tech}
                    </div>
                  ))}
                </div>

                <div className="mt-16 bg-[#0d1117] border-l-4 border-[#b8ff57] p-8 font-mono text-sm leading-relaxed text-[#a8d8ea] relative overflow-hidden">
                  <div className="absolute top-4 right-6 text-[0.6rem] text-[#6b7a94] tracking-widest uppercase">System Config</div>
                  <div className="text-[#4a6272] mb-2"># Stack Architecture Overview</div>
                  <div className="flex gap-4 mb-2">
                    <span className="text-[#ff4d6d]">environment</span>
                    <span className="text-[#ffd166]">production</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#b8ff57]">status</span>
                    <span className="text-[#00e5ff]">optimized</span>
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
                <div className="font-mono text-[0.68rem] text-[#ffd166] tracking-[0.2em] mb-4 uppercase">// 04 — Validation</div>
                <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-12 uppercase">Verified Results</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b-2 border-[#e8eaf0]">
                        <th className="py-4 font-mono text-[0.65rem] uppercase tracking-widest text-[#6b7a94]">Metric / Objective</th>
                        <th className="py-4 font-mono text-[0.65rem] uppercase tracking-widest text-[#6b7a94]">Outcome Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e2836]">
                      {project.results.map((result, i) => (
                        <tr key={i} className="hover:bg-[#131921] transition-colors">
                          <td className="py-6 font-bold text-lg">{result}</td>
                          <td className="py-6">
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#b8ff57]/10 text-[#b8ff57] rounded-sm font-mono text-[0.7rem] uppercase">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#b8ff57] animate-pulse"></span>
                              Verified
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-20 p-12 border border-[#1e2836] bg-[#0d1117] relative">
                  <div className="absolute top-8 right-12 text-6xl font-bebas text-[#1e2836] leading-none select-none">"</div>
                  <div className="max-w-2xl">
                    <p className="text-xl font-bold mb-6 italic leading-relaxed">"The implementation of this project significantly transformed our technical capability, delivering immediate ROI through performance and reliability."</p>
                    <div className="font-mono text-xs uppercase tracking-widest text-[#6b7a94]">
                      — Technical Review &nbsp;·&nbsp; {project.slug}.sys
                    </div>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="border-t border-[#1e2836] px-6 md:px-16 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="font-bebas text-2xl tracking-widest">
            READY TO BUILD <span className="text-[#00e5ff]">SOMETHING AMAZING?</span>
          </div>
          <div className="text-xs text-[#6b7a94] mt-2 font-mono uppercase tracking-widest">
            SYNC TECH Solutions · IT Excellence
          </div>
        </div>
        <Button asChild className="bg-[#e8eaf0] text-[#060810] hover:bg-[#00e5ff] rounded-none px-12 h-14 font-bebas text-xl tracking-[0.1em] transition-all">
          <Link href="/#contact">LET'S TALK</Link>
        </Button>
      </footer>

      <Footer />
    </div>
  );
}
