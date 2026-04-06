
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
import { Trash2, Pencil, Briefcase, Eye, EyeOff } from 'lucide-react';
import { Experience } from '@/types/database';

const expSchema = z.object({
  role: z.string().min(1, 'Role is required.'),
  company: z.string().min(1, 'Company is required.'),
  period: z.string().min(1, 'Period is required (e.g. Jan 2024 - Present).'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  points: z.string().optional(),
  isPublished: z.boolean().default(true),
});

type ExpFormValues = z.infer<typeof expSchema>;

export default function ManageExperience() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
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
    defaultValues: { role: '', company: '', period: '', description: '', points: '', isPublished: true },
  });

  const editForm = useForm<ExpFormValues>({
    resolver: zodResolver(expSchema),
    defaultValues: { role: '', company: '', period: '', description: '', points: '', isPublished: true },
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
    const expRef = doc(firestore, 'experiences', editingExp.id);
    try {
      const pointsArray = data.points ? data.points.split('\n').filter(p => p.trim() !== '') : [];
      await updateDoc(expRef, {
        ...data,
        points: pointsArray,
      });
      toast({ title: 'Experience Updated!' });
      setIsEditDialogOpen(false);
      setEditingExp(null);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error updating' });
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (exp: Experience) => {
    if (!firestore) return;
    const expRef = doc(firestore, 'experiences', exp.id);
    try {
      await updateDoc(expRef, { isPublished: !exp.isPublished });
      toast({ title: exp.isPublished ? 'Record Unpublished' : 'Record Published' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error updating visibility' });
    }
  };

  const deleteExp = async (id: string) => {
    if (!firestore) return;
    await deleteDoc(doc(firestore, 'experiences', id));
    toast({ title: 'Experience Deleted' });
  };

  const openEditDialog = (exp: Experience) => {
    setEditingExp(exp);
    editForm.reset({
      ...exp,
      points: exp.points?.join('\n') || '',
    });
    setIsEditDialogOpen(true);
  };

  const experiences = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Experience)) || [];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card className="border-primary/20 shadow-lg">
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
              <Button type="submit" disabled={loading} className="w-full font-bold">
                {loading ? 'Saving...' : 'Dispatch to Registry'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="border-border/40 shadow-sm">
        <CardHeader>
          <CardTitle>Experience Registry</CardTitle>
          <CardDescription>Manage active professional entries.</CardDescription>
        </CardHeader>
        <CardContent>
          {expsLoading && <p className="text-sm text-muted-foreground animate-pulse font-mono uppercase tracking-widest">Scanning History...</p>}
          <Table>
            <TableHeader><TableRow><TableHead className="text-[10px] uppercase tracking-widest">Role</TableHead><TableHead className="text-[10px] uppercase tracking-widest">Status</TableHead><TableHead className="text-right text-[10px] uppercase tracking-widest">Action</TableHead></TableRow></TableHeader>
            <TableBody>
              {experiences.map(exp => (
                <TableRow key={exp.id} className="group hover:bg-muted/30 transition-colors">
                  <TableCell className="font-bold max-w-[150px] truncate">{exp.role}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleVisibility(exp)}
                      className={exp.isPublished ? "text-emerald-600" : "text-amber-600"}
                    >
                      {exp.isPublished ? <Eye className="h-4 w-4 mr-1" /> : <EyeOff className="h-4 w-4 mr-1" />}
                      <span className="text-[9px] uppercase font-bold">{exp.isPublished ? 'Live' : 'Draft'}</span>
                    </Button>
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(exp)} className="h-8 w-8 hover:text-primary"><Pencil className="h-4 w-4" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Expunge Record?</AlertDialogTitle>
                          <AlertDialogDescription>This will remove this experience entry permanently from your archives.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteExp(exp.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-white border-primary/20 shadow-2xl">
          <DialogHeader><DialogTitle className="text-2xl font-bold font-playfair">Edit Experience</DialogTitle></DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={editForm.control} name="role" render={({ field }) => (
                  <FormItem><FormLabel>Role</FormLabel><FormControl><Input {...field} className="bg-muted/5" /></FormControl></FormItem>
                )} />
                <FormField control={editForm.control} name="company" render={({ field }) => (
                  <FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} className="bg-muted/5" /></FormControl></FormItem>
                )} />
              </div>
              <FormField control={editForm.control} name="period" render={({ field }) => (
                <FormItem><FormLabel>Period</FormLabel><FormControl><Input {...field} className="bg-muted/5" /></FormControl></FormItem>
              )} />
              <FormField control={editForm.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Summary</FormLabel><FormControl><Textarea {...field} className="bg-muted/5" /></FormControl></FormItem>
              )} />
              <FormField control={editForm.control} name="points" render={({ field }) => (
                <FormItem><FormLabel>Achievements</FormLabel><FormControl><Textarea className="h-32 bg-muted/5" {...field} /></FormControl></FormItem>
              )} />
              <FormField control={editForm.control} name="isPublished" render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4 bg-primary/5">
                  <div>
                    <FormLabel className="text-base">Public Visibility</FormLabel>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Live on the professional journey timeline</p>
                  </div>
                  <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                </FormItem>
              )} />
              <DialogFooter className="gap-2 sm:gap-0">
                <DialogClose asChild><Button type="button" variant="secondary" className="font-bold">Cancel</Button></DialogClose>
                <Button type="submit" disabled={loading} className="font-bold">{loading ? 'Saving...' : 'Update Record'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
