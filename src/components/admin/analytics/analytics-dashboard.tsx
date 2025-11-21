'use client';

import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query } from 'firebase/firestore';
import { firestore } from '@/firebase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, BarChart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AnalyticsDashboard() {
  const analyticsQuery = query(collection(firestore, 'analyticsEvents'));
  const [snapshot, loading, error] = useCollection(analyticsQuery);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
            <AreaChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="mt-1 h-4 w-1/3" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visits</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="mt-1 h-4 w-1/3" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return <p className="text-destructive">Error loading analytics: {error.message}</p>;
  }

  const pageViews = snapshot?.docs.length || 0;
  const uniqueVisitors = snapshot
    ? new Set(snapshot.docs.map((doc) => doc.data().sessionId)).size
    : 0;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
          <AreaChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pageViews.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Live data from your site</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique Visits</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueVisitors.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Based on browser session</p>
        </CardContent>
      </Card>
    </div>
  );
}
