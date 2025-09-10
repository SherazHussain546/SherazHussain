import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground md:text-lg">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. If you'd like to get in touch, please fill out the form below.
          </p>
        </div>
        
        <form 
          name="contact" 
          method="POST" 
          data-netlify="true" 
          className="mx-auto mt-12 max-w-xl space-y-6"
        >
          <input type="hidden" name="form-name" value="contact" />
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" placeholder="Your Name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Your Email" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" placeholder="Your message..." rows={5} required />
          </div>
          
          <div className="text-center">
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              <Mail className="mr-2 h-5 w-5" />
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
