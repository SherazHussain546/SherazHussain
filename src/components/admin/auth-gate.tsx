'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/firebase';
import LoginForm from './login-form';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return (
      <div className="mx-auto max-w-md space-y-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <>{children}</>;
}
