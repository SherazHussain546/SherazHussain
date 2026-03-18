'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { firestore } from '@/firebase/client';
import { Skeleton } from '../ui/skeleton';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

const summaries = [
  "I am an elite First-Class Honors Software Engineer specializing in AI, Cloud, and High-Performance Web Applications. My focus is on delivering technical excellence through advanced engineering and accessible innovation.",
  "Expert in architecting modern, responsive digital ecosystems using Next.js and React. I prioritize sub-second performance and superior user experience, ensuring your brand dominates its niche.",
  "Leading the frontier of Generative AI integration. I build intelligent agents and automated systems that transform complex data into strategic business assets for everyone.",
  "Committed to the highest standards of digital integrity, implementing Zero Trust architectures and robust security while keeping the user experience simple and intuitive.",
  "Mastering cross-platform mobile development with Ionic and Capacitor. I deliver high-fidelity applications that bridge the gap for users who aren't tech-savvy.",
  "My objective in IT is to empower all users by building free, open-source platforms. I believe technology should be an asset, not a barrier, for every individual.",
  "Available for high-stakes technical consultations and collaborative engineering projects. I help visionary brands turn technical challenges into market-leading digital products.",
  "Pushing the boundaries of what is possible in AI and Web development. I am an engineer driven by precision, innovation, and the pursuit of a more open digital future."
];

export default function AboutSection() {
    const [summaryIndex, setSummaryIndex] = useState(0);
    const settingsRef = doc(firestore, 'siteConfig', 'main');
    const [settings, loading] = useDocumentData(settingsRef);

    const founderImageUrl = settings?.founderImageUrl || "https://synctech.ie/_next/image?url=%2Ffounder.jpg&w=640&q=75";

  return (
    <section id="about" className="py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 md:grid-cols-3 md:px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto h-48 w-48 overflow-hidden rounded-full border-4 border-primary md:h-64 md:w-64 ring-4 ring-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.6)] transition-all duration-500 hover:shadow-[0_0_40px_hsl(var(--primary)/0.8)] hover:scale-[1.02] will-change-transform"
        >
           {loading ? (
             <Skeleton className="h-full w-full rounded-full" />
           ) : (
            <Image
                src={founderImageUrl}
                alt="Sheraz Hussain - Elite Full-Stack Software Engineer & AI Architect"
                fill
                priority
                className="object-cover"
                data-ai-hint="professional engineer"
            />
           )}
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="space-y-4 text-center md:col-span-2 md:text-left"
        >
          <div className="min-h-[120px] md:min-h-[100px]">
            <TypeAnimation
                sequence={[
                () => setSummaryIndex(0),
                'Hi, I am Sheraz Hussain', 3000,
                () => setSummaryIndex(1),
                'I am an Elite Full-Stack Engineer', 3000,
                () => setSummaryIndex(2),
                'I am an AI Solutions Architect', 3000,
                () => setSummaryIndex(3),
                'I Empower the Non-Tech Savvy', 3000,
                () => setSummaryIndex(4),
                'I Build Open Source Platforms', 3000,
                () => setSummaryIndex(5),
                'I am your Strategic Tech Partner', 3000,
                () => setSummaryIndex(6),
                'I Engineer the Future of AI', 3000,
                () => setSummaryIndex(7),
                'Tech for Everyone, Everywhere', 3000,
                ]}
                wrapper="h1"
                speed={50}
                className="text-4xl font-bold tracking-tight text-primary md:text-5xl"
                repeat={Infinity}
            />
          </div>
          <div className="min-h-[100px]">
             <p className="text-lg text-foreground/80 md:text-xl transition-all duration-500 ease-in-out font-light leading-relaxed">
                {summaries[summaryIndex]}
            </p>
          </div>
          <div className="flex justify-center gap-6 pt-4 md:justify-start">
            <Link href="mailto:sheraz@synctech.ie" aria-label="Email Sheraz Hussain" className="transition-transform hover:scale-110">
              <Mail className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
            <Link href="https://github.com/SherazHussain546" target="_blank" rel="noopener noreferrer" aria-label="Sheraz Hussain GitHub" className="transition-transform hover:scale-110">
              <Github className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
            <Link href="https://linkedin.com/in/sherazhussain546/" target="_blank" rel="noopener noreferrer" aria-label="Sheraz Hussain LinkedIn" className="transition-transform hover:scale-110">
              <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
