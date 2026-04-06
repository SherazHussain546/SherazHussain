
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
import { Trash2, Pencil, GraduationCap, Plus } from 'lucide-react';
import { Education } from '@/types/database';

const eduSchema = z.object({
  degree: z.string().min(1, 'Degree title is required.'),
  university: z.string().min(1, 'University name is required.'),
  graduationDate: z.string().min(1, 'Graduation date is required.'),
  awards: z.string().optional(),
});

type EduFormValues = z.infer<typeof eduSchema>;

export default function ManageEducation() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);

  const eduCollection = useMemo(() => {
    return firestore ? collection(firestore, 'education') as CollectionReference<DocumentData> : null;
  }, []);

  const eduQuery = useMemo(() => {
    return eduCollection ? query(eduCollection, orderBy('createdAt', 'desc')) : null;
  }, [eduCollection]);

  const [snapshot, eduLoading] = useCollection(eduQuery);

  const form = useForm<EduFormValues>({
    resolver: zodResolver(eduSchema),
    defaultValues: { degree: '', university: '', graduationDate: '', awards: '' },
  });

  const onSubmit: SubmitHandler<EduFormValues> = async (data) => {
    if (!eduCollection) return;
    setLoading(true);
    try {
      const awardsArray = data.awards ? data.awards.split('\n').filter(a => a.trim() !== '') : [];
      await addDoc(eduCollection, {
        ...data,
        awards: awardsArray,
        createdAt: serverTimestamp(),
      });
      toast({ title: 'Academic Record Added!' });
      form.reset();
    } catch (e) {
      toast({ variant: 'destructive', title: 'Sync Error' });
    } finally {
      setLoading(false);
    }
  };

  const onEditSubmit: SubmitHandler<EduFormValues> = async (data) => {
    if (!editingEdu || !firestore) return;
    setLoading(true);
    try {
      const awardsArray = data.awards ? data.awards.split('\n').filter(a => a.trim() !== '') : [];
      await updateDoc(doc(firestore, 'education', editingEdu.id), {
        ...data,
        awards: awardsArray,
      });
      toast({ title: 'Record Updated!' });
      setEditingEdu(null);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error updating' });
    } finally {
      setLoading(false);
    }
  };

  const deleteEdu = async (id: string) => {
    if (!firestore) return;
    await deleteDoc(doc(firestore, 'education', id));
    toast({ title: 'Academic Record Expunged' });
  };

  const educations = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Education)) || [];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Register Academic Milestone
          </CardTitle>
          <CardDescription>Document your degrees and educational achievements.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="degree" render={({ field }) => (
                <FormItem><FormLabel>Degree Programme</FormLabel><FormControl><Input placeholder="B.Sc. in Computing" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="university" render={({ field }) => (
                <FormItem><FormLabel>Institution</FormLabel><FormControl><Input placeholder="Dublin Business School" {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="graduationDate" render={({ field }) => (
                <FormItem><FormLabel>Graduation Date</FormLabel><FormControl><Input placeholder="Sept 2021 - April 2025" {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="awards" render={({ field }) => (
                <FormItem>
                  <FormLabel>Awards & Honors (One per line)</FormLabel>
                  <FormControl><Textarea className="h-32" placeholder="First Class Honors...\nLeadership Award..." {...field} /></FormControl>
                </FormItem>
              )} />
              <Button type="submit" disabled={loading} className="w-full">Authorize Integration</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Academic Registry</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Degree</TableHead><TableHead>Institution</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader>
            <TableBody>
              {educations.map(edu => (
                <TableRow key={edu.id}>
                  <TableCell className="font-bold">{edu.degree}</TableCell>
                  <TableCell>{edu.university}</TableCell>
                  <TableCell className="text-right flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => {
                      setEditingEdu(edu);
                      form.reset({ ...edu, awards: edu.awards.join('\n') });
                    }}><Pencil className="h-4 w-4" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogTitle>Expunge Record?</AlertDialogTitle>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteEdu(edu.id)}>Delete</AlertDialogAction>
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

      <Dialog open={!!editingEdu} onOpenChange={(open) => !open && setEditingEdu(null)}>
        <DialogContent className="bg-white">
          <DialogHeader><DialogTitle>Update Academic Record</DialogTitle></DialogHeader>
          <form onSubmit={form.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField control={form.control} name="degree" render={({ field }) => (
                <FormItem><FormLabel>Degree</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="university" render={({ field }) => (
                <FormItem><FormLabel>Institution</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="graduationDate" render={({ field }) => (
                <FormItem><FormLabel>Date</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="awards" render={({ field }) => (
                <FormItem><FormLabel>Awards</FormLabel><FormControl><Textarea className="h-32" {...field} /></FormControl></FormItem>
              )} />
              <Button type="submit" disabled={loading} className="w-full">Confirm Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
