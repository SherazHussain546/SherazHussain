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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Trash2, Pencil, AlertCircle, ExternalLink, BookOpen, Globe } from 'lucide-react';
import { Article } from '@/types/database';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  slug: z.string().min(1, 'Slug is required.').regex(/^[a-z0-9-]+$/, 'Slugs must be lowercase, numbers, and hyphens only.'),
  category: z.enum(['Project', 'Study', 'Course', 'CaseStudy']),
  shortDescription: z.string().min(10, 'Description must be at least 10 characters.'),
  mdFileUrl: z.string().url('Please enter a valid URL to a raw .md file.'),
  imageUrl: z.string().url('Optional image URL must be valid.').optional().or(z.literal('')),
  isPublished: z.boolean().default(true),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

export default function ManageArticles() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const articlesCollection = useMemo(() => {
    return firestore ? collection(firestore, 'articles') as CollectionReference<DocumentData> : null;
  }, [firestore]);

  const articlesQuery = useMemo(() => {
    return articlesCollection ? query(articlesCollection, orderBy('publishDate', 'desc')) : null;
  }, [articlesCollection]);

  const [snapshot, articlesLoading, articlesError] = useCollection(articlesQuery);

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      slug: '',
      category: 'Study',
      shortDescription: '',
      mdFileUrl: '',
      imageUrl: '',
      isPublished: true,
    },
  });
  
  const editForm = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      slug: '',
      category: 'Study',
      shortDescription: '',
      mdFileUrl: '',
      imageUrl: '',
      isPublished: true,
    },
  });

  const onSubmit: SubmitHandler<ArticleFormValues> = async (data) => {
    if (!articlesCollection) return;
    setLoading(true);
    try {
      await addDoc(articlesCollection, {
        ...data,
        publishDate: serverTimestamp(),
      });
      toast({
        title: 'Article Synchronized!',
        description: 'The asset link is now active in the public repository.',
      });
      form.reset();
    } catch (e) {
      console.error(e);
      toast({
        variant: 'destructive',
        title: 'Synchronization Failed',
        description: 'Check your database permissions or connection.',
      });
    } finally {
      setLoading(false);
    }
  };

  const onEditSubmit: SubmitHandler<ArticleFormValues> = async (data) => {
    if (!editingArticle || !firestore) return;
    setLoading(true);
    const articleRef = doc(firestore, 'articles', editingArticle.id);
    try {
      await updateDoc(articleRef, data);
      toast({
        title: 'Article Updated!',
        description: 'Changes have been saved to the repository index.',
      });
      setIsEditDialogOpen(false);
      setEditingArticle(null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id: string) => {
    if (!firestore) return;
    const articleRef = doc(firestore, 'articles', id);
    try {
      await deleteDoc(articleRef);
      toast({ title: 'Article Removed' });
    } catch (e) {
      console.error(e);
    }
  }
  
  const openEditDialog = (article: Article) => {
    setEditingArticle(article);
    editForm.reset({
        ...article,
        imageUrl: article.imageUrl || '',
    });
    setIsEditDialogOpen(true);
  }

  if (!firestore) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Configuration Missing</AlertTitle>
        <AlertDescription>
          Firebase is not configured. Article management is currently offline.
        </AlertDescription>
      </Alert>
    );
  }

  const articles = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article)) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="text-primary h-5 w-5" />
            External Asset Integration
          </CardTitle>
          <CardDescription>Link high-fidelity Markdown resources from GitHub or other verified repositories.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. AI Strategy Brief" {...field} className="bg-muted/5" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="ai-strategy" {...field} className="bg-muted/5" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technical Classification</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-muted/5">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Project">Engineering Project</SelectItem>
                        <SelectItem value="Study">Technical Study</SelectItem>
                        <SelectItem value="Course">Learning Course</SelectItem>
                        <SelectItem value="CaseStudy">Strategic Case Study</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mdFileUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Markdown Source URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/..." {...field} className="bg-muted/5" />
                    </FormControl>
                    <FormDescription className="text-[10px] font-medium text-primary">
                      Pro Tip: You can use standard GitHub links; our system will automatically resolve them to 'Raw' content.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technical Excerpt</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A brief summary for the knowledge registry..." {...field} className="bg-muted/5 h-24" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between p-4 border rounded-lg bg-primary/5">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">System Visibility</FormLabel>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Publish instantly to Knowledge Registry</p>
                </div>
                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  )}
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full h-11 font-bold">
                {loading ? 'Synchronizing Pipeline...' : 'Register Asset'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="border-border/40 shadow-sm">
        <CardHeader>
          <CardTitle>Knowledge Registry Index</CardTitle>
          <CardDescription>Manage active studies, projects, and learning modules.</CardDescription>
        </CardHeader>
        <CardContent>
          {articlesLoading && <p className="text-sm text-muted-foreground animate-pulse font-mono uppercase tracking-widest">Scanning Registry...</p>}
          {!articlesLoading && articles.length === 0 && <p className="text-muted-foreground italic text-sm">Registry is currently empty.</p>}
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px] uppercase tracking-widest">Technical Asset</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-widest">Type</TableHead>
                  <TableHead className="text-right text-[10px] uppercase tracking-widest">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id} className="group transition-colors hover:bg-muted/30">
                    <TableCell className="font-medium max-w-[120px] truncate">
                      {article.title}
                      {!article.isPublished && <span className="ml-2 text-[8px] uppercase text-amber-600 font-bold border border-amber-600/20 px-1 rounded-sm bg-amber-50">Draft</span>}
                    </TableCell>
                    <TableCell>
                      <span className="text-[9px] uppercase tracking-tighter bg-primary/10 px-1.5 py-0.5 rounded-sm text-primary font-bold">
                        {article.category === 'CaseStudy' ? 'Case Study' : article.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-1">
                       <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:text-primary">
                          <a href={`/archives/${article.slug}`} target="_blank"><ExternalLink className="h-4 w-4" /></a>
                       </Button>
                       <Button variant="ghost" size="icon" onClick={() => openEditDialog(article)} className="h-8 w-8 hover:text-primary">
                          <Pencil className="h-4 w-4" />
                       </Button>
                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                              <Trash2 className="h-4 w-4" />
                           </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Technical Asset?</AlertDialogTitle>
                            <AlertDialogDescription>This will remove it from the Knowledge Registry instantly. This action is final.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteArticle(article.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white border-primary/20 shadow-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-playfair">Edit Asset Registry</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4 py-4">
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Title</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-muted/5" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>System Classification</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-muted/5">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Project">Engineering Project</SelectItem>
                        <SelectItem value="Study">Technical Study</SelectItem>
                        <SelectItem value="Course">Learning Course</SelectItem>
                        <SelectItem value="CaseStudy">Strategic Case Study</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="mdFileUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Markdown Source URL</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-muted/5" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4 bg-primary/5">
                    <div>
                      <FormLabel className="text-base">System Visibility</FormLabel>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Live in Knowledge Registry</p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter className="gap-2 sm:gap-0">
                <DialogClose asChild>
                   <Button type="button" variant="secondary" className="font-bold">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={loading} className="font-bold">
                  {loading ? 'Saving Pipeline...' : 'Confirm Changes'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
