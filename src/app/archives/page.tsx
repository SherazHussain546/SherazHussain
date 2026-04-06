
import fs from 'fs';
import path from 'path';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight, Clock, ChevronRight, Archive, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * ArchivesIndex - Automated Documentation Discovery Engine.
 * Scans the /docs directory and generates a high-fidelity list of technical assets.
 */
export default function ArchivesIndex() {
  const docsDir = path.join(process.cwd(), 'docs');
  let files: string[] = [];
  
  if (fs.existsSync(docsDir)) {
    files = fs.readdirSync(docsDir).filter(file => file.endsWith('.md'));
  }

  const documents = files.map(file => {
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
      size: (stats.size / 1024).toFixed(1) + ' KB'
    };
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFB]">
      <Header />
      
      <main className="flex-1">
        {/* ──────────────── MASTHEAD ──────────────── */}
        <header className="bg-[#071739] text-white py-16 md:py-24 px-6 text-center relative overflow-hidden">
          <div className="container mx-auto max-w-4xl relative z-10">
            <p className="font-space-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-6">
              Engineering Knowledge Base &nbsp;·&nbsp; Technical Archive
            </p>
            <h1 className="font-playfair text-[clamp(2.5rem,6vw,4rem)] font-black leading-[1.1] tracking-tight mb-6">
              The <span className="italic text-primary font-normal">Aether</span> Archives
            </h1>
            <p className="font-playfair italic text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Automated repository of strategic assets, mission briefings, and open-source documentation.
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

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <Archive className="h-5 w-5 text-primary" />
                <h2 className="font-playfair text-2xl font-bold">Document Repository</h2>
              </div>
              <span className="font-space-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                {documents.length} Assets Detected
              </span>
            </div>

            {documents.length === 0 ? (
              <div className="p-20 text-center border-2 border-dashed rounded-[2rem] opacity-40">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="font-space-mono text-[10px] uppercase tracking-widest">No documentation found in /docs</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {documents.map((doc) => (
                  <Link key={doc.slug} href={`/archives/${doc.slug}`}>
                    <Card className="group hover:border-primary/30 transition-all hover:shadow-lg bg-white/50 backdrop-blur-sm border-border/40">
                      <CardHeader className="p-6 flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-playfair group-hover:text-primary transition-colors capitalize">
                              {doc.name}
                            </CardTitle>
                            <div className="flex items-center gap-4 mt-1 font-space-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {doc.updatedAt}</span>
                              <span className="text-primary/30">·</span>
                              <span>{doc.size}</span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <hr className="thick-rule" />

          <div className="bg-[#071739] text-white p-8 rounded-[2rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
             <div className="relative z-10 space-y-4">
                <h3 className="font-playfair text-xl font-bold">Dynamic Integrity</h3>
                <p className="text-white/60 text-sm font-light leading-relaxed max-w-xl">
                  This archive is automatically synchronized with the source code. Every project brief, sponsorship guide, and asset document added to the repository is immediately rendered into high-fidelity technical reports.
                </p>
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
