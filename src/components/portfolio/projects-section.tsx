import { projects } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github } from 'lucide-react';
import Image from 'next/image';
import images from '@/lib/placeholder-images.json';

// Define a type for the project images in the JSON file
type ProjectImages = {
  [key: string]: {
    src: string;
    alt: string;
    width: number;
    height: number;
    hint: string;
  };
};

const projectImages: ProjectImages = images.projects;

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-card py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {projects.map((project) => {
            const image = projectImages[project.imageKey];
            return (
              <Card key={project.name} className="flex flex-col overflow-hidden bg-background/50 transition-all hover:shadow-primary/20 hover:shadow-lg">
                <div className="relative h-48 w-full">
                  {image && (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      data-ai-hint={image.hint}
                    />
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={project.link} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View on GitHub
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
