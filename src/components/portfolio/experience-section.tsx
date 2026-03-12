'use client';

import { experiences } from '@/lib/data';
import { CheckCircle2, ExternalLink, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-32 bg-secondary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Work <span className="text-primary">Experience</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A journey through my professional career, focusing on software engineering, leadership, and technical consulting.
          </p>
        </div>
        
        <div className="mx-auto max-w-5xl px-12">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {experiences.map((exp, index) => (
                <CarouselItem key={`${exp.role}-${exp.company}-${index}`} className="pl-4 md:basis-1/2 lg:basis-1/2">
                  <div className="h-full p-1">
                    <Card
                      className="group flex h-full flex-col border bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/20"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            <Briefcase className="h-6 w-6" />
                          </div>
                          <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-primary/20 text-primary">
                            {exp.period}
                          </Badge>
                        </div>
                        <div className="mt-6">
                          <CardTitle className="text-xl font-bold">{exp.role}</CardTitle>
                          <p className="font-medium text-primary/80">{exp.company}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 space-y-4 pt-2">
                        <p className="text-sm leading-relaxed text-muted-foreground italic">
                          "{exp.description}"
                        </p>
                        <div className="space-y-3">
                           <p className="text-xs font-bold uppercase text-muted-foreground/70 tracking-tight">Key Contributions:</p>
                          <ul className="space-y-2 text-sm">
                            {exp.points.slice(0, 3).map((point, pIndex) => (
                              <li key={pIndex} className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                                <span className="line-clamp-2 text-foreground/80">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-4 border-t bg-muted/5 group-hover:bg-primary/5 transition-colors">
                        {exp.link ? (
                          <Button asChild variant="ghost" size="sm" className="w-full justify-between hover:bg-primary hover:text-primary-foreground">
                            <Link href={exp.link} target="_blank" rel="noopener noreferrer">
                              Visit Project
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        ) : (
                          <div className="h-9 w-full flex items-center justify-center text-xs text-muted-foreground font-medium uppercase tracking-widest">
                            Corporate Role
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 border-primary/20 hover:bg-primary/10" />
            <CarouselNext className="hidden md:flex -right-12 border-primary/20 hover:bg-primary/10" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
