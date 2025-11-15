import { education } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, GraduationCap } from 'lucide-react';

export default function EducationSection() {
  return (
    <section id="education" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          <span className="text-primary">Education</span>
        </h2>
        <Card className="mx-auto max-w-2xl bg-card shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
              <GraduationCap className="h-10 w-10 text-primary" />
              <div>
                <CardTitle className="text-2xl">{education.degree}</CardTitle>
                <p className="text-muted-foreground">{education.university}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium">Graduated: {education.graduationDate}</p>
            <div className="flex items-start gap-4">
              <Award className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h4 className="font-semibold">Awards & Honors</h4>
                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                  {education.awards.map((award) => (
                    <li key={award}>{award}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
