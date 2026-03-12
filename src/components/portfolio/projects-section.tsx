'use client';

import { projects } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-card py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work in AI, full-stack engineering, and cloud systems.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.slug} className="group flex flex-col overflow-hidden bg-background/50 transition-all hover:shadow-primary/20 hover:shadow-xl border-border/50">
              <CardHeader className="p-0">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={project.imageHint}
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4 p-6">
                <div className="space-y-2">
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">{project.name}</CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] font-bold uppercase tracking-widest">
                      {tech}
                    </Badge>
                  ))}
                  {project.stack.length > 3 && (
                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-primary/20">
                      +{project.stack.length - 3} More
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 gap-3">
                <Button asChild variant="default" className="flex-1 bg-primary hover:bg-primary/90">
                  <Link href={`/projects/${project.slug}`}>
                    View Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="icon" className="hover:bg-primary hover:text-white transition-all">
                  <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-white">
            <Link href="/projects">
              Browse All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
