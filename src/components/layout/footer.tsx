import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-muted-foreground">Full-Stack & AI Developer</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="mailto:example@email.com" aria-label="Email">
            <Mail className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Aetherfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}
