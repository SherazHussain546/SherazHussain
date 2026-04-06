
'use client';

import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ResumeAnalyzer from './resume-analyzer';
import { LogOut, LayoutDashboard, FileText, Settings, LineChart, BookOpen, Briefcase, Award, FolderKanban, GraduationCap } from 'lucide-react';
import AnalyticsDashboard from './analytics/analytics-dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ManagePosts from './manage-posts';
import SiteSettings from './site-settings';
import ManageArticles from './manage-articles';
import ManageExperience from './manage-experience';
import ManageCertifications from './manage-certifications';
import ManageProjects from './manage-projects';
import ManageEducation from './manage-education';

export default function Dashboard() {
  const { toast } = useToast();
  
  const handleLogout = async () => {
    if (!auth) return;
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
          <p className="text-muted-foreground">Manage your portfolio and dynamic technical assets.</p>
        </div>
        <Button variant="ghost" onClick={handleLogout} className="text-destructive hover:bg-destructive/10">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:grid-cols-9 h-auto p-1 bg-muted/50 border mb-8">
          <TabsTrigger value="analytics" className="flex items-center gap-2 py-2">
            <LineChart className="h-4 w-4" />
            <span className="hidden sm:inline">Metrics</span>
          </TabsTrigger>
          <TabsTrigger value="experience" className="flex items-center gap-2 py-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Exp</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2 py-2">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Edu</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2 py-2">
            <FolderKanban className="h-4 w-4" />
            <span className="hidden sm:inline">Proj</span>
          </TabsTrigger>
          <TabsTrigger value="certs" className="flex items-center gap-2 py-2">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Certs</span>
          </TabsTrigger>
          <TabsTrigger value="posts" className="flex items-center gap-2 py-2">
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Social</span>
          </TabsTrigger>
          <TabsTrigger value="library" className="flex items-center gap-2 py-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Registry</span>
          </TabsTrigger>
          <TabsTrigger value="resume" className="flex items-center gap-2 py-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">AI Resume</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2 py-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Sys</span>
          </TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
          <TabsContent value="experience">
            <ManageExperience />
          </TabsContent>
          <TabsContent value="education">
            <ManageEducation />
          </TabsContent>
          <TabsContent value="projects">
            <ManageProjects />
          </TabsContent>
          <TabsContent value="certs">
            <ManageCertifications />
          </TabsContent>
          <TabsContent value="posts">
            <ManagePosts />
          </TabsContent>
          <TabsContent value="library">
            <ManageArticles />
          </TabsContent>
          <TabsContent value="resume">
            <ResumeAnalyzer />
          </TabsContent>
          <TabsContent value="settings">
            <SiteSettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
