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
import FirebaseErrorListener from '@/components/FirebaseErrorListener';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-dm-sans' });
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono' });

const siteConfig = {
  name: 'Sheraz Hussain | Elite Software Architect & AI Solutions Engineer',
  shortName: 'Sheraz Hussain Portfolio',
  url: 'https://sheraz.synctech.ie',
  description: 'Sheraz Hussain is a First-Class Honors Software Engineer and AI Architect based in Dublin, Ireland. Specializing in Next.js 15, Google Genkit, and high-performance Cloud Systems.',
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
    'Cloud Systems Architect'
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
        'Google Genkit'
      ],
      'worksFor': {
        '@type': 'Organization',
        'name': 'Technical Consultancy & Open Source Initiative',
        'url': siteConfig.url
      },
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
