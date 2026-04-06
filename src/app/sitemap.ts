
import { MetadataRoute } from 'next'
import { projects as staticProjects } from '@/lib/data'
import fs from 'fs';
import path from 'path';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

/**
 * Next.js sitemap configuration.
 * Dynamically synchronizes static system routes with Firestore registry assets.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sheraz.synctech.ie';
  const { firestore } = initializeFirebase();

  // 1. Core Strategic Routes
  const staticRoutes = [
    '',
    '/projects',
    '/archives',
    '/posts',
    '/survey',
    '/forms',
    '/support',
    '/complaints',
    '/ai-architect',
    '/contact',
    '/privacy',
    '/archives/category/Project',
    '/archives/category/Study',
    '/archives/category/Course',
    '/archives/category/CaseStudy',
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'weekly' : 'monthly') as any,
    priority: route === '' ? 1.0 : (route === '/privacy' ? 0.5 : 0.8),
  }));

  // 2. Resolve Dynamic Projects (Static + Firestore)
  let projectEntries: MetadataRoute.Sitemap = staticProjects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  if (firestore) {
    try {
      const projSnap = await getDocs(query(collection(firestore, 'projects'), where('isPublished', '==', true)));
      const dynamicProjEntries = projSnap.docs.map(doc => ({
        url: `${baseUrl}/projects/${doc.data().slug}`,
        lastModified: doc.data().createdAt?.toDate() || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
      projectEntries = [...projectEntries, ...dynamicProjEntries];
    } catch (e) {
      console.warn('Sitemap Project Resolution Failed:', e);
    }
  }

  // 3. Resolve Dynamic Archives (Local Files + Firestore Articles)
  let archiveEntries: MetadataRoute.Sitemap = [];
  
  // Local .md files
  const docsDir = path.join(process.cwd(), 'docs');
  if (fs.existsSync(docsDir)) {
    const files = fs.readdirSync(docsDir);
    const localEntries = files
      .filter(file => file.endsWith('.md'))
      .map(file => ({
        url: `${baseUrl}/archives/${file.replace('.md', '')}`,
        lastModified: fs.statSync(path.join(docsDir, file)).mtime,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
    archiveEntries = [...archiveEntries, ...localEntries];
  }

  // Firestore Articles
  if (firestore) {
    try {
      const artSnap = await getDocs(query(collection(firestore, 'articles'), where('isPublished', '==', true)));
      const dynamicArtEntries = artSnap.docs.map(doc => ({
        url: `${baseUrl}/archives/${doc.data().slug}`,
        lastModified: doc.data().publishDate?.toDate() || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
      archiveEntries = [...archiveEntries, ...dynamicArtEntries];
    } catch (e) {
      console.warn('Sitemap Article Resolution Failed:', e);
    }
  }

  return [...staticEntries, ...projectEntries, ...archiveEntries];
}
