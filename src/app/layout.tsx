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

export const metadata: Metadata = {
  title: 'Sheraz Hussain | Full-Stack Software Engineer & AI/Cloud Developer',
  description: 'Sheraz Hussain, founder of SYNC TECH, is a top-tier Full-Stack Software Engineer, AI/Cloud Developer, and Technology Expert in Dublin, Ireland. Explore the portfolio of Sheraz Hussain (sherazhussain546) to see expert-level projects in Next.js, React, Python, AI, and Cloud Computing.',
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
    'Developer Portfolio'
  ],
  verification: {
    google: '-2YVuqfnqiY5zPpoHylxys5gnIrFexTBklppdeVE4Qw',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
