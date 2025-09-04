import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Sheraz Hussain | Full-Stack Software Engineer & AI/Cloud Developer',
  description: 'Sheraz Hussain is a professional Full-Stack Software Engineer and AI/Cloud Developer based in Dublin, Ireland. Explore the portfolio of Sheraz Hussain (sherazhussain546) to see projects in Next.js, React, Python, AI, and Cloud Computing.',
  keywords: [
    'Sheraz Hussain',
    'Sheraz',
    'sherazhussain',
    'SherazHussain',
    'sherazhussain546',
    'Full-Stack Developer',
    'Software Engineer',
    'AI Developer',
    'Cloud Developer',
    'Portfolio',
    'Next.js',
    'React',
    'Python',
    'TypeScript',
    'AWS',
    'GCP',
    'Dublin',
    'Ireland',
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
