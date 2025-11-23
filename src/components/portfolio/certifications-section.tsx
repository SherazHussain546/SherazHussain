import { mainCertificates, otherCertificates } from '@/lib/data';
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
        <div className="mx-auto max-w-5xl space-y-8">
          {mainCertificates.map((cert) => (
            <Card key={cert.title} className="bg-background/50 transition-all hover:shadow-lg hover:shadow-primary/20">
              <CardHeader>
                <div className="flex flex-col items-start gap-4 sm:flex-row">
                  <cert.icon className="h-10 w-10 flex-shrink-0 text-primary" />
                  <div className="flex-1">
                    <CardTitle>{cert.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer} &bull; {cert.date}
                    </p>
                  </div>
                  {cert.credentialUrl && (
                    <Link
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-primary"
                    >
                      Credential ID: {cert.credentialId}
                    </Link>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-sm">
                  {cert.points?.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cert.skills?.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-3 text-xl font-semibold tracking-tight">
                  Other Certificates & Achievements
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-3">
                  {otherCertificates.map((cert) => (
                    <div
                      key={cert.title}
                      className="flex items-start gap-3 rounded-md border bg-background/30 p-4"
                    >
                      <cert.icon className="mt-1 h-8 w-8 flex-shrink-0 text-primary" />
                      <div>
                        <p className="font-semibold">{cert.title}</p>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        <p className="text-xs text-muted-foreground">{cert.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
