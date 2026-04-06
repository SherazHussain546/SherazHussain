
import fs from 'fs';
import path from 'path';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ArchivesList from '@/components/archives/archives-list';

/**
 * ArchivesIndex - Unified Documentation Discovery Engine.
 * Combines server-side local files with client-side Firestore synchronization.
 */
export default async function ArchivesIndex() {
  // 1. Fetch Local Files (Server-side for SEO and zero-latency)
  const docsDir = path.join(process.cwd(), 'docs');
  let localFiles: string[] = [];
  if (fs.existsSync(docsDir)) {
    localFiles = fs.readdirSync(docsDir).filter(file => file.endsWith('.md'));
  }

  const localDocs = localFiles.map(file => {
    const filePath = path.join(docsDir, file);
    const stats = fs.statSync(filePath);
    return {
      slug: file.replace('.md', ''),
      name: file.replace(/-/g, ' ').replace('.md', ''),
      updatedAt: stats.mtime.toLocaleDateString('en-IE', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      rawDate: stats.mtime.getTime(), // Pass raw timestamp for true sorting
      size: (stats.size / 1024).toFixed(1) + ' KB',
      type: 'Local' as const,
      category: 'System'
    };
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFB]">
      <Header />
      
      <main className="flex-1">
        <header className="bg-[#071739] text-white py-16 md:py-24 px-6 text-center relative overflow-hidden">
          <div className="container mx-auto max-w-4xl relative z-10">
            <p className="font-space-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-6">
              Technical Library &nbsp;·&nbsp; Consolidated Archives
            </p>
            <h1 className="font-playfair text-[clamp(2.5rem,6vw,4rem)] font-black leading-[1.1] tracking-tight mb-6">
              The <span className="italic text-primary font-normal">Knowledge</span> Registry
            </h1>
            <p className="font-playfair italic text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Discover localized strategy briefs, dynamic studies, and specialized courses synchronized across the network.
            </p>
          </div>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} 
          />
        </header>

        <div className="max-w-[1000px] mx-auto px-6 py-12 md:py-20">
          <Button asChild variant="ghost" size="sm" className="mb-12 -ml-3 gap-2 text-muted-foreground hover:text-primary font-mono text-[10px] uppercase tracking-widest">
            <Link href="/">
              <ArrowLeft className="h-3 w-3" />
              Return to Control Center
            </Link>
          </Button>

          <ArchivesList localDocs={localDocs} />

          <hr className="thick-rule" />

          <div className="bg-[#071739] text-white p-8 rounded-[2rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
             <div className="relative z-10 space-y-4">
                <h3 className="font-playfair text-xl font-bold">Absolute Technical Transparency</h3>
                <p className="text-white/60 text-sm font-light leading-relaxed max-w-xl">
                  This repository dynamically resolves assets from internal filesystems and authorized external sources. Every course, briefing, and report is rendered with high-fidelity integrity to empower partners and researchers.
                </p>
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
