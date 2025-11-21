'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { firestore } from '@/firebase/client';
import { Skeleton } from '../ui/skeleton';


export default function AboutSection() {
    const settingsRef = doc(firestore, 'siteConfig', 'main');
    const [settings, loading, error] = useDocumentData(settingsRef);

    const founderImageUrl = settings?.founderImageUrl || "https://synctech.ie/_next/image?url=%2Ffounder.jpg&w=640&q=75";

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 md:grid-cols-3 md:px-6">
        <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full shadow-lg md:h-64 md:w-64">
           {loading ? (
             <Skeleton className="h-full w-full rounded-full" />
           ) : (
            <Image
                src={founderImageUrl}
                alt="Sheraz Hussain, Full-Stack Software Engineer & AI/Cloud Developer"
                fill
                className="object-cover"
                data-ai-hint="portrait man"
            />
           )}
        </div>
        <div className="space-y-4 text-center md:col-span-2 md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
            Full-Stack Software Engineer & AI/Cloud Developer
          </h1>
          <p className="text-lg text-foreground/80 md:text-xl">
            Highly motivated First-Class Honors graduate with a robust skill set in Software Engineering, AI/ML, and Cloud Computing. Proven ability to design, develop, and deploy innovative solutions using a full-stack approach (Angular, React, Node.js). Expertise in DevSecOps practices, AWS, and Kubernetes, ensuring scalable and secure systems. Eager to contribute technical expertise and a collaborative spirit to a dynamic team.
          </p>
          <div className="flex justify-center gap-6 pt-4 md:justify-start">
            <Link href="mailto:sherazhussainofficial1@gmail.com" aria-label="Email">
              <Mail className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
            <Link href="https://github.com/SherazHussain546" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
            <Link href="https://linkedin.com/in/sherazhussain546/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
