import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Sheraz Hussain | Portfolio',
  description: 'Personal portfolio of Sheraz Hussain, a Full-Stack Software Engineer & AI/Cloud Developer.',
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
