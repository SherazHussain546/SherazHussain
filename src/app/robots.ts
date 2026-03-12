import { MetadataRoute } from 'next'
 
/**
 * robots.ts generates the robots.txt file.
 * It allows full indexing of the site while protecting admin routes from search engines.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/*'],
    },
    sitemap: 'https://sheraz.synctech.ie/sitemap.xml',
  }
}
