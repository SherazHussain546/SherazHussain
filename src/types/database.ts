import { Timestamp } from 'firebase/firestore';

/**
 * @fileOverview High-fidelity TypeScript definitions for the Firestore database schema.
 * Aligned with docs/backend.json for technical integrity.
 */

export interface Post {
  id: string;
  platform: 'LinkedIn' | 'Instagram' | 'Facebook' | 'GitHub' | 'Other';
  title: string;
  description: string;
  link: string;
  image?: string;
  imageHint?: string;
  hashtags?: string;
  createdAt: Timestamp;
}

export interface ProjectGoal {
  id: string;
  title: string;
  description: string;
  iconName: 'Cpu' | 'Globe' | 'ShieldCheck' | 'Target' | 'Zap' | 'Heart';
  order: number;
  createdAt: Timestamp;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  mdFileUrl: string;
  imageUrl?: string;
  publishDate: Timestamp;
  tagIds?: string[];
  isPublished: boolean;
}

export interface SiteConfig {
  founderImageUrl: string;
}

export interface AnalyticsEvent {
  id: string;
  type: 'page_view';
  path: string;
  sessionId: string;
  timestamp: Timestamp;
}
