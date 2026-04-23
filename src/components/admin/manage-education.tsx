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
import { Trash2, Pencil, GraduationCap, Eye, EyeOff } from 'lucide-react';
import { Education } from '@/types/database';

const eduSchema = z.object({
  degree: z.string().min(1, 'Degree title is required.'),
  university: z.string().min(1, 'University name is required.'),
  graduationDate: z.string().min(1, 'Graduation date is required.'),
  awards: z.string().optional(),
  isPublished: z.boolean().default(true),
});

type EduFormValues = z.infer<typeof eduSchema>;

export default function ManageEducation() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
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
    defaultValues: { degree: '', university: '', graduationDate: '', awards: '', isPublished: true },
  });

  const editForm = useForm<EduFormValues>({
    resolver: zodResolver(eduSchema),
    defaultValues: { degree: '', university: '', graduationDate: '', awards: '', isPublished: true },
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
    const eduRef = doc(firestore, 'education', editingEdu.id);
    try {
      const awardsArray = data.awards ? data.awards.split('\n').filter(a => a.trim() !== '') : [];
      await updateDoc(eduRef, {
        ...data,
        awards: awardsArray,
      });
      toast({ title: 'Record Updated!' });
      setIsEditDialogOpen(false);
      setEditingEdu(null);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error updating' });
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (edu: Education) => {
    if (!firestore) return;
    const eduRef = doc(firestore, 'education', edu.id);
    try {
      await updateDoc(eduRef, { isPublished: !edu.isPublished });
      toast({ title: edu.isPublished ? 'Record Unpublished' : 'Record Published' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error updating visibility' });
    }
  };

  const deleteEdu = async (id: string) => {
    if (!firestore) return;
    await deleteDoc(doc(firestore, 'education', id));
    toast({ title: 'Academic Record Expunged' });
  };

  const openEditDialog = (edu: Education) => {
    setEditingEdu(edu);
    editForm.reset({
      ...edu,
      awards: edu.awards?.join('\n') || '',
    });
    setIsEditDialogOpen(true);
  };

  const educations = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Education)) || [];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card className="border-primary/20 shadow-lg">
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
                <FormItem><FormLabel>Degree Programme</FormLabel><FormControl><Input placeholder="B.Sc. in Computing" {...field} className="bg-muted/5" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="university" render={({ field }) => (
                <FormItem><FormLabel>Institution</FormLabel><FormControl><Input placeholder="Dublin Business School" {...field} className="bg-muted/5" /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="graduationDate" render={({ field }) => (
                <FormItem><FormLabel>Graduation Date</FormLabel><FormControl><Input placeholder="Sept 2021 - April 2025" {...field} className="bg-muted/5" /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="awards" render={({ field }) => (
                <FormItem>
                  <FormLabel>Awards & Honors (One per line)</FormLabel>
                  <FormControl><Textarea className="h-32 bg-muted/5" placeholder="First Class Honors...\nLeadership Award..." {...field} /></FormControl>
                </FormItem>
              )} />
              <Button type="submit" disabled={loading} className="w-full font-bold">Authorize Integration</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="border-border/40 shadow-sm">
        <CardHeader><CardTitle>Academic Registry</CardTitle></CardHeader>
        <CardContent>
          {eduLoading && <p className="text-sm text-muted-foreground animate-pulse font-mono uppercase tracking-widest">Scanning Registry...</p>}
          <Table>
            <TableHeader><TableRow><TableHead className="text-[10px] uppercase tracking-widest">Degree</TableHead><TableHead className="text-[10px] uppercase tracking-widest">Status</TableHead><TableHead className="text-right text-[10px] uppercase tracking-widest">Action</TableHead></TableRow></TableHeader>
            <TableBody>
              {educations.map(edu => (
                <TableRow key={edu.id} className="group hover:bg-muted/30 transition-colors">
                  <TableCell className="font-bold max-w-[150px] truncate">{edu.degree}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleVisibility(edu)}
                      className={edu.isPublished ? "text-emerald-600" : "text-amber-600"}
                    >
                      {edu.isPublished ? <Eye className="h-4 w-4 mr-1" /> : <EyeOff className="h-4 w-4 mr-1" />}
                      <span className="text-[9px] uppercase font-bold">{edu.isPublished ? 'Live' : 'Draft'}</span>
                    </Button>
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(edu)} className="h-8 w-8 hover:text-primary"><Pencil className="h-4 w-4" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Expunge Record?</AlertDialogTitle>
                          <AlertDialogDescription>This will remove this educational record from your database.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteEdu(edu.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
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
        <DialogContent className="sm:max-w-lg bg-white border-primary/20 shadow-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl font-bold font-playfair">Update Academic Record</DialogTitle></DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4 py-4">
              <FormField control={editForm.control} name="degree" render={({ field }) => (
                <FormItem><FormLabel>Degree</FormLabel><FormControl><Input {...field} className="bg-muted/5" /></FormControl></FormItem>
              )} />
              <FormField control={editForm.control} name="university" render={({ field }) => (
                <FormItem><FormLabel>Institution</FormLabel><FormControl><Input {...field} className="bg-muted/5" /></FormControl></FormItem>
              )} />
              <FormField control={editForm.control} name="graduationDate" render={({ field }) => (
                <FormItem><FormLabel>Date</FormLabel><FormControl><Input {...field} className="bg-muted/5" /></FormControl></FormItem>
              )} />
              <FormField control={editForm.control} name="awards" render={({ field }) => (
                <FormItem><FormLabel>Awards</FormLabel><FormControl><Textarea className="h-32 bg-muted/5" {...field} /></FormControl></FormItem>
              )} />
              <FormField control={editForm.control} name="isPublished" render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4 bg-primary/5">
                  <div>
                    <FormLabel className="text-base">Public Visibility</FormLabel>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Live on the academic pedigree timeline</p>
                  </div>
                  <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                </FormItem>
              )} />
              <DialogFooter className="gap-2 sm:gap-0">
                <DialogClose asChild><Button type="button" variant="secondary" className="font-bold">Cancel</Button></DialogClose>
                <Button type="submit" disabled={loading} className="font-bold">{loading ? 'Saving...' : 'Confirm Changes'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
