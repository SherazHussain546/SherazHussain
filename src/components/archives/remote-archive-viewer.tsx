
'use client';

import { useState, useEffect, useMemo } from 'react';
import { collection, query, where, limit, CollectionReference, DocumentData } from 'firebase/firestore';
import { firestore } from '@/firebase/client';
import { useCollection } from 'react-firebase-hooks/firestore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Calendar, Globe, BookOpen, Sparkles, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function RemoteArchiveViewer({ slug }: { slug: string }) {
  const [content, setContent] = useState<string | null>(null);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentError, setContentError] = useState<string | null>(null);

  const articlesCollection = useMemo(() => {
    return firestore ? collection(firestore, 'articles') as CollectionReference<DocumentData> : null;
  }, []);

  const articlesQuery = useMemo(() => {
    return articlesCollection ? query(articlesCollection, where('slug', '==', slug), where('isPublished', '==', true), limit(1)) : null;
  }, [articlesCollection, slug]);

  const [snapshot, metaLoading, metaError] = useCollection(articlesQuery);

  const articleData = snapshot?.docs[0]?.data();

  useEffect(() => {
    if (articleData?.mdFileUrl) {
      const fetchMarkdown = async () => {
        setContentLoading(true);
        setContentError(null);
        try {
          const response = await fetch(articleData.mdFileUrl);
          if (!response.ok) throw new Error("Failed to fetch Markdown content from external source.");
          const text = await response.text();
          setContent(text);
        } catch (err: any) {
          setContentError(err.message);
        } finally {
          setContentLoading(false);
        }
      };
      fetchMarkdown();
    }
  }, [articleData?.mdFileUrl]);

  if (metaLoading) {
    return (
      <div className="container mx-auto max-w-5xl py-20 text-center">
        <Sparkles className="h-8 w-8 text-primary animate-spin mx-auto mb-4" />
        <p className="font-space-mono text-[10px] uppercase tracking-widest text-muted-foreground">Locating Remote Asset...</p>
      </div>
    );
  }

  if (metaError || (snapshot && snapshot.empty)) {
    return (
      <div className="container mx-auto max-w-5xl py-20 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold font-playfair mb-2">Asset Not Found</h2>
        <p className="text-muted-foreground mb-8">This document does not exist in our remote repository or has been restricted.</p>
        <Button asChild variant="outline">
          <Link href="/archives">Return to Archives</Link>
        </Button>
      </div>
    );
  }

  const lastModified = articleData?.publishDate?.toDate().toLocaleDateString('en-IE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) || 'Recently';

  return (
    <div className="flex flex-col">
      <header className="bg-[#071739] text-white py-12 md:py-16 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-4">
            <nav className="flex items-center gap-2 font-space-mono text-[10px] tracking-[0.2em] uppercase text-primary/80">
              <Link href="/archives" className="hover:text-white transition-colors">Archives</Link>
              <span className="text-white/20">/</span>
              <span className="text-white">{slug}.md</span>
            </nav>
            <h1 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] font-black leading-tight tracking-tight capitalize">
              {articleData?.title}
            </h1>
            <div className="flex items-center gap-6 font-space-mono text-[9px] tracking-widest uppercase text-white/40">
              <span className="flex items-center gap-2"><User className="h-3 w-3 text-primary" /> Sheraz Hussain</span>
              <span className="flex items-center gap-2"><Calendar className="h-3 w-3 text-primary" /> Indexed {lastModified}</span>
              <span className="flex items-center gap-2 text-primary"><Globe className="h-3 w-3" /> GitHub Linked</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)' }} 
        />
      </header>

      <div className="max-w-[1000px] mx-auto px-6 py-12 md:py-16 w-full">
        <Button asChild variant="ghost" size="sm" className="mb-8 -ml-3 gap-2 text-muted-foreground hover:text-primary font-mono text-[10px] uppercase tracking-widest">
          <Link href="/archives">
            <ArrowLeft className="h-3 w-3" />
            Browse Repository
          </Link>
        </Button>

        <div className="rounded-xl border border-border bg-white shadow-xl overflow-hidden min-h-[400px]">
          <div className="bg-muted/30 border-b px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 font-space-mono text-[10px] tracking-widest uppercase text-muted-foreground font-bold">
              <BookOpen className="h-4 w-4 text-primary" />
              Verified External Content / {articleData?.category}
            </div>
            {contentLoading && <Sparkles className="h-3 w-3 text-primary animate-spin" />}
          </div>

          <div className="p-8 md:p-12 lg:p-16">
            {contentLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-[200px] w-full" />
              </div>
            ) : contentError ? (
              <div className="bg-destructive/10 text-destructive p-6 rounded-lg flex items-center gap-4">
                <AlertCircle className="h-6 w-6" />
                <p className="text-sm font-medium">{contentError}</p>
              </div>
            ) : (
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
                  {content || ''}
                </ReactMarkdown>
              </article>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
