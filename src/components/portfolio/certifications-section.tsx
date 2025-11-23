import { allCertificates } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CertificationsSection() {
  return (
    <section id="certifications" className="bg-card py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          <span className="text-primary">Certifications</span> & Programs
        </h2>
        <Card className="mx-auto max-w-5xl bg-background/50">
          <CardHeader>
             <CardTitle className="text-2xl">
                Professional Development
             </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allCertificates.map((cert) => (
                <div key={cert.title} className="flex items-start gap-3 rounded-md border p-4">
                  <cert.icon className="h-8 w-8 flex-shrink-0 text-primary mt-1" />
                  <div className='flex flex-col'>
                      <p className='font-semibold'>{cert.title}</p>
                      <p className='text-sm text-muted-foreground'>{cert.issuer}</p>
                      <p className='text-xs text-muted-foreground'>{cert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
