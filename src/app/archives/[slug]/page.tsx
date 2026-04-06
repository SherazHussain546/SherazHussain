
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Calendar, User, BookOpen, Share2 } from 'lucide-react';
import Link from 'next/link';

/**
 * ArchivePage - High-Fidelity Markdown Document Viewer.
 * Re-engineered with a "GitHub-esque" clean repository aesthetic.
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
        <header className="bg-[#071739] text-white py-12 md:py-16 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <nav className="flex items-center gap-2 font-space-mono text-[10px] tracking-[0.2em] uppercase text-primary/80">
                  <Link href="/archives" className="hover:text-white transition-colors">Archives</Link>
                  <span className="text-white/20">/</span>
                  <span className="text-white">{slug}.md</span>
                </nav>
                <h1 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight tracking-tight capitalize">
                  {slug.replace(/-/g, ' ')}
                </h1>
                <div className="flex items-center gap-6 font-space-mono text-[9px] tracking-widest uppercase text-white/40">
                  <span className="flex items-center gap-2"><User className="h-3 w-3 text-primary" /> Sheraz Hussain</span>
                  <span className="flex items-center gap-2"><Calendar className="h-3 w-3 text-primary" /> Updated {lastModified}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10 font-mono text-[10px] uppercase tracking-widest">
                  <Share2 className="h-3 w-3 mr-2" /> Share
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} 
          />
        </header>

        {/* ──────────────── GITHUB-STYLE CONTENT BOX ──────────────── */}
        <div className="max-w-[1000px] mx-auto px-6 py-12 md:py-16">
          <Button asChild variant="ghost" size="sm" className="mb-8 -ml-3 gap-2 text-muted-foreground hover:text-primary font-mono text-[10px] uppercase tracking-widest">
            <Link href="/archives">
              <ArrowLeft className="h-3 w-3" />
              Browse Repository
            </Link>
          </Button>

          <div className="rounded-xl border border-border bg-white shadow-xl overflow-hidden">
            {/* Box Header (GitHub Style) */}
            <div className="bg-muted/30 border-b px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 font-space-mono text-[10px] tracking-widest uppercase text-muted-foreground font-bold">
                <BookOpen className="h-4 w-4 text-primary" />
                Technical Assets / {slug}.md
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-space-mono text-[8px] uppercase tracking-widest text-muted-foreground">Source Verified</span>
              </div>
            </div>

            {/* Markdown Body */}
            <div className="p-8 md:p-12 lg:p-16">
              <article className="prose prose-slate lg:prose-lg max-w-none 
                prose-headings:font-playfair prose-headings:tracking-tight prose-headings:font-bold
                prose-h1:text-4xl prose-h1:border-b prose-h1:pb-4 prose-h1:mb-8
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:border-b prose-h2:pb-2
                prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:font-playfair prose-blockquote:italic
                prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-2xl prose-img:shadow-2xl
                prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-[#071739] prose-pre:text-white prose-pre:rounded-xl">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </article>
            </div>
          </div>

          <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 border-t pt-12">
            <div className="space-y-2">
              <p className="font-space-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Sheraz Hussain</p>
              <p className="text-sm text-muted-foreground font-light">Engineering technical supremacy through absolute transparency.</p>
            </div>
            <Button asChild size="lg" className="bg-[#071739] hover:bg-primary text-white font-mono text-[10px] uppercase tracking-[0.2em] px-8 h-14 rounded-none transition-all">
              <Link href="/contact">
                Initiate Partnership Inquiry
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/**
 * Generate static params for all .md files in the /docs directory.
 * Ensures all documentation is pre-rendered for sub-second performance.
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
