'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { getArchitectAdvice, AIArchitectOutput } from '@/ai/flows/ai-architect-flow';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cpu, Layers, ListChecks, ArrowRight, BrainCircuit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  problemDescription: z.string().min(20, 'Please describe your challenge in more detail (min 20 chars).'),
});

export default function AIArchitectPage() {
  const [result, setResult] = useState<AIArchitectOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problemDescription: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    setResult(null);
    try {
      const response = await getArchitectAdvice(data);
      setResult(response);
      toast({
        title: 'Architecture Generated!',
        description: 'Review your custom-engineered roadmap below.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'The AI architect is currently busy. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFB]">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <Badge variant="outline" className="mb-6 px-4 py-1 text-[10px] font-bold uppercase tracking-widest border-primary/40 text-primary">
              SYNC TECH AI WORKPLACE
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl mb-6">
              AI Solution <span className="text-primary">Architect</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Describe your project or technical bottleneck. Our Gemini-powered engine will provide a high-level cloud architecture and tech stack recommendation based on SYNC TECH standards.
            </p>
          </div>

          <div className="mx-auto max-w-5xl grid gap-12 lg:grid-cols-2">
            <Card className="h-fit shadow-xl border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-primary" />
                  Project Blueprint
                </CardTitle>
                <CardDescription>Enter the specifics of your technical challenge.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="problemDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Challenge Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="e.g. I need to build a high-concurrency real-time bidding platform for NFTs with low latency..." 
                              className="min-h-[200px] bg-muted/5 focus:bg-white transition-colors"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full h-12 text-md font-bold" disabled={loading}>
                      {loading ? (
                        <>
                          <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                          Architecting...
                        </>
                      ) : (
                        <>
                          Generate Strategy
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <Card className="border-primary/20 bg-primary/5 shadow-2xl">
                    <CardHeader className="border-b bg-white/50 backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl flex items-center gap-2">
                          <Cpu className="h-5 w-5 text-primary" />
                          Strategic Response
                        </CardTitle>
                        <Badge variant="secondary" className="bg-primary/20 text-primary font-bold">
                          {result.complexity} Complexity
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-8">
                      <div className="space-y-3">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">High-Level Architecture</h3>
                        <p className="text-sm leading-relaxed text-foreground/80 font-light whitespace-pre-wrap">
                          {result.architecture}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Recommended Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {result.stack.map((tech) => (
                            <Badge key={tech} variant="outline" className="bg-white/50 border-primary/10">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Initial Execution Steps</h3>
                        <div className="space-y-3">
                          {result.initialSteps.map((step, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/40 border border-primary/5">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold">
                                {i + 1}
                              </span>
                              <span className="text-sm font-medium">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-muted p-12 text-center opacity-40">
                  <Layers className="h-16 w-16 mb-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Awaiting project details to generate strategic blueprint.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
