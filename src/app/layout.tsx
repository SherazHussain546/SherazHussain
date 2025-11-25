import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/hooks/use-auth';
import AnalyticsTracker from '@/components/admin/analytics/analytics-tracker';
import FloatingNav from '@/components/layout/floating-nav';
import FeedbackPopup from '@/components/layout/feedback-popup';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const siteConfig = {
  name: 'Sheraz Hussain | Full-Stack Software Engineer & AI/Cloud Developer',
  url: 'https://sheraz.synctech.ie',
  description: 'Sheraz Hussain, founder of SYNC TECH, is a top-tier Full-Stack Software Engineer, AI/Cloud Developer, and Technology Expert in Dublin, Ireland. Explore the portfolio of Sheraz Hussain (sherazhussain546) to see expert-level projects in Next.js, React, Python, AI, and Cloud Computing.',
  author: 'Sheraz Hussain',
  ogImage: 'https://sheraz.synctech.ie/og-image.png',
  links: {
    github: 'https://github.com/SherazHussain546',
    linkedin: 'https://linkedin.com/in/sherazhussain546/',
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{
    name: siteConfig.author,
    url: siteConfig.url,
  }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    siteName: siteConfig.name,
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: `@${siteConfig.author}`,
  },
  keywords: [
    'Sheraz Hussain',
    'Sheraz',
    'Hussain',
    'sherazhussain',
    'SherazHussain',
    'sherazhussain546',
    'SherazHussain546',
    'sherazhu546',
    'Founder of SYNC TECH',
    'Founder of synctech.ie',
    'SYNC TECH',
    'Full-Stack Developer Ireland',
    'Software Engineer Dublin',
    'AI Developer Ireland',
    'Cloud Developer Dublin',
    'Technology Expert Ireland',
    'Top IT people in Ireland',
    'Next.js Developer',
    'React Developer',
    'Python Developer',
    'EA Sports',
    'SherazHussian546', // Common misspelling
    'Best tech in Ireland',
    'Portfolio',
    'Developer Portfolio',
    'Web Developer',
    'AI Engineer',
    'Cloud Engineer',
    'DevOps',
    'Cybersecurity',
    'Mobile App Developer',
    'ECommerce Specialist',
    'Freelance Developer',
    'IT Consultant',
    'Dublin',
    'Ireland',
    'Tech Portfolio'
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  verification: {
    google: '-2YVuqfnqiY5zPpoHylxys5gnIrFexTBklppdeVE4Qw',
  },
  alternates: {
    canonical: siteConfig.url,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Sheraz Hussain',
      'url': siteConfig.url,
      'sameAs': [
        siteConfig.links.github,
        siteConfig.links.linkedin
      ],
      'jobTitle': 'Full-Stack Software Engineer & AI/Cloud Developer',
      'worksFor': {
        '@type': 'Organization',
        'name': 'SYNC TECH'
      },
       "image": siteConfig.ogImage,
       "description": siteConfig.description,
       "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dublin",
        "addressCountry": "IE"
      }
  };

  return (
    <html lang="en" className="dark">
      <body className={cn('font-sans antialiased', inter.variable)}>
          {/* Google tag (gtag.js) */}
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-CX3V7SF35L"></Script>
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-CX3V7SF35L');
            `}
          </Script>
           <Script
            id="json-ld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <AuthProvider>
            <FloatingNav />
            <AnalyticsTracker />
            {children}
            <FeedbackPopup />
          </AuthProvider>
          <Toaster />
      </body>
    </html>
  );
}
