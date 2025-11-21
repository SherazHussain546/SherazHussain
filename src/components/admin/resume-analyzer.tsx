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
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { ThumbsUp, ThumbsDown, Sparkles, ClipboardCopy, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
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
  
  const renderFeedback = (feedback: string) => {
    const parts = feedback.split('\n');
    return parts.map((part, index) => {
      if (part.startsWith('- ')) {
        return <li key={index} className="ml-4 list-disc">{part.substring(2)}</li>;
      }
      if (part.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index}>{part}</p>;
    });
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
          AI Resume Analyzer
        </CardTitle>
        <CardDescription>
          Your portfolio content is automatically used as your resume. Paste a job description below to get an AI-powered match analysis and improvement suggestions.
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
              {loading ? 'Analyzing...' : 'Analyze'}
            </Button>
          </form>
        </Form>

        {loading && (
          <div className="space-y-4 pt-4">
             <Skeleton className="h-8 w-1/4" />
             <Skeleton className="h-4 w-1/2" />
             <Skeleton className="h-20 w-full" />
             <Skeleton className="h-40 w-full mt-4" />
          </div>
        )}
        
        {error && <p className="text-destructive pt-4">{error}</p>}

        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="bg-background/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {result.matchPercentage >= 75 ? (
                    <ThumbsUp className="text-green-500" />
                  ) : (
                    <ThumbsDown className="text-yellow-500" />
                  )}
                  Analysis Result
                </CardTitle>
                <div className="flex items-center gap-4 pt-2">
                  <Progress value={result.matchPercentage} className="w-[60%]" />
                  <span className="font-bold text-primary">{result.matchPercentage}% Match</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className={cn(
                  "rounded-md p-4 text-lg font-bold text-center",
                  result.matchPercentage >= 75 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                    : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                )}>
                  {result.feedback.startsWith("Tell me to apply!") ? "Tell me to apply!" : "Don't apply yet!"}
                </div>
                
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {renderFeedback(result.feedback.substring(result.feedback.indexOf('\n') + 1))}
                </div>
              </CardContent>
            </Card>

             <Card className="bg-background/50">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="text-primary" />
                    Updated Resume
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(result.updatedResume)}>
                    <ClipboardCopy className="h-5 w-5" />
                  </Button>
                </div>
                <CardDescription>
                  Here is an AI-optimized version of your portfolio content tailored for this job application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  readOnly
                  value={result.updatedResume}
                  className="h-96 text-xs bg-muted/20"
                />
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
