import { MetadataRoute } from 'next'
import { projects, certifications, otherCertificates } from '@/lib/data'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.sherazhussain.synctech.ie';

  const staticRoutes = [
    '',
    '/#about',
    '/#skills',
    '/#experience',
    '/#projects',
    '/#education',
    '/#certifications',
    '/#posts',
    '/#contact'
  ];

  const staticRouteObjects = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
  
  const projectRoutes = projects.map(project => ({
    url: `${baseUrl}/#projects`, 
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const certificateRoutes = certifications.map(cert => ({
    url: `${baseUrl}/#certifications`, 
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  
  const otherCertificateRoutes = otherCertificates.map(cert => ({
    url: `${baseUrl}/#certifications`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    ...staticRouteObjects,
    ...projectRoutes,
    ...certificateRoutes,
    ...otherCertificateRoutes,
  ];
}
