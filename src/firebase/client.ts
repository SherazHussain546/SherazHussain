import { initializeFirebase } from '@/firebase/index';

/**
 * @fileOverview Consolidated Firebase Client SDK instances.
 * Provides a unified connection point for legacy components and hooks.
 */

const services = initializeFirebase();

export const app = services.firebaseApp;
export const auth = services.auth;
export const firestore = services.firestore;
export const storage = services.storage;
