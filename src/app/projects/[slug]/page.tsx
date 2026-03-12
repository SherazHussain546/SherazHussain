'use client';

import { use } from 'react';
import { projects } from '@/lib/data';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Github, ExternalLink, ArrowLeft, CheckCircle2, Rocket, Zap, Target, Code2, Star } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-foreground text-background py-20 border-b border-primary/20">
          <div className="container mx-auto px-4 text-center md:px-6">
            <Link href="/projects" className="inline-flex items-center text-sm font-medium text-background/60 hover:text-primary transition-colors mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gallery
            </Link>
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary border border-primary/30">
                <Code2 className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              {project.name}
            </h1>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {project.stack.map((tech) => (
                <Badge key={tech} className="bg-primary/20 text-primary border-primary/40 px-4 py-1 text-xs uppercase tracking-widest font-bold">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3 text-foreground">
                    <Rocket className="text-primary h-8 w-8" />
                    Overview
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {project.fullDescription}
                  </p>
                </div>

                <Separator />

                <div className="space-y-8">
                  <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3 text-foreground">
                    <Target className="text-primary h-8 w-8" />
                    The Challenges
                  </h2>
                  <div className="grid gap-4">
                    {project.challenges.map((challenge, i) => (
                      <Card key={i} className="border-none bg-muted/30">
                        <CardContent className="p-6 flex gap-4">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                            {i + 1}
                          </span>
                          <p className="text-foreground/80">{challenge}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3 text-foreground">
                    <Zap className="text-primary h-8 w-8" />
                    The Solutions
                  </h2>
                  <div className="grid gap-4">
                    {project.solutions.map((solution, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                        <p className="text-lg text-muted-foreground">{solution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar / Results */}
              <div className="space-y-8">
                <Card className="sticky top-24 border-primary/20 bg-primary/5 shadow-xl">
                  <CardContent className="p-8 space-y-8">
                    <div>
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Star className="text-primary h-5 w-5 fill-primary" />
                        Key Results
                      </h3>
                      <ul className="space-y-4">
                        {project.results.map((result, i) => (
                          <li key={i} className="text-sm font-medium leading-relaxed border-l-2 border-primary pl-4 py-1 text-foreground/80">
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <Button asChild className="w-full h-12 text-lg">
                        <Link href={project.link} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-5 w-5" />
                          View Source Code
                        </Link>
                      </Button>
                      {project.liveLink && (
                        <Button asChild variant="outline" className="w-full h-12 text-lg border-primary/20 hover:bg-primary/10">
                          <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-5 w-5" />
                            Launch Live Demo
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
