'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
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
        'group relative flex h-12 w-12 items-center justify-center rounded-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden hover:w-48',
        bgColor
      )}
    >
      <div className="absolute right-0 flex h-full w-12 items-center justify-center transition-transform duration-300 group-hover:-translate-x-[calc(12rem-3rem)]">
        <Icon className="h-6 w-6 flex-shrink-0 text-white" />
      </div>
      <span className="absolute right-4 whitespace-nowrap pl-16 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {label}
      </span>
    </Link>
  );
};

const navItems: NavItemProps[] = [
  {
    href: 'mailto:sherazhussainofficial1@gmail.com',
    label: 'Email Us',
    icon: Mail,
    target: '_self',
    bgColor: 'bg-gray-500/20 hover:bg-gray-600/40',
  },
  {
    href: 'https://github.com/SherazHussain546',
    label: 'Follow on GitHub',
    icon: Github,
    target: '_blank',
    bgColor: 'bg-teal-600/20 hover:bg-teal-700/40',
  },
  {
    href: 'https://linkedin.com/in/sherazhussain546/',
    label: 'Connect on LinkedIn',
    icon: Linkedin,
    target: '_blank',
    bgColor: 'bg-blue-600/20 hover:bg-blue-700/40',
  },
];

export default function FloatingNav() {
  const pathname = usePathname();

  // Hide the floating nav on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed top-1/2 right-4 z-50 -translate-y-1/2 hidden md:flex">
      <div className="flex flex-col items-end gap-3">
        {navItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}
