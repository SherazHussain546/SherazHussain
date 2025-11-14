import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function FormSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center">
      <div className="space-y-6">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="text-4xl font-bold">Thank You!</h1>
        <p className="text-muted-foreground md:text-lg">
          Your message has been sent successfully. I'll get back to you as soon as possible.
        </p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
