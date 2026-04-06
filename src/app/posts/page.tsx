import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import PostsSection from '@/components/portfolio/posts-section';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * PostsPage - Immersive Feed of Social Updates & Insights.
 */
export default function PostsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFB]">
      <Header />
      
      <main className="flex-1">
        <header className="bg-[#071739] text-white py-16 md:py-24 px-6 text-center relative overflow-hidden">
          <div className="container mx-auto max-w-4xl relative z-10">
            <p className="font-space-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-6">
              Social Registry &nbsp;·&nbsp; Global Insights
            </p>
            <h1 className="font-playfair text-[clamp(2.5rem,6vw,4rem)] font-black leading-[1.1] tracking-tight mb-6">
              The <span className="italic text-primary font-normal">Pulse</span> of Innovation
            </h1>
            <p className="font-playfair italic text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Real-time updates, technical breakthroughs, and social engagements from across the digital ecosystem.
            </p>
          </div>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} 
          />
        </header>

        <div className="container mx-auto px-4 md:px-6 py-12">
          <Button asChild variant="ghost" size="sm" className="mb-12 -ml-3 gap-2 text-muted-foreground hover:text-primary font-mono text-[10px] uppercase tracking-widest">
            <Link href="/">
              <ArrowLeft className="h-3 w-3" />
              Return Home
            </Link>
          </Button>

          <PostsSection 
            title="All Social Engagements" 
            subtitle="Explore the full historical registry of social updates and technical insights."
            layout="grid"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
