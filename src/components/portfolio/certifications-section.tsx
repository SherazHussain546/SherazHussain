'use client';

import { allCertificates } from '@/lib/data';

export default function CertificationsSection() {
  return (
    <section id="certifications" className="bg-background py-12 md:py-20">
      <div className="max-w-[860px] mx-auto px-6">
        <p className="section-label">Credentials & Certifications</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Formally Recognised, Continuously Verified</h2>
        
        <p className="text-lg font-light text-foreground/80 mb-12">
          Professional certifications represent more than resume entries — they are proof that I hold myself accountable to external standards of competence.
        </p>

        <div className="grid grid-cols-1 gap-px bg-border border border-border mb-12">
          {allCertificates.map((cert, index) => (
            <div key={index} className="bg-background p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/5 transition-colors">
              <span className="text-[15px] font-medium text-foreground/90">{cert.title}</span>
              <span className="font-space-mono text-[10px] uppercase tracking-widest text-muted-foreground shrink-0">
                {cert.issuer} · {cert.date}
              </span>
            </div>
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
