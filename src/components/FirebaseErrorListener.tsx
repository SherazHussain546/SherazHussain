'use client';

import { useState, useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useAuth } from '@/hooks/use-auth';

/**
 * FirebaseErrorListener - Strategic Authorization Monitor.
 * Listens for globally emitted 'permission-error' events and evaluates if they
 * represent a terminal state or a transient auth shift.
 */
export function FirebaseErrorListener() {
  const { user, loading } = useAuth();
  const [error, setError] = useState<FirestorePermissionError | null>(null);

  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      // High-Fidelity Guard: Don't throw if auth is still resolving or if the user
      // has recently logged in (give the rules time to sync with the token).
      if (!loading) {
        setError(error);
      }
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, [loading]);

  // On re-render, if a critical error exists and the user identity is stable, throw.
  if (error && !loading) {
    throw error;
  }

  return null;
}