'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isConfigured: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isConfigured = !!auth;

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isConfigured }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const withPublic = (Component: React.ComponentType) => {
    return function WithPublic(props: any) {
      return <Component {...props} />;
    };
  };

export const withProtected = (Component: React.ComponentType) => {
    return function WithProtected(props: any) {
      const { user, loading, isConfigured } = useAuth();
      const router = useRouter();
  
      useEffect(() => {
        if (!loading && (!user || !isConfigured)) {
          router.push('/admin/login');
        }
      }, [user, loading, router, isConfigured]);
  
      if (loading || !user || !isConfigured) {
         return (
            <div className="flex min-h-screen items-center justify-center bg-background p-6 text-center">
                <div className="space-y-4">
                  <p className="text-lg font-medium">Authenticating Command Center...</p>
                  {!isConfigured && !loading && (
                    <p className="text-sm text-destructive font-mono uppercase tracking-widest">
                      Error: Firebase Security Module Not Configured
                    </p>
                  )}
                </div>
            </div>
        );
      }
  
      return <Component {...props} />;
    };
  };
