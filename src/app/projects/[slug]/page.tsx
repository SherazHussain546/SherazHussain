import { projects as staticProjects } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProjectCaseStudyContent from '@/components/portfolio/project-case-study-content';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * getProject - Server-side high-fidelity registry resolver.
 * Searches static FLAGSHIP records then falls back to Firestore dynamic showcases.
 * Ensures the returned object is a plain object for RSC serialization.
 */
async function getProject(slug: string): Promise<any> {
  // 1. Check static data first
  const staticProj = staticProjects.find((p) => p.slug === slug);
  if (staticProj) return staticProj;

  // 2. Check Firestore (Server-side initialization)
  try {
    const { firestore } = initializeFirebase();
    if (firestore) {
      const q = query(collection(firestore, 'projects'), where('slug', '==', slug), limit(1));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        const data = doc.data();
        
        // Convert to plain object for RSC -> Client Component boundary.
        // Specifically handles Firestore Timestamps which are not serializable across the boundary.
        return {
          id: doc.id,
          name: data.name,
          slug: data.slug,
          description: data.description,
          fullDescription: data.fullDescription,
          challenges: data.challenges || [],
          solutions: data.solutions || [],
          results: data.results || [],
          stack: data.stack || [],
          link: data.link,
          liveLink: data.liveLink || '',
          image: data.image,
          imageHint: data.imageHint,
          isPublished: data.isPublished,
          // Convert Timestamp to a simple milliseconds value
          createdAt: data.createdAt?.toMillis?.() || Date.now(),
        };
      }
    }
  } catch (error) {
    console.warn('Firestore server-side project resolution warning:', error);
  }

  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return { title: 'Project Not Found' };

  const title = `${project.name} | Sheraz Hussain Engineering Case Study`;
  return {
    title,
    description: project.description,
    openGraph: {
      title,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  // Passing a plain, serialized object ensures no RSC boundary errors
  return <ProjectCaseStudyContent project={project} />;
}
