import { certifications, otherCertificates } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, Star } from 'lucide-react';

export default function CertificationsSection() {
  return (
    <section id="certifications" className="bg-card py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          <span className="text-primary">Certifications</span> & Programs
        </h2>
        <div className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {certifications.map((cert, index) => (
              <AccordionItem key={cert.title} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                      <cert.icon className="h-6 w-6 flex-shrink-0 text-primary" />
                      <span>{cert.title}</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-12">
                   <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <p className="font-semibold">{cert.issuer}</p>
                        <p>{cert.date}</p>
                    </div>
                    {cert.points && (
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {cert.points.map((point) => (
                          <li key={point} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {cert.skills && (
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                      </div>
                    )}
                   </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Card className="mt-12 bg-background/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Star className="text-primary" />
                Other Certificates & Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherCertificates.map((cert) => (
                  <div key={cert.title} className="flex items-center gap-3 rounded-md border p-3">
                     <cert.icon className="h-6 w-6 flex-shrink-0 text-primary" />
                     <div className='flex flex-col'>
                        <p className='font-semibold'>{cert.title}</p>
                        <p className='text-xs text-muted-foreground'>{cert.issuer} - {cert.date}</p>
                     </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
