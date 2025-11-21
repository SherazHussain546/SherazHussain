'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addDoc, collection, serverTimestamp, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { firestore } from '@/firebase/client';
import { useCollection } from 'react-firebase-hooks/firestore';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import { Post } from '@/components/portfolio/posts-section';

const postSchema = z.object({
  platform: z.enum(['LinkedIn', 'Instagram', 'Facebook', 'Other']),
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  link: z.string().url('Please enter a valid URL.'),
  image: z.string().url('Please enter a valid image URL.').optional().or(z.literal('')),
  imageHint: z.string().optional(),
});

type PostFormValues = z.infer<typeof postSchema>;

export default function ManagePosts() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const postsCollection = collection(firestore, 'posts');
  const postsQuery = query(postsCollection, orderBy('createdAt', 'desc'));
  const [postsSnapshot, postsLoading, postsError] = useCollection(postsQuery);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      platform: 'LinkedIn',
      title: '',
      description: '',
      link: '',
      image: '',
      imageHint: '',
    },
  });

  const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
    setLoading(true);
    try {
      await addDoc(postsCollection, {
        ...data,
        createdAt: serverTimestamp(),
      });
      toast({
        title: 'Post Added!',
        description: 'Your new post has been saved.',
      });
      form.reset();
    } catch (error) {
      console.error('Error adding document: ', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Could not save the post. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, 'posts', id));
      toast({
        title: 'Post Deleted',
        description: 'The post has been successfully deleted.',
      });
    } catch (error) {
      console.error('Error deleting document: ', error);
      toast({
        variant: 'destructive',
        title: 'Deletion Failed',
        description: 'Could not delete the post. Please try again.',
      });
    }
  }

  const posts = postsSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post)) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Post</CardTitle>
          <CardDescription>Fill out the form to add a new featured post.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a platform" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
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
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Post Title" {...field} />
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A short description of the post..." {...field} />
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
                    <FormLabel>Post URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/..." {...field} />
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
                    <FormLabel>Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="imageHint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image AI Hint (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 'code office'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading}>
                {loading ? 'Adding Post...' : 'Add Post'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Posts</CardTitle>
          <CardDescription>View and manage your current featured posts.</CardDescription>
        </CardHeader>
        <CardContent>
          {postsLoading && <p>Loading posts...</p>}
          {postsError && <p className="text-destructive">Error loading posts: {postsError.message}</p>}
          {!postsLoading && posts.length === 0 && <p>No posts found.</p>}
          {posts.length > 0 && (
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.platform}</TableCell>
                    <TableCell className="text-right">
                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" />
                           </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the post.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deletePost(post.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
