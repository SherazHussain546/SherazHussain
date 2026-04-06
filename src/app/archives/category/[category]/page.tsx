
import fs from 'fs';
import path from 'path';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ArchivesList from '@/components/archives/archives-list';

const categoryDisplayMap: { [key: string]: { title: string; subtitle: string } } = {
  Project: {
    title: 'Engineering Projects',
    subtitle: 'Production-grade repositories and high-fidelity system architectures managed via the command center.'
  },
  Study: {
    title: 'Technical Studies',
    subtitle: 'Deep-dive analysis, research papers, and strategic case studies synchronized from global repositories.'
  },
  Course: {
    title: 'Learning Courses',
    subtitle: 'Curated technical modules and educational assets designed to empower the next generation of engineers.'
  },
  CaseStudy: {
    title: 'Strategic Case Studies',
    subtitle: 'High-fidelity technical analysis and outcome-driven engineering reports exploring complex digital transformations.'
  }
};

/**
 * CategorizedArchives - Dynamic Filtering for Technical Assets.
 */
export default async function CategorizedArchives({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const meta = categoryDisplayMap[category] || { title: category, subtitle: 'Filtered technical registry segment.' };
  
  // 1. Fetch Local Files (Filtering logic)
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
      category: 'System' // Default for local files
    };
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFB]">
      <Header />
      
      <main className="flex-1">
        <header className="bg-[#071739] text-white py-16 md:py-24 px-6 text-center relative overflow-hidden">
          <div className="container mx-auto max-w-4xl relative z-10">
            <p className="font-space-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-6">
              Categorized Registry &nbsp;·&nbsp; {meta.title}
            </p>
            <h1 className="font-playfair text-[clamp(2.5rem,6vw,4rem)] font-black leading-[1.1] tracking-tight mb-6">
              The <span className="italic text-primary font-normal">{meta.title}</span> Archives
            </h1>
            <p className="font-playfair italic text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              {meta.subtitle}
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
            <Link href="/archives">
              <ArrowLeft className="h-3 w-3" />
              View Full Library
            </Link>
          </Button>

          <ArchivesList localDocs={localDocs} categoryFilter={category} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
