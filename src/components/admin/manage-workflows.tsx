'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addDoc, collection, serverTimestamp, deleteDoc, doc, query, orderBy, CollectionReference, DocumentData } from 'firebase/firestore';
import { firestore } from '@/firebase/client';
import { useCollection } from 'react-firebase-hooks/firestore';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { BrainCircuit, Trash2, FileJson, Play, Terminal, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const workflowSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  description: z.string().optional(),
  json: z.string().refine((val) => {
    try {
      JSON.parse(val);
      return true;
    } catch (e) {
      return false;
    }
  }, 'Invalid JSON format.'),
});

type WorkflowFormValues = z.infer<typeof workflowSchema>;

export default function ManageWorkflows() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedJson, setSelectedJson] = useState<any>(null);

  // High-Fidelity Guard: Ensure firestore is initialized before creating references
  const workflowsCollection = useMemo(() => {
    return firestore ? collection(firestore, 'workflows') as CollectionReference<DocumentData> : null;
  }, []);

  const workflowsQuery = useMemo(() => {
    return workflowsCollection ? query(workflowsCollection, orderBy('createdAt', 'desc')) : null;
  }, [workflowsCollection]);

  const [snapshot, workflowsLoading] = useCollection(workflowsQuery);

  const form = useForm<WorkflowFormValues>({
    resolver: zodResolver(workflowSchema),
    defaultValues: {
      name: '',
      description: '',
      json: '',
    },
  });

  const onSubmit = async (data: WorkflowFormValues) => {
    if (!workflowsCollection) return;
    setLoading(true);
    try {
      await addDoc(workflowsCollection, {
        ...data,
        createdAt: serverTimestamp(),
        isActive: true,
      });
      toast({
        title: 'Workflow Imported!',
        description: 'Your n8n workflow has been added to the workplace.',
      });
      form.reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Import Failed',
        description: 'Could not save the workflow.',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkflow = async (id: string) => {
    if (!firestore) return;
    await deleteDoc(doc(firestore, 'workflows', id));
    toast({ title: 'Workflow Deleted' });
  };

  if (!firestore) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Configuration Missing</AlertTitle>
        <AlertDescription>
          Firebase is not configured. Workflow management is currently offline.
        </AlertDescription>
      </Alert>
    );
  }

  const workflows = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileJson className="text-primary" />
              Import n8n Workflow
            </CardTitle>
            <CardDescription>
              Paste the JSON code from your n8n workflow to integrate its logic.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workflow Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. LinkedIn Generator" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="json"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>n8n JSON Code</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder='{"name": "...", "nodes": [...] }' 
                          className="font-mono text-xs h-64" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Copy your workflow JSON and paste it here.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Importing...' : 'Add to Workplace'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Workplace</CardTitle>
            <CardDescription>Manage and execute your imported workflows.</CardDescription>
          </CardHeader>
          <CardContent>
            {workflowsLoading ? (
              <p>Loading workplace...</p>
            ) : workflows.length === 0 ? (
              <p className="text-muted-foreground italic">No workflows imported yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workflows.map((wf: any) => (
                    <TableRow key={wf.id}>
                      <TableCell className="font-medium">{wf.name}</TableCell>
                      <TableCell className="text-right flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setSelectedJson(JSON.parse(wf.json))}
                          title="View Details"
                        >
                          <Terminal className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-primary" title="Run Flow">
                          <Play className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Workflow?</AlertDialogTitle>
                              <AlertDialogDescription>This will remove the workflow logic from your workplace.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteWorkflow(wf.id)}>Delete</AlertDialogAction>
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

        {selectedJson && (
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="text-lg">Workflow Interpreter</CardTitle>
              <CardDescription>Detected components in this logic:</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedJson.nodes?.map((node: any) => (
                  <div key={node.id} className="flex items-center gap-3 rounded-md border p-2 text-xs">
                    <BrainCircuit className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-bold">{node.name}</p>
                      <p className="text-muted-foreground uppercase">{node.type.split('.').pop()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}