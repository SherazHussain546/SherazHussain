'use client';

import { useState, useEffect } from 'react';
import { getValue, fetchAndActivate } from 'firebase/remote-config';
import { useRemoteConfig } from '@/firebase';

/**
 * useRemoteConfigValue - High-Fidelity Hook for Experimentation.
 * Retrieves a specific Remote Config parameter value for A/B Testing.
 */
export function useRemoteConfigValue(key: string, defaultValue: string | boolean | number) {
  const remoteConfig = useRemoteConfig();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (!remoteConfig) return;

    const fetchConfig = async () => {
      try {
        await fetchAndActivate(remoteConfig);
        const configValue = getValue(remoteConfig, key);
        
        if (typeof defaultValue === 'boolean') {
          setValue(configValue.asBoolean() as any);
        } else if (typeof defaultValue === 'number') {
          setValue(configValue.asNumber() as any);
        } else {
          setValue(configValue.asString() as any);
        }
      } catch (error) {
        console.warn(`Remote Config: Failed to fetch key [${key}]. Falling back to default.`);
      }
    };

    fetchConfig();
  }, [remoteConfig, key, defaultValue]);

  return value;
}
