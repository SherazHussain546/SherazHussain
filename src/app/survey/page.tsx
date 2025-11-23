
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default function SurveyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
              Feedback Survey
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Thank you for taking the time to share your thoughts. Your feedback is incredibly valuable and helps me improve.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="relative w-full overflow-hidden rounded-lg border shadow-lg" style={{ paddingTop: '150%' /* Adjust this percentage based on form height */ }}>
               <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLScOgMUtnprYPjDdjG4jumiPdiAa49TIzgJDTy4chhsuhlNcWw/viewform?embedded=true" 
                className="absolute top-0 left-0 h-full w-full"
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0}>
                Loading…
              </iframe>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
