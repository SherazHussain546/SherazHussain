'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

export default function AboutSection() {
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
            Professional Profile &nbsp;·&nbsp; Technology & Engineering
          </p>
          <h1 className="font-playfair text-[clamp(2.5rem,8vw,5rem)] font-black leading-[1.05] tracking-tight mb-6">
            From Dublin to the <br />
            <em className="italic text-primary font-normal">Frontier</em> of AI Engineering
          </h1>
          <p className="font-playfair italic text-lg md:text-2xl text-background/70 max-w-2xl mx-auto leading-relaxed mb-10">
            How one First-Class Honours graduate is redefining what a software engineer can build — one AI-powered platform at a time.
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap font-space-mono text-[10px] tracking-widest uppercase text-background/55">
            <span>By Sheraz Hussain</span>
            <span className="text-primary">·</span>
            <span>Dublin, Ireland</span>
            <span className="text-primary">·</span>
            <span>March 2026 Edition</span>
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
          <p className="location-tag">Dublin, Ireland</p>

          <div className="grid md:grid-cols-[1fr_300px] gap-12 items-start">
            <div className="drop-cap font-sans font-light text-lg md:text-xl leading-relaxed text-foreground/90 space-y-6">
              <p>
                I never set out to be a builder of financial intelligence systems or AI recruitment platforms. I simply followed a question that refused to leave me alone: <em>what if software could think alongside us, not just execute for us?</em> That question led me from the lecture halls of Dublin Business School to the bleeding edge of generative AI, cloud architecture, and full-stack product engineering — and it continues to drive every line of code I write today.
              </p>
              <p>
                My name is Sheraz Hussain. I am an elite Software Architect and AI Solutions Engineer based in Dublin, Ireland — a graduate with First-Class Honours who turned technical curiosity into deployable, production-grade realities. My mission is to engineer intelligent, cloud-native systems that solve real problems for real people.
              </p>
              <p>
                This is not a CV. It is a story about curiosity, craft, and the relentless drive to turn abstract ideas into scalable systems. It is about what I have built, why I built it, and where I am taking it next.
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="relative aspect-[3/4] w-full border-4 border-double border-foreground p-1 bg-background shadow-2xl overflow-hidden group">
                <Image 
                  src={placeholderImages.about.src} 
                  alt={placeholderImages.about.alt} 
                  fill 
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100" 
                  data-ai-hint={placeholderImages.about.hint}
                  priority
                />
              </div>
              <div className="text-center space-y-1">
                <p className="font-space-mono text-[10px] uppercase tracking-[0.2em] font-bold text-primary">Sheraz Hussain</p>
                <p className="font-space-mono text-[8px] uppercase tracking-widest text-muted-foreground">Principal AI Architect · SYNC TECH</p>
              </div>
            </motion.div>
          </div>
        </section>
        
        <hr className="thick-rule" />
      </div>
    </section>
  );
}
