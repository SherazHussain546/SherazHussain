'use client';

import { useRemoteConfig } from '@/firebase';
import { useState, useEffect } from 'react';
import { getAll, fetchAndActivate } from 'firebase/remote-config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { RefreshCcw, ShieldCheck, Zap, Bell, Info, ArrowRight } from 'lucide-react';
import { getToken } from 'firebase/messaging';
import { useFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function SystemStrategy() {
  const remoteConfig = useRemoteConfig();
  const { messaging } = useFirebase();
  const { toast } = useToast();
  const [configs, setConfigs] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const refreshConfig = async () => {
    if (!remoteConfig) return;
    setLoading(true);
    try {
      await fetchAndActivate(remoteConfig);
      const allValues = getAll(remoteConfig);
      const mapped: Record<string, any> = {};
      Object.entries(allValues).forEach(([key, val]) => {
        mapped[key] = val.asString();
      });
      setConfigs(mapped);
      toast({ title: 'Config Synchronized', description: 'Latest cloud parameters are now active.' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Sync Failed', description: 'Ensure Remote Config is initialized in Firebase Console.' });
    } finally {
      setLoading(false);
    }
  };

  const requestNotificationPermission = async () => {
    if (!messaging) {
      toast({ variant: 'destructive', title: 'Messaging Offline', description: 'Browser notifications are not supported in this environment.' });
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // REPLACE 'YOUR_PUBLIC_VAPID_KEY' with the key from Firebase Console > Project Settings > Cloud Messaging
        const token = await getToken(messaging, { vapidKey: 'YOUR_PUBLIC_VAPID_KEY' });
        console.log('FCM Registration Token:', token);
        toast({ title: 'Device Registered', description: 'This browser is now authorized for notification testing.' });
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'Permission Refused', description: 'Check browser privacy settings or VAPID key configuration.' });
    }
  };

  useEffect(() => {
    refreshConfig();
  }, [remoteConfig]);

  return (
    <div className="space-y-8">
      <Alert className="bg-primary/5 border-primary/20">
        <Info className="h-4 w-4 text-primary" />
        <AlertTitle className="font-bold">A/B Testing Protocol</AlertTitle>
        <AlertDescription className="text-xs leading-relaxed">
          To run an experiment, create a parameter in the **Firebase Console** (e.g., <code>hero_narrative_style</code>) and start a new A/B Test campaign. The values will appear here once published.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Active Config Parameters
            </CardTitle>
            <CardDescription>Live variables synchronized from the Global CDN.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="text-[10px] uppercase font-bold">Parameter Key</TableHead>
                    <TableHead className="text-[10px] uppercase font-bold">Active Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(configs).length > 0 ? (
                    Object.entries(configs).map(([key, val]) => (
                      <TableRow key={key}>
                        <TableCell className="font-mono text-[11px] font-bold">{key}</TableCell>
                        <TableCell><Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10 border-none rounded-sm px-1.5 py-0 text-[10px]">{val}</Badge></TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center py-8 text-xs text-muted-foreground italic">No parameters detected. Click sync to retry.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <Button onClick={refreshConfig} disabled={loading} size="sm" variant="outline" className="w-full h-10 font-bold uppercase tracking-widest text-[10px]">
              <RefreshCcw className={`mr-2 h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
              Sync Experiment Parameters
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              Messaging Pipeline
            </CardTitle>
            <CardDescription>Authorized devices for Push Notification experiments.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cloud Messaging allows you to send targeted notifications to re-engage visitors. Use the button below to authorize this device for testing your campaigns.
              </p>
              <Button onClick={requestNotificationPermission} size="sm" className="w-full h-10 font-bold bg-blue-600 hover:bg-blue-700 text-white uppercase tracking-widest text-[10px]">
                Register Device for Testing
              </Button>
            </div>
            <div className="pt-4 border-t border-blue-500/10 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 flex items-center gap-2">
                <Info className="h-3 w-3" />
                VAPID Key Required
              </p>
              <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                Ensure you have generated a Web Push Certificate in Firebase Project Settings and updated the key in <code>system-strategy.tsx</code>.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-[#071739] text-white p-8 rounded-xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-bold font-playfair">Strategic Verification</h3>
          </div>
          <p className="text-white/60 text-sm font-light leading-relaxed max-w-2xl">
            This module provides visibility into your cloud-managed experiments. To view conversion results for these A/B tests, visit your <strong>Analytics Dashboard</strong> in the "Metrics" tab of this portal.
          </p>
          <div className="pt-2">
            <a href="https://console.firebase.google.com" target="_blank" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:underline">
              Open Firebase Console
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
