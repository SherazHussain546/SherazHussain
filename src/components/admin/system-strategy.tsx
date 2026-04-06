'use client';

import { useRemoteConfig } from '@/firebase';
import { useState, useEffect } from 'react';
import { getAll, fetchAndActivate } from 'firebase/remote-config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { RefreshCcw, ShieldCheck, Zap, Bell } from 'lucide-react';
import { getToken } from 'firebase/messaging';
import { useFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

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
    } finally {
      setLoading(false);
    }
  };

  const requestNotificationPermission = async () => {
    if (!messaging) {
      toast({ variant: 'destructive', title: 'Messaging Offline', description: 'The messaging service is not supported on this device or configuration.' });
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getToken(messaging, { vapidKey: 'YOUR_PUBLIC_VAPID_KEY' });
        console.log('FCM Token:', token);
        toast({ title: 'Notifications Enabled', description: 'This device is now registered for mission updates.' });
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'Permission Denied', description: 'Could not initialize messaging pipeline.' });
    }
  };

  useEffect(() => {
    refreshConfig();
  }, [remoteConfig]);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Remote Config A/B Testing
            </CardTitle>
            <CardDescription>Active experiment parameters synchronized from the cloud.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px] uppercase">Parameter</TableHead>
                  <TableHead className="text-[10px] uppercase">Active Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(configs).map(([key, val]) => (
                  <TableRow key={key}>
                    <TableCell className="font-mono text-xs font-bold">{key}</TableCell>
                    <TableCell><Badge variant="outline" className="bg-white">{val}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button onClick={refreshConfig} disabled={loading} size="sm" variant="outline" className="w-full">
              <RefreshCcw className={`mr-2 h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
              Sync Experiment Data
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              Messaging Pipeline
            </CardTitle>
            <CardDescription>Manage Cloud Messaging and Notification variants.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                A/B Testing for Notifications allows you to test different subject lines and send times to maximize visitor return rates.
              </p>
              <Button onClick={requestNotificationPermission} size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                Register Device for Testing
              </Button>
            </div>
            <div className="pt-4 border-t border-blue-500/10">
              <p className="text-xs text-muted-foreground italic">
                Cloud Messaging integration is focused on browser notifications. Configure campaigns in the Firebase Console to target segmented users.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-foreground text-background p-8 rounded-xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-bold font-playfair">Experimentation Protocol</h3>
          </div>
          <p className="text-white/60 text-sm font-light leading-relaxed max-w-2xl">
            To utilize these services, you must create an **A/B Test** in the Firebase Console. 
            For Remote Config, define your parameters; for Messaging, craft your notification variants. 
            The system will automatically segment your visitors and log conversion events back to your Analytics Dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
