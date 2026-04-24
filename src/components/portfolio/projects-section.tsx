'use client';

import { useMemo } from 'react';
import { collection, query, where, orderBy, CollectionReference, DocumentData } from 'firebase/firestore';
import { useFirestore, useMemoFirebase, useCollection } from '@/firebase';
import { projects as staticProjects } from '@/lib/data';
import { Project } from '@/types/database';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useABTest } from '@/hooks/use-ab-test';
import { cn } from '@/lib/utils';

/**
 * ProjectsSection - Engineering Showcase Component.
 * Merges high-fidelity Firestore records with static flagship projects.
 */
export default function ProjectsSection() {
  const firestore = useFirestore();
  const testGroup = useABTest();

  const projCollection = useMemo(() => {
    return firestore ? collection(firestore, 'projects') as CollectionReference<DocumentData> : null;
  }, [firestore]);

  const projQuery = useMemoFirebase(() => {
    // Only show published entries to public visitors, newest first
    return projCollection ? query(projCollection, where('isPublished', '==', true), orderBy('createdAt', 'desc')) : null;
  }, [projCollection]);

  const { data: dynamicProjects, isLoading } = useCollection<Project>(projQuery);

  const allProjects = useMemo(() => {
    const formattedStatic = staticProjects.map((p, i) => ({ ...p, id: `static-${i}`, isPublished: true }));
    // Merge dynamic with static, prioritizing the 4 most recent for the homepage
    return [...(dynamicProjects || []), ...formattedStatic];
  }, [dynamicProjects]);

  return (
    <section id="projects" className="bg-background py-12 md:py-20">
      <div className="max-w-[860px] mx-auto px-6">
        <p className="section-label">Engineering Showcase</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">The Projects That Define My Craft</h2>
        
        <p className="text-lg font-light text-foreground/80 mb-12">
          Every repository in my GitHub profile represents a deliberate exercise in applied engineering. These are functioning, deployable systems built to solve genuine problems.
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border mb-12">
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

            <div className="flex justify-center mb-16">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className={cn(
                    "h-14 px-10 font-space-mono text-[10px] uppercase tracking-[0.25em] transition-all rounded-none group",
                    testGroup === 'B' 
                      ? "border-primary text-primary hover:bg-primary hover:text-white" 
                      : "border-foreground text-foreground hover:bg-foreground hover:text-background"
                  )}
                >
                  <Link href="/projects">
                    Explore Full Project Gallery
                    <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </>
        )}

        <div className="pull-quote">
          <blockquote className="font-playfair italic text-xl md:text-2xl leading-snug">"The gap between a working prototype and a production-grade system is where most engineers stop. I am interested in closing that gap — every time."</blockquote>
          <cite className="font-space-mono text-[10px] tracking-widest uppercase text-muted-foreground mt-4 block">— Sheraz Hussain, Principal Architect</cite>
        </div>

        <hr className="thick-rule" />
      </div>
    </section>
  );
}
