'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addDoc, collection, serverTimestamp, deleteDoc, doc, query, where, updateDoc, CollectionReference, DocumentData } from 'firebase/firestore';
import { firestore } from '@/firebase/client';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuth } from '@/hooks/use-auth';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Trash2, Pencil, AlertCircle, LayoutDashboard, Globe } from 'lucide-react';
import { Post } from '@/types/database';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const postSchema = z.object({
  platform: z.enum(['LinkedIn', 'Instagram', 'Facebook', 'GitHub', 'Other']),
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  link: z.string().url('Please enter a valid URL.'),
  image: z.string().url('Please enter a valid image URL.').optional().or(z.literal('')),
  imageHint: z.string().optional(),
  hashtags: z.string().optional(),
});

type PostFormValues = z.infer<typeof postSchema>;

export default function ManagePosts() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const postsCollection = useMemo(() => {
    return firestore ? collection(firestore, 'posts') as CollectionReference<DocumentData> : null;
  }, []);

  const postsQuery = useMemo(() => {
    // Simplified query for index-free operation, sorting client-side
    return postsCollection ? query(postsCollection) : null;
  }, [postsCollection]);

  const [postsSnapshot, postsLoading, postsError] = useCollection(postsQuery);

  useEffect(() => {
    if (postsError && postsError.code === 'permission-denied' && !postsLoading && !authLoading && user && postsCollection) {
      const permissionError = new FirestorePermissionError({
        path: postsCollection.path,
        operation: 'list',
      } satisfies SecurityRuleContext);
      errorEmitter.emit('permission-error', permissionError);
    }
  }, [postsError, postsLoading, authLoading, postsCollection, user]);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      platform: 'LinkedIn',
      title: '',
      description: '',
      link: '',
      image: '',
      imageHint: '',
      hashtags: '',
    },
  });
  
  const editForm = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      platform: 'LinkedIn',
      title: '',
      description: '',
      link: '',
      image: '',
      imageHint: '',
      hashtags: '',
    },
  });

  const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
    if (!postsCollection) return;
    setLoading(true);
    try {
      await addDoc(postsCollection, {
        ...data,
        createdAt: serverTimestamp(),
      });
      toast({
        title: 'Post Dispatched!',
        description: 'Your social update has been recorded in the central registry.',
      });
      form.reset();
    } catch (e) {
      console.error(e);
      toast({
        variant: 'destructive',
        title: 'Registry Sync Failed',
      });
    } finally {
      setLoading(false);
    }
  };

  const onEditSubmit: SubmitHandler<PostFormValues> = async (data) => {
    if (!editingPost || !firestore) return;
    setLoading(true);
    const postRef = doc(firestore, 'posts', editingPost.id);
    try {
      await updateDoc(postRef, data);
      toast({
        title: 'Post Updated!',
        description: 'Changes successfully committed to the social feed.',
      });
      setIsEditDialogOpen(false);
      setEditingPost(null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, 'posts', id));
      toast({ title: 'Post Expunged' });
    } catch (e) {
      console.error(e);
    }
  }
  
  const openEditDialog = (post: Post) => {
    setEditingPost(post);
    editForm.reset({
        ...post,
        image: post.image || '',
        imageHint: post.imageHint || '',
        hashtags: post.hashtags || '',
    });
    setIsEditDialogOpen(true);
  }

  if (!firestore) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Configuration Missing</AlertTitle>
        <AlertDescription>
          Firebase is not configured. Social registry is currently offline.
        </AlertDescription>
      </Alert>
    );
  }

  const posts = useMemo(() => {
    return (postsSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post)) || [])
      .sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
  }, [postsSnapshot]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="text-primary h-5 w-5" />
            New Social Insight
          </CardTitle>
          <CardDescription>Archive an update from your professional network.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin Platform</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-muted/5">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="GitHub">GitHub</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Engagement Subject" {...field} className="bg-muted/5" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt / Summary</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A brief narrative for the feed..." {...field} className="bg-muted/5 h-24" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Authoritative URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://social.com/p/..." {...field} className="bg-muted/5" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Paste image address from social platform..." {...field} className="bg-muted/5" />
                    </FormControl>
                    <FormDescription className="text-[10px] font-medium text-primary">
                      Supports direct links from LinkedIn, FB, IG, and GitHub.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="imageHint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI Descriptive Hint</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 'coding team session'" {...field} className="bg-muted/5" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="hashtags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Engagement Hashtags</FormLabel>
                    <FormControl>
                      <Input placeholder="#AI, #Cloud, #NextJS" {...field} className="bg-muted/5" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full h-11 font-bold">
                {loading ? 'Dispatching...' : 'Authorize Post Registry'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="border-border/40 shadow-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5" />
            Social Registry Index
          </CardTitle>
          <CardDescription>Manage all active social engagements.</CardDescription>
        </CardHeader>
        <CardContent>
          {postsLoading && <p className="text-sm text-muted-foreground animate-pulse font-mono uppercase tracking-widest">Scanning Feed...</p>}
          {!postsLoading && posts.length === 0 && <p className="text-muted-foreground italic text-sm">No social posts registered.</p>}
          <div className="max-h-[800px] overflow-y-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="text-[10px] uppercase tracking-widest">Title</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-widest">Platform</TableHead>
                  <TableHead className="text-right text-[10px] uppercase tracking-widest">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id} className="group hover:bg-muted/30 transition-colors">
                    <TableCell className="font-bold max-w-[150px] truncate">{post.title}</TableCell>
                    <TableCell>
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-sm bg-primary/10 text-primary">
                        {post.platform}
                      </span>
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-1">
                       <Button variant="ghost" size="icon" onClick={() => openEditDialog(post)} className="h-8 w-8 hover:text-primary">
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
                            <AlertDialogTitle>Expunge Social Record?</AlertDialogTitle>
                            <AlertDialogDescription>This will remove the post from your public feed permanently.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deletePost(post.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
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
        <DialogContent className="sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto bg-white border-primary/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-playfair">Edit Social Post</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4 py-4">
               <FormField
                control={editForm.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-muted/5">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="GitHub">GitHub</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-muted/5" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="bg-muted/5 h-32" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-muted/5" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-muted/5" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="imageHint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI Hint</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-muted/5" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={editForm.control}
                name="hashtags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hashtags</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-muted/5" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="gap-2 sm:gap-0">
                <DialogClose asChild>
                   <Button type="button" variant="secondary" className="font-bold">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={loading} className="font-bold">
                  {loading ? 'Saving...' : 'Commit Changes'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
