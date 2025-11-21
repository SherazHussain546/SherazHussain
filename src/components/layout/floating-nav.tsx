'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    href: 'mailto:sherazhussainofficial1@gmail.com',
    label: 'Email',
    icon: Mail,
    target: '_self',
  },
  {
    href: 'https://github.com/SherazHussain546',
    label: 'GitHub',
    icon: Github,
    target: '_blank',
  },
  {
    href: 'https://linkedin.com/in/sherazhussain546/',
    label: 'LinkedIn',
    icon: Linkedin,
    target: '_blank',
  },
];

export default function FloatingNav() {
  const pathname = usePathname();
  
  // Hide the floating nav on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="group fixed top-1/2 left-4 z-50 -translate-y-1/2 hidden md:flex">
      <div className="flex flex-col items-start gap-2 rounded-full border bg-card/50 p-2 shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out hover:w-36 hover:p-4 hover:items-stretch">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            target={item.target}
            rel={item.target === '_blank' ? 'noopener noreferrer' : ''}
            aria-label={item.label}
            className="flex items-center gap-4 rounded-full text-muted-foreground transition-colors hover:text-primary"
          >
            <item.icon className="h-6 w-6 flex-shrink-0" />
            <span className="w-0 overflow-hidden text-sm font-medium opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
