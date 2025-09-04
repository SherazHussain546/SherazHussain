import { experiences } from '@/lib/data';
import { CheckCircle2 } from 'lucide-react';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Work <span className="text-primary">Experience</span>
        </h2>
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2"></div>
          {experiences.map((exp, index) => (
            <div
              key={exp.role}
              className={`relative mb-12 flex w-full items-center md:justify-start ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div
                className="w-full pl-8 md:w-1/2 md:pl-8 md:pr-8"
                style={index % 2 !== 0 ? { marginLeft: 'auto' } : {}}
              >
                <div
                  className="relative rounded-lg border bg-card p-6 shadow-md transition-shadow hover:shadow-lg hover:shadow-primary/20"
                >
                  <div className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary ring-4 ring-background -left-1.5 md:left-auto" style={index % 2 === 0 ? { right: '-2.05rem' } : { left: '-2.05rem' }}></div>
                  <p className="text-xs text-muted-foreground">{exp.period}</p>
                  <h3 className="text-xl font-bold text-primary">{exp.role}</h3>
                  <p className="mb-4 font-semibold">{exp.company}</p>
                  <p className="mb-4 text-sm text-muted-foreground">{exp.description}</p>
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
