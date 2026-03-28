import { projects } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProjectCaseStudyContent from '@/components/portfolio/project-case-study-content';

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * generateMetadata - Core SEO strategy for global search dominance.
 * Dynamically generates high-fidelity Open Graph and Twitter metadata for each case study.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return { title: 'Project Not Found' };

  const title = `${project.name} | Sheraz Hussain Engineering Case Study`;
  const description = project.description;
  const url = `https://sheraz.synctech.ie/projects/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.name} - Engineering Case Study by Sheraz Hussain`,
        },
      ],
      siteName: 'Sheraz Hussain Professional Portfolio',
      publishedTime: new Date().toISOString(),
      authors: ['Sheraz Hussain'],
      section: 'Technology',
      tags: [...project.stack, 'Software Architecture', 'AI Solutions'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.image],
      creator: '@sherazhussain546',
    },
    keywords: [...project.stack, 'Sheraz Hussain', 'Engineering Case Study', 'Software Architecture', 'Cloud Infrastructure', 'AI Optimization'],
  };
}

/**
 * Server-side entry point for project case studies.
 * Ensures search engine crawlers can index the metadata before client-side hydration.
 */
export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudyContent project={project} />;
}
