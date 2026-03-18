'use client';

import React, { useEffect, useState } from 'react';
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
  type CarouselApi,
} from '@/components/ui/carousel';

export default function ExperienceSection() {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

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
        
        <div className="mx-auto max-w-full sm:max-w-md md:max-w-lg">
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {experiences.map((exp, index) => (
                <CarouselItem key={`${exp.role}-${exp.company}-${index}`} className="basis-full">
                  <div className="p-1">
                    <Card
                      className="group mx-auto flex w-full flex-col border bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/20"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            <Briefcase className="h-5 w-5 md:h-6 md:w-6" />
                          </div>
                          <Badge variant="outline" className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest border-primary/20 text-primary shrink-0">
                            {exp.period}
                          </Badge>
                        </div>
                        <div className="mt-4 md:mt-6">
                          <CardTitle className="text-xl md:text-2xl font-bold leading-tight">{exp.role}</CardTitle>
                          <p className="text-base md:text-lg font-medium text-primary/80">{exp.company}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 space-y-4 md:space-y-6 pt-2">
                        <p className="text-sm md:text-base leading-relaxed text-muted-foreground italic">
                          "{exp.description}"
                        </p>
                        <div className="space-y-3 md:space-y-4">
                           <p className="text-[10px] md:text-sm font-bold uppercase text-muted-foreground/70 tracking-wider">Key Contributions:</p>
                          <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
                            {exp.points.map((point, pIndex) => (
                              <li key={pIndex} className="flex items-start gap-2 md:gap-3">
                                <CheckCircle2 className="mt-1 h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-primary" />
                                <span className="text-foreground/80">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-6 border-t bg-muted/5 group-hover:bg-primary/5 transition-colors">
                        {exp.link ? (
                          <Button asChild variant="ghost" size="lg" className="w-full justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                            <Link href={exp.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full">
                              <span className="text-sm md:text-base">Visit Project Website</span>
                              <ExternalLink className="h-4 w-4 md:h-5 md:w-5" />
                            </Link>
                          </Button>
                        ) : (
                          <div className="h-11 w-full flex items-center justify-center text-[10px] md:text-sm text-muted-foreground font-medium uppercase tracking-widest">
                            Corporate Role
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 h-9 w-9 md:h-10 md:w-10 border-primary/20 hover:bg-primary/10" />
              <CarouselNext className="static translate-y-0 h-9 w-9 md:h-10 md:w-10 border-primary/20 hover:bg-primary/10" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
