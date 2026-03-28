'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { AlertCircle, ShieldAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!auth) {
      setError("Firebase Authentication is not configured. Please check your environment variables.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Access Granted',
        description: "Welcome back, Sheraz.",
      });
      router.push('/admin');
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: err.message || 'An error occurred during login.',
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm border-primary/20 shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
            <ShieldAlert className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Admin Portal</CardTitle>
          <CardDescription>Secure entry for Sheraz Hussain.</CardDescription>
        </CardHeader>
        <CardContent>
          {!auth ? (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>System Alert</AlertTitle>
              <AlertDescription>
                Firebase variables are missing. Deployment of the authentication module is incomplete.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Identity (Email)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@synctech.ie"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-muted/5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Security Key (Password)</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-muted/5"
                />
              </div>
              {error && <p className="text-xs text-destructive font-medium">{error}</p>}
              <Button type="submit" className="w-full h-11 font-bold">
                Authorize Access
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
