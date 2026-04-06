'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown, Rss, BookOpen, Cpu, GraduationCap, FileText, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Projects', href: '/projects' },
  { name: 'Certifications', href: '/#certifications'},
  { name: 'Support', href: '/support' },
  { name: 'Contact', href: '/contact' },
];

const libraryLinks = [
  { name: 'Post', href: '/posts', icon: Rss },
  { name: 'Engineering Project', href: '/archives/category/Project', icon: Cpu },
  { name: 'Technical Study', href: '/archives/category/Study', icon: BookOpen },
  { name: 'Learning Course', href: '/archives/category/Course', icon: GraduationCap },
  { name: 'Case Study', href: '/archives/category/CaseStudy', icon: FileText },
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

          {/* Library Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors group outline-none">
                Library
                <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-white border-border/50 shadow-2xl p-2 rounded-xl">
              <div className="px-3 py-2 mb-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                  <LayoutGrid className="h-3 w-3" />
                  Registry & Insights
                </p>
              </div>
              {libraryLinks.map((link) => (
                <DropdownMenuItem key={link.name} asChild className="rounded-lg">
                  <Link href={link.href} className="flex items-center gap-3 p-2 cursor-pointer transition-colors hover:bg-primary/5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <link.icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest">{link.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
                <div className="h-px bg-border my-2" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2">Registry & Insights</p>
                {libraryLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-3 text-lg font-medium transition-all hover:translate-x-2 px-2"
                  >
                    <link.icon className="h-5 w-5 text-primary" />
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
