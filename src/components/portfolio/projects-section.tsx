'use client';

import { projects } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github, ArrowRight, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-card py-20 md:py-32 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work in AI, full-stack engineering, and cloud systems.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.div key={project.slug} variants={itemVariants}>
              <Card className="group flex h-full flex-col overflow-hidden bg-background/50 transition-all duration-300 hover:shadow-primary/20 hover:shadow-xl border-border/50 hover:-translate-y-2">
                <CardHeader className="pb-0 pt-6 px-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Code2 className="h-4 w-4" />
                    </div>
                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-primary/20 text-primary">
                      Engineering Case Study
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4 p-6">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">{project.name}</CardTitle>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] font-bold uppercase tracking-widest">
                        {tech}
                      </Badge>
                    ))}
                    {project.stack.length > 4 && (
                      <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest border-primary/20">
                        +{project.stack.length - 4} More
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 gap-3 border-t bg-muted/5 mt-4 transition-colors group-hover:bg-primary/5">
                  <Button asChild variant="default" className="flex-1 bg-primary hover:bg-primary/90 shadow-md transition-all active:scale-95">
                    <Link href={`/projects/${project.slug}`}>
                      View Case Study
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="icon" className="hover:bg-primary hover:text-white transition-all active:scale-90">
                    <Link href={project.link} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Button asChild size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-white transition-all duration-300">
            <Link href="/projects">
              Browse All Projects
              <ArrowRight className="ml-2 h-5 w-5 transition-transform hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
