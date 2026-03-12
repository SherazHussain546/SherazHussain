'use client';

import { useEffect, useState } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';

/**
 * Component that listens for Firestore permission errors and 
 * surfaces them to the Next.js error overlay in development.
 */
export default function FirebaseErrorListener() {
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = errorEmitter.on('permission-error', (e) => {
      setError(e);
    });
    return unsubscribe;
  }, []);

  if (error) {
    // Throwing the error here triggers the developer error overlay
    throw error;
  }

  return null;
}
