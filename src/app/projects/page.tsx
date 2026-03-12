'use client';

import { projects } from '@/lib/data';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Github, ExternalLink, Code2 } from 'lucide-react';

export default function ProjectsGallery() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
              Project <span className="text-foreground">Gallery</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive collection of my engineering work, from AI automation to full-stack web and mobile applications.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.slug} className="group flex flex-col overflow-hidden bg-card/50 transition-all hover:shadow-primary/20 hover:shadow-xl border-border/50">
                <CardHeader className="pb-0 pt-6 px-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Code2 className="h-4 w-4" />
                    </div>
                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-primary/20 text-primary">
                      Engineering Project
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4 p-6">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">{project.name}</CardTitle>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] font-bold uppercase tracking-widest">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 gap-3 border-t bg-muted/5 mt-4">
                  <Button asChild variant="default" className="flex-1">
                    <Link href={`/projects/${project.slug}`}>
                      View Case Study
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="icon" title="View Source">
                    <Link href={project.link} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </Link>
                  </Button>
                  {project.liveLink && (
                    <Button asChild variant="outline" size="icon" title="Live Demo">
                      <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
