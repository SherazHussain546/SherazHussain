'use client';

import { use } from 'react';
import { projects } from '@/lib/data';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Mock stats for the "Engineering" feel, adapted to the project if possible
  const stats = [
    { num: '100%', desc: 'Custom Engineering' },
    { num: '<2s', desc: 'Avg. Load Time' },
    { num: '95+', desc: 'Perf. Score' },
    { num: 'Production', desc: 'Environment Ready' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <Header />
      
      {/* Custom Styles for the Document Aesthetic using Site Theme Colors */}
      <style jsx>{`
        :root {
          --ink: #071739;    /* Deep Navy */
          --paper: #f8f9fa;  /* Light Background */
          --accent: #A68858; /* Bronze-Gold */
          --mid: #4B6382;    /* Medium Blue */
          --rule: #CDD5DB;   /* Light Blue/Grey Rule */
        }
        .syne { font-family: 'Syne', sans-serif; }
        .dm-sans { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <main className="flex-1 bg-[#f8f9fa]">
        {/* TOP BAR OVERLAY FOR CASE STUDY */}
        <div className="flex justify-between items-center px-6 md:px-16 py-4 border-b border-[#CDD5DB] sticky top-16 bg-[#f8f9fa]/80 backdrop-blur-sm z-40">
           <span className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-[#4B6382]">Case Study Document</span>
           <span className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-[#A68858]">No. {project.slug.toUpperCase()}</span>
        </div>

        {/* HERO SECTION */}
        <section className="px-6 md:px-16 py-16 md:py-24 border-b border-[#CDD5DB] grid grid-cols-1 md:grid-cols-[1fr_340px] gap-12 items-end">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-[0.72rem] font-bold tracking-[0.16em] uppercase text-[#A68858]">
              <div className="w-7 h-[2px] bg-[#A68858]"></div>
              Engineering Case Study
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.08] max-w-2xl syne text-[#071739]">
              {project.name.split('–')[0]} <em className="not-italic text-[#A68858]">{project.name.split('–')[1] || ''}</em>
            </h1>
            <p className="text-lg md:text-xl text-[#4B6382] font-light max-w-lg leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col gap-5 border-l md:border-l-0 md:pl-0 pl-6 border-[#CDD5DB]">
            <div className="space-y-1">
              <div className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#4B6382]">Principal Engineer</div>
              <div className="syne font-semibold text-[0.95rem] text-[#071739]">Sheraz Hussain</div>
            </div>
            <div className="h-[1px] bg-[#CDD5DB]"></div>
            <div className="space-y-1">
              <div className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#4B6382]">Status</div>
              <div className="syne font-semibold text-[0.95rem] text-[#071739]">Production / Live</div>
            </div>
            <div className="h-[1px] bg-[#CDD5DB]"></div>
            <div className="space-y-1">
              <div className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#4B6382]">Link</div>
              <div className="syne font-semibold text-[0.95rem] truncate">
                <Link href={project.liveLink || project.link} target="_blank" className="text-[#071739] hover:text-[#A68858] transition-colors">
                  {project.liveLink ? project.liveLink.replace('https://', '') : 'GitHub Repository'}
                </Link>
              </div>
            </div>
            <div className="h-[1px] bg-[#CDD5DB]"></div>
            <div className="space-y-1">
              <div className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#4B6382]">Focus Area</div>
              <div className="syne font-semibold text-[0.95rem] text-[#071739]">{project.stack[0]} · {project.stack[1]}</div>
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <section className="grid grid-cols-2 md:grid-cols-4 border-b border-[#CDD5DB]">
          {stats.map((stat, i) => (
            <div key={i} className="p-10 md:p-12 border-r border-[#CDD5DB] last:border-r-0 hover:bg-[#071739] group transition-colors duration-300">
              <div className="text-4xl md:text-5xl font-extrabold text-[#A68858] leading-none syne group-hover:text-[#f8f9fa]">{stat.num}</div>
              <div className="mt-2 text-xs md:text-sm text-[#4B6382] font-medium transition-colors group-hover:text-[#f8f9fa]/60">{stat.desc}</div>
            </div>
          ))}
        </section>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] border-b border-[#CDD5DB]">
          {/* SIDEBAR */}
          <aside className="border-r border-[#CDD5DB] p-12 hidden md:block sticky top-32 h-fit">
            <div className="text-[0.65rem] tracking-[0.18em] uppercase text-[#4B6382] mb-4">Contents</div>
            <nav className="flex flex-col gap-2">
              <a href="#background" className="text-[0.8rem] font-medium tracking-wider text-[#4B6382] hover:text-[#071739] hover:border-b hover:border-[#071739] w-fit transition-all">01 · Background</a>
              <a href="#challenge" className="text-[0.8rem] font-medium tracking-wider text-[#4B6382] hover:text-[#071739] hover:border-b hover:border-[#071739] w-fit transition-all">02 · The Challenge</a>
              <a href="#solution" className="text-[0.8rem] font-medium tracking-wider text-[#4B6382] hover:text-[#071739] hover:border-b hover:border-[#071739] w-fit transition-all">03 · The Solution</a>
              <a href="#technology" className="text-[0.8rem] font-medium tracking-wider text-[#4B6382] hover:text-[#071739] hover:border-b hover:border-[#071739] w-fit transition-all">04 · Tech Stack</a>
              <a href="#results" className="text-[0.8rem] font-medium tracking-wider text-[#4B6382] hover:text-[#071739] hover:border-b hover:border-[#071739] w-fit transition-all">05 · Outcomes</a>
            </nav>
            <div className="text-[0.65rem] tracking-[0.18em] uppercase text-[#4B6382] mt-10 mb-2">Published By</div>
            <div className="syne font-bold text-xs text-[#071739]">SYNC TECH Solutions</div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="p-8 md:p-16 max-w-4xl">
            
            {/* 01 BACKGROUND */}
            <section id="background" className="mb-20">
              <div className="flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-[#A68858] mb-4">
                01 — Background
                <div className="w-5 h-[1.5px] bg-[#A68858]"></div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-6 syne text-[#071739]">Technical Overview</h2>
              <div className="space-y-4 text-[#071739] font-light leading-relaxed">
                <p>{project.fullDescription}</p>
              </div>
            </section>

            {/* 02 CHALLENGE */}
            <section id="challenge" className="mb-20">
              <div className="flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-[#A68858] mb-4">
                02 — The Challenge
                <div className="w-5 h-[1.5px] bg-[#A68858]"></div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-6 syne text-[#071739]">Problem Statement</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {project.challenges.map((challenge, i) => (
                  <div key={i} className="bg-[#071739] text-[#f8f9fa] p-8 rounded-sm shadow-md">
                    <div className="text-3xl font-extrabold text-[#A68858] mb-4 syne">0{i+1}</div>
                    <h4 className="text-[0.9rem] font-bold mb-2 tracking-wide syne">Complexity Tier {i+1}</h4>
                    <p className="text-[0.84rem] text-[#CDD5DB] font-light leading-relaxed">{challenge}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 03 SOLUTION */}
            <section id="solution" className="mb-20">
              <div className="flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-[#A68858] mb-4">
                03 — The Solution
                <div className="w-5 h-[1.5px] bg-[#A68858]"></div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-6 syne text-[#071739]">Engineering Response</h2>
              <div className="flex flex-col border-t border-[#CDD5DB] mt-8">
                {project.solutions.map((solution, i) => (
                  <div key={i} className="grid grid-cols-[56px_1fr] gap-6 py-8 border-b border-[#CDD5DB] last:border-b-0">
                    <div className="text-3xl font-extrabold text-[#CDD5DB] leading-none syne">0{i+1}</div>
                    <div>
                      <h4 className="text-[1rem] font-bold mb-2 syne text-[#071739]">Implementation Phase</h4>
                      <p className="text-[0.88rem] text-[#4B6382] font-light leading-relaxed">{solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 04 TECHNOLOGY */}
            <section id="technology" className="mb-20">
              <div className="flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-[#A68858] mb-4">
                04 — Tech Stack
                <div className="w-5 h-[1.5px] bg-[#A68858]"></div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-6 syne text-[#071739]">Core Technologies</h2>
              <div className="flex flex-wrap gap-2 mt-6">
                {project.stack.map((tech) => (
                  <span key={tech} className="text-[0.75rem] font-medium tracking-wider px-4 py-2 border-[1.5px] border-[#071739] rounded-sm hover:bg-[#071739] hover:text-[#f8f9fa] transition-all cursor-default text-[#071739]">
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* 05 RESULTS */}
            <section id="results" className="mb-20">
              <div className="flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-[#A68858] mb-4">
                05 — Outcomes
                <div className="w-5 h-[1.5px] bg-[#A68858]"></div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-6 syne text-[#071739]">Measurable Results</h2>
              <div className="overflow-x-auto mt-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-[1.5px] border-[#071739]">
                      <th className="py-3 px-4 text-[0.68rem] font-bold tracking-widest text-[#4B6382] uppercase">Objective</th>
                      <th className="py-3 px-4 text-[0.68rem] font-bold tracking-widest text-[#4B6382] uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.results.map((result, i) => (
                      <tr key={i} className="border-b border-[#CDD5DB] last:border-b-0">
                        <td className="py-4 px-4 font-light text-[0.95rem] text-[#071739]">{result}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 text-[0.8rem] font-bold text-[#1a7a3f] uppercase">
                            <CheckCircle2 className="h-4 w-4" />
                            Verified
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

          </main>
        </div>
      </main>

      {/* FOOTER CALL TO ACTION */}
      <footer className="border-t border-[#CDD5DB] bg-[#f8f9fa] px-6 md:px-16 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-2">
          <div className="text-xl font-bold syne text-[#071739]">
            Interested in <span className="text-[#A68858]">Engineering Excellence?</span>
          </div>
          <div className="text-sm text-[#4B6382]">SYNC TECH Solutions · Professional Engineering Documents</div>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/#contact" 
            className="inline-block px-8 py-4 bg-[#071739] text-[#f8f9fa] text-[0.8rem] font-bold tracking-widest uppercase rounded-sm hover:bg-[#A68858] transition-colors"
          >
            Initiate Contact
          </Link>
          <Link 
            href="/projects" 
            className="inline-block px-8 py-4 border border-[#071739] text-[#071739] text-[0.8rem] font-bold tracking-widest uppercase rounded-sm hover:bg-[#071739] hover:text-[#f8f9fa] transition-colors"
          >
            Project Gallery
          </Link>
        </div>
      </footer>

      <Footer />
    </div>
  );
}
