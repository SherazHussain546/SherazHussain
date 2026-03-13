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
import FirebaseErrorListener from '@/components/FirebaseErrorListener';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const siteConfig = {
  name: 'Sheraz Hussain | Full-Stack Software Engineer & AI/Cloud Developer',
  url: 'https://sheraz.synctech.ie',
  description: 'Sheraz Hussain, a Freelancer working with SYNC TECH Solutions, is a top-tier Full-Stack Software Engineer, AI/Cloud Developer, and Technology Expert based in Dublin, Ireland. Explore expert projects in Next.js, AI, and Cloud Architecture.',
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
    creator: `@sherazhussain546`,
  },
  keywords: [
    'Sheraz Hussain',
    'SYNC TECH Solutions',
    'sherazhussain.pw',
    'sheraz.synctech.ie',
    'sherazhussain.synctech.ie',
    'AI Developer Ireland',
    'Cloud Infrastructure',
    'Open-Source Software',
    'Full-Stack Developer Dublin',
    'Gemini 2.0 AI',
    'Next.js Expert',
    'Software Engineering Support',
    'Web3 Identity',
    'Unstoppable Domains',
    'Tech Innovation Ireland',
    'AI Tools Developer',
    'Dublin Business School Alumnus',
    'ATS Resume Optimizer',
    'Market Genius AI',
    'Software Architecture Consulting',
    'Freelance Developer Dublin'
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
    google: 'ivsgH4f4kTUg93hvzWW8YiN9dJfm4frxstgSViLz9qQ',
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
        siteConfig.links.linkedin,
      ],
      'jobTitle': 'Full-Stack Software Engineer & AI/Cloud Developer',
      'worksFor': {
        '@type': 'Organization',
        'name': 'SYNC TECH Solutions',
        'url': 'https://www.synctech.ie'
      },
       "image": siteConfig.ogImage,
       "description": siteConfig.description,
       "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dublin",
        "addressCountry": "IE"
      },
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Dublin Business School"
      }
  };

  return (
    <html lang="en">
      <body className={cn('font-sans antialiased', inter.variable)}>
          <Script 
            src="https://www.googletagmanager.com/gtag/js?id=G-CX3V7SF35L" 
            strategy="afterInteractive" 
          />
          <Script id="google-analytics" strategy="afterInteractive">
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
          <Script 
            data-name="BMC-Widget" 
            data-cfasync="false" 
            src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" 
            data-id="sherazhussain546" 
            data-description="Support me on Buy me a coffee!" 
            data-message="Thank you for visiting. I dedicate my time to building high-performance AI tools, open-source software, and cloud infrastructure that helps the global tech community." 
            data-color="#FF813F" 
            data-position="Right" 
            data-x_margin="18" 
            data-y_margin="18"
            strategy="afterInteractive"
          />
          <AuthProvider>
            <FirebaseErrorListener />
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
