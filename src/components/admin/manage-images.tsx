'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { collection, onSnapshot, serverTimestamp, query, orderBy, Timestamp, doc } from 'firebase/firestore';
import { useFirestore, addDocumentNonBlocking, useMemoFirebase, deleteDocumentNonBlocking } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Trash2, Image as ImageIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Image from 'next/image';


const imageSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  url: z.string().url('Please enter a valid URL.'),
  section: z.string().min(3, 'Section must be at least 3 characters.'),
});

type ImageFormValues = z.infer<typeof imageSchema>;

export interface ImageDocument extends ImageFormValues {
    id: string;
    createdAt: Timestamp;
}

export default function ManageImages() {
  const [images, setImages] = useState<ImageDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const db = useFirestore();

  const form = useForm<ImageFormValues>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      title: '',
      url: '',
      section: 'post',
    },
  });

  const imagesQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'images'), orderBy('createdAt', 'desc'));
  }, [db]);

  useEffect(() => {
    if (!imagesQuery) return;
    
    const unsubscribe = onSnapshot(imagesQuery, (snapshot) => {
      const fetchedImages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ImageDocument));
      setImages(fetchedImages);
    }, (err) => {
        console.error("Error fetching images: ", err);
        setError("Failed to fetch images.");
    });

    return () => unsubscribe();
  }, [imagesQuery]);
  
  const handleDelete = (imageId: string) => {
    if(!db) return;
    deleteDocumentNonBlocking(doc(db, 'images', imageId));
    toast({
      title: 'Image Deleted',
      description: 'The image has been successfully removed.',
    });
  };

  const onSubmit = async (data: ImageFormValues) => {
    if(!db) return;
    setLoading(true);
    setError(null);
    
    addDocumentNonBlocking(collection(db, 'images'), {
      ...data,
      createdAt: serverTimestamp(),
    });
    toast({
      title: 'Image Added!',
      description: 'Your new image has been submitted for saving.',
    });
    
    form.reset();
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Add New Image</CardTitle>
            <CardDescription>Add a new image to your portfolio collection.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Project Showcase" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.png" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="section"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section</FormLabel>
                       <FormControl>
                        <Input placeholder="e.g., 'post', 'project'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Add Image'}
                  </Button>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card>
            <CardHeader>
                <CardTitle>Image Collection</CardTitle>
                <CardDescription>A list of all images in your portfolio.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Preview</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Section</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {images.length > 0 ? (
                            images.map(image => (
                                <TableRow key={image.id}>
                                    <TableCell>
                                      <div className="relative h-12 w-20 rounded-md overflow-hidden">
                                        <Image src={image.url} alt={image.title} fill className="object-cover" />
                                      </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{image.title}</TableCell>
                                    <TableCell>{image.section}</TableCell>
                                    <TableCell>{image.createdAt ? new Date(image.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}</TableCell>
                                    <TableCell className="text-right space-x-1">
                                        <AlertDialog>
                                          <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </AlertDialogTrigger>
                                          <AlertDialogContent>
                                            <AlertDialogHeader>
                                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                              <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete the image data.
                                              </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                                              <AlertDialogAction onClick={() => handleDelete(image.id)} className="bg-destructive hover:bg-destructive/90">
                                                Delete
                                              </AlertDialogAction>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">No images found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
