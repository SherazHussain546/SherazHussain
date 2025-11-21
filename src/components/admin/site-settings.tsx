'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/client';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const settingsSchema = z.object({
  founderImageUrl: z.string().url('Please enter a valid URL.'),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SiteSettings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const settingsRef = doc(firestore, 'siteConfig', 'main');
  const [settings, settingsLoading, settingsError] = useDocumentData(settingsRef);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    values: {
      founderImageUrl: settings?.founderImageUrl || '',
    },
    defaultValues: {
      founderImageUrl: 'https://synctech.ie/_next/image?url=%2Ffounder.jpg&w=640&q=75',
    }
  });

  const onSubmit: SubmitHandler<SettingsFormValues> = async (data) => {
    setLoading(true);
    try {
      await setDoc(settingsRef, data, { merge: true });
      toast({
        title: 'Settings Updated!',
        description: 'Your site settings have been saved.',
      });
    } catch (error) {
      console.error('Error updating document: ', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Could not save the settings. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (settingsLoading) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className='h-8 w-1/2' />
                <Skeleton className='h-4 w-3/4' />
            </CardHeader>
            <CardContent>
                <div className='space-y-4'>
                    <Skeleton className='h-6 w-1/4' />
                    <Skeleton className='h-10 w-full' />
                    <Skeleton className='h-10 w-24' />
                </div>
            </CardContent>
        </Card>
    )
  }
   if (settingsError) {
    return <p className="text-destructive">Error loading settings: {settingsError.message}</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Settings</CardTitle>
        <CardDescription>Manage global settings for your portfolio website.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="founderImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Founder Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/founder.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Settings'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
