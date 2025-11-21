'use client';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/firebase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ResumeAnalyzer from './resume-analyzer';
import { LogOut } from 'lucide-react';
import AnalyticsDashboard from './analytics/analytics-dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ManagePosts from './manage-posts';

const auth = getAuth(app);

export default function Dashboard() {
  const { toast } = useToast();
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: 'An error occurred while logging out.',
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="resume">Resume Analyzer</TabsTrigger>
          <TabsTrigger value="posts">Manage Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>
        <TabsContent value="resume">
          <ResumeAnalyzer />
        </TabsContent>
        <TabsContent value="posts">
          <ManagePosts />
        </TabsContent>
      </Tabs>
    </div>
  );
}
