'use client';

import { useMemo } from 'react';
import { collection, query, orderBy, CollectionReference, DocumentData } from 'firebase/firestore';
import { useFirestore, useMemoFirebase, useCollection } from '@/firebase';
import { projects as staticProjects } from '@/lib/data';
import { Project } from '@/types/database';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Github, ExternalLink, Code2, ArrowLeft, Heart, Mail, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * ProjectsGallery - Immersive Engineering Registry.
 * Synchronizes static case studies with dynamic Firestore projects.
 */
export default function ProjectsGallery() {
  const firestore = useFirestore();

  const projCollection = useMemo(() => {
    return firestore ? collection(firestore, 'projects') as CollectionReference<DocumentData> : null;
  }, [firestore]);

  const projQuery = useMemoFirebase(() => {
    return projCollection ? query(projCollection, orderBy('createdAt', 'desc')) : null;
  }, [projCollection]);

  const { data: dynamicProjects, isLoading } = useCollection<Project>(projQuery);

  const allProjects = useMemo(() => {
    const formattedStatic = staticProjects.map((p, i) => ({ ...p, id: `static-${i}` }));
    return [...(dynamicProjects || []), ...formattedStatic];
  }, [dynamicProjects]);

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFB]">
      <Header />
      
      <main className="flex-1">
        {/* ──────────────── MASTHEAD ──────────────── */}
        <header className="bg-foreground text-background py-16 md:py-24 px-6 text-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto max-w-4xl relative z-10"
          >
            <p className="font-space-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-6">
              Engineering Registry &nbsp;·&nbsp; Case Study Archive
            </p>
            <h1 className="font-playfair text-[clamp(2.5rem,6vw,4rem)] font-black leading-[1.1] tracking-tight mb-6">
              The <span className="italic text-primary font-normal">Project</span> Gallery
            </h1>
            <p className="font-playfair italic text-lg md:text-xl text-background/70 max-w-2xl mx-auto leading-relaxed">
              Explore a curated collection of production-grade systems, AI-driven architectures, and high-fidelity technical implementations.
            </p>
          </motion.div>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} 
          />
        </header>

        <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-20">
          <Button asChild variant="ghost" size="sm" className="mb-12 -ml-3 gap-2 text-muted-foreground hover:text-primary font-mono text-[10px] uppercase tracking-widest">
            <Link href="/">
              <ArrowLeft className="h-3 w-3" />
              Return to Control Center
            </Link>
          </Button>

          <div className="grid gap-8 md:grid-cols-2">
            {isLoading ? (
              [...Array(4)].map((_, i) => <Skeleton key={i} className="h-[400px] w-full rounded-none" />)
            ) : (
              allProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="group flex flex-col h-full border-border/40 bg-white hover:shadow-2xl transition-all duration-500 rounded-none overflow-hidden">
                    <CardHeader className="p-8 pb-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-10 w-10 items-center justify-center bg-primary/5 text-primary">
                          <Code2 className="h-5 w-5" />
                        </div>
                        <Badge variant="outline" className="text-[8px] font-mono tracking-widest uppercase rounded-none border-primary/20 text-primary px-2">
                          Engineering Report
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl font-bold font-playfair group-hover:text-primary transition-colors">
                        {project.name.split('–')[0]}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="p-8 flex-1">
                      <p className="text-muted-foreground text-sm font-light leading-relaxed mb-8 line-clamp-4">
                        "{project.description}"
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.slice(0, 4).map((tech) => (
                          <span key={tech} className="font-space-mono text-[9px] px-2 py-1 bg-muted/30 uppercase tracking-tighter">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter className="p-8 pt-0 flex flex-col gap-4">
                      <Button asChild className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-none shadow-lg shadow-primary/10 group/btn">
                        <Link href={`/projects/${project.slug}`}>
                          Review Case Study
                          <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                      <div className="flex gap-2">
                        <Button asChild variant="outline" className="flex-1 rounded-none border-border/50 hover:bg-primary/5 transition-all text-[10px] font-mono uppercase tracking-widest h-10">
                          <Link href={project.link} target="_blank">
                            <Github className="mr-2 h-3 w-3" />
                            Source
                          </Link>
                        </Button>
                        {project.liveLink && (
                          <Button asChild variant="outline" className="flex-1 rounded-none border-border/50 hover:bg-primary/5 transition-all text-[10px] font-mono uppercase tracking-widest h-10">
                            <Link href={project.liveLink} target="_blank">
                              <ExternalLink className="mr-2 h-3 w-3" />
                              Live
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          {/* Engagement Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 rounded-none bg-[#071739] text-white p-8 md:p-16 text-center shadow-2xl relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32" />
             <div className="relative z-10 space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-[9px] font-bold uppercase tracking-[0.3em]">
                  <Sparkles className="h-3 w-3" />
                  Technical Partnership
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-5xl font-playfair">
                  Interested in <span className="text-primary italic">Collaborating?</span>
                </h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed font-light">
                  I am currently architecting the next generation of AI and Cloud systems. If you have a project that requires high-fidelity engineering, let's initiate a consultation.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Button asChild size="lg" className="w-full sm:w-auto px-10 h-14 font-bold bg-primary hover:bg-primary/90 text-white rounded-none uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-primary/20 transition-all hover:scale-105">
                    <Link href="/contact">
                      <Mail className="mr-3 h-4 w-4" />
                      Dispatch Request
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto px-10 h-14 font-bold border-white/20 text-white hover:bg-white/5 rounded-none uppercase tracking-[0.2em] text-[10px] transition-all hover:scale-105">
                    <Link href="/support">
                      <Heart className="mr-3 h-4 w-4 text-red-500 fill-red-500" />
                      Support the Mission
                    </Link>
                  </Button>
                </div>
             </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
