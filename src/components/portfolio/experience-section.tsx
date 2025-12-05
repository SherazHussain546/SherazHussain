'use client';

import { experiences } from '@/lib/data';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Work <span className="text-primary">Experience</span>
        </h2>
        <div className="relative">
          {/* The vertical line in the middle (for desktop) */}
          <div className="absolute left-0 top-0 hidden h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2"></div>
          
          {experiences.map((exp, index) => (
            <div
              key={`${exp.role}-${exp.company}`}
              className={`group relative mb-8 flex w-full items-start md:mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute top-5 -left-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background md:left-1/2 md:-translate-x-1/2"></div>
              
              <div
                className={`w-full pl-8 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}
              >
                <div
                  className="relative rounded-lg border bg-card p-6 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20"
                >
                  <p className="mb-1 text-xs text-muted-foreground">{exp.period}</p>
                  <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-primary">{exp.role}</h3>
                      <p className="font-semibold">{exp.company}</p>
                    </div>
                    {exp.link && (
                       <Button asChild variant="outline" size="sm" className="mt-2 sm:mt-0">
                        <Link href={exp.link} target="_blank" rel="noopener noreferrer">
                          Visit Site
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>

                  <p className="my-4 text-sm text-muted-foreground">{exp.description}</p>
                  <ul className="space-y-2 text-sm">
                    {exp.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
