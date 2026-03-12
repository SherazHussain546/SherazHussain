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
  "Highly motivated First-Class Honors graduate with a robust skill set in Software Engineering, AI/ML, and Cloud Computing. Proven ability to design, develop, and deploy innovative solutions using a full-stack approach as a Freelancer working with SYNC TECH Solutions.",
  "Expert in building scalable, responsive web applications using modern frameworks like React, Angular, and Node.js, ensuring high performance and seamless user experiences across all devices.",
  "Specializing in Generative AI with Google Genkit and Gemini, and architecting resilient, scalable cloud systems on AWS and Google Cloud Platform for mission-critical applications.",
  "Dedicated to securing digital assets through penetration testing, implementing Zero Trust architectures, and integrating DevSecOps best practices into automated CI/CD pipelines.",
  "Crafting high-performance cross-platform mobile applications using Ionic and Capacitor, bringing native-quality experiences to both iOS and Android users from a single codebase.",
  "Empowering businesses to scale with high-performance E-Commerce solutions, custom marketing funnels on WordPress/WooCommerce, and data-driven digital growth strategies.",
  "Available for freelance collaborations and technical consultations as a Freelancer working with SYNC TECH Solutions. I help businesses turn complex technical challenges into robust, scalable, and secure digital products.",
  "Eager to contribute technical expertise and a collaborative spirit to a dynamic, forward-thinking engineering team. Seeking roles that push the boundaries of AI and Web development."
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
                alt="Sheraz Hussain, Full-Stack Software Engineer & AI/Cloud Developer"
                fill
                priority
                className="object-cover"
                data-ai-hint="professional man"
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
                'I am a Full-Stack Software Engineer', 3000,
                () => setSummaryIndex(2),
                'I am an AI/Cloud Developer', 3000,
                () => setSummaryIndex(3),
                'I am a Cyber Security Specialist', 3000,
                () => setSummaryIndex(4),
                'I am a Mobile Application Developer', 3000,
                () => setSummaryIndex(5),
                'I am an ECommerce Specialist', 3000,
                () => setSummaryIndex(6),
                'I am Open to New Projects', 3000,
                () => setSummaryIndex(7),
                'I am Open to New Opportunities', 3000,
                ]}
                wrapper="h1"
                speed={50}
                className="text-4xl font-bold tracking-tight text-primary md:text-5xl"
                repeat={Infinity}
            />
          </div>
          <div className="min-h-[100px]">
             <p className="text-lg text-foreground/80 md:text-xl transition-all duration-500 ease-in-out">
                {summaries[summaryIndex]}
            </p>
          </div>
          <div className="flex justify-center gap-6 pt-4 md:justify-start">
            <Link href="mailto:sheraz@synctech.ie" aria-label="Email" className="transition-transform hover:scale-110">
              <Mail className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
            <Link href="https://github.com/SherazHussain546" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-transform hover:scale-110">
              <Github className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
            <Link href="https://linkedin.com/in/sherazhussain546/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-transform hover:scale-110">
              <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
