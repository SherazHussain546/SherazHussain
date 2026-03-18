import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github, Heart, Users } from 'lucide-react';
import Link from 'next/link';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground md:text-lg">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Feel free to reach out to me via email or connect with me on LinkedIn.
          </p>
        </div>
        
        <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-4 sm:flex-row sm:justify-center flex-wrap">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="mailto:sheraz@synctech.ie">
              <Mail className="mr-2 h-5 w-5" />
              Send an Email
            </Link>
          </Button>
           <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
            <Link href="https://github.com/SherazHussain546" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              Follow on GitHub
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
            <Link href="https://linkedin.com/in/sherazhussain546/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-5 w-5" />
              Connect on LinkedIn
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
            <Link href="https://www.linkedin.com/groups/17913030/" target="_blank" rel="noopener noreferrer">
              <Users className="mr-2 h-5 w-5" />
              Join LinkedIn Group
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-primary/50 text-primary hover:bg-primary hover:text-white">
            <Link href="https://github.com/sponsors/SherazHussain546" target="_blank" rel="noopener noreferrer">
              <Heart className="mr-2 h-5 w-5 fill-red-500 text-red-500" />
              Sponsor on GitHub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
