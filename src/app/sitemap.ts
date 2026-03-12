import { MetadataRoute } from 'next'
import { projects } from '@/lib/data'

/**
 * Next.js sitemap configuration.
 * Using 'force-static' ensures the sitemap is generated as a static XML file during the build process,
 * which is the most reliable method for Netlify deployments.
 */
export const dynamic = 'force-static'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sheraz.synctech.ie';

  // Define the core static routes of the portfolio
  const staticRoutes = [
    '',
    '/projects',
    '/survey',
    '/forms',
    '/support',
    '/complaints',
    '/ai-architect',
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamically generate entries for each project case study
  const projectEntries = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries];
}
