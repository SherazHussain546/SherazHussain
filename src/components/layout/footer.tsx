import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

const footerLinks = [
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Certifications', href: '/#certifications' },
  { name: 'Feedback Survey', href: '/survey' },
];

export default function Footer() {
  return (
    <footer className="border-t bg-card pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand & Bio */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">Sheraz Hussain</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              First-Class Honors Software Engineer specializing in AI, Cloud, and Full-Stack development. Freelancer working with SYNC TECH Solutions, delivering innovative tech solutions.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link 
                href="https://github.com/SherazHussain546" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link 
                href="https://linkedin.com/in/sherazhussain546/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link 
                href="mailto:sheraz@synctech.ie" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
            <nav className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <Link href="mailto:sheraz@synctech.ie" className="hover:text-primary transition-colors">
                  sheraz@synctech.ie
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Dublin, Ireland</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>Available for new projects</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center md:flex md:items-center md:justify-between md:text-left">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Sheraz Hussain. All rights reserved.
          </p>
          <p className="mt-4 text-xs text-muted-foreground md:mt-0">
            Freelancer working with{' '}
            <Link
              href="https://www.synctech.ie"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground/80 hover:text-primary hover:underline transition-all"
            >
              SYNC TECH Solutions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
