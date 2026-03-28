import { initializeApp, getApps, getApp, FirebaseOptions, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let firestore: Firestore | undefined;

// Helper to detect if the config is actually populated with valid-looking strings
const isConfigValid = (config: FirebaseOptions) => {
  return config.apiKey && 
         config.apiKey !== 'YOUR_FIREBASE_API_KEY' && 
         !config.apiKey.startsWith('YOUR_');
};

try {
  if (typeof window !== 'undefined' && isConfigValid(firebaseConfig)) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    firestore = getFirestore(app);
  }
} catch (error) {
  console.error("Firebase initialization failed during module load:", error);
}

export { app, auth, firestore };
