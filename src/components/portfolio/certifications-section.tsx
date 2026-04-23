'use client';

import { useMemo } from 'react';
import { collection, query, where, orderBy, CollectionReference, DocumentData } from 'firebase/firestore';
import { useFirestore, useMemoFirebase, useCollection } from '@/firebase';
import { allCertificates as staticCerts } from '@/lib/data';
import { Certification } from '@/types/database';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ExternalLink, Award, ShieldCheck, Code, Database, BrainCircuit, Bitcoin, Star, School, LucideIcon, DatabaseIcon, ShieldAlert, Cpu } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const iconMap: { [key: string]: any } = {
  Award,
  ShieldCheck,
  Code,
  Database,
  BrainCircuit,
  Bitcoin,
  Star,
  School,
  Cpu
};

/**
 * CertificationsSection - Credential Registry Component.
 * Merges high-fidelity Firestore certifications with existing flagship achievements.
 */
export default function CertificationsSection() {
  const firestore = useFirestore();

  const certsCollection = useMemo(() => {
    return firestore ? collection(firestore, 'certifications') as CollectionReference<DocumentData> : null;
  }, [firestore]);

  const certsQuery = useMemoFirebase(() => {
    // Only show published entries to public visitors, newest first
    return certsCollection ? query(certsCollection, where('isPublished', '==', true), orderBy('createdAt', 'desc')) : null;
  }, [certsCollection]);

  const { data: dynamicCerts, isLoading, error } = useCollection<Certification>(certsQuery);

  const allCerts = useMemo(() => {
    // 1. Process Static
    const formattedStatic = staticCerts.map((c, i) => ({ 
      ...c, 
      id: `static-${i}`, 
      iconName: (c.icon as any)?.name || 'Award',
      skills: c.skills || [],
      points: c.points || [],
      isPublished: true,
      // Assign a high default timestamp for static sorting if needed
      createdAtMillis: 0 
    }));

    // 2. Process Dynamic
    const formattedDynamic = (dynamicCerts || []).map(c => ({
        ...c,
        createdAtMillis: c.createdAt?.toMillis() || Date.now()
    }));

    // 3. Merge and Sort (Dynamic first, then Static)
    return [...formattedDynamic, ...formattedStatic].sort((a, b) => {
        const dateA = (a as any).createdAtMillis || 0;
        const dateB = (b as any).createdAtMillis || 0;
        return dateB - dateA;
    });
  }, [dynamicCerts]);

  return (
    <section id="certifications" className="bg-background py-12 md:py-20">
      <div className="max-w-[860px] mx-auto px-6">
        <p className="section-label">Credentials & Certifications</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Formally Recognised, Continuously Verified</h2>
        
        <p className="text-lg font-light text-foreground/80 mb-12">
          Professional certifications represent more than resume entries — they are proof that I hold myself accountable to external standards of competence.
        </p>

        {error && (
            <Alert variant="destructive" className="mb-12 bg-destructive/5 border-destructive/20 text-destructive">
                <DatabaseIcon className="h-4 w-4" />
                <AlertTitle className="font-bold">Registry Sync Interrupted</AlertTitle>
                <AlertDescription className="mt-2 text-xs opacity-90 leading-relaxed">
                    A composite index is required to synchronize your dynamic credentials.
                    <div className="mt-4 p-3 bg-white/50 rounded border border-destructive/10 font-mono text-[10px] break-all whitespace-pre-wrap overflow-x-auto">
                        {error.message}
                    </div>
                </AlertDescription>
            </Alert>
        )}

        {isLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        ) : (
          <div className="space-y-8 mb-12">
            {allCerts.map((cert, index) => {
              const Icon = iconMap[cert.iconName] || Award;
              return (
                <motion.div 
                  key={cert.id || index} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group border border-border p-6 md:p-8 hover:bg-muted/5 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold font-playfair tracking-tight">{cert.title}</h3>
                      <p className="font-space-mono text-[10px] uppercase tracking-widest text-primary font-bold">
                        {cert.issuer} · {cert.date}
                      </p>
                    </div>
                    <Icon className="h-6 w-6 text-primary shrink-0 opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {cert.points && cert.points.length > 0 && (
                    <ul className="mb-8 space-y-3">
                      {cert.points.map((point, i) => (
                        <li key={i} className="flex gap-3 text-sm font-light text-foreground/80 leading-relaxed">
                          <span className="text-primary font-bold select-none">·</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {cert.skills && cert.skills.length > 0 && (
                    <div className="space-y-3 mb-8">
                      <p className="font-space-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Core Competencies Earned</p>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill) => (
                          <Badge 
                            key={skill} 
                            variant="outline" 
                            className="text-[9px] uppercase tracking-wider font-bold border-primary/20 bg-primary/5 text-primary rounded-none px-2 py-0.5"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {cert.credentialUrl && (
                    <div className="pt-4 border-t border-border/50">
                      <Button asChild variant="outline" size="sm" className="h-9 font-space-mono text-[10px] uppercase tracking-widest border-primary/20 hover:bg-primary hover:text-white transition-all rounded-none group/link">
                        <Link href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                          Verify Credential
                          <ExternalLink className="ml-2 h-3 w-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        <hr className="thick-rule" />
      </div>
    </section>
  );
}
