
import { Timestamp } from 'firebase/firestore';

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
  category: 'Project' | 'Study' | 'Course' | 'CaseStudy';
  shortDescription: string;
  mdFileUrl: string;
  imageUrl?: string;
  publishDate: Timestamp;
  tagIds?: string[];
  isPublished: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  points: string[];
  createdAt: Timestamp;
}

export interface Education {
  id: string;
  degree: string;
  university: string;
  graduationDate: string;
  awards: string[];
  createdAt: Timestamp;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
  points: string[];
  iconName: string;
  createdAt: Timestamp;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  challenges: string[];
  solutions: { title: string; description: string }[];
  results: string[];
  stack: string[];
  link: string;
  liveLink?: string;
  image: string;
  imageHint: string;
  createdAt: Timestamp;
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
