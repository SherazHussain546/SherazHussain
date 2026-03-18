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
  name: 'Sheraz Hussain | Elite Software Architect & AI Solutions Engineer',
  shortName: 'Sheraz Hussain Portfolio',
  url: 'https://sheraz.synctech.ie',
  description: 'Sheraz Hussain is a First-Class Honors Software Engineer and AI Architect based in Dublin, Ireland. Specializing in Next.js 15, Google Genkit, and high-performance Cloud Systems. Engineering an open digital future through inclusive, open-source innovation.',
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
    'Software Architect Dublin',
    'AI Solutions Engineer',
    'Next.js 15 Expert',
    'Google Genkit Developer',
    'Cloud Systems Architect',
    'Elite Full-Stack Engineer',
    'Open Source Developer Ireland',
    'Inclusive Tech Innovation',
    'Enterprise AI Implementation',
    'React Technical Lead',
    'High-Performance Web Engineering',
    'ATS Resume Optimization AI',
    'Software Architecture Consultant',
    'Dublin Business School First Class Honors',
    'Scalable Cloud Infrastructure'
  ],
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Sheraz Hussain - Elite Engineering & AI Architecture',
        type: 'image/png',
      }
    ],
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
      'jobTitle': 'Principal Software Architect & AI Solutions Engineer',
      'knowsAbout': [
        'Artificial Intelligence',
        'Cloud Computing',
        'Software Architecture',
        'Next.js 15',
        'React',
        'Google Genkit',
        'Cybersecurity',
        'Inclusive Innovation'
      ],
      'worksFor': {
        '@type': 'Organization',
        'name': 'Technical Consultancy & Open Source Initiative',
        'url': siteConfig.url
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
            id="usercentrics-cmp"
            src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
            data-settings-id="4uTD-bP9QRDJKY"
            strategy="afterInteractive"
          />
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
            data-description="Support Sheraz's Open Source Mission" 
            data-message="Thank you for visiting. Your support directly fuels the development of free AI tools designed for universal accessibility." 
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
