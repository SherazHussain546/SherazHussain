'use client';

import { useAnalytics } from '@/hooks/use-analytics';

// This is a client component that exists only to call the hook.
// It renders nothing and is used in the root layout.
export default function AnalyticsTracker() {
  useAnalytics();
  return null;
}
