'use client';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { useABTest } from '@/hooks/use-ab-test';
import { doc, DocumentReference, DocumentData } from 'firebase/firestore';
import { useFirestore, useDoc } from '@/firebase';
import { SiteConfig } from '@/types/database';

/**
 * AboutSection - Strategic Identity Component.
 * Optimized for SEO Dominance and Professional Authority.
 * Implements A/B Testing for high-fidelity narrative experimentation.
 */
export default function AboutSection() {
  const testGroup = useABTest();
  const firestore = useFirestore();

  const settingsRef = useMemo(() => {
    return firestore ? doc(firestore, 'siteConfig', 'main') as DocumentReference<DocumentData> : null;
  }, [firestore]);

  const { data: settings } = useDoc<SiteConfig>(settingsRef);

  const profileImage = settings?.founderImageUrl || placeholderImages.about.src;

  return (
    <section id="about" className="overflow-hidden">
      {/* ──────────────── MASTHEAD ──────────────── */}
      <header className="bg-foreground text-background py-16 md:py-24 px-6 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-4xl relative z-10"
        >
          <p className="font-space-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-6">
            Principal Portfolio &nbsp;·&nbsp; {testGroup === 'B' ? 'Strategic Supremacy' : 'Technical Frontier'}
          </p>
          
          <h1 className="font-playfair text-[clamp(2.5rem,6vw,4rem)] font-black leading-[1.05] tracking-tight mb-6">
            {testGroup === 'B' ? (
              <>
                Engineer Your <span className="italic text-primary font-normal">Dominance</span> <br />
                <em className="italic text-primary font-normal">Through AI & Cloud</em>
              </>
            ) : (
              <>
                Building the <span className="italic text-primary font-normal">Frontier</span> <br />
                <em className="italic text-primary font-normal">of Intelligent Systems</em>
              </>
            )}
          </h1>

          <p className="font-playfair italic text-lg md:text-2xl text-background/70 max-w-2xl mx-auto leading-relaxed mb-10 text-balance">
            Sheraz Hussain is a First-Class Honours Software Engineer and <strong>AI Architect in Dublin</strong>, Ireland, specializing in Next.js 15, Generative AI, and high-fidelity cloud architectures.
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap font-space-mono text-[10px] tracking-widest uppercase text-background/55">
            <span>By Sheraz Hussain</span>
            <span className="text-primary">·</span>
            <span>Software Architect Dublin</span>
            <span className="text-primary">·</span>
            <span>Next.js Consulting</span>
          </div>
        </motion.div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} 
        />
      </header>

      {/* ──────────────── OPENING NARRATIVE ──────────────── */}
      <div className="max-w-[860px] mx-auto px-6 py-12 md:py-20">
        <section className="opening">
          <p className="location-tag">Dublin, Ireland (Global Delivery)</p>

          <div className="grid md:grid-cols-[1fr_300px] gap-12 items-start">
            <div className="drop-cap font-sans font-light text-lg md:text-xl leading-relaxed text-foreground/90 space-y-6">
              <p>
                As an <strong>AI Solutions Engineer</strong> and full-stack specialist, I bridge the gap between technical complexity and business growth. I don't just build websites; I architect intelligent, cloud-native ecosystems that utilize <strong>Next.js 15</strong>, <strong>Google Genkit</strong>, and <strong>AWS/GCP</strong> to dismantle bottlenecks and drive quantifiable results.
              </p>
              <p>
                Based in Dublin, Ireland, my mission is to deliver high-fidelity engineering that prioritizes technical integrity, zero-latency user experiences, and <strong>Technical SEO dominance</strong>. Whether it's scaling AI financial engines or optimizing enterprise recruitment platforms, I focus on building software that thinks alongside the user.
              </p>
              <p>
                My name is Sheraz Hussain. This registry is a narrative of elite software engineering, high-performance product strategy, and the pursuit of digital supremacy.
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="relative aspect-[3/4] w-full border-4 border-double border-foreground p-1 bg-background shadow-2xl overflow-hidden group cursor-crosshair">
                <Image 
                  src={profileImage} 
                  alt="Sheraz Hussain - AI Architect and Software Engineer Dublin" 
                  fill 
                  className="object-cover grayscale transition-all duration-700 ease-in-out group-hover:opacity-0" 
                  data-ai-hint="AI architect portrait"
                  priority
                />
                <Image 
                  src={placeholderImages.about.hoverSrc || '/sherazcyborg.png'} 
                  alt="Sheraz Hussain - Principal Engineer at SYNC TECH" 
                  fill 
                  className="object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 scale-110 group-hover:scale-100" 
                />
              </div>
              <div className="text-center space-y-1">
                <p className="font-space-mono text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Sheraz Hussain</p>
                <p className="font-space-mono text-[8px] uppercase tracking-widest text-muted-foreground">Principal Software Architect · SYNC TECH</p>
              </div>
            </motion.div>
          </div>
        </section>
        
        <hr className="thick-rule" />
      </div>
    </section>
  );
}
