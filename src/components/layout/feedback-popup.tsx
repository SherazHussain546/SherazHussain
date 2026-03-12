'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function SupportPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Don't show on support page, survey page or admin pages
    if (
      pathname.startsWith('/support') || 
      pathname.startsWith('/survey') || 
      pathname.startsWith('/admin') || 
      hasBeenDismissed
    ) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const { top } = footer.getBoundingClientRect();
        // Show when the top of the footer is 100px above the bottom of the viewport
        if (top < window.innerHeight - 100) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, hasBeenDismissed]);

  const handleDismiss = () => {
    setHasBeenDismissed(true);
    setIsVisible(false);
  };
  
  if (
    pathname.startsWith('/support') || 
    pathname.startsWith('/survey') || 
    pathname.startsWith('/admin')
  ) return null;

  return (
    <AnimatePresence>
      {isVisible && !hasBeenDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed bottom-4 right-4 z-50 w-full max-w-sm"
        >
          <Card className="shadow-2xl border-primary/20 bg-white/95 backdrop-blur-sm">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 hover:bg-muted"
              onClick={handleDismiss}
              aria-label="Dismiss support prompt"
            >
              <X className="h-4 w-4" />
            </Button>
            <CardHeader className="flex-row items-start gap-4 space-y-0 pr-10">
               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                <Heart className="h-6 w-6 text-red-500 fill-red-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Enjoying the projects?</CardTitle>
                <CardDescription className="mt-1">
                  Help me keep building open-source tools.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                As a Freelancer at SYNC TECH Solutions, I dedicate time to free AI tools. Your support makes this possible.
              </p>
              <Button asChild className="mt-4 w-full bg-primary hover:bg-primary/90" size="sm">
                <Link href="/support">Support My Work</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
