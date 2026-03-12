import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ComplaintsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <Button asChild variant="ghost" size="sm" className="mb-8 -ml-3 gap-2 text-muted-foreground hover:text-primary">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-primary/10 p-3">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl uppercase tracking-widest">
              Resolution <span className="text-foreground">Center</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              As a <span className="font-bold text-foreground">Freelancer working with SYNC TECH Solutions</span>, I take every report seriously. Please use the form below to submit your concerns.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="relative w-full overflow-hidden rounded-[2rem] border shadow-2xl bg-white" style={{ paddingTop: '160%' }}>
               <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSebNYo7J7nus5WiNcfivJFqwxsNvvM_7OD6sE9xQjh0YKLmZA/viewform?embedded=true" 
                className="absolute top-0 left-0 h-full w-full"
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0}>
                Loading…
              </iframe>
            </div>
          </div>
          
          <div className="mx-auto mt-12 max-w-2xl text-center">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.2em]">
              All submissions are encrypted and handled with strict confidentiality.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
