'use client';

import { skills } from '@/lib/data';
import { motion } from 'framer-motion';

export default function SkillsSection() {
  return (
    <section id="skills" className="bg-background py-12 md:py-20">
      <div className="max-w-[860px] mx-auto px-6">
        <p className="section-label">Technical Mastery</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">The Stack That Powers Everything I Build</h2>
        
        <p className="text-lg font-light text-foreground/80 mb-12">
          I work across the full engineering spectrum — from prompt-engineering large language models to provisioning Kubernetes clusters on Google Cloud. My technology stack is deliberately broad, because real-world engineering problems rarely respect the neat boundaries of a job description.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground border border-foreground mb-12">
          {Object.entries(skills).map(([category, data]) => (
            <div key={category} className="bg-background p-6 hover:bg-muted/5 transition-colors">
              <p className="font-space-mono text-[9px] uppercase tracking-widest text-primary mb-3">{category}</p>
              <p className="text-sm font-light text-foreground/90 leading-relaxed">
                {data.items.join(' · ')}
              </p>
            </div>
          ))}
        </div>

        <p className="text-sm italic text-muted-foreground leading-relaxed">
          What makes this stack meaningful is not its breadth — it is the intentionality behind it. Every technology was adopted to solve a specific problem. I learn tools because I need them, and I master them because half-measures produce half-working software.
        </p>
        
        <hr className="rule" />
      </div>
    </section>
  );
}
