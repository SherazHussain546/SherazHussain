import { MetadataRoute } from 'next'
 
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
    '/#contact'
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
