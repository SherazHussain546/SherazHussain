'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type NavItemProps = {
  href: string;
  label: string;
  icon: React.ElementType;
  target?: string;
  bgColor: string;
};

const NavItem = ({ href, label, icon: Icon, target, bgColor }: NavItemProps) => {
  return (
    <Link
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : ''}
      aria-label={label}
      className={cn(
        'group relative flex h-12 w-12 items-center justify-center rounded-lg shadow-xl transition-all duration-300 ease-in-out overflow-hidden hover:w-48 border border-white/10 backdrop-blur-sm',
        bgColor
      )}
    >
      <div className="absolute left-0 flex h-full w-12 items-center justify-center transition-transform duration-300 group-hover:-translate-x-full">
        <Icon className="h-5 w-5 flex-shrink-0 text-white" />
      </div>
      <span className="absolute left-0 pl-4 pr-4 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-full w-full text-left">
        {label}
      </span>
    </Link>
  );
};

const navItems: NavItemProps[] = [
  {
    href: 'mailto:sheraz@synctech.ie',
    label: 'Get in Touch',
    icon: Mail,
    target: '_self',
    bgColor: 'bg-slate-800/70 hover:bg-slate-900',
  },
  {
    href: 'https://github.com/SherazHussain546',
    label: 'Follow on GitHub',
    icon: Github,
    target: '_blank',
    bgColor: 'bg-teal-600/70 hover:bg-teal-700',
  },
  {
    href: 'https://linkedin.com/in/sherazhussain546/',
    label: 'Connect on LinkedIn',
    icon: Linkedin,
    target: '_blank',
    bgColor: 'bg-blue-600/70 hover:bg-blue-700',
  },
  {
    href: '/support',
    label: 'Support my Work',
    icon: Heart,
    target: '_self',
    bgColor: 'bg-rose-600/70 hover:bg-rose-700',
  },
];

export default function FloatingNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide on admin pages
    if (pathname.startsWith('/admin')) {
      setIsVisible(false);
      return;
    }

    // Always show on these pages
    if (pathname.startsWith('/survey') || pathname.startsWith('/support')) {
      setIsVisible(true);
      return;
    }

    // Logic for the main page (scrolling)
    const certifiedBySection = document.getElementById('certified-by');
    if (!certifiedBySection) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      const { top } = certifiedBySection.getBoundingClientRect();
      setIsVisible(top <= 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-1/2 left-4 z-50 -translate-y-1/2 hidden md:flex">
      <div className="flex flex-col items-start gap-3">
        {navItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}
