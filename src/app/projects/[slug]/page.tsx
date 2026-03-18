'use client';

import { use, useState, useRef } from 'react';
import { projects } from '@/lib/data';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Bebas_Neue, Epilogue, JetBrains_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
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
  MapPin
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
  weight: ['400', '600'],
  variable: '--font-mono',
});

type Tab = 'overview' | 'engineering' | 'tech' | 'results' | 'strategy';

export default function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!project) {
    notFound();
  }

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

  // Structured Data for Google Search
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': project.name,
    'description': project.description,
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'Web-based',
    'author': {
      '@type': 'Person',
      'name': 'Sheraz Hussain',
      'url': 'https://sheraz.synctech.ie'
    },
    'keywords': project.stack.join(', '),
    'url': `https://sheraz.synctech.ie/projects/${project.slug}`,
    'image': project.image,
  };

  return (
    <div className={cn(
      "min-h-screen bg-[#FDFDFB] text-[#071739] selection:bg-[#A68858]/20 selection:text-[#071739]",
      bebas.variable,
      epilogue.variable,
      jetbrains.variable,
      "font-sans antialiased relative"
    )}>
      <Script
        id="project-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* NOISE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-[1000] opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E')]" />

      <Header />

      {/* FLOATING DOCUMENT NAVIGATOR (Right Hand Side) */}
      <div className="fixed top-24 right-6 z-[100] hidden md:block">
        <div className="relative">
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "flex items-center gap-2 rounded-full h-12 px-6 font-mono text-[0.65rem] uppercase tracking-widest transition-all shadow-xl border-2",
              isMenuOpen 
                ? "bg-[#071739] text-white border-[#071739]" 
                : "bg-white text-[#071739] border-[#A68858]/20 hover:border-[#A68858]"
            )}
          >
            {isMenuOpen ? <X size={14} /> : <Hash size={14} className="text-[#A68858]" />}
            {isMenuOpen ? 'Close' : 'Contents'}
          </Button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10, x: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10, x: 10 }}
                className="absolute top-14 right-0 w-64 bg-white border-2 border-[#A68858]/20 rounded-2xl shadow-2xl overflow-hidden p-2"
              >
                <div className="p-4 border-b border-[#A68858]/10 mb-2">
                  <div className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-[#A68858]">Technical Document</div>
                  <div className="font-bebas text-lg leading-none mt-1">Sections</div>
                </div>
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMenuOpen(false);
                        scrollToContent();
                      }}
                      className={cn(
                        "flex items-center gap-3 w-full p-3 rounded-lg transition-all group",
                        activeTab === tab.id 
                          ? "bg-[#A68858]/10 text-[#A68858]" 
                          : "text-muted-foreground hover:bg-[#A68858]/5 hover:text-[#071739]"
                      )}
                    >
                      <span className={cn(
                        "font-mono text-[0.6rem] font-bold w-6 text-center",
                        activeTab === tab.id ? "text-[#A68858]" : "text-muted-foreground"
                      )}>
                        {tab.num}
                      </span>
                      <span className="font-mono text-[0.65rem] uppercase tracking-wider text-left">
                        {tab.label}
                      </span>
                    </button>
                  ))}
                </nav>
                <div className="p-4 mt-2 bg-[#071739]/5 rounded-xl">
                  <div className="font-mono text-[0.5rem] text-muted-foreground uppercase tracking-widest">Lead Engineer</div>
                  <div className="font-bold text-[0.7rem] mt-1">Sheraz Hussain</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <main className="relative flex flex-col min-h-screen">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-[#A68858]/10 px-4 md:px-16 pt-24 pb-20 bg-white">
          <div className="absolute inset-0 opacity-[0.2] pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(#A68858 1px, transparent 1px), linear-gradient(90deg, #A68858 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%)'
            }} 
          />

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="flex flex-col gap-6 mb-8">
              <Button asChild variant="ghost" size="sm" className="w-fit font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground hover:text-[#A68858] p-0 h-auto hover:bg-transparent">
                <Link href="/projects" className="flex items-center gap-2">
                  <ArrowLeft size={12} />
                  Back to Gallery
                </Link>
              </Button>
              <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#A68858]">
                <span className="text-[0.5rem]">▶</span>
                ENGINEERING CASE STUDY — {project.slug.toUpperCase()}
              </div>
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
                <div className="font-mono text-[0.6rem] text-[#A68858] uppercase tracking-widest">Expertise</div>
                <div className="font-semibold text-sm">Next.js & AI</div>
              </div>
              <div className="space-y-1">
                <div className="font-mono text-[0.6rem] text-[#A68858] uppercase tracking-widest">Visibility</div>
                <div className="font-semibold text-sm text-[#A68858]">Global (Indexed)</div>
              </div>
              <div className="space-y-1">
                <div className="font-mono text-[0.6rem] text-[#A68858] uppercase tracking-widest">Source</div>
                <div className="font-semibold text-sm underline decoration-[#A68858]/30 underline-offset-4 cursor-pointer hover:text-[#A68858] transition-colors">
                  <Link href={project.link} target="_blank">View Repository</Link>
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
                onClick={() => {
                  setActiveTab(tab.id);
                  scrollToContent();
                }}
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
        <div ref={contentRef} className="max-w-5xl mx-auto px-4 md:px-16 py-20 w-full">
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
                  <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-8 uppercase">Project Objectives</h2>
                  <p className="text-[#071739]/80 text-lg font-light leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white border border-[#A68858]/10 p-8 rounded-xl shadow-sm">
                    <div className="font-bebas text-4xl text-[#A68858] mb-4">100%</div>
                    <div className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">Personal Engineering</div>
                  </div>
                  <div className="bg-white border border-[#A68858]/10 p-8 rounded-xl shadow-sm">
                    <div className="font-bebas text-4xl text-[#A68858] mb-4">&lt; 2s</div>
                    <div className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">Load Latency</div>
                  </div>
                  <div className="bg-white border border-[#A68858]/10 p-8 rounded-xl shadow-sm">
                    <div className="font-bebas text-4xl text-[#A68858] mb-4">98+</div>
                    <div className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">SEO Audit Score</div>
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
                  <div className="font-mono text-[0.6rem] text-[#A68858] tracking-[0.2em] mb-6 uppercase">// 02 — Engineering Resilience</div>
                  <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-12 uppercase">Technical Execution</h2>
                  
                  <div className="space-y-6 mb-20">
                    <h3 className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#A68858] flex items-center gap-4">
                      Challenge Matrix <span className="h-[1px] flex-1 bg-[#A68858]/10"></span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.challenges.map((challenge, i) => (
                        <div key={i} className="bg-[#071739] text-white p-8 rounded-lg shadow-xl group">
                          <div className="font-mono text-[0.65rem] text-[#A68858] mb-4 uppercase tracking-widest">Challenge 0{i+1}</div>
                          <p className="text-sm font-light leading-relaxed opacity-80">{challenge}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-0 border-t border-[#A68858]/10">
                    <h3 className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#A68858] flex items-center gap-4 py-8">
                      Implementation Strategy <span className="h-[1px] flex-1 bg-[#A68858]/10"></span>
                    </h3>
                    <div className="divide-y divide-[#A68858]/10">
                      {project.solutions.map((solution, i) => (
                        <div key={i} className="grid grid-cols-[40px_1fr] gap-8 py-10 items-start">
                          <div className="font-bebas text-2xl text-[#A68858]/30">0{i+1}</div>
                          <div>
                            <h4 className="font-bold text-sm mb-3">{solution.title}</h4>
                            <p className="text-muted-foreground text-sm font-light leading-relaxed">{solution.description}</p>
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
                <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-12 uppercase">Technical Ecosystem</h2>
                
                <div className="flex flex-wrap gap-2 mb-16">
                  {project.stack.map((tech) => (
                    <div 
                      key={tech} 
                      className="px-5 py-2 border border-[#071739] bg-transparent font-mono text-[0.7rem] text-[#071739] hover:bg-[#071739] hover:text-white transition-all cursor-default rounded-sm"
                    >
                      {tech}
                    </div>
                  ))}
                </div>

                <div className="bg-[#071739] rounded-lg p-10 font-mono text-[0.7rem] leading-loose text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-4 right-6 text-[0.55rem] text-[#A68858] tracking-widest uppercase">System: STABLE</div>
                  <div className="text-[#A68858] mb-4 opacity-50"># Configuration Parameters</div>
                  <div className="flex gap-4 mb-1">
                    <span className="text-[#A68858] w-32">architecture</span>
                    <span className="text-white/80">Personal / Next.js Native</span>
                  </div>
                  <div className="flex gap-4 mb-1">
                    <span className="text-[#A68858] w-32">indexing_status</span>
                    <span className="text-white/80">Active / Global Coverage</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#A68858] w-32">ssl_layer</span>
                    <span className="text-white/80">End-to-End Encryption</span>
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
                <div className="font-mono text-[0.6rem] text-[#A68858] tracking-[0.2em] mb-6 uppercase">// 04 — Performance Outcomes</div>
                <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-12 uppercase">Measured Impact</h2>
                
                <div className="overflow-x-auto border-t border-[#A68858]/10">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-[#A68858]/10">
                        <th className="py-6 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">Performance Metric</th>
                        <th className="py-6 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#A68858]/10">
                      {project.results.map((result, i) => (
                        <tr key={i} className="hover:bg-[#A68858]/5 transition-colors">
                          <td className="py-8 font-semibold text-base text-[#071739]">{result}</td>
                          <td className="py-8">
                            <span className="text-[#A68858] font-mono text-[0.7rem] uppercase font-bold tracking-widest flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#A68858] animate-pulse"></span>
                              Verified Audit
                            </span>
                          </td>
                        </tr>
                      </tbody>
                  </table>
                </div>

                <div className="mt-20 p-10 border-l-4 border-[#A68858] bg-white shadow-xl relative rounded-r-2xl border border-[#A68858]/10">
                  <div className="absolute top-8 right-10 text-6xl font-bebas text-[#A68858]/5 leading-none select-none">"</div>
                  <div className="max-w-2xl relative z-10">
                    <p className="text-xl font-bold mb-6 italic leading-relaxed">"The technical integrity of this engineering deployment established new benchmarks for scalability and SEO dominance."</p>
                    <div className="font-mono text-[0.65rem] uppercase tracking-widest text-[#A68858]">
                      — Engineering Review &nbsp;·&nbsp; {project.slug}.integrity
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {activeTab === 'strategy' && (
              <motion.section
                key="strategy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-12"
              >
                 <div>
                    <div className="font-mono text-[0.6rem] text-[#A68858] tracking-[0.2em] mb-6 uppercase">// 05 — SEO & Strategic Metadata</div>
                    <h2 className="font-bebas text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-wider mb-8 uppercase">Technical Visibility Index</h2>
                    <p className="text-[#071739]/80 text-lg font-light leading-relaxed max-w-3xl">
                      This case study is engineered for global search engine discovery. I utilize high-density technical keywords and geospatial metadata to ensure the work is ranked for competitive queries in Next.js, AI, and Cloud Architecture.
                    </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border-primary/20 bg-primary/5">
                        <CardHeader className="flex flex-row items-center gap-3">
                            <Globe className="h-5 w-5 text-primary" />
                            <div className="font-bebas text-xl uppercase tracking-wider">Geospatial Data</div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-[#A68858]" />
                                <span className="text-sm font-mono text-muted-foreground uppercase">Origin: Dublin, Ireland</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Globe className="h-4 w-4 text-[#A68858]" />
                                <span className="text-sm font-mono text-muted-foreground uppercase">Delivery: Global (Remote/Cloud)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="h-4 w-4 text-[#A68858]" />
                                <span className="text-sm font-mono text-muted-foreground uppercase">Status: Production Grade</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-[#071739]/20 bg-[#071739]/5">
                        <CardHeader className="flex flex-row items-center gap-3">
                            <Zap className="h-5 w-5 text-[#071739]" />
                            <div className="font-bebas text-xl uppercase tracking-wider">Strategic Tags</div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {project.stack.map(tag => (
                                    <Badge key={tag} variant="outline" className="bg-white/50 border-primary/20 text-[10px] font-bold uppercase tracking-widest">
                                        #{tag.replace(/\s+/g, '')}
                                    </Badge>
                                ))}
                                <Badge variant="outline" className="bg-white/50 border-primary/20 text-[10px] font-bold uppercase tracking-widest">#SherazHussain</Badge>
                                <Badge variant="outline" className="bg-white/50 border-primary/20 text-[10px] font-bold uppercase tracking-widest">#DublinEngineer</Badge>
                            </div>
                        </CardContent>
                    </Card>
                 </div>

                 <div className="rounded-xl border-2 border-dashed border-[#A68858]/20 p-8 bg-white/50">
                    <div className="font-mono text-[0.6rem] text-[#A68858] uppercase tracking-[0.3em] mb-4">Metadata Analysis</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-[0.65rem] text-muted-foreground leading-relaxed">
                        <div className="space-y-1">
                            <div className="text-[#071739] font-bold uppercase tracking-widest">Meta Description Injection</div>
                            <p>{project.description}</p>
                        </div>
                        <div className="space-y-1">
                            <div className="text-[#071739] font-bold uppercase tracking-widest">Primary Keywords</div>
                            <p>{project.stack.slice(0, 5).join(' · ')}</p>
                        </div>
                    </div>
                 </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* NEXT / PREVIOUS PHASE NAVIGATION */}
          <div className="flex justify-between items-center mt-20 pt-10 border-t border-[#A68858]/10">
            {prevTab ? (
              <button 
                onClick={() => {
                  setActiveTab(prevTab.id);
                  scrollToContent();
                }}
                className="group flex flex-col items-start gap-2 text-left transition-all"
              >
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#A68858]">Previous Phase</span>
                <span className="font-bebas text-2xl flex items-center gap-3 group-hover:text-[#A68858] transition-colors">
                  <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                  {prevTab.label}
                </span>
              </button>
            ) : <div />}

            {nextTab ? (
              <button 
                onClick={() => {
                  setActiveTab(nextTab.id);
                  scrollToContent();
                }}
                className="group flex flex-col items-end text-right transition-all"
              >
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#A68858]">Next Phase</span>
                <span className="font-bebas text-2xl flex items-center gap-3 group-hover:text-[#A68858] transition-colors">
                  {nextTab.label}
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            ) : <div />}
          </div>
        </div>

      </main>

      {/* CALL TO ACTION */}
      <section className="border-t border-[#A68858]/10 px-4 md:px-16 py-24 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <div className="font-bebas text-5xl tracking-widest leading-none">
              READY TO <span className="text-[#A68858]">ENGINEER?</span>
            </div>
            <div className="text-[0.6rem] text-muted-foreground mt-4 font-mono uppercase tracking-[0.4em]">
              SHERAZ HUSSAIN — ELITE TECHNICAL DELIVERY
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button asChild variant="default" className="bg-[#071739] hover:bg-[#A68858] text-white rounded-none px-10 h-14 font-bold tracking-widest uppercase text-xs transition-all shadow-lg shadow-[#071739]/10">
              <Link href="/contact">Initiate Contact</Link>
            </Button>
            <Button asChild variant="outline" className="border-2 border-[#071739] text-[#071739] hover:bg-[#071739] hover:text-white rounded-none px-10 h-14 font-bold tracking-widest uppercase text-xs transition-all">
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
