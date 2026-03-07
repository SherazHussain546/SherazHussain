
'use client';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/firebase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ResumeAnalyzer from './resume-analyzer';
import { LogOut, LayoutDashboard, FileText, Send, Settings, LineChart, Briefcase } from 'lucide-react';
import AnalyticsDashboard from './analytics/analytics-dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ManagePosts from './manage-posts';
import SiteSettings from './site-settings';
import LinkedInPostGenerator from './linkedin-post-generator';
import ManageWorkflows from './manage-workflows';

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
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your portfolio and AI tools.</p>
        </div>
        <Button variant="ghost" onClick={handleLogout} className="text-destructive hover:bg-destructive/10">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="workplace" className="w-full">
        <TabsList className="grid w-full grid-cols-6 h-auto p-1 bg-muted/50 border">
          <TabsTrigger value="workplace" className="flex items-center gap-2 py-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Workplace</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 py-2">
            <LineChart className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="resume" className="flex items-center gap-2 py-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Resume</span>
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="flex items-center gap-2 py-2">
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">LinkedIn</span>
          </TabsTrigger>
          <TabsTrigger value="posts" className="flex items-center gap-2 py-2">
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Posts</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2 py-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <TabsContent value="workplace">
            <ManageWorkflows />
          </TabsContent>
          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
          <TabsContent value="resume">
            <ResumeAnalyzer />
          </TabsContent>
          <TabsContent value="linkedin">
            <LinkedInPostGenerator />
          </TabsContent>
          <TabsContent value="posts">
            <ManagePosts />
          </TabsContent>
          <TabsContent value="settings">
            <SiteSettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
