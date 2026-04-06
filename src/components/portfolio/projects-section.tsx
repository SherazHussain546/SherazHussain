
'use client';

import { useMemo } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { firestore } from '@/firebase/client';
import { useCollection } from 'react-firebase-hooks/firestore';
import { projects as staticProjects } from '@/lib/data';
import { Project } from '@/types/database';
import Link from 'next/link';

export default function ProjectsSection() {
  const projCollection = firestore ? collection(firestore, 'projects') : null;
  const projQuery = projCollection ? query(projCollection, orderBy('createdAt', 'desc')) : null;
  const [snapshot] = useCollection(projQuery);

  const dynamicProjects = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)) || [];

  const allProjects = useMemo(() => {
    return [...dynamicProjects, ...staticProjects.map((p, i) => ({ ...p, id: `static-${i}` }))];
  }, [dynamicProjects]);

  return (
    <section id="projects" className="bg-background py-12 md:py-20">
      <div className="max-w-[860px] mx-auto px-6">
        <p className="section-label">Engineering Showcase</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">The Projects That Define My Craft</h2>
        
        <p className="text-lg font-light text-foreground/80 mb-12">
          Every repository in my GitHub profile represents a deliberate exercise in applied engineering. These are functioning, deployable systems built to solve genuine problems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border mb-16">
          {allProjects.slice(0, 4).map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="group">
              <div className="bg-background h-full p-8 transition-colors group-hover:bg-muted/5">
                <p className="font-space-mono text-[9px] uppercase tracking-widest text-primary mb-3">
                  {project.stack[0]} · {project.stack[1] || 'AI'}
                </p>
                <h4 className="font-playfair text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.name.split('–')[0]}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 3).map(tech => (
                    <span key={tech} className="font-space-mono text-[8px] px-2 py-1 border border-border uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="pull-quote">
          <blockquote>"The gap between a working prototype and a production-grade system is where most engineers stop. I am interested in closing that gap — every time."</blockquote>
          <cite>— Sheraz Hussain, Principal Architect</cite>
        </div>

        <hr className="thick-rule" />
      </div>
    </section>
  );
}
