'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateLinkedInPost, LinkedInPostOutput } from '@/ai/flows/generate-linkedin-post';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, ClipboardCopy, Send, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  postDescription: z.string().min(10, 'Description must be at least 100 characters.'),
  instructions: z.string().min(5, 'Instructions are required.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function LinkedInPostGenerator() {
  const [result, setResult] = useState<LinkedInPostOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postDescription: '',
      instructions: 'Write an engaging post about this. Use bullet points and add a call to action at the end.',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setResult(null);
    try {
      const response = await generateLinkedInPost(data);
      setResult(response);
      toast({
        title: 'Post Generated!',
        description: 'Your LinkedIn post is ready for review.',
      });
    } catch (e) {
      console.error(e);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (result?.postContent) {
      navigator.clipboard.writeText(result.postContent);
      toast({
        title: 'Copied!',
        description: 'Post content copied to clipboard.',
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-primary" />
            LinkedIn Post Generator
          </CardTitle>
          <CardDescription>
            Based on your AI workflow logic. Enter a description and instructions to generate a high-performing LinkedIn post.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="postDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What is this post about? (e.g., I just launched a new feature...)" 
                        {...field} 
                        rows={5} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructions</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Additional instructions (e.g., Make it professional, add specific hashtags...)" 
                        {...field} 
                        rows={3} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Generating...' : 'Generate Post'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {loading && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-lg">Generated Content</CardTitle>
              <CardDescription>Review and copy your post below.</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCopyToClipboard}>
              <ClipboardCopy className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Textarea
              readOnly
              value={result.postContent}
              className="min-h-[200px] bg-background/50 text-sm leading-relaxed"
            />
          </CardContent>
        </Card>
      )}

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Automation Note</AlertTitle>
        <AlertDescription>
          To run this daily as requested in your workflow, you can trigger the <code>generateLinkedInPost</code> flow via a serverless cron job.
        </AlertDescription>
      </Alert>
    </div>
  );
}
