'use client';

import Link from 'next/link';

export default function ContactSection() {
  return (
    <section id="contact" className="bg-background py-12 md:py-20">
      <div className="max-w-[860px] mx-auto px-6">
        <p className="section-label">Let's Build Together</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Connect, Collaborate, Create</h2>
        
        <p className="text-lg font-light text-foreground/80 mb-12">
          I am based in <strong>Dublin, Ireland</strong>, and available for technical consulting, enterprise AI architecture engagements, and collaborative product development projects both locally and internationally.
        </p>

        <div className="flex flex-wrap gap-3">
          <a href="https://github.com/SherazHussain546" className="font-space-mono text-[10px] uppercase tracking-widest px-6 py-3 bg-primary text-white hover:bg-primary/90 transition-all" target="_blank">
            GitHub
          </a>
          <a href="https://linkedin.com/in/sherazhussain546" className="font-space-mono text-[10px] uppercase tracking-widest px-6 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all" target="_blank">
            LinkedIn
          </a>
          <a href="https://www.synctech.ie" className="font-space-mono text-[10px] uppercase tracking-widest px-6 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all" target="_blank">
            SYNC TECH
          </a>
          <a href="mailto:sheraz@synctech.ie" className="font-space-mono text-[10px] uppercase tracking-widest px-6 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all" target="_blank">
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
