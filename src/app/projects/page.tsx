'use client';

import { projects } from '@/lib/data';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Github, ExternalLink, Code2, ArrowLeft, Heart, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectsGallery() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <Button asChild variant="ghost" size="sm" className="mb-8 -ml-3 gap-2 text-muted-foreground hover:text-primary transition-all">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-primary md:text-6xl mb-6">
                Project <span className="text-foreground">Gallery</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A comprehensive collection of my high-fidelity engineering work, from strategic AI automation to enterprise-level full-stack and mobile applications.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {projects.map((project, idx) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="group flex flex-col h-full overflow-hidden bg-card/50 transition-all hover:shadow-primary/20 hover:shadow-xl border-border/50 hover:-translate-y-1">
                  <CardHeader className="pb-0 pt-6 px-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Code2 className="h-4 w-4" />
                      </div>
                      <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-primary/20 text-primary">
                        Engineering Case Study
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4 p-6">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">{project.name}</CardTitle>
                      <p className="text-muted-foreground leading-relaxed text-sm">{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] font-bold uppercase tracking-widest">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 gap-3 border-t bg-muted/5 mt-4 group-hover:bg-primary/5 transition-colors">
                    <Button asChild variant="default" className="flex-1 shadow-md">
                      <Link href={`/projects/${project.slug}`}>
                        View Case Study
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="icon" title="View Source" className="hover:bg-primary hover:text-white transition-all">
                      <Link href={project.link} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                    {project.liveLink && (
                      <Button asChild variant="outline" size="icon" title="Live Demo" className="hover:bg-primary hover:text-white transition-all">
                        <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Strategic CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 rounded-[2.5rem] bg-card border border-primary/20 p-8 md:p-16 text-center shadow-2xl relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -ml-32 -mb-32" />
             
             <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Code2 className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-6">
                  Interested in <span className="text-primary">Collaborating?</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                  As a Freelancer at SYNC TECH Solutions, I'm always looking for new strategic projects or opportunities to partner with visionary brands. If my work resonates with you, let's connect or consider supporting my mission.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg" className="w-full sm:w-auto px-8 h-12 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                    <Link href="/#contact">
                      <Mail className="mr-2 h-4 w-4" />
                      Initiate Contact
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto px-8 h-12 font-bold border-2 hover:bg-primary/5 transition-all hover:scale-105 active:scale-95">
                    <Link href="/support">
                      <Heart className="mr-2 h-4 w-4 text-red-500 fill-red-500" />
                      Support My Work
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
