
'use client';

import { useState, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addDoc, collection, serverTimestamp, deleteDoc, doc, query, orderBy, updateDoc, CollectionReference, DocumentData } from 'firebase/firestore';
import { firestore } from '@/firebase/client';
import { useCollection } from 'react-firebase-hooks/firestore';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { FolderKanban, Trash2, Pencil, Eye, EyeOff, Code2, ListChecks, Target, Cpu, TrendingUp } from 'lucide-react';
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
  challenges: z.string().optional(),
  solutions: z.string().optional(),
  results: z.string().optional(),
  isPublished: z.boolean().default(true),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ManageProjects() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProj, setEditingProj] = useState<Project | null>(null);

  const projCollection = useMemo(() => {
    return firestore ? collection(firestore, 'projects') as CollectionReference<DocumentData> : null;
  }, []);

  const projQuery = useMemo(() => {
    return projCollection ? query(projCollection, orderBy('createdAt', 'desc')) : null;
  }, [projCollection]);

  const [snapshot, projectsLoading] = useCollection(projQuery);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { 
      name: '', 
      slug: '', 
      description: '', 
      fullDescription: '', 
      stack: '', 
      link: '', 
      liveLink: '', 
      image: '', 
      imageHint: '', 
      challenges: '', 
      solutions: '', 
      results: '', 
      isPublished: true 
    },
  });

  const editForm = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { 
      name: '', 
      slug: '', 
      description: '', 
      fullDescription: '', 
      stack: '', 
      link: '', 
      liveLink: '', 
      image: '', 
      imageHint: '', 
      challenges: '', 
      solutions: '', 
      results: '', 
      isPublished: true 
    },
  });

  const parseArrays = (data: ProjectFormValues) => {
    const challengesArray = data.challenges ? data.challenges.split('\n').filter(c => c.trim() !== '') : [];
    const resultsArray = data.results ? data.results.split('\n').filter(r => r.trim() !== '') : [];
    const solutionsArray = data.solutions ? data.solutions.split('\n').filter(s => s.includes('|')).map(s => {
      const [title, desc] = s.split('|');
      return { title: title.trim(), description: desc.trim() };
    }) : [];
    
    return {
      ...data,
      stack: data.stack.split(',').map(s => s.trim()),
      challenges: challengesArray,
      solutions: solutionsArray,
      results: resultsArray,
    };
  };

  const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
    if (!projCollection) return;
    setLoading(true);
    try {
      const formattedData = parseArrays(data);
      await addDoc(projCollection, {
        ...formattedData,
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

  const onEditSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
    if (!editingProj || !firestore) return;
    setLoading(true);
    const projRef = doc(firestore, 'projects', editingProj.id);
    try {
      const formattedData = parseArrays(data);
      await updateDoc(projRef, formattedData);
      toast({ title: 'Case Study Updated!' });
      setIsEditDialogOpen(false);
      setEditingProj(null);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Update Failed' });
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (proj: Project) => {
    if (!firestore) return;
    const projRef = doc(firestore, 'projects', proj.id);
    try {
      await updateDoc(projRef, { isPublished: !proj.isPublished });
      toast({ title: proj.isPublished ? 'Project Unpublished' : 'Project Published' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error updating visibility' });
    }
  };

  const deleteProj = async (id: string) => {
    if (!firestore) return;
    await deleteDoc(doc(firestore, 'projects', id));
    toast({ title: 'Project Archived' });
  };

  const openEditDialog = (proj: Project) => {
    setEditingProj(proj);
    editForm.reset({
      ...proj,
      stack: proj.stack?.join(', ') || '',
      challenges: proj.challenges?.join('\n') || '',
      results: proj.results?.join('\n') || '',
      solutions: proj.solutions?.map(s => `${s.title} | ${s.description}`).join('\n') || '',
    });
    setIsEditDialogOpen(true);
  };

  const projects = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)) || [];

  return (
    <div className="grid gap-8">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Code2 className="h-5 w-5 text-primary" />New Engineering Showcase</CardTitle>
          <CardDescription>Archive a production-grade repository and generate a high-fidelity case study.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Project Name</FormLabel><FormControl><Input placeholder="Market Genius" {...field} className="bg-muted/5" /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name="slug" render={({ field }) => (
                    <FormItem><FormLabel>URL Slug</FormLabel><FormControl><Input placeholder="market-genius" {...field} className="bg-muted/5" /></FormControl></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem><FormLabel>One-Line Excerpt</FormLabel><FormControl><Input placeholder="AI-powered financial signal generator..." {...field} className="bg-muted/5" /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="fullDescription" render={({ field }) => (
                  <FormItem><FormLabel>Case Study Narrative</FormLabel><FormControl><Textarea className="h-40 bg-muted/5" placeholder="Describe the problem, approach, and engineering impact..." {...field} /></FormControl></FormItem>
                )} />
              </div>

              <div className="grid gap-8 p-6 bg-muted/5 border rounded-xl">
                <h3 className="font-bold text-sm uppercase tracking-widest text-primary flex items-center gap-2">
                  <ListChecks className="h-4 w-4" />
                  Technical Deep Dive
                </h3>
                
                <FormField control={form.control} name="challenges" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Target className="h-3 w-3" /> Challenges (One per line)</FormLabel>
                    <FormControl><Textarea className="h-32 bg-white" placeholder="Integrating custom AI reasoning engines...\nScaling cloud infrastructure..." {...field} /></FormControl>
                  </FormItem>
                )} />

                <FormField control={form.control} name="solutions" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Cpu className="h-3 w-3" /> Solutions (Format: Title | Description)</FormLabel>
                    <FormControl><Textarea className="h-32 bg-white" placeholder="Intelligent Automation | Developed bespoke Gemini-powered agents...\nElastic Infrastructure | Leveraged serverless architectures..." {...field} /></FormControl>
                    <FormDescription className="text-[10px]">Use the vertical bar | to separate the solution title from its description.</FormDescription>
                  </FormItem>
                )} />

                <FormField control={form.control} name="results" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><TrendingUp className="h-3 w-3" /> Measured Results (One per line)</FormLabel>
                    <FormControl><Textarea className="h-32 bg-white" placeholder="Achieved a 40% reduction in operational bottlenecks...\nPropelled client domains to the #1 spot..." {...field} /></FormControl>
                  </FormItem>
                )} />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <FormField control={form.control} name="stack" render={({ field }) => (
                  <FormItem><FormLabel>Stack (CSV)</FormLabel><FormControl><Input placeholder="Next.js, Genkit, AWS" {...field} className="bg-muted/5" /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="link" render={({ field }) => (
                  <FormItem><FormLabel>GitHub URL</FormLabel><FormControl><Input placeholder="https://github.com/..." {...field} className="bg-muted/5" /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="liveLink" render={({ field }) => (
                  <FormItem><FormLabel>Deployment URL</FormLabel><FormControl><Input placeholder="https://..." {...field} className="bg-muted/5" /></FormControl></FormItem>
                )} />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <FormField control={form.control} name="image" render={({ field }) => (
                  <FormItem><FormLabel>Cover Image URL</FormLabel><FormControl><Input placeholder="https://picsum.photos/..." {...field} className="bg-muted/5" /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="imageHint" render={({ field }) => (
                  <FormItem><FormLabel>AI Accessibility Hint</FormLabel><FormControl><Input placeholder="financial dashboard" {...field} className="bg-muted/5" /></FormControl></FormItem>
                )} />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-14 font-bold text-md uppercase tracking-widest">Deploy to Project Registry</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="border-border/40 shadow-sm">
        <CardHeader><CardTitle>Showcase Inventory</CardTitle></CardHeader>
        <CardContent>
          {projectsLoading && <p className="text-sm text-muted-foreground animate-pulse font-mono uppercase tracking-widest">Scanning Repository...</p>}
          <Table>
            <TableHeader><TableRow><TableHead className="text-[10px] uppercase tracking-widest">Project</TableHead><TableHead className="text-[10px] uppercase tracking-widest">Status</TableHead><TableHead className="text-right text-[10px] uppercase tracking-widest">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {projects.map(p => (
                <TableRow key={p.id} className="group hover:bg-muted/30 transition-colors">
                  <TableCell className="font-bold">{p.name}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleVisibility(p)}
                      className={p.isPublished ? "text-emerald-600" : "text-amber-600"}
                    >
                      {p.isPublished ? <Eye className="h-4 w-4 mr-1" /> : <EyeOff className="h-4 w-4 mr-1" />}
                      <span className="text-[9px] uppercase font-bold">{p.isPublished ? 'Live' : 'Draft'}</span>
                    </Button>
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(p)} className="h-8 w-8 hover:text-primary"><Pencil className="h-4 w-4" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Archive this showcase?</AlertDialogTitle>
                          <AlertDialogDescription>This will remove the project case study from your public gallery.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteProj(p.id)} className="bg-destructive hover:bg-destructive/90">Archive</AlertDialogAction>
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
        <DialogContent className="sm:max-w-3xl bg-white border-primary/20 shadow-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl font-bold font-playfair">Edit Case Study</DialogTitle></DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-6 py-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField control={editForm.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Project Name</FormLabel><FormControl><Input {...field} className="bg-muted/5" /></FormControl></FormItem>
                )} />
                <FormField control={editForm.control} name="slug" render={({ field }) => (
                  <FormItem><FormLabel>Slug</FormLabel><FormControl><Input {...field} className="bg-muted/5" /></FormControl></FormItem>
                )} />
              </div>
              <FormField control={editForm.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Short Description</FormLabel><FormControl><Input {...field} className="bg-muted/5" /></FormControl></FormItem>
              )} />
              <FormField control={editForm.control} name="fullDescription" render={({ field }) => (
                <FormItem><FormLabel>Narrative</FormLabel><FormControl><Textarea className="h-40 bg-muted/5" {...field} /></FormControl></FormItem>
              )} />

              <div className="grid gap-6 p-4 bg-muted/5 border rounded-lg">
                <FormField control={editForm.control} name="challenges" render={({ field }) => (
                  <FormItem><FormLabel>Challenges</FormLabel><FormControl><Textarea className="h-32 bg-white" {...field} /></FormControl></FormItem>
                )} />
                <FormField control={editForm.control} name="solutions" render={({ field }) => (
                  <FormItem><FormLabel>Solutions (Title | Desc)</FormLabel><FormControl><Textarea className="h-32 bg-white" {...field} /></FormControl></FormItem>
                )} />
                <FormField control={editForm.control} name="results" render={({ field }) => (
                  <FormItem><FormLabel>Results</FormLabel><FormControl><Textarea className="h-32 bg-white" {...field} /></FormControl></FormItem>
                )} />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <FormField control={editForm.control} name="stack" render={({ field }) => (
                  <FormItem><FormLabel>Stack</FormLabel><FormControl><Input {...field} className="bg-muted/5" /></FormControl></FormItem>
                )} />
                <FormField control={editForm.control} name="link" render={({ field }) => (
                  <FormItem><FormLabel>GitHub</FormLabel><FormControl><Input {...field} className="bg-muted/5" /></FormControl></FormItem>
                )} />
                <FormField control={editForm.control} name="liveLink" render={({ field }) => (
                  <FormItem><FormLabel>Live URL</FormLabel><FormControl><Input {...field} className="bg-muted/5" /></FormControl></FormItem>
                )} />
              </div>
              <FormField control={editForm.control} name="isPublished" render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4 bg-primary/5">
                  <div>
                    <FormLabel className="text-base">Public Visibility</FormLabel>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Live in the Project Gallery</p>
                  </div>
                  <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                </FormItem>
              )} />
              <DialogFooter className="gap-2 sm:gap-0">
                <DialogClose asChild><Button type="button" variant="secondary" className="font-bold">Cancel</Button></DialogClose>
                <Button type="submit" disabled={loading} className="font-bold">{loading ? 'Saving...' : 'Update Showcase'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
