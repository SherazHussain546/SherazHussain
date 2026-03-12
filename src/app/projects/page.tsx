'use client';

import { projects } from '@/lib/data';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';

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
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] font-bold uppercase tracking-widest">
                        {tech}
                      </Badge>
                    ))}
                    {project.stack.length > 4 && (
                      <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest">
                        +{project.stack.length - 4} More
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 gap-3">
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
