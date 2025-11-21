'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '@/firebase/client';
import { v4 as uuidv4 } from 'uuid';

const SESSION_KEY = 'portfolio_session_id';

export function useAnalytics() {
  const pathname = usePathname();
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    let storedSessionId = sessionStorage.getItem(SESSION_KEY);
    if (!storedSessionId) {
      storedSessionId = uuidv4();
      sessionStorage.setItem(SESSION_KEY, storedSessionId);
    }
    setSessionId(storedSessionId);
  }, []);

  useEffect(() => {
    if (sessionId && pathname && process.env.NODE_ENV === 'production') {
      const logPageView = async () => {
        try {
          await addDoc(collection(firestore, 'analyticsEvents'), {
            type: 'page_view',
            path: pathname,
            sessionId: sessionId,
            timestamp: serverTimestamp(),
          });
        } catch (error) {
          console.error('Error logging page view:', error);
        }
      };

      // Don't track admin pages
      if (!pathname.startsWith('/admin')) {
        logPageView();
      }
    }
  }, [pathname, sessionId]);
}
