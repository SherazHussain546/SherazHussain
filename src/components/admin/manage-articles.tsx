
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addDoc, collection, serverTimestamp, deleteDoc, doc, query, orderBy, updateDoc, CollectionReference, DocumentData } from 'firebase/firestore';
import { firestore } from '@/firebase/client';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuth } from '@/hooks/use-auth';

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
import { Trash2, Pencil, AlertCircle, ExternalLink, BookOpen, BadgeInfo } from 'lucide-react';
import { Article } from '@/types/database';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  slug: z.string().min(1, 'Slug is required.').regex(/^[a-z0-9-]+$/, 'Slugs must be lowercase, numbers, and hyphens only.'),
  category: z.enum(['Project', 'Study', 'Course', 'Other']),
  shortDescription: z.string().min(10, 'Description must be at least 10 characters.'),
  mdFileUrl: z.string().url('Please enter a valid URL to a raw .md file.'),
  imageUrl: z.string().url('Optional image URL must be valid.').optional().or(z.literal('')),
  isPublished: z.boolean().default(true),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

export default function ManageArticles() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const articlesCollection = useMemo(() => {
    return firestore ? collection(firestore, 'articles') as CollectionReference<DocumentData> : null;
  }, []);

  const articlesQuery = useMemo(() => {
    return articlesCollection ? query(articlesCollection, orderBy('publishDate', 'desc')) : null;
  }, [articlesCollection]);

  const [snapshot, articlesLoading, articlesError] = useCollection(articlesQuery);

  useEffect(() => {
    if (articlesError && articlesError.code === 'permission-denied' && !articlesLoading && !authLoading && user && articlesCollection) {
      const permissionError = new FirestorePermissionError({
        path: articlesCollection.path,
        operation: 'list',
      } satisfies SecurityRuleContext);
      errorEmitter.emit('permission-error', permissionError);
    }
  }, [articlesError, articlesLoading, authLoading, articlesCollection, user]);

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
    addDoc(articlesCollection, {
      ...data,
      publishDate: serverTimestamp(),
    })
    .catch(async (serverError) => {
      if (serverError.code === 'permission-denied') {
        const permissionError = new FirestorePermissionError({
          path: articlesCollection.path,
          operation: 'create',
          requestResourceData: data,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      }
    })
    .then(() => {
      toast({
        title: 'Article Synchronized!',
        description: 'The asset link is now active in the public repository.',
      });
      form.reset();
    })
    .finally(() => setLoading(false));
  };

  const onEditSubmit: SubmitHandler<ArticleFormValues> = async (data) => {
    if (!editingArticle || !firestore) return;
    setLoading(true);
    const articleRef = doc(firestore, 'articles', editingArticle.id);
    updateDoc(articleRef, data)
    .catch(async (serverError) => {
      if (serverError.code === 'permission-denied') {
        const permissionError = new FirestorePermissionError({
          path: articleRef.path,
          operation: 'update',
          requestResourceData: data,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      }
    })
    .then(() => {
      toast({
        title: 'Article Updated!',
        description: 'Changes have been saved to the repository index.',
      });
      setIsEditDialogOpen(false);
      setEditingArticle(null);
    })
    .finally(() => setLoading(false));
  };

  const deleteArticle = async (id: string) => {
    if (!firestore) return;
    const articleRef = doc(firestore, 'articles', id);
    deleteDoc(articleRef)
    .catch(async (serverError) => {
      if (serverError.code === 'permission-denied') {
        const permissionError = new FirestorePermissionError({
          path: articleRef.path,
          operation: 'delete',
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      }
    })
    .then(() => {
      toast({ title: 'Article Removed' });
    });
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="text-primary h-5 w-5" />
            Integrate GitHub Content
          </CardTitle>
          <CardDescription>Share your projects, studies, and courses by linking raw Markdown URLs.</CardDescription>
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
                        <Input placeholder="e.g. Next.js Architecture Study" {...field} />
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
                        <Input placeholder="nextjs-study" {...field} />
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
                    <FormLabel>Content Classification</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Project">Project Write-up</SelectItem>
                        <SelectItem value="Study">Technical Study</SelectItem>
                        <SelectItem value="Course">Learning Course</SelectItem>
                        <SelectItem value="Other">Miscellaneous</SelectItem>
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
                    <FormLabel>Raw Markdown (.md) URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://raw.githubusercontent.com/..." {...field} />
                    </FormControl>
                    <FormDescription className="text-[10px]">
                      Use the "Raw" link from GitHub to ensure correct parsing.
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
                    <FormLabel>Repository Excerpt</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A brief summary for the archives list..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/5">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Visibility State</FormLabel>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Publish instantly to repository</p>
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

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Synchronizing...' : 'Add to Repository'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Library Index</CardTitle>
          <CardDescription>Manage synced studies, projects, and courses.</CardDescription>
        </CardHeader>
        <CardContent>
          {articlesLoading && <p className="text-sm text-muted-foreground animate-pulse">Scanning index...</p>}
          {!articlesLoading && articles.length === 0 && <p className="text-muted-foreground italic">No assets indexed yet.</p>}
          <div className="max-h-[600px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium max-w-[120px] truncate">
                      {article.title}
                      {!article.isPublished && <span className="ml-2 text-[8px] uppercase text-amber-600 font-bold">Draft</span>}
                    </TableCell>
                    <TableCell>
                      <span className="text-[9px] uppercase tracking-tighter bg-primary/5 px-1.5 py-0.5 border border-primary/10 text-primary font-bold">
                        {article.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-1">
                       <Button variant="ghost" size="icon" asChild>
                          <a href={`/archives/${article.slug}`} target="_blank"><ExternalLink className="h-4 w-4" /></a>
                       </Button>
                       <Button variant="ghost" size="icon" onClick={() => openEditDialog(article)}>
                          <Pencil className="h-4 w-4" />
                       </Button>
                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                           </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this asset?</AlertDialogTitle>
                            <AlertDialogDescription>This will remove it from the public repository index instantly.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteArticle(article.id)}>Delete</AlertDialogAction>
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
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Edit Technical Asset</DialogTitle>
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
                      <Input {...field} />
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
                    <FormLabel>Classification</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Project">Project</SelectItem>
                        <SelectItem value="Study">Study</SelectItem>
                        <SelectItem value="Course">Course</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
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
                    <FormLabel>Markdown source URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <FormLabel>Live in Repository</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                   <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
