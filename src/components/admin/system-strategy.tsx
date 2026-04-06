'use client';

import { useRemoteConfig } from '@/firebase';
import { useState, useEffect } from 'react';
import { getAll, fetchAndActivate } from 'firebase/remote-config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { RefreshCcw, ShieldCheck, Zap, Bell, Info, ArrowRight, Sparkles } from 'lucide-react';
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
        const token = await getToken(messaging, { 
          vapidKey: 'BJ-SMlzXMoR4NRm_mUZUpTEr98xFjPAByCYjOeuyT26Twe2X7iebQfy_f9-5U2zTCyBNxrl1Si5_at4yGNgdl1M' 
        });
        console.log('FCM Registration Token:', token);
        toast({ title: 'Device Registered', description: 'This browser is now authorized for Unified Campaign testing.' });
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
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Unified Configuration
            </CardTitle>
            <CardDescription>Live parameters synchronized for A/B Testing and Campaigns.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="text-[10px] uppercase font-bold">Parameter Key</TableHead>
                    <TableHead className="text-[10px] uppercase font-bold">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(configs).length > 0 ? (
                    Object.entries(configs).map(([key, val]) => (
                      <TableRow key={key}>
                        <TableCell className="font-mono text-[11px] font-bold">{key}</TableCell>
                        <TableCell><Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px]">{val}</Badge></TableCell>
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
              Sync Active Strategy
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              Campaign Pipeline
            </CardTitle>
            <CardDescription>Authorized devices for the Unified Campaigns experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                The **Unified Experience** allows you to manage Messaging and Remote Config from one tab. Register this device to receive test notifications.
              </p>
              <Button onClick={requestNotificationPermission} size="sm" className="w-full h-10 font-bold bg-blue-600 hover:bg-blue-700 text-white uppercase tracking-widest text-[10px]">
                Authorize Test Device
              </Button>
            </div>
            <div className="pt-4 border-t border-blue-500/10 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 flex items-center gap-2">
                <Sparkles className="h-3 w-3" />
                Service Worker Active
              </p>
              <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                The platform is equipped with `/firebase-messaging-sw.js` to handle background delivery for global campaigns.
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
            <h3 className="text-xl font-bold font-playfair">Operational Insight</h3>
          </div>
          <p className="text-white/60 text-sm font-light leading-relaxed max-w-2xl">
            To start a new campaign, navigate to **Firebase Console > Engage > Messaging**. From there, you can target specific **User Segments** defined by your A/B test groups (Group A or B) to measure conversion at scale.
          </p>
          <div className="pt-2">
            <a href="https://console.firebase.google.com" target="_blank" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:underline">
              Open Unified Campaign Center
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
