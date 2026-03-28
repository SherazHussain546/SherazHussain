'use client';

import { experiences } from '@/lib/data';
import { motion } from 'framer-motion';

export default function ExperienceSection() {
  return (
    <section id="experience" className="bg-background py-12 md:py-20">
      <div className="max-w-[860px] mx-auto px-6">
        <p className="section-label">Professional Journey</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">The Work, The Roles, The Milestones</h2>
        
        <p className="text-lg font-light text-foreground/80 mb-12">
          My professional experience spans technical consulting, product architecture, and enterprise mentorship — reflecting the breadth of application a modern software engineer must navigate.
        </p>

        <div className="relative pl-8 border-l border-border space-y-12 mb-16">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-[36.5px] top-1.5 w-[9px] h-[9px] rounded-full bg-primary" />
              <p className="font-space-mono text-[10px] uppercase tracking-widest text-primary mb-1">
                {exp.period}
              </p>
              <h4 className="font-playfair text-xl font-bold mb-1">{exp.role}</h4>
              <p className="font-space-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
                {exp.company}
              </p>
              <p className="text-[15px] font-light text-foreground/90 leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>

        <hr className="rule" />
      </div>
    </section>
  );
}
