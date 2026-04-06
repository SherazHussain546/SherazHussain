'use client';

import { allCertificates } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function CertificationsSection() {
  return (
    <section id="certifications" className="bg-background py-12 md:py-20">
      <div className="max-w-[860px] mx-auto px-6">
        <p className="section-label">Credentials & Certifications</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Formally Recognised, Continuously Verified</h2>
        
        <p className="text-lg font-light text-foreground/80 mb-12">
          Professional certifications represent more than resume entries — they are proof that I hold myself accountable to external standards of competence.
        </p>

        <div className="space-y-8 mb-12">
          {allCertificates.map((cert, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group border border-border p-6 md:p-8 hover:bg-muted/5 transition-all shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-playfair tracking-tight">{cert.title}</h3>
                  <p className="font-space-mono text-[10px] uppercase tracking-widest text-primary font-bold">
                    {cert.issuer} · {cert.date}
                  </p>
                </div>
                {cert.icon && <cert.icon className="h-6 w-6 text-primary shrink-0 opacity-30 group-hover:opacity-100 transition-opacity duration-500" />}
              </div>

              {cert.points && cert.points.length > 0 && (
                <ul className="mb-8 space-y-3">
                  {cert.points.map((point, i) => (
                    <li key={i} className="flex gap-3 text-sm font-light text-foreground/80 leading-relaxed">
                      <span className="text-primary font-bold select-none">·</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {cert.skills && cert.skills.length > 0 && (
                <div className="space-y-3 mb-8">
                  <p className="font-space-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Core Competencies Earned</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className="text-[9px] uppercase tracking-wider font-bold border-primary/20 bg-primary/5 text-primary rounded-none px-2 py-0.5"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {cert.credentialUrl && (
                <div className="pt-4 border-t border-border/50">
                  <Button asChild variant="outline" size="sm" className="h-9 font-space-mono text-[10px] uppercase tracking-widest border-primary/20 hover:bg-primary hover:text-white transition-all rounded-none group/link">
                    <Link href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                      Verify Credential
                      <ExternalLink className="ml-2 h-3 w-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <p className="text-sm font-light text-muted-foreground leading-relaxed">
          These programmes reflect my commitment to enterprise-grade standards in cybersecurity and data analytics — the disciplines that underpin trustworthy AI systems at scale.
        </p>

        <hr className="thick-rule" />
      </div>
    </section>
  );
}
