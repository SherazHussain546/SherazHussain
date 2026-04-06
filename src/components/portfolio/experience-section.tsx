
'use client';

import { useMemo } from 'react';
import { collection, query, where, orderBy, CollectionReference, DocumentData } from 'firebase/firestore';
import { useFirestore, useMemoFirebase, useCollection } from '@/firebase';
import { experiences as staticExps } from '@/lib/data';
import { Experience } from '@/types/database';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * ExperienceSection - High-Fidelity Journey Component.
 * Synchronizes real-time Firestore records with static system defaults.
 */
export default function ExperienceSection() {
  const firestore = useFirestore();

  const expCollection = useMemo(() => {
    return firestore ? collection(firestore, 'experiences') as CollectionReference<DocumentData> : null;
  }, [firestore]);

  const expQuery = useMemoFirebase(() => {
    // Only show published entries to public visitors
    return expCollection ? query(expCollection, where('isPublished', '==', true), orderBy('createdAt', 'desc')) : null;
  }, [expCollection]);

  const { data: dynamicExps, isLoading } = useCollection<Experience>(expQuery);
  
  const allExperiences = useMemo(() => {
    const formattedStatic = staticExps.map((e, i) => ({ ...e, id: `static-${i}`, isPublished: true }));
    return [...(dynamicExps || []), ...formattedStatic];
  }, [dynamicExps]);

  return (
    <section id="experience" className="bg-background py-12 md:py-20">
      <div className="max-w-[860px] mx-auto px-6">
        <p className="section-label">Professional Journey</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">The Work, The Roles, The Milestones</h2>
        
        <p className="text-lg font-light text-foreground/80 mb-12">
          My professional experience spans technical consulting, product architecture, and enterprise mentorship — reflecting the breadth of application a modern software engineer must navigate.
        </p>

        {isLoading && (
          <div className="space-y-8 pl-8 border-l border-border/30">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && (
          <div className="relative pl-8 border-l border-border space-y-12 mb-16">
            {allExperiences.map((exp, index) => (
              <div key={exp.id || index} className="relative">
                <div className="absolute -left-[36.5px] top-1.5 w-[9px] h-[9px] rounded-full bg-primary shadow-[0_0_0_4px_white]" />
                <p className="font-space-mono text-[10px] uppercase tracking-widest text-primary mb-1">
                  {exp.period}
                </p>
                <h4 className="font-playfair text-xl font-bold mb-1">{exp.role}</h4>
                <p className="font-space-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
                  {exp.company}
                </p>
                <p className="text-[15px] font-light text-foreground/90 leading-relaxed mb-4">
                  {exp.description}
                </p>
                {exp.points && exp.points.length > 0 && (
                  <ul className="space-y-2 opacity-70">
                    {exp.points.map((point, i) => (
                      <li key={i} className="text-sm font-light flex gap-3">
                        <span className="text-primary select-none">·</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        <hr className="rule" />
      </div>
    </section>
  );
}
