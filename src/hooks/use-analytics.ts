
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '@/firebase/client';
import { v4 as uuidv4 } from 'uuid';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useABTest } from './use-ab-test';

const SESSION_KEY = 'portfolio_session_id';

export function useAnalytics() {
  const pathname = usePathname();
  const [sessionId, setSessionId] = useState('');
  const testGroup = useABTest();

  useEffect(() => {
    let storedSessionId = sessionStorage.getItem(SESSION_KEY);
    if (!storedSessionId) {
      storedSessionId = uuidv4();
      sessionStorage.setItem(SESSION_KEY, storedSessionId);
    }
    setSessionId(storedSessionId);
  }, []);

  useEffect(() => {
    if (sessionId && pathname && process.env.NODE_ENV === 'production' && firestore) {
      const logPageView = async () => {
        const eventsRef = collection(firestore, 'analyticsEvents');
        const data = {
          type: 'page_view',
          path: pathname,
          sessionId: sessionId,
          testGroup: testGroup,
          timestamp: serverTimestamp(),
        };

        // Mutation initiated without blocking await
        addDoc(eventsRef, data).catch(async (serverError) => {
          const permissionError = new FirestorePermissionError({
            path: eventsRef.path,
            operation: 'create',
            requestResourceData: data,
          });
          errorEmitter.emit('permission-error', permissionError);
        });
      };

      // Don't track admin pages
      if (!pathname.startsWith('/admin')) {
        logPageView();
      }
    }
  }, [pathname, sessionId, testGroup]);
}
