
'use client';

import { useState, useEffect } from 'react';

const AB_TEST_KEY = 'portfolio_ab_group';

/**
 * useABTest - Prototypical experiment engine.
 * Randomly assigns users to a test group and persists it for the session.
 */
export function useABTest() {
  const [group, setGroup] = useState<'A' | 'B'>('A');

  useEffect(() => {
    let storedGroup = sessionStorage.getItem(AB_TEST_KEY) as 'A' | 'B' | null;
    
    if (!storedGroup) {
      storedGroup = Math.random() > 0.5 ? 'B' : 'A';
      sessionStorage.setItem(AB_TEST_KEY, storedGroup);
    }
    
    setGroup(storedGroup);
  }, []);

  return group;
}
