import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Sheraz Hussain | Full-Stack Software Engineer & AI/Cloud Developer',
  description: 'Sheraz Hussain, founder of SYNC TECH, is a top-tier Full-Stack Software Engineer, AI/Cloud Developer, and Technology Expert in Dublin, Ireland. Explore the portfolio of Sheraz Hussain (sherazhussain546) to see expert-level projects in Next.js, React, Python, AI, and Cloud Computing.',
  keywords: [
    'Sheraz Hussain',
    'Sheraz',
    'sherazhussain',
    'SherazHussain',
    'sherazhussain546',
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
    'sherazhu546',
    'SherazHussian546',
    'Best tech in Ireland',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn('font-sans antialiased', inter.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
