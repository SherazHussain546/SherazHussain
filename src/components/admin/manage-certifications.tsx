
'use client';

import { useState, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addDoc, collection, serverTimestamp, deleteDoc, doc, query, orderBy, updateDoc, CollectionReference, DocumentData } from 'firebase/firestore';
import { firestore } from '@/firebase/client';
import { useCollection } from 'react-firebase-hooks/firestore';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Award, Plus, Trash2, Pencil, ExternalLink } from 'lucide-react';
import { Certification } from '@/types/database';

const certSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  issuer: z.string().min(1, 'Issuer is required.'),
  date: z.string().min(1, 'Date is required.'),
  credentialUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  skills: z.string().optional(),
  points: z.string().optional(),
  iconName: z.string().default('Award'),
});

type CertFormValues = z.infer<typeof certSchema>;

export default function ManageCertifications() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);

  const certsCollection = useMemo(() => {
    return firestore ? collection(firestore, 'certifications') as CollectionReference<DocumentData> : null;
  }, []);

  const certsQuery = useMemo(() => {
    return certsCollection ? query(certsCollection, orderBy('createdAt', 'desc')) : null;
  }, [certsCollection]);

  const [snapshot] = useCollection(certsQuery);

  const form = useForm<CertFormValues>({
    resolver: zodResolver(certSchema),
    defaultValues: { title: '', issuer: '', date: '', credentialUrl: '', skills: '', points: '', iconName: 'Award' },
  });

  const onSubmit: SubmitHandler<CertFormValues> = async (data) => {
    if (!certsCollection) return;
    setLoading(true);
    try {
      await addDoc(certsCollection, {
        ...data,
        skills: data.skills ? data.skills.split(',').map(s => s.trim()) : [],
        points: data.points ? data.points.split('\n').map(p => p.trim()) : [],
        createdAt: serverTimestamp(),
      });
      toast({ title: 'Certification Recorded!' });
      form.reset();
    } catch (e) {
      toast({ variant: 'destructive', title: 'Sync Error' });
    } finally {
      setLoading(false);
    }
  };

  const deleteCert = async (id: string) => {
    if (!firestore) return;
    await deleteDoc(doc(firestore, 'certifications', id));
    toast({ title: 'Credential Expunged' });
  };

  const certs = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Certification)) || [];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-primary" />Register Credential</CardTitle>
          <CardDescription>Archive professional certifications and technical simulations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Programme Title</FormLabel><FormControl><Input placeholder="Cybersecurity Virtual Experience" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="issuer" render={({ field }) => (
                  <FormItem><FormLabel>Issuing Body</FormLabel><FormControl><Input placeholder="Mastercard / Forage" {...field} /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="date" render={({ field }) => (
                  <FormItem><FormLabel>Completion Date</FormLabel><FormControl><Input placeholder="March 2026" {...field} /></FormControl></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="credentialUrl" render={({ field }) => (
                <FormItem><FormLabel>Verification Link</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="skills" render={({ field }) => (
                <FormItem><FormLabel>Competencies (Comma separated)</FormLabel><FormControl><Input placeholder="Cybersecurity, Data Analysis, SQL" {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="points" render={({ field }) => (
                <FormItem><FormLabel>Key Learnings (One per line)</FormLabel><FormControl><Textarea className="h-24" placeholder="Analyzed network logs...\nSimulated breach response..." {...field} /></FormControl></FormItem>
              )} />
              <Button type="submit" disabled={loading} className="w-full">Authorize Integration</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Credential Index</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certs.map(cert => (
              <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/5 group">
                <div className="space-y-1">
                  <p className="font-bold text-sm">{cert.title}</p>
                  <p className="text-[10px] uppercase tracking-widest text-primary">{cert.issuer} · {cert.date}</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 text-destructive"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>Expunge Credential?</AlertDialogTitle>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteCert(cert.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
