'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Certifications', href: '/#certifications'},
  { name: 'Posts', href: '/#posts' },
  { name: 'Support', href: '/support' },
  { name: 'Contact', href: '/#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-500 ease-in-out',
        isScrolled 
          ? 'bg-background/80 border-b border-border/50 backdrop-blur-lg py-2 shadow-sm' 
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary transition-transform hover:scale-105 active:scale-95">
          <span>Sheraz Hussain</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'relative text-sm font-medium transition-colors group',
                link.name === 'Support' 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-foreground/80 hover:text-primary'
              )}
            >
              {link.name}
              <span className={cn(
                'absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full',
                link.name === 'Support' ? 'bg-red-500' : 'bg-primary'
              )} />
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="transition-transform active:scale-90">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left text-primary">Sheraz Hussain</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6 pt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'text-lg font-medium transition-all hover:translate-x-2',
                      link.name === 'Support' 
                        ? 'text-red-500 hover:text-red-600' 
                        : 'text-foreground/80 hover:text-primary'
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
