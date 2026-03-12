'use client';

import { use } from 'react';
import { projects } from '@/lib/data';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { Syne, DM_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
});

export default function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const stats = [
    { num: '100%', desc: 'Custom Engineering' },
    { num: '<2s', desc: 'Avg. Load Time' },
    { num: '95+', desc: 'Perf. Score' },
    { num: 'Production', desc: 'Environment Ready' },
  ];

  return (
    <div className={cn(
      "flex min-h-screen flex-col bg-[#f8f9fa] text-[#071739] selection:bg-[#A68858] selection:text-white",
      syne.variable,
      dmSans.variable,
      "font-sans"
    )}>
      <Header />
      
      <main className="flex-1">
        {/* TOP BAR / SUB-HEADER */}
        <div className="flex justify-between items-center px-6 md:px-16 py-4 border-b border-[#CDD5DB] sticky top-16 bg-[#f8f9fa]/90 backdrop-blur-md z-40">
           <span className="text-[0.6rem] md:text-[0.72rem] font-bold tracking-[0.14em] uppercase text-[#4B6382]">Engineering Case Study</span>
           <span className="text-[0.6rem] md:text-[0.72rem] font-bold tracking-[0.14em] uppercase text-[#A68858]">Document: {project.slug.toUpperCase()}</span>
        </div>

        {/* HERO SECTION */}
        <section className="px-6 md:px-16 py-12 md:py-24 border-b border-[#CDD5DB] grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 md:gap-16 items-start lg:items-end">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-[0.65rem] md:text-[0.72rem] font-bold tracking-[0.16em] uppercase text-[#A68858]">
              <div className="w-6 md:w-8 h-[2px] bg-[#A68858]"></div>
              Confidential Technical Report
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] max-w-2xl font-syne">
              {project.name.split('–')[0]} <em className="not-italic text-[#A68858]">{project.name.split('–')[1] || ''}</em>
            </h1>
            <p className="text-base md:text-xl text-[#4B6382] font-light max-w-xl leading-relaxed font-dm-sans">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col gap-4 md:gap-5 border-l lg:border-l-0 lg:pl-0 pl-4 border-[#CDD5DB]">
            <div className="space-y-1">
              <div className="text-[0.6rem] md:text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#4B6382]">Principal Engineer</div>
              <div className="font-syne font-bold text-sm md:text-[0.95rem]">Sheraz Hussain</div>
            </div>
            <div className="h-[1px] bg-[#CDD5DB]"></div>
            <div className="space-y-1">
              <div className="text-[0.6rem] md:text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#4B6382]">Status</div>
              <div className="font-syne font-bold text-sm md:text-[0.95rem]">Live / Production</div>
            </div>
            <div className="h-[1px] bg-[#CDD5DB]"></div>
            <div className="space-y-1">
              <div className="text-[0.6rem] md:text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#4B6382]">Project Link</div>
              <div className="font-syne font-bold text-sm md:text-[0.95rem] truncate">
                <Link href={project.liveLink || project.link} target="_blank" className="text-[#071739] hover:text-[#A68858] transition-colors underline decoration-[#CDD5DB] underline-offset-4">
                  {project.liveLink ? project.liveLink.replace('https://', '') : 'GitHub Repository'}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-[#CDD5DB]">
          {stats.map((stat, i) => (
            <div key={i} className="p-8 md:p-12 border-b sm:border-b-0 sm:border-r border-[#CDD5DB] last:border-r-0 last:border-b-0 hover:bg-[#071739] group transition-all duration-300">
              <div className="text-3xl md:text-5xl font-extrabold text-[#A68858] leading-none font-syne group-hover:text-white">{stat.num}</div>
              <div className="mt-2 text-[0.65rem] md:text-[0.75rem] font-bold tracking-widest uppercase text-[#4B6382] group-hover:text-white/60">{stat.desc}</div>
            </div>
          ))}
        </section>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] border-b border-[#CDD5DB]">
          
          {/* SIDEBAR NAVIGATION */}
          <aside className="border-r border-[#CDD5DB] p-8 lg:p-12 hidden lg:block sticky top-32 h-fit max-h-[calc(100vh-128px)] overflow-y-auto">
            <div className="text-[0.6rem] tracking-[0.2em] uppercase font-bold text-[#4B6382] mb-6">Contents</div>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Background', id: 'background' },
                { label: 'Challenge', id: 'challenge' },
                { label: 'Solution', id: 'solution' },
                { label: 'Technology', id: 'technology' },
                { label: 'Results', id: 'results' }
              ].map((item, idx) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  className="text-[0.75rem] font-bold tracking-widest text-[#4B6382] hover:text-[#071739] border-l-2 border-transparent hover:border-[#A68858] pl-3 transition-all uppercase block"
                >
                  0{idx + 1} · {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-12 space-y-4">
              <div className="text-[0.6rem] tracking-[0.2em] uppercase font-bold text-[#4B6382]">Published by</div>
              <div>
                <div className="font-syne font-bold text-xs text-[#071739]">SYNC TECH SOLUTIONS</div>
                <div className="text-[0.7rem] text-[#A68858] font-medium mt-1">synctech.ie</div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="p-6 md:p-16 max-w-5xl">
            
            {/* 01 BACKGROUND */}
            <section id="background" className="mb-16 md:mb-24 scroll-mt-40">
              <div className="flex items-center gap-2 text-[0.65rem] md:text-[0.68rem] font-bold tracking-[0.2em] uppercase text-[#A68858] mb-6">
                01 — Background
                <div className="w-6 h-[1.5px] bg-[#A68858]"></div>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-6 font-syne">Technical Context</h2>
              <div className="space-y-6 text-[#071739] font-light leading-relaxed text-sm md:text-lg font-dm-sans">
                <p>{project.fullDescription}</p>
              </div>
            </section>

            {/* 02 CHALLENGE */}
            <section id="challenge" className="mb-16 md:mb-24 scroll-mt-40">
              <div className="flex items-center gap-2 text-[0.65rem] md:text-[0.68rem] font-bold tracking-[0.2em] uppercase text-[#A68858] mb-6">
                02 — The Challenge
                <div className="w-6 h-[1.5px] bg-[#A68858]"></div>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-8 font-syne">Problem Statement</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.challenges.map((challenge, i) => (
                  <div key={i} className="bg-[#071739] text-white p-6 md:p-8 rounded-sm shadow-sm">
                    <div className="text-2xl md:text-3xl font-extrabold text-[#A68858] mb-4 font-syne">0{i+1}</div>
                    <h4 className="text-[0.75rem] font-bold mb-3 tracking-[0.15em] uppercase text-white/80">Critical Phase 0{i+1}</h4>
                    <p className="text-xs md:text-sm text-[#CDD5DB] font-light leading-relaxed font-dm-sans">{challenge}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 03 SOLUTION */}
            <section id="solution" className="mb-16 md:mb-24 scroll-mt-40">
              <div className="flex items-center gap-2 text-[0.65rem] md:text-[0.68rem] font-bold tracking-[0.2em] uppercase text-[#A68858] mb-6">
                03 — The Solution
                <div className="w-6 h-[1.5px] bg-[#A68858]"></div>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-8 font-syne">Engineering Implementation</h2>
              <div className="flex flex-col border-t border-[#CDD5DB]">
                {project.solutions.map((solution, i) => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-[64px_1fr] gap-4 sm:gap-8 py-8 border-b border-[#CDD5DB] last:border-b-0">
                    <div className="text-2xl md:text-4xl font-extrabold text-[#CDD5DB] leading-none font-syne">0{i+1}</div>
                    <div>
                      <h4 className="text-[0.8rem] md:text-[1rem] font-bold mb-3 tracking-wide uppercase font-syne">Strategic Response</h4>
                      <p className="text-sm md:text-[1rem] text-[#4B6382] font-light leading-relaxed font-dm-sans">{solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 04 TECHNOLOGY */}
            <section id="technology" className="mb-16 md:mb-24 scroll-mt-40">
              <div className="flex items-center gap-2 text-[0.65rem] md:text-[0.68rem] font-bold tracking-[0.2em] uppercase text-[#A68858] mb-6">
                04 — Tech Stack
                <div className="w-6 h-[1.5px] bg-[#A68858]"></div>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-8 font-syne">Core Infrastructure</h2>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {project.stack.map((tech) => (
                  <span key={tech} className="text-[0.65rem] md:text-[0.8rem] font-bold tracking-widest uppercase px-4 md:px-6 py-2 md:py-3 border-2 border-[#071739] rounded-sm hover:bg-[#071739] hover:text-white transition-all cursor-default text-[#071739] font-syne">
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* 05 RESULTS */}
            <section id="results" className="mb-8 scroll-mt-40">
              <div className="flex items-center gap-2 text-[0.65rem] md:text-[0.68rem] font-bold tracking-[0.2em] uppercase text-[#A68858] mb-6">
                05 — Outcomes
                <div className="w-6 h-[1.5px] bg-[#A68858]"></div>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-8 font-syne">Verified Results</h2>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b-2 border-[#071739]">
                      <th className="py-4 px-4 text-[0.6rem] md:text-[0.7rem] font-bold tracking-widest text-[#4B6382] uppercase">Project Objective</th>
                      <th className="py-4 px-4 text-[0.6rem] md:text-[0.7rem] font-bold tracking-widest text-[#4B6382] uppercase">Validation Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.results.map((result, i) => (
                      <tr key={i} className="border-b border-[#CDD5DB] last:border-b-0 hover:bg-[#071739]/5 transition-colors">
                        <td className="py-5 px-4 font-light text-sm md:text-[1.05rem] text-[#071739] font-dm-sans">{result}</td>
                        <td className="py-5 px-4">
                          <div className="flex items-center gap-2 text-[0.65rem] md:text-[0.75rem] font-bold text-[#1a7a3f] uppercase font-syne">
                            <CheckCircle2 className="h-3 md:h-4 w-3 md:w-4" />
                            Verified
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* FOOTER CALL TO ACTION */}
      <footer className="border-t border-[#CDD5DB] bg-white px-6 md:px-16 py-12 md:py-20 flex flex-col lg:flex-row justify-between items-center gap-10">
        <div className="text-center lg:text-left space-y-3">
          <div className="text-2xl md:text-3xl font-extrabold font-syne text-[#071739] tracking-tight">
            Interested in <span className="text-[#A68858]">Engineering Excellence?</span>
          </div>
          <p className="text-xs md:text-sm text-[#4B6382] font-medium tracking-widest uppercase">
            SYNC TECH SOLUTIONS · Professional Technical Documentation
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button asChild variant="default" className="bg-[#071739] hover:bg-[#A68858] text-white rounded-none px-10 h-14 font-bold tracking-widest uppercase text-xs transition-all shadow-lg shadow-[#071739]/10">
            <Link href="/#contact">Initiate Contact</Link>
          </Button>
          <Button asChild variant="outline" className="border-2 border-[#071739] text-[#071739] hover:bg-[#071739] hover:text-white rounded-none px-10 h-14 font-bold tracking-widest uppercase text-xs transition-all">
            <Link href="/projects">Full Portfolio</Link>
          </Button>
        </div>
      </footer>

      <Footer />
    </div>
  );
}
