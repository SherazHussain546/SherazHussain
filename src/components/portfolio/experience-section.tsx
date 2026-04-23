'use client';

import { useMemo } from 'react';
import { collection, query, where, CollectionReference, DocumentData } from 'firebase/firestore';
import { useFirestore, useMemoFirebase, useCollection } from '@/firebase';
import { experiences as staticExps } from '@/lib/data';
import { Experience } from '@/types/database';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DatabaseIcon } from 'lucide-react';

/**
 * ExperienceSection - High-Fidelity Journey Component.
 * Synchronizes real-time Firestore records with static system defaults.
 * Uses client-side sorting to avoid manual composite index requirements.
 */
export default function ExperienceSection() {
  const firestore = useFirestore();

  const expCollection = useMemo(() => {
    return firestore ? collection(firestore, 'experiences') as CollectionReference<DocumentData> : null;
  }, [firestore]);

  const expQuery = useMemoFirebase(() => {
    // Simplified query to avoid composite index requirements
    return expCollection ? query(expCollection, where('isPublished', '==', true)) : null;
  }, [expCollection]);

  const { data: dynamicExps, isLoading, error } = useCollection<Experience>(expQuery);
  
  const allExperiences = useMemo(() => {
    const formattedStatic = staticExps.map((e, i) => ({ 
        ...e, 
        id: `static-${i}`, 
        isPublished: true,
        createdAtMillis: 0 // Static items go to the bottom relative to dynamic ones
    }));
    
    const formattedDynamic = (dynamicExps || []).map(exp => ({
        ...exp,
        createdAtMillis: exp.createdAt?.toMillis() || Date.now()
    }));

    // Perform a unified sort: Newest on Top
    return [...formattedDynamic, ...formattedStatic].sort((a, b) => b.createdAtMillis - a.createdAtMillis);
  }, [dynamicExps]);

  return (
    <section id="experience" className="bg-background py-12 md:py-20">
      <div className="max-w-[860px] mx-auto px-6">
        <p className="section-label">Professional Journey</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">The Work, The Roles, The Milestones</h2>
        
        <p className="text-lg font-light text-foreground/80 mb-12">
          My professional experience spans technical consulting, product architecture, and enterprise mentorship — reflecting the breadth of application a modern software engineer must navigate.
        </p>

        {error && (
            <Alert variant="destructive" className="mb-12 bg-destructive/5 border-destructive/20 text-destructive">
                <DatabaseIcon className="h-4 w-4" />
                <AlertTitle className="font-bold">Experience Sync Interrupted</AlertTitle>
                <AlertDescription className="mt-2 text-xs opacity-90 leading-relaxed">
                    The database synchronization engine encountered a restriction.
                    <div className="mt-4 p-3 bg-white/50 rounded border border-destructive/10 font-mono text-[10px] break-all whitespace-pre-wrap overflow-x-auto">
                        {error.message}
                    </div>
                </AlertDescription>
            </Alert>
        )}

        {isLoading ? (
          <div className="space-y-8 pl-8 border-l border-border/30">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        ) : (
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