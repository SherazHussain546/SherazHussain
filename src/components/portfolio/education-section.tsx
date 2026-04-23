'use client';

import { useMemo } from 'react';
import { collection, query, where, orderBy, CollectionReference, DocumentData } from 'firebase/firestore';
import { useFirestore, useMemoFirebase, useCollection } from '@/firebase';
import { education as staticEdu } from '@/lib/data';
import { Education } from '@/types/database';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, GraduationCap, DatabaseIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

/**
 * EducationSection - Academic Foundations Component.
 * Merges Firestore academic records with the primary system background.
 */
export default function EducationSection() {
  const firestore = useFirestore();

  const eduCollection = useMemo(() => {
    return firestore ? collection(firestore, 'education') as CollectionReference<DocumentData> : null;
  }, [firestore]);

  const eduQuery = useMemoFirebase(() => {
    // Only show published entries to public visitors, newest first
    return eduCollection ? query(eduCollection, where('isPublished', '==', true), orderBy('createdAt', 'desc')) : null;
  }, [eduCollection]);

  const { data: dynamicEducations, isLoading, error } = useCollection<Education>(eduQuery);

  const allEducations = useMemo(() => {
    const formattedStatic = {
      id: 'static-edu',
      degree: staticEdu.degree,
      university: staticEdu.university,
      graduationDate: staticEdu.graduationDate,
      awards: staticEdu.awards,
      isPublished: true,
      createdAtMillis: 0
    };

    const formattedDynamic = (dynamicEducations || []).map(edu => ({
        ...edu,
        createdAtMillis: edu.createdAt?.toMillis() || Date.now()
    }));

    return [...formattedDynamic, formattedStatic].sort((a, b) => b.createdAtMillis - a.createdAtMillis);
  }, [dynamicEducations]);

  return (
    <section id="education" className="bg-background py-12 md:py-20">
      <div className="max-w-[860px] mx-auto px-6">
        <p className="section-label">Academic Foundations</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center md:text-left">Educational Pedigree</h2>
        
        {error && (
            <Alert variant="destructive" className="mb-12 bg-destructive/5 border-destructive/20 text-destructive">
                <DatabaseIcon className="h-4 w-4" />
                <AlertTitle className="font-bold">Academic Sync Interrupted</AlertTitle>
                <AlertDescription className="mt-2 text-xs opacity-90 leading-relaxed">
                    A composite index is required to synchronize your dynamic education records.
                    <div className="mt-4 p-3 bg-white/50 rounded border border-destructive/10 font-mono text-[10px] break-all whitespace-pre-wrap overflow-x-auto">
                        {error.message}
                    </div>
                </AlertDescription>
            </Alert>
        )}

        <div className="space-y-12">
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          ) : (
            allEducations.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-card shadow-lg border-primary/10 overflow-hidden rounded-none">
                  <CardHeader className="border-b bg-muted/5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-none bg-primary/10 text-primary">
                        < GraduationCap className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold font-playfair">{edu.degree}</CardTitle>
                        <p className="text-sm font-space-mono uppercase tracking-widest text-muted-foreground">{edu.university}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <p className="font-space-mono text-[10px] uppercase tracking-widest text-primary font-bold">
                      Conferred: {edu.graduationDate}
                    </p>
                    
                    {edu.awards && edu.awards.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                          <Award className="h-4 w-4" />
                          <h4 className="text-xs font-bold uppercase tracking-widest font-space-mono">Awards & Honors</h4>
                        </div>
                        <ul className="space-y-3 pl-6 border-l-2 border-primary/20">
                          {edu.awards.map((award, i) => (
                            <li key={i} className="text-sm font-light leading-relaxed text-foreground/80 italic">
                              "{award}"
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        <hr className="thick-rule" />
      </div>
    </section>
  );
}
