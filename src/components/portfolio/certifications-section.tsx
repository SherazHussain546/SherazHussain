import { allCertificates } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '../ui/badge';
import Link from 'next/link';

export default function CertificationsSection() {
  return (
    <section id="certifications" className="bg-card py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          <span className="text-primary">Certifications</span> & Programs
        </h2>
        <div className="mx-auto max-w-5xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {allCertificates.map((cert, index) => (
              <AccordionItem key={cert.title + index} value={`item-${index}`} className="rounded-lg border bg-background/50 transition-all hover:shadow-lg hover:shadow-primary/20">
                <AccordionTrigger className="p-6 text-left hover:no-underline">
                  <div className="flex flex-col items-start gap-4 sm:flex-row">
                    <cert.icon className="h-10 w-10 flex-shrink-0 text-primary" />
                    <div className="flex-1">
                      <p className="font-semibold text-lg">{cert.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer} &bull; {cert.date}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-6 pb-6">
                    {cert.credentialUrl && (
                        <p className="mb-4 text-xs text-muted-foreground">
                          Credential ID: {' '}
                           <Link
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary hover:underline"
                          >
                           {cert.credentialId}
                          </Link>
                        </p>
                    )}
                    {cert.points && cert.points.length > 0 && (
                      <ul className="list-disc space-y-2 pl-5 text-sm">
                        {cert.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {cert.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                     {!cert.points?.length && !cert.skills?.length && (
                        <p className="text-sm text-muted-foreground">No further details provided for this certificate.</p>
                     )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
