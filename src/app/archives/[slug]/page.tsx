
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Calendar, Globe, BookOpen, Share2 } from 'lucide-react';
import Link from 'next/link';
import RemoteArchiveViewer from '@/components/archives/remote-archive-viewer';

/**
 * ArchivePage - Unified Document Viewer.
 * Dynamically resolves content from local /docs or hands off to a client component for remote assets.
 */
export default async function ArchivePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // 1. Attempt to Load Local File
  const docsDir = path.join(process.cwd(), 'docs');
  const filePath = path.join(docsDir, `${slug}.md`);

  if (fs.existsSync(filePath)) {
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
          <header className="bg-[#071739] text-white py-12 md:py-16 px-6 relative overflow-hidden">
            <div className="container mx-auto max-w-5xl">
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
                  <span className="flex items-center gap-2 text-primary"><Globe className="h-3 w-3" /> System Repository</span>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
              style={{ backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)' }} 
            />
          </header>

          <div className="max-w-[1000px] mx-auto px-6 py-12 md:py-16">
            <Button asChild variant="ghost" size="sm" className="mb-8 -ml-3 gap-2 text-muted-foreground hover:text-primary font-mono text-[10px] uppercase tracking-widest">
              <Link href="/archives">
                <ArrowLeft className="h-3 w-3" />
                Browse Repository
              </Link>
            </Button>

            <div className="rounded-xl border border-border bg-white shadow-xl overflow-hidden">
              <div className="bg-muted/30 border-b px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 font-space-mono text-[10px] tracking-widest uppercase text-muted-foreground font-bold">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Technical Assets / {slug}.md
                </div>
              </div>
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
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // 2. Not a Local File? Hands off to the Client component to fetch from Firestore
  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFB]">
      <Header />
      <main className="flex-1">
        <RemoteArchiveViewer slug={slug} />
      </main>
      <Footer />
    </div>
  );
}

/**
 * Generate static params for local files only.
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
