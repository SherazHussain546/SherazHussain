
'use client';

import { useMemo } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { firestore } from '@/firebase/client';
import { useCollection } from 'react-firebase-hooks/firestore';
import { experiences as staticExps } from '@/lib/data';
import { Experience } from '@/types/database';

export default function ExperienceSection() {
  const expCollection = firestore ? collection(firestore, 'experiences') : null;
  const expQuery = expCollection ? query(expCollection, orderBy('createdAt', 'desc')) : null;
  const [snapshot, loading] = useCollection(expQuery);

  const dynamicExps = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Experience)) || [];
  
  // High-Fidelity Merge: Favor dynamic experiences while preserving system defaults
  const allExperiences = useMemo(() => {
    const formattedStatic = staticExps.map((e, i) => ({ ...e, id: `static-${i}` }));
    return [...dynamicExps, ...formattedStatic];
  }, [dynamicExps]);

  return (
    <section id="experience" className="bg-background py-12 md:py-20">
      <div className="max-w-[860px] mx-auto px-6">
        <p className="section-label">Professional Journey</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">The Work, The Roles, The Milestones</h2>
        
        <p className="text-lg font-light text-foreground/80 mb-12">
          My professional experience spans technical consulting, product architecture, and enterprise mentorship — reflecting the breadth of application a modern software engineer must navigate.
        </p>

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

        <hr className="rule" />
      </div>
    </section>
  );
}
