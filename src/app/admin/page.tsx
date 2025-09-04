import AuthGate from '@/components/admin/auth-gate';
import Dashboard from '@/components/admin/dashboard';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="font-bold text-lg text-primary">
            Sheraz's Admin Portal
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 md:px-6">
        <AuthGate>
          <Dashboard />
        </AuthGate>
      </main>
    </div>
  );
}
