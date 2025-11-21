'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { firebaseApp } from '@/firebase/client';
import { useRouter } from 'next/navigation';

const auth = getAuth(firebaseApp);

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
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
      const { user, loading } = useAuth();
      const router = useRouter();
  
      useEffect(() => {
        if (!loading && !user) {
          router.push('/admin/login');
        }
      }, [user, loading, router]);
  
      if (loading || !user) {
         return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
      }
  
      return <Component {...props} />;
    };
  };
