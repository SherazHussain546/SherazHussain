
'use client';

import { useMemo } from 'react';
import { collection, query, where, orderBy, CollectionReference, DocumentData } from 'firebase/firestore';
import { useFirestore, useMemoFirebase, useCollection } from '@/firebase';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Globe, Archive, ChevronRight, Clock, Sparkles, Database, SearchX } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ArchiveDoc {
  slug: string;
  name: string;
  updatedAt: string;
  rawDate: number; // Raw timestamp for merging/sorting
  size: string;
  type: 'Local' | 'Remote';
  category?: string;
}

interface ArchivesListProps {
  localDocs: ArchiveDoc[];
  categoryFilter?: string;
}

/**
 * ArchivesList - High-Fidelity Registry Discovery Component.
 * Merges local file-system documents with real-time Firestore assets.
 * Implements a unified chronological sort (newest to oldest).
 */
export default function ArchivesList({ localDocs, categoryFilter }: ArchivesListProps) {
  const firestore = useFirestore();

  // 1. High-Fidelity Query Construction
  const articlesCollection = useMemo(() => {
    return firestore ? collection(firestore, 'articles') as CollectionReference<DocumentData> : null;
  }, [firestore]);

  const articlesQuery = useMemoFirebase(() => {
    if (!articlesCollection) return null;
    
    if (categoryFilter) {
      return query(
        articlesCollection, 
        where('isPublished', '==', true), 
        where('category', '==', categoryFilter),
        orderBy('publishDate', 'desc')
      );
    }
    
    return query(
      articlesCollection, 
      where('isPublished', '==', true), 
      orderBy('publishDate', 'desc')
    );
  }, [articlesCollection, categoryFilter]);

  // 2. High-Performance Synchronization
  const { data: remoteData, isLoading, error } = useCollection(articlesQuery);

  const remoteDocs: ArchiveDoc[] = useMemo(() => {
    if (!remoteData) return [];
    return remoteData.map(data => ({
      slug: data.slug,
      name: data.title,
      updatedAt: data.publishDate && typeof data.publishDate.toDate === 'function' 
        ? data.publishDate.toDate().toLocaleDateString('en-IE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) 
        : 'Recently',
      rawDate: data.publishDate?.toMillis() || Date.now(),
      size: 'Remote Source',
      type: 'Remote',
      category: data.category === 'CaseStudy' ? 'Case Study' : data.category || 'Other'
    }));
  }, [remoteData]);

  // 3. Chronological Merge-Sort
  const allDocuments = useMemo(() => {
    const filteredLocal = !categoryFilter 
      ? localDocs 
      : localDocs.filter(d => 
          d.category === categoryFilter || 
          (categoryFilter === 'Study' && d.category === 'System')
        );

    // Merge and sort by rawDate descending (Newest on Top)
    return [...remoteDocs, ...filteredLocal].sort((a, b) => b.rawDate - a.rawDate);
  }, [localDocs, remoteDocs, categoryFilter]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Archive className="h-5 w-5 text-primary" />
          <h2 className="font-playfair text-2xl font-bold">
            {categoryFilter === 'CaseStudy' ? 'Case Studies' : (categoryFilter ? `${categoryFilter} Registry` : 'Document Index')}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {isLoading && <Sparkles className="h-3 w-3 text-primary animate-spin" />}
          <span className="font-space-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            {allDocuments.length} High-Fidelity Assets
          </span>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="bg-destructive/5 border-destructive/20 text-destructive">
          <Database className="h-4 w-4" />
          <AlertTitle className="font-bold">Database Index Required</AlertTitle>
          <AlertDescription className="mt-2 space-y-4">
            <p className="text-xs leading-relaxed opacity-90">
              The dynamic categorization engine requires a composite index to synchronize correctly.
            </p>
            <div className="p-3 bg-white/50 rounded border border-destructive/10 font-mono text-[10px] break-all whitespace-pre-wrap overflow-x-auto">
              {error.message}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {allDocuments.length === 0 && !isLoading && !error ? (
        <div className="p-20 text-center border-2 border-dashed rounded-[2rem] bg-muted/5 flex flex-col items-center justify-center space-y-4">
          <SearchX className="h-12 w-12 text-muted-foreground opacity-40" />
          <div className="space-y-1">
            <p className="font-space-mono text-[10px] uppercase tracking-widest font-bold">
              Segment Empty
            </p>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              No published assets were found matching this technical classification.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {allDocuments.map((doc) => (
            <Link key={`${doc.type}-${doc.slug}`} href={`/archives/${doc.slug}`}>
              <Card className="group hover:border-primary/30 transition-all hover:shadow-lg bg-white/50 backdrop-blur-sm border-border/40 overflow-hidden">
                <CardHeader className="p-6 flex flex-row items-center justify-between space-y-0">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                      {doc.type === 'Local' ? <FileText className="h-5 w-5" /> : <Globe className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg font-playfair group-hover:text-primary transition-colors capitalize">
                          {doc.name}
                        </CardTitle>
                        {doc.category && (
                          <Badge variant="secondary" className="text-[8px] uppercase tracking-widest font-bold h-4 px-1.5 border-none opacity-70">
                            {doc.category}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 font-space-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {doc.updatedAt}</span>
                        <span className="text-primary/30">·</span>
                        <span className={doc.type === 'Remote' ? 'text-primary font-bold' : ''}>{doc.type} Repository</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
