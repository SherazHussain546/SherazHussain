import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Playfair_Display, DM_Sans, Space_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/hooks/use-auth';
import AnalyticsTracker from '@/components/admin/analytics/analytics-tracker';
import FloatingNav from '@/components/layout/floating-nav';
import FeedbackPopup from '@/components/layout/feedback-popup';
import { FirebaseClientProvider } from '@/firebase';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-dm-sans' });
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono' });

const siteConfig = {
  name: 'Sheraz Hussain | AI Architect & Principal Software Engineer Dublin',
  shortName: 'Sheraz Hussain Portfolio',
  url: 'https://sheraz.synctech.ie',
  description: 'Sheraz Hussain is a First-Class Honors Software Engineer and AI Architect based in Dublin, Ireland. Expert in Next.js 15, Generative AI implementation, and high-performance Cloud Systems with SYNC TECH Solutions.',
  author: 'Sheraz Hussain',
  ogImage: 'https://sheraz.synctech.ie/founder.jpg',
  links: {
    github: 'https://github.com/SherazHussain546',
    linkedin: 'https://linkedin.com/in/sherazhussain546/',
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | Sheraz Hussain`,
  },
  description: siteConfig.description,
  authors: [{
    name: siteConfig.author,
    url: siteConfig.url,
  }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  category: 'Technology',
  keywords: [
    'Sheraz Hussain',
    'AI architect Dublin',
    'software architect Ireland',
    'Next.js 15 Expert',
    'Next.js consulting',
    'generative AI consultant',
    'Generative AI implementation',
    'Cloud systems architect Dublin',
    'Full-stack developer Ireland',
    'Technical SEO for SaaS',
    'Multi-tenant SaaS scaling',
    'Enterprise AI solutions',
    'Software engineering Dublin',
    'SYNC TECH Solutions'
  ],
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage }],
    siteName: siteConfig.shortName,
    locale: 'en_IE'
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: `@sherazhussain546`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const usercentricsId = process.env.NEXT_PUBLIC_USERCENTRICS_ID;

  const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Sheraz Hussain',
      'url': siteConfig.url,
      'sameAs': [
        siteConfig.links.github,
        siteConfig.links.linkedin,
      ],
      'jobTitle': 'Principal AI Architect & Software Engineer',
      'description': siteConfig.description,
      'image': 'https://sheraz.synctech.ie/founder.jpg',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Dublin',
        'addressCountry': 'Ireland'
      },
      'worksFor': {
        '@type': 'Organization',
        'name': 'SYNC TECH Solutions',
        'url': 'https://synctech.ie'
      },
      'knowsAbout': [
        'Artificial Intelligence',
        'Generative AI',
        'Cloud Computing',
        'Next.js 15',
        'React',
        'Software Architecture',
        'Technical SEO',
        'Cybersecurity'
      ]
  };

  return (
    <html lang="en">
      <body className={cn(
        'antialiased', 
        inter.variable, 
        playfair.variable, 
        dmSans.variable, 
        spaceMono.variable,
        'font-sans bg-background text-foreground'
      )}>
          {usercentricsId && (
            <Script 
              id="usercentrics-cmp"
              src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
              data-settings-id={usercentricsId}
              strategy="afterInteractive"
            />
          )}
          {gaId && (
            <>
              <Script 
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} 
                strategy="afterInteractive" 
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `}
              </Script>
            </>
          )}
           <Script
            id="json-ld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <FirebaseClientProvider>
            <AuthProvider>
              <FloatingNav />
              <AnalyticsTracker />
              {children}
              <FeedbackPopup />
            </AuthProvider>
          </FirebaseClientProvider>
          <Toaster />
      </body>
    </html>
  );
}