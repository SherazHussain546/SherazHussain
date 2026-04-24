'use client';

import { useState, useEffect } from 'react';

const AB_TEST_KEY = 'portfolio_ab_group_v3';

/**
 * useABTest - High-Fidelity Experiment Engine.
 * Randomly assigns users to a test group and persists it in localStorage 
 * to ensure a consistent experience across sessions and accurate conversion tracking.
 */
export function useABTest() {
  const [group, setGroup] = useState<'A' | 'B'>('A');

  useEffect(() => {
    // High-Fidelity Guard: Defer to client-side hydration to avoid SSR mismatches
    let storedGroup = localStorage.getItem(AB_TEST_KEY) as 'A' | 'B' | null;
    
    if (!storedGroup) {
      // 50/50 split assignment: Group A (Frontier) vs Group B (Supremacy)
      storedGroup = Math.random() > 0.5 ? 'B' : 'A';
      localStorage.setItem(AB_TEST_KEY, storedGroup);
    }
    
    setGroup(storedGroup);
  }, []);

  return group;
}
