import { MetadataRoute } from 'next'
import { projects as staticProjects } from '@/lib/data'
import fs from 'fs';
import path from 'path';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

/**
 * Next.js sitemap configuration.
 * Dynamically synchronizes static system routes with Firestore registry assets.
 * Re-engineered for high-fidelity server-side execution during build.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sheraz.synctech.ie';
  
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
    '/faq',
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

  // Attempt to initialize Firestore for dynamic discovery
  let firestore;
  try {
    const sdk = initializeFirebase();
    firestore = sdk.firestore;
  } catch (e) {
    console.warn('Sitemap Discovery: Firestore initialization deferred.');
  }

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
      console.warn('Sitemap: Dynamic Project resolution skipped.');
    }
  }

  // 3. Resolve Dynamic Archives (Local Files + Firestore Articles)
  let archiveEntries: MetadataRoute.Sitemap = [];
  
  // Local .md files
  const docsDir = path.join(process.cwd(), 'docs');
  if (fs.existsSync(docsDir)) {
    try {
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
    } catch (e) {
      console.warn('Sitemap: Local archive resolution failed.');
    }
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
      console.warn('Sitemap: Remote article resolution skipped.');
    }
  }

  return [...staticEntries, ...projectEntries, ...archiveEntries];
}
