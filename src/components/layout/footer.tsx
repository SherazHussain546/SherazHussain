import { Github, Linkedin, Mail, MapPin, Phone, Heart } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const footerLinks = [
  { name: 'Skills', href: '/#skills' },
  { name: 'Portfolio', href: '/#projects' },
  { name: 'Certifications', href: '/#certifications' },
  { name: 'Support', href: '/support' },
  { name: 'Strategy Hub', href: '/forms' },
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
              Elite Full-Stack Software Engineer & AI Architect. Dedicated to technological excellence, high-fidelity engineering, and market dominance through innovation.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link 
                href="https://github.com/SherazHussain546" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Sheraz Hussain GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link 
                href="https://linkedin.com/in/sherazhussain546/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Sheraz Hussain LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link 
                href="mailto:sheraz@synctech.ie" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email Sheraz Hussain"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Engineering Map</h4>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors flex items-center gap-2 w-fit",
                    link.name === 'Support' 
                      ? "text-red-500 hover:text-red-600 font-medium" 
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {link.name === 'Support' && <Heart className="h-3 w-3 text-red-500 fill-red-500" />}
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Direct Access</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <Link href="mailto:sheraz@synctech.ie" className="hover:text-primary transition-colors">
                  sheraz@synctech.ie
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Dublin, Ireland (GMT+0)</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <Link href="tel:+353830682026" className="hover:text-primary transition-colors">
                  +353 83 068 2026
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center md:flex md:items-center md:justify-between md:text-left">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Sheraz Hussain. Engineered for Global Excellence.
          </p>
          <p className="mt-4 text-xs text-muted-foreground md:mt-0 font-light italic">
            First-Class Honors Software Engineer specializing in Next.js & AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
