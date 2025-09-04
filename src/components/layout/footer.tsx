import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 text-center md:flex-row md:px-6 md:text-left">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium">Sheraz Hussain</p>
          <p className="text-xs text-muted-foreground">Full-Stack & AI Developer</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="mailto:sherazhussainofficial1@gmail.com" aria-label="Email">
            <Mail className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="https://github.com/SherazHussain546" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="https://linkedin.com/in/sherazhussain546/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
        </div>
        <div className="text-xs text-muted-foreground md:text-right">
          <p>&copy; {new Date().getFullYear()} Sheraz Hussain. All rights reserved.</p>
          <p>
            Built by{' '}
            <Link
              href="https://www.synctech.ie"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground/80 hover:text-primary hover:underline"
            >
              SYNC TECH
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
