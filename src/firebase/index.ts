
'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (getApps().length > 0) {
    return getSdks(getApp());
  }

  // In a server-side context, `firebaseConfig` might be partially undefined.
  // We guard against this to prevent `initializeApp` from failing during the build.
  if (!firebaseConfig.apiKey) {
    // This will be logged on the server during the build process
    console.warn("Firebase config is missing or incomplete. Firebase will not be initialized on the server.");
    // Return a dummy object or handle this case as needed.
    // For now, we can't return real SDKs, so we'll let it fail later if used.
    // A better approach for server-side logic would be the Admin SDK.
    // This check is mainly to allow the build to pass.
    return { firebaseApp: null, auth: null, firestore: null };
  }

  const firebaseApp = initializeApp(firebaseConfig);
  return getSdks(firebaseApp);
}

export function getSdks(firebaseApp: FirebaseApp) {
  if (!firebaseApp) {
      return { firebaseApp: null, auth: null, firestore: null };
  }
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
