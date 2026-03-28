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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Trash2, Pencil, AlertCircle } from 'lucide-react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const goalSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  iconName: z.enum(['Cpu', 'Globe', 'ShieldCheck', 'Target', 'Zap', 'Heart']),
  order: z.preprocess((val) => Number(val), z.number().min(0)),
});

type GoalFormValues = z.infer<typeof goalSchema>;

export default function ManageGoals() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<any>(null);

  // High-Fidelity Guard: Ensure firestore is initialized before creating collection reference
  const goalsCollection = useMemo(() => {
    return firestore ? collection(firestore, 'projectGoals') as CollectionReference<DocumentData> : null;
  }, []);

  const goalsQuery = useMemo(() => {
    return goalsCollection ? query(goalsCollection, orderBy('order', 'asc')) : null;
  }, [goalsCollection]);

  const [goalsSnapshot, goalsLoading, goalsError] = useCollection(goalsQuery);

  useEffect(() => {
    if (goalsError && goalsError.code === 'permission-denied' && !goalsLoading && !authLoading && goalsCollection) {
      const permissionError = new FirestorePermissionError({
        path: goalsCollection.path,
        operation: 'list',
      } satisfies SecurityRuleContext);
      errorEmitter.emit('permission-error', permissionError);
    }
  }, [goalsError, goalsLoading, authLoading, goalsCollection]);

  const form = useForm<GoalFormValues>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: '',
      description: '',
      iconName: 'Target',
      order: 0,
    },
  });
  
  const editForm = useForm<GoalFormValues>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: '',
      description: '',
      iconName: 'Target',
      order: 0,
    },
  });

  const onSubmit: SubmitHandler<GoalFormValues> = async (data) => {
    if (!goalsCollection) return;
    setLoading(true);
    addDoc(goalsCollection, {
      ...data,
      createdAt: serverTimestamp(),
    })
    .catch(async (serverError) => {
      if (serverError.code === 'permission-denied') {
        const permissionError = new FirestorePermissionError({
          path: goalsCollection.path,
          operation: 'create',
          requestResourceData: data,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      }
    })
    .then(() => {
      toast({
        title: 'Goal Added!',
        description: 'Your new project goal has been saved.',
      });
      form.reset();
    })
    .finally(() => setLoading(false));
  };

  const onEditSubmit: SubmitHandler<GoalFormValues> = async (data) => {
    if (!editingGoal || !firestore) return;
    setLoading(true);
    const goalRef = doc(firestore, 'projectGoals', editingGoal.id);
    updateDoc(goalRef, data)
    .catch(async (serverError) => {
      if (serverError.code === 'permission-denied') {
        const permissionError = new FirestorePermissionError({
          path: goalRef.path,
          operation: 'update',
          requestResourceData: data,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      }
    })
    .then(() => {
      toast({
        title: 'Goal Updated!',
        description: 'Goal successfully updated.',
      });
      setIsEditDialogOpen(false);
      setEditingGoal(null);
    })
    .finally(() => setLoading(false));
  };

  const deleteGoal = async (id: string) => {
    if (!firestore) return;
    const goalRef = doc(firestore, 'projectGoals', id);
    deleteDoc(goalRef)
    .catch(async (serverError) => {
      if (serverError.code === 'permission-denied') {
        const permissionError = new FirestorePermissionError({
          path: goalRef.path,
          operation: 'delete',
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      }
    })
    .then(() => {
      toast({ title: 'Goal Deleted' });
    });
  }
  
  const openEditDialog = (goal: any) => {
    setEditingGoal(goal);
    editForm.reset({
        ...goal,
    });
    setIsEditDialogOpen(true);
  }

  if (!firestore) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Configuration Missing</AlertTitle>
        <AlertDescription>
          Firebase is not configured. Goal management is currently offline.
        </AlertDescription>
      </Alert>
    );
  }

  const goals = goalsSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Add Project Goal</CardTitle>
          <CardDescription>Define a new technical milestone for the support page.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. AI Compute Scaling" {...field} />
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
                      <Textarea placeholder="Explain what this goal achieves..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="iconName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an icon" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Cpu">CPU (Hardware)</SelectItem>
                          <SelectItem value="Globe">Globe (Network)</SelectItem>
                          <SelectItem value="ShieldCheck">Shield (Security)</SelectItem>
                          <SelectItem value="Target">Target (Strategy)</SelectItem>
                          <SelectItem value="Zap">Zap (Performance)</SelectItem>
                          <SelectItem value="Heart">Heart (Community)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Goal'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Goals</CardTitle>
          <CardDescription>Manage goals appearing on your support hub.</CardDescription>
        </CardHeader>
        <CardContent>
          {goalsLoading && <p className="text-sm text-muted-foreground animate-pulse">Synchronizing goals...</p>}
          {!goalsLoading && goals.length === 0 && <p className="text-muted-foreground italic">No goals added yet.</p>}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {goals.map((goal: any) => (
                <TableRow key={goal.id}>
                  <TableCell className="font-mono">{goal.order}</TableCell>
                  <TableCell className="font-medium">{goal.title}</TableCell>
                  <TableCell className="text-right">
                     <Button variant="ghost" size="icon" onClick={() => openEditDialog(goal)}>
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
                          <AlertDialogTitle>Delete this goal?</AlertDialogTitle>
                          <AlertDialogDescription>This will remove it from the support page instantly.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteGoal(goal.id)}>Delete</AlertDialogAction>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project Goal</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4 py-4">
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="iconName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Cpu">CPU</SelectItem>
                          <SelectItem value="Globe">Globe</SelectItem>
                          <SelectItem value="ShieldCheck">Shield</SelectItem>
                          <SelectItem value="Target">Target</SelectItem>
                          <SelectItem value="Zap">Zap</SelectItem>
                          <SelectItem value="Heart">Heart</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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