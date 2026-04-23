import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getRemoteConfig, RemoteConfig } from 'firebase/remote-config';
import { getMessaging, Messaging, isSupported } from 'firebase/messaging';

/**
 * initializeFirebase - High-Fidelity Multi-Environment Initializer.
 * Optimized for Remote Config and Messaging A/B Testing.
 * Server-safe for static generation (sitemap).
 */
export function initializeFirebase() {
  if (!getApps().length) {
    let firebaseApp: FirebaseApp;
    try {
      firebaseApp = initializeApp();
    } catch (e) {
      firebaseApp = initializeApp(firebaseConfig);
    }

    return getSdks(firebaseApp);
  }

  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  
  // High-Fidelity Guard: These services are client-side only and require window
  let remoteConfig: RemoteConfig | null = null;
  let messaging: Messaging | null = null;

  if (typeof window !== 'undefined') {
    try {
      remoteConfig = getRemoteConfig(firebaseApp);
      // Set minimal settings for high-performance updates
      remoteConfig.settings.minimumFetchIntervalMillis = 3600000; // 1 hour
      remoteConfig.defaultConfig = {
        hero_narrative_style: 'supremacy',
        cta_button_color: 'primary',
        show_support_popup: true,
      };

      // Messaging is async supported check
      isSupported().then(supported => {
        if (supported) messaging = getMessaging(firebaseApp);
      }).catch(() => {
        console.warn('Firebase Messaging: Support check failed.');
      });
    } catch (e) {
      console.warn('Firebase Strategy Services: Initialization deferred.');
    }
  }

  return {
    firebaseApp,
    auth,
    firestore,
    storage,
    remoteConfig,
    messaging
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
