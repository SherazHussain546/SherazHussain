import { projects as staticProjects } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProjectCaseStudyContent from '@/components/portfolio/project-case-study-content';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { Project } from '@/types/database';

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * getProject - Server-side high-fidelity registry resolver.
 * Searches static FLAGSHIP records then falls back to Firestore dynamic showcases.
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
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Project;
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

  return <ProjectCaseStudyContent project={project} />;
}
