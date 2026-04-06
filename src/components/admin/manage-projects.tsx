
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
import { FolderKanban, Trash2, Pencil, Globe, Code2 } from 'lucide-react';
import { Project } from '@/types/database';

const projectSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  slug: z.string().min(1, 'Slug is required.').regex(/^[a-z0-9-]+$/, 'Lowercase & hyphens only.'),
  description: z.string().min(10, 'Short description is required.'),
  fullDescription: z.string().min(20, 'Case study narrative is required.'),
  stack: z.string().min(1, 'Tech stack required (comma separated).'),
  link: z.string().url('Invalid GitHub URL'),
  liveLink: z.string().url('Invalid Live URL').optional().or(z.literal('')),
  image: z.string().url('Invalid Image URL'),
  imageHint: z.string().min(1, 'Image hint required for AI.'),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ManageProjects() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const projCollection = useMemo(() => {
    return firestore ? collection(firestore, 'projects') as CollectionReference<DocumentData> : null;
  }, []);

  const projQuery = useMemo(() => {
    return projCollection ? query(projCollection, orderBy('createdAt', 'desc')) : null;
  }, [projCollection]);

  const [snapshot] = useCollection(projQuery);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { name: '', slug: '', description: '', fullDescription: '', stack: '', link: '', liveLink: '', image: '', imageHint: '' },
  });

  const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
    if (!projCollection) return;
    setLoading(true);
    try {
      await addDoc(projCollection, {
        ...data,
        stack: data.stack.split(',').map(s => s.trim()),
        challenges: [], // Default empty, can be expanded later
        solutions: [],
        results: [],
        createdAt: serverTimestamp(),
      });
      toast({ title: 'Project Deployed to Registry!' });
      form.reset();
    } catch (e) {
      toast({ variant: 'destructive', title: 'Deployment Failed' });
    } finally {
      setLoading(false);
    }
  };

  const deleteProj = async (id: string) => {
    if (!firestore) return;
    await deleteDoc(doc(firestore, 'projects', id));
    toast({ title: 'Project Archived' });
  };

  const projects = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)) || [];

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Code2 className="h-5 w-5 text-primary" />New Engineering Showcase</CardTitle>
          <CardDescription>Archive a production-grade repository and generate a high-fidelity case study.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Project Name</FormLabel><FormControl><Input placeholder="Market Genius" {...field} /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="slug" render={({ field }) => (
                  <FormItem><FormLabel>URL Slug</FormLabel><FormControl><Input placeholder="market-genius" {...field} /></FormControl></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>One-Line Excerpt</FormLabel><FormControl><Input placeholder="AI-powered financial signal generator..." {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="fullDescription" render={({ field }) => (
                <FormItem><FormLabel>Case Study Narrative</FormLabel><FormControl><Textarea className="h-40" placeholder="Describe the problem, approach, and engineering impact..." {...field} /></FormControl></FormItem>
              )} />
              <div className="grid md:grid-cols-3 gap-4">
                <FormField control={form.control} name="stack" render={({ field }) => (
                  <FormItem><FormLabel>Stack (CSV)</FormLabel><FormControl><Input placeholder="Next.js, Genkit, AWS" {...field} /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="link" render={({ field }) => (
                  <FormItem><FormLabel>GitHub URL</FormLabel><FormControl><Input placeholder="https://github.com/..." {...field} /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="liveLink" render={({ field }) => (
                  <FormItem><FormLabel>Deployment URL</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl></FormItem>
                )} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField control={form.control} name="image" render={({ field }) => (
                  <FormItem><FormLabel>Cover Image URL</FormLabel><FormControl><Input placeholder="https://picsum.photos/..." {...field} /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="imageHint" render={({ field }) => (
                  <FormItem><FormLabel>AI Accessibility Hint</FormLabel><FormControl><Input placeholder="financial dashboard" {...field} /></FormControl></FormItem>
                )} />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-12 font-bold">Synchronize Project</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Showcase Inventory</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Project</TableHead><TableHead>Slug</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {projects.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-bold">{p.name}</TableCell>
                  <TableCell className="font-mono text-xs">{p.slug}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogTitle>Archive this showcase?</AlertDialogTitle>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteProj(p.id)}>Archive</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
