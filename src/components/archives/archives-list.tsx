'use client';

import { useMemo } from 'react';
import { collection, query, where, orderBy, CollectionReference, DocumentData } from 'firebase/firestore';
import { useFirestore, useMemoFirebase, useCollection } from '@/firebase';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Globe, Archive, ChevronRight, Clock, Sparkles, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

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
      updatedAt: data.publishDate?.toDate().toLocaleDateString('en-IE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }) || 'Syncing...',
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
    <div className="space-y-6">
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
        <div className="p-6 rounded-xl border border-destructive/20 bg-destructive/5 flex items-center gap-4 text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-xs font-medium">Technical Registry Synchronization Error. A database index may be initializing.</p>
        </div>
      )}

      {allDocuments.length === 0 && !isLoading ? (
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
