
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * ArchivePage - High-Fidelity Markdown Document Viewer.
 * Dynamically fetches and renders documents from the /docs directory.
 */
export default async function ArchivePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const docsDir = path.join(process.cwd(), 'docs');
  const filePath = path.join(docsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return notFound();
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const stats = fs.statSync(filePath);
  const lastModified = stats.mtime.toLocaleDateString('en-IE', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFB]">
      <Header />
      
      <main className="flex-1">
        {/* ──────────────── MASTHEAD ──────────────── */}
        <header className="bg-[#071739] text-white py-16 md:py-24 px-6 text-center relative overflow-hidden">
          <div className="container mx-auto max-w-4xl relative z-10">
            <p className="font-space-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-6">
              Technical Documentation Archive &nbsp;·&nbsp; Restricted Access
            </p>
            <h1 className="font-playfair text-[clamp(2.5rem,6vw,4rem)] font-black leading-[1.1] tracking-tight mb-6 capitalize">
              {slug.replace(/-/g, ' ')}
            </h1>
            <div className="flex items-center justify-center gap-6 flex-wrap font-space-mono text-[10px] tracking-widest uppercase text-white/50">
              <span className="flex items-center gap-2"><User className="h-3 w-3" /> Sheraz Hussain</span>
              <span className="text-primary">·</span>
              <span className="flex items-center gap-2"><Calendar className="h-3 w-3" /> Updated {lastModified}</span>
              <span className="text-primary">·</span>
              <span className="flex items-center gap-2"><FileText className="h-3 w-3" /> Markdown Source</span>
            </div>
          </div>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} 
          />
        </header>

        {/* ──────────────── CONTENT BODY ──────────────── */}
        <div className="max-w-[860px] mx-auto px-6 py-12 md:py-20">
          <Button asChild variant="ghost" size="sm" className="mb-12 -ml-3 gap-2 text-muted-foreground hover:text-primary font-mono text-[10px] uppercase tracking-widest">
            <Link href="/">
              <ArrowLeft className="h-3 w-3" />
              Return to Control Center
            </Link>
          </Button>

          <article className="prose prose-lg lg:prose-xl max-w-none prose-headings:font-playfair prose-headings:tracking-tight prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-a:font-bold prose-img:rounded-[2rem] prose-img:shadow-2xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </article>

          <hr className="thick-rule" />

          <div className="pull-quote mt-20">
            <blockquote className="font-playfair italic text-xl md:text-2xl leading-snug">
              "Documentation is the blueprint of technical integrity. We publish our assets to maintain transparency in every high-stakes innovation."
            </blockquote>
            <cite className="font-space-mono text-[10px] tracking-widest uppercase text-muted-foreground mt-4 block">
              — Sheraz Hussain, Knowledge Management Archive
            </cite>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/**
 * Generate static params for all .md files in the /docs directory.
 * This ensures sub-second navigation and full SEO indexing.
 */
export async function generateStaticParams() {
  const docsDir = path.join(process.cwd(), 'docs');
  if (!fs.existsSync(docsDir)) return [];
  
  const files = fs.readdirSync(docsDir);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      slug: file.replace('.md', ''),
    }));
}
