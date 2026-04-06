
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
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Award, Trash2, Pencil, Eye, EyeOff } from 'lucide-react';
import { Certification } from '@/types/database';

const certSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  issuer: z.string().min(1, 'Issuer is required.'),
  date: z.string().min(1, 'Date is required.'),
  credentialUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  skills: z.string().optional(),
  points: z.string().optional(),
  iconName: z.string().default('Award'),
  isPublished: z.boolean().default(true),
});

type CertFormValues = z.infer<typeof certSchema>;

export default function ManageCertifications() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);

  const certsCollection = useMemo(() => {
    return firestore ? collection(firestore, 'certifications') as CollectionReference<DocumentData> : null;
  }, []);

  const certsQuery = useMemo(() => {
    return certsCollection ? query(certsCollection, orderBy('createdAt', 'desc')) : null;
  }, [certsCollection]);

  const [snapshot, certsLoading] = useCollection(certsQuery);

  const form = useForm<CertFormValues>({
    resolver: zodResolver(certSchema),
    defaultValues: { title: '', issuer: '', date: '', credentialUrl: '', skills: '', points: '', iconName: 'Award', isPublished: true },
  });

  const editForm = useForm<CertFormValues>({
    resolver: zodResolver(certSchema),
    defaultValues: { title: '', issuer: '', date: '', credentialUrl: '', skills: '', points: '', iconName: 'Award', isPublished: true },
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

  const onEditSubmit: SubmitHandler<CertFormValues> = async (data) => {
    if (!editingCert || !firestore) return;
    setLoading(true);
    const certRef = doc(firestore, 'certifications', editingCert.id);
    try {
      await updateDoc(certRef, {
        ...data,
        skills: data.skills ? data.skills.split(',').map(s => s.trim()) : [],
        points: data.points ? data.points.split('\n').map(p => p.trim()) : [],
      });
      toast({ title: 'Credential Updated!' });
      setIsEditDialogOpen(false);
      setEditingCert(null);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error updating' });
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (cert: Certification) => {
    if (!firestore) return;
    const certRef = doc(firestore, 'certifications', cert.id);
    try {
      await updateDoc(certRef, { isPublished: !cert.isPublished });
      toast({ title: cert.isPublished ? 'Credential Unpublished' : 'Credential Published' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error updating visibility' });
    }
  };

  const deleteCert = async (id: string) => {
    if (!firestore) return;
    await deleteDoc(doc(firestore, 'certifications', id));
    toast({ title: 'Credential Expunged' });
  };

  const openEditDialog = (cert: Certification) => {
    setEditingCert(cert);
    editForm.reset({
      ...cert,
      skills: cert.skills?.join(', ') || '',
      points: cert.points?.join('\n') || '',
    });
    setIsEditDialogOpen(true);
  };

  const certs = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Certification)) || [];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-primary" />Register Credential</CardTitle>
          <CardDescription>Archive professional certifications and technical simulations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Programme Title</FormLabel><FormControl><Input placeholder="Cybersecurity Virtual Experience" {...field} className="bg-muted/5" /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="issuer" render={({ field }) => (
                  <FormItem><FormLabel>Issuing Body</FormLabel><FormControl><Input placeholder="Mastercard / Forage" {...field} className="bg-muted/5" /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="date" render={({ field }) => (
                  <FormItem><FormLabel>Completion Date</FormLabel><FormControl><Input placeholder="March 2026" {...field} className="bg-muted/5" /></FormControl></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="credentialUrl" render={({ field }) => (
                <FormItem><FormLabel>Verification Link</FormLabel><FormControl><Input placeholder="https://..." {...field} className="bg-muted/5" /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="skills" render={({ field }) => (
                <FormItem><FormLabel>Competencies (Comma separated)</FormLabel><FormControl><Input placeholder="Cybersecurity, Data Analysis, SQL" {...field} className="bg-muted/5" /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="points" render={({ field }) => (
                <FormItem><FormLabel>Key Learnings (One per line)</FormLabel><FormControl><Textarea className="h-24 bg-muted/5" placeholder="Analyzed network logs...\nSimulated breach response..." {...field} /></FormControl></FormItem>
              )} />
              <Button type="submit" disabled={loading} className="w-full font-bold">Authorize Integration</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="border-border/40 shadow-sm">
        <CardHeader><CardTitle>Credential Index</CardTitle></CardHeader>
        <CardContent>
          {certsLoading && <p className="text-sm text-muted-foreground animate-pulse font-mono uppercase tracking-widest">Scanning Registry...</p>}
          <div className="space-y-4">
            {certs.map(cert => (
              <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/5 group transition-colors">
                <div className="space-y-1">
                  <p className="font-bold text-sm">{cert.title}</p>
                  <div className="flex items-center gap-3">
                    <p className="text-[10px] uppercase tracking-widest text-primary">{cert.issuer} · {cert.date}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleVisibility(cert)}
                      className={cert.isPublished ? "text-emerald-600 h-auto p-0" : "text-amber-600 h-auto p-0"}
                    >
                      <span className="text-[8px] uppercase font-bold">{cert.isPublished ? '(Live)' : '(Draft)'}</span>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(cert)} className="h-8 w-8 hover:text-primary"><Pencil className="h-4 w-4" /></Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Expunge Credential?</AlertDialogTitle>
                        <AlertDialogDescription>This will remove this certification entry permanently from the knowledge base.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteCert(cert.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-white border-primary/20 shadow-2xl">
          <DialogHeader><DialogTitle className="text-2xl font-bold font-playfair">Edit Certification</DialogTitle></DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4 py-4">
              <FormField control={editForm.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Programme Title</FormLabel><FormControl><Input {...field} className="bg-muted/5" /></FormControl></FormItem>
              )} />
              <div className="grid grid-cols-2 gap-4">
                <FormField control={editForm.control} name="issuer" render={({ field }) => (
                  <FormItem><FormLabel>Issuer</FormLabel><FormControl><Input {...field} className="bg-muted/5" /></FormControl></FormItem>
                )} />
                <FormField control={editForm.control} name="date" render={({ field }) => (
                  <FormItem><FormLabel>Date</FormLabel><FormControl><Input {...field} className="bg-muted/5" /></FormControl></FormItem>
                )} />
              </div>
              <FormField control={editForm.control} name="skills" render={({ field }) => (
                <FormItem><FormLabel>Skills (CSV)</FormLabel><FormControl><Input {...field} className="bg-muted/5" /></FormControl></FormItem>
              )} />
              <FormField control={editForm.control} name="points" render={({ field }) => (
                <FormItem><FormLabel>Learnings</FormLabel><FormControl><Textarea className="h-32 bg-muted/5" {...field} /></FormControl></FormItem>
              )} />
              <FormField control={editForm.control} name="isPublished" render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4 bg-primary/5">
                  <div>
                    <FormLabel className="text-base">Public Visibility</FormLabel>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Live on the verified credentials list</p>
                  </div>
                  <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                </FormItem>
              )} />
              <DialogFooter className="gap-2 sm:gap-0">
                <DialogClose asChild><Button type="button" variant="secondary" className="font-bold">Cancel</Button></DialogClose>
                <Button type="submit" disabled={loading} className="font-bold">{loading ? 'Saving...' : 'Save Changes'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
