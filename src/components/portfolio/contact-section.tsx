import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import Link from 'next/link';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto text-center px-4 md:px-6">
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. If you'd like to get in touch, please don't hesitate to reach out.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="mailto:sherazhussainofficial1@gmail.com">
              <Mail className="mr-2 h-5 w-5" />
              Say Hello
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
