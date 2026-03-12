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
import { Sparkles, ClipboardCopy, FileText, AlertTriangle, Mail, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const formSchema = z.object({
  jobDescription: z.string().min(100, 'Job description must be at least 100 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function ResumeAnalyzer() {
  const [result, setResult] = useState<AnalyzeResumeAndProvideFeedbackOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setResult(null);
    try {
      const response = await analyzeResumeAndProvideFeedback(data);
      setResult(response);
    } catch (e) {
      console.error(e);
      setResult({
        latexResume: '',
        latexCoverLetter: '',
        reachOutEmail: { subject: '', body: '' },
        error: 'An unexpected error occurred during analysis. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${label} Copied!`,
      description: 'Content has been successfully copied to your clipboard.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="text-primary" />
          AI Recruitment Workplace
        </CardTitle>
        <CardDescription>
          Transform your portfolio into a high-scoring, ATS-optimized application package. Paste the job description below to generate LaTeX assets and professional reach-out strategies.
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
                    <Textarea 
                      placeholder="Paste the target job description here (minimum 100 characters)..." 
                      {...field} 
                      rows={12} 
                      className="bg-muted/10 font-sans"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? (
                <span className="flex items-center gap-2">
                   <Sparkles className="h-4 w-4 animate-spin" />
                   Generating Package...
                </span>
              ) : 'Generate Application Assets'}
            </Button>
          </form>
        </Form>

        {loading && (
          <div className="space-y-4 pt-4">
             <Skeleton className="h-10 w-full" />
             <Skeleton className="h-[400px] w-full mt-4" />
          </div>
        )}
        
        {result?.error && (
           <Alert variant="destructive" className="mt-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Generation Failed</AlertTitle>
            <AlertDescription>{result.error}</AlertDescription>
          </Alert>
        )}

        {result && !result.error && (
          <Tabs defaultValue="resume" className="mt-12 w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 border">
              <TabsTrigger value="resume" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Resume (LaTeX)
              </TabsTrigger>
              <TabsTrigger value="cover" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Cover Letter
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Reach Out
              </TabsTrigger>
            </TabsList>

            <TabsContent value="resume" className="mt-4">
              <Card className="bg-background/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">LaTeX Resume Code</CardTitle>
                    <CardDescription>Compile-ready, ATS-optimized LaTeX source.</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(result.latexResume, 'Resume LaTeX')}>
                    <ClipboardCopy className="h-5 w-5" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <Textarea
                    readOnly
                    value={result.latexResume}
                    className="h-[500px] font-mono text-[10px] bg-muted/20"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cover" className="mt-4">
              <Card className="bg-background/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">LaTeX Cover Letter</CardTitle>
                    <CardDescription>Tailored document addressing the hiring manager.</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(result.latexCoverLetter, 'Cover Letter LaTeX')}>
                    <ClipboardCopy className="h-5 w-5" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <Textarea
                    readOnly
                    value={result.latexCoverLetter}
                    className="h-[500px] font-mono text-[10px] bg-muted/20"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="email" className="mt-4">
              <Card className="bg-background/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">Reach-out Strategy</CardTitle>
                    <CardDescription>Subject and body for direct outreach.</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(`Subject: ${result.reachOutEmail.subject}\n\n${result.reachOutEmail.body}`, 'Email')}>
                    <ClipboardCopy className="h-5 w-5" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Subject Line</span>
                    <div className="rounded-md border p-3 text-sm bg-muted/30 font-medium">{result.reachOutEmail.subject}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Message Body</span>
                    <Textarea
                      readOnly
                      value={result.reachOutEmail.body}
                      className="h-[300px] text-sm bg-muted/20"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
