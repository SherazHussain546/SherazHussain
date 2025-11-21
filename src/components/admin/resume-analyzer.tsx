'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { analyzeResumeAndProvideFeedback, AnalyzeResumeAndProvideFeedbackOutput } from '@/ai/flows/analyze-resume-and-provide-feedback';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, ClipboardCopy, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  jobDescription: z.string().min(100, 'Job description must be at least 100 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function ResumeAnalyzer() {
  const [result, setResult] = useState<AnalyzeResumeAndProvideFeedbackOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await analyzeResumeAndProvideFeedback(data);
      setResult(response);
    } catch (e) {
      setError('An error occurred during analysis. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
      description: 'The updated resume has been copied to your clipboard.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="text-primary" />
          AI Resume Generator
        </CardTitle>
        <CardDescription>
          Your portfolio content is automatically used as your resume. Paste a job description below, and the AI will generate a first-class, tailored resume that is optimized for Applicant Tracking Systems (ATS).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Paste the full job description here..." {...field} rows={15} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Generating...' : 'Generate Resume'}
            </Button>
          </form>
        </Form>

        {loading && (
          <div className="space-y-4 pt-4">
             <Skeleton className="h-8 w-1/4" />
             <Skeleton className="h-4 w-1/2" />
             <Skeleton className="h-64 w-full mt-4" />
          </div>
        )}
        
        {error && <p className="text-destructive pt-4">{error}</p>}

        {result && (
           <Card className="bg-background/50 mt-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="text-primary" />
                  Your Tailored Resume
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(result.updatedResume)}>
                  <ClipboardCopy className="h-5 w-5" />
                </Button>
              </div>
              <CardDescription>
                Here is the AI-optimized version of your resume, tailored specifically for this job application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                readOnly
                value={result.updatedResume}
                className="h-[500px] text-xs bg-muted/20"
              />
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
