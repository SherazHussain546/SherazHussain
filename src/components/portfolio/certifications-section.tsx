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
                  <div className="flex items-center gap-3">
                    <cert.icon className="h-6 w-6 text-primary" />
                    <span>{cert.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-12">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {cert.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Card className="mt-12 bg-background/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Star className="text-primary" />
                Other Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {otherCertificates.map((cert) => (
                  <Badge key={cert} variant="secondary" className="text-base">
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
