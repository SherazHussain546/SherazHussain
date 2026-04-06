'use client';

import { useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy, CollectionReference, DocumentData } from 'firebase/firestore';
import { firestore } from '@/firebase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Activity, 
  Users, 
  MousePointer2, 
  TrendingUp, 
  Globe,
  ArrowUpRight,
  AlertCircle
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Bar, 
  BarChart as RechartsBarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip,
  Cell
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

/**
 * AnalyticsDashboard - High-Fidelity Visitor Tracking Visualization.
 * Uses real-time Firestore listeners to display system-wide engagement metrics.
 */
export default function AnalyticsDashboard() {
  // Memoize Firestore references to ensure stable technical integrity during re-renders
  const analyticsCollection = useMemo(() => {
    return firestore ? collection(firestore, 'analyticsEvents') as CollectionReference<DocumentData> : null;
  }, []);

  const analyticsQuery = useMemo(() => {
    return analyticsCollection ? query(analyticsCollection, orderBy('timestamp', 'desc')) : null;
  }, [analyticsCollection]);

  // Hook handles permission error emission internally via custom useCollection logic
  const [snapshot, loading, error] = useCollection(analyticsQuery);

  if (!firestore) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Configuration Missing</AlertTitle>
        <AlertDescription>
          Firebase is not configured. Analytics tracking is currently offline.
        </AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
                <Skeleton className="mt-2 h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Skeleton className="h-[350px] w-full rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Access Restriction</AlertTitle>
        <AlertDescription>
          {error.message || 'Insufficient permissions to view visitor metrics. Verify your administrative credentials.'}
        </AlertDescription>
      </Alert>
    );
  }

  const events = snapshot?.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as any)
  })) || [];

  const totalViews = events.length;
  const sessions = new Set(events.map(e => e.sessionId)).size;
  const viewsPerSession = sessions > 0 ? (totalViews / sessions).toFixed(1) : 0;

  const pathCounts = events.reduce((acc: { [key: string]: number }, event: any) => {
    const path = event.path || '/';
    acc[path] = (acc[path] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(pathCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const recentEvents = events.slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              Lifetime interactions
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Sessions</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sessions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <Globe className="h-3 w-3" />
              Distinct browsers
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Views per Session</CardTitle>
            <MousePointer2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{viewsPerSession}</div>
            <p className="text-xs text-muted-foreground mt-1">
              User engagement depth
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Active Route</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold truncate">
              {chartData[0]?.name || '/'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {chartData[0]?.value || 0} views total
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Content Distribution</CardTitle>
            <CardDescription>Views by top-performing paths</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={100} 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                />
                <RechartsTooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(var(--primary) / ${1 - index * 0.15})`} />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Real-time Feed</CardTitle>
            <CardDescription>Most recent user activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px] uppercase tracking-wider">Path</TableHead>
                  <TableHead className="text-right text-[10px] uppercase tracking-wider">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentEvents.map((event: any) => (
                  <TableRow key={event.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-mono text-[11px] max-w-[150px] truncate">
                      {event.path}
                    </TableCell>
                    <TableCell className="text-right text-[11px] text-muted-foreground whitespace-nowrap">
                      {event.timestamp ? formatDistanceToNow(event.timestamp.toDate(), { addSuffix: true }) : 'Just now'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}