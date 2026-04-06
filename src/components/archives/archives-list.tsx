'use client';

import { useMemo } from 'react';
import { collection, query, where, orderBy, CollectionReference, DocumentData } from 'firebase/firestore';
import { useFirestore, useMemoFirebase, useCollection } from '@/firebase';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Globe, Archive, ChevronRight, Clock, Sparkles, AlertCircle, Database } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ArchiveDoc {
  slug: string;
  name: string;
  updatedAt: string;
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
 */
export default function ArchivesList({ localDocs, categoryFilter }: ArchivesListProps) {
  const firestore = useFirestore();

  // 1. High-Fidelity Query Construction
  const articlesCollection = useMemo(() => {
    return firestore ? collection(firestore, 'articles') as CollectionReference<DocumentData> : null;
  }, [firestore]);

  const articlesQuery = useMemoFirebase(() => {
    if (!articlesCollection) return null;
    
    // Core constraint: only published assets for the public registry
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
      size: 'Remote Source',
      type: 'Remote',
      category: data.category || 'Study'
    }));
  }, [remoteData]);

  // 3. Local Document Alignment
  const filteredLocalDocs = useMemo(() => {
    if (!categoryFilter) return localDocs;
    // Align local 'System' documents with 'Study' or filter them out for other categories
    return localDocs.filter(d => 
      d.category === categoryFilter || 
      (categoryFilter === 'Study' && d.category === 'System')
    );
  }, [localDocs, categoryFilter]);

  const allDocuments = [...filteredLocalDocs, ...remoteDocs];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Archive className="h-5 w-5 text-primary" />
          <h2 className="font-playfair text-2xl font-bold">
            {categoryFilter ? `${categoryFilter} Registry` : 'Document Index'}
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
              The dynamic categorization engine requires a composite index to synchronize correctly. This is a standard security and performance requirement.
            </p>
            <div className="p-3 bg-white/50 rounded border border-destructive/10 font-mono text-[10px] break-all whitespace-pre-wrap">
              {error.message}
            </div>
            <p className="text-[10px] uppercase font-bold tracking-widest">
              Action Required: Please follow the link provided above in your Firebase Console to authorize this query.
            </p>
          </AlertDescription>
        </Alert>
      )}

      {allDocuments.length === 0 && !isLoading && !error ? (
        <div className="p-20 text-center border-2 border-dashed rounded-[2rem] opacity-40">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="font-space-mono text-[10px] uppercase tracking-widest">
            No assets found in the {categoryFilter || 'repository'} registry segment.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {allDocuments.map((doc) => (
            <Link key={doc.slug} href={`/archives/${doc.slug}`}>
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
