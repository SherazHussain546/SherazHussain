import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// IMPORTANT: Replace this with your own Firebase project configuration
const firebaseConfig = {
  "projectId": "sherazhussain546-201av",
  "appId": "1:92258735049:web:c8a6882bb413ff3d9b0e18",
  "storageBucket": "sherazhussain546-201av.firebasestorage.app",
  "apiKey": "AIzaSyAtxHKq0WrGZHthYdKIAxnkChJnQhWzxv4",
  "authDomain": "sherazhussain546-201av.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "92258735049"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
