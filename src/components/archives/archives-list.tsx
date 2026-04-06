'use client';

import { useMemo } from 'react';
import { collection, query, where, orderBy, CollectionReference, DocumentData } from 'firebase/firestore';
import { firestore } from '@/firebase/client';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Globe, Archive, ChevronRight, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';

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

export default function ArchivesList({ localDocs, categoryFilter }: ArchivesListProps) {
  // Fetch remote articles from Firestore using the client SDK
  const articlesCollection = useMemo(() => {
    return firestore ? collection(firestore, 'articles') as CollectionReference<DocumentData> : null;
  }, []);

  const articlesQuery = useMemo(() => {
    if (!articlesCollection) return null;
    let q = query(articlesCollection, where('isPublished', '==', true), orderBy('publishDate', 'desc'));
    if (categoryFilter) {
      q = query(articlesCollection, where('isPublished', '==', true), where('category', '==', categoryFilter), orderBy('publishDate', 'desc'));
    }
    return q;
  }, [articlesCollection, categoryFilter]);

  const [snapshot, loading] = useCollection(articlesQuery);

  const remoteDocs: ArchiveDoc[] = snapshot?.docs.map(doc => {
    const data = doc.data();
    return {
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
    };
  }) || [];

  // Filter local docs if categoryFilter is present
  // For local docs, we assume a mapping or we just show them in the general view
  const filteredLocalDocs = useMemo(() => {
    if (!categoryFilter) return localDocs;
    // Local docs in /docs are mostly 'System' or 'Study' by default. 
    // We can add a mapping if needed, but for now we'll only filter remote ones strictly.
    return localDocs.filter(d => d.category === categoryFilter || (categoryFilter === 'Study' && d.category === 'System'));
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
          {loading && <Sparkles className="h-3 w-3 text-primary animate-spin" />}
          <span className="font-space-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            {allDocuments.length} Assets Verified
          </span>
        </div>
      </div>

      {allDocuments.length === 0 ? (
        <div className="p-20 text-center border-2 border-dashed rounded-[2rem] opacity-40">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="font-space-mono text-[10px] uppercase tracking-widest">
            {loading ? 'Scanning Repository...' : `No ${categoryFilter || ''} assets found.`}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {allDocuments.map((doc) => (
            <Link key={doc.slug} href={`/archives/${doc.slug}`}>
              <Card className="group hover:border-primary/30 transition-all hover:shadow-lg bg-white/50 backdrop-blur-sm border-border/40">
                <CardHeader className="p-6 flex flex-row items-center justify-between space-y-0">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {doc.type === 'Local' ? <FileText className="h-5 w-5" /> : <Globe className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg font-playfair group-hover:text-primary transition-colors capitalize">
                          {doc.name}
                        </CardTitle>
                        {doc.category && (
                          <span className="text-[8px] uppercase tracking-widest font-bold bg-muted px-1.5 py-0.5 rounded-sm opacity-60">
                            {doc.category}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 font-space-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {doc.updatedAt}</span>
                        <span className="text-primary/30">·</span>
                        <span className={doc.type === 'Remote' ? 'text-primary font-bold' : ''}>{doc.type} Repository</span>
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
  );
}
