
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Trash2, Pencil, Briefcase, Plus } from 'lucide-react';
import { Experience } from '@/types/database';

const expSchema = z.object({
  role: z.string().min(1, 'Role is required.'),
  company: z.string().min(1, 'Company is required.'),
  period: z.string().min(1, 'Period is required (e.g. Jan 2024 - Present).'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  points: z.string().optional(),
});

type ExpFormValues = z.infer<typeof expSchema>;

export default function ManageExperience() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  const expCollection = useMemo(() => {
    return firestore ? collection(firestore, 'experiences') as CollectionReference<DocumentData> : null;
  }, []);

  const expQuery = useMemo(() => {
    return expCollection ? query(expCollection, orderBy('createdAt', 'desc')) : null;
  }, [expCollection]);

  const [snapshot, expsLoading] = useCollection(expQuery);

  const form = useForm<ExpFormValues>({
    resolver: zodResolver(expSchema),
    defaultValues: { role: '', company: '', period: '', description: '', points: '' },
  });

  const onSubmit: SubmitHandler<ExpFormValues> = async (data) => {
    if (!expCollection) return;
    setLoading(true);
    try {
      const pointsArray = data.points ? data.points.split('\n').filter(p => p.trim() !== '') : [];
      await addDoc(expCollection, {
        ...data,
        points: pointsArray,
        createdAt: serverTimestamp(),
      });
      toast({ title: 'Experience Added!' });
      form.reset();
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error adding experience' });
    } finally {
      setLoading(false);
    }
  };

  const onEditSubmit: SubmitHandler<ExpFormValues> = async (data) => {
    if (!editingExp || !firestore) return;
    setLoading(true);
    try {
      const pointsArray = data.points ? data.points.split('\n').filter(p => p.trim() !== '') : [];
      await updateDoc(doc(firestore, 'experiences', editingExp.id), {
        ...data,
        points: pointsArray,
      });
      toast({ title: 'Experience Updated!' });
      setEditingExp(null);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error updating' });
    } finally {
      setLoading(false);
    }
  };

  const deleteExp = async (id: string) => {
    if (!firestore) return;
    await deleteDoc(doc(firestore, 'experiences', id));
    toast({ title: 'Experience Deleted' });
  };

  const experiences = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Experience)) || [];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Add Professional Experience
          </CardTitle>
          <CardDescription>Record your career milestones in the central registry.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="role" render={({ field }) => (
                  <FormItem><FormLabel>Role</FormLabel><FormControl><Input placeholder="Principal Architect" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="company" render={({ field }) => (
                  <FormItem><FormLabel>Company</FormLabel><FormControl><Input placeholder="SYNC TECH" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="period" render={({ field }) => (
                <FormItem><FormLabel>Period</FormLabel><FormControl><Input placeholder="Aug 2025 - Present" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Summary</FormLabel><FormControl><Textarea placeholder="High-level overview of your impact..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="points" render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Achievements (One per line)</FormLabel>
                  <FormControl><Textarea className="h-32" placeholder="Engineered 10x scale...\nIntegrated LLM agents..." {...field} /></FormControl>
                </FormItem>
              )} />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Saving...' : 'Dispatch to Registry'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Experience Registry</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Role</TableHead><TableHead>Company</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader>
            <TableBody>
              {experiences.map(exp => (
                <TableRow key={exp.id}>
                  <TableCell className="font-bold">{exp.role}</TableCell>
                  <TableCell>{exp.company}</TableCell>
                  <TableCell className="text-right flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => {
                      setEditingExp(exp);
                      form.reset({ ...exp, points: exp.points.join('\n') });
                    }}><Pencil className="h-4 w-4" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogTitle>Delete Record?</AlertDialogTitle>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteExp(exp.id)}>Delete</AlertDialogAction>
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

      <Dialog open={!!editingExp} onOpenChange={(open) => !open && setEditingExp(null)}>
        <DialogContent className="bg-white">
          <DialogHeader><DialogTitle>Update Experience</DialogTitle></DialogHeader>
          <form onSubmit={form.handleSubmit(onEditSubmit)} className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="role" render={({ field }) => (
                  <FormItem><FormLabel>Role</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="company" render={({ field }) => (
                  <FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="period" render={({ field }) => (
                <FormItem><FormLabel>Period</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Summary</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="points" render={({ field }) => (
                <FormItem><FormLabel>Achievements</FormLabel><FormControl><Textarea className="h-32" {...field} /></FormControl></FormItem>
              )} />
              <Button type="submit" disabled={loading} className="w-full">Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
