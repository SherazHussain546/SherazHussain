
'use client';

import { useEffect, useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy } from 'firebase/firestore';
import { firestore } from '@/firebase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Activity, 
  Users, 
  MousePointer2, 
  TrendingUp, 
  Globe,
  ArrowUpRight
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
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

export default function AnalyticsDashboard() {
  const analyticsCollection = useMemo(() => collection(firestore, 'analyticsEvents'), []);
  const analyticsQuery = useMemo(() => query(analyticsCollection, orderBy('timestamp', 'desc')), [analyticsCollection]);
  const [snapshot, loading, error] = useCollection(analyticsQuery);

  useEffect(() => {
    // Only emit error if confirmed permission denial and not loading
    if (error && error.code === 'permission-denied' && !loading) {
      const permissionError = new FirestorePermissionError({
        path: analyticsCollection.path,
        operation: 'list',
      } satisfies SecurityRuleContext);
      errorEmitter.emit('permission-error', permissionError);
    }
  }, [error, loading, analyticsCollection.path]);

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

  if (error && error.code === 'permission-denied') {
    return <p className="text-destructive">Insufficient permissions to view analytics. Please contact an administrator.</p>;
  }

  const events = snapshot?.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as any)
  })) || [];

  // 1. Basic Metrics
  const totalViews = events.length;
  const sessions = new Set(events.map(e => e.sessionId)).size;
  const viewsPerSession = sessions > 0 ? (totalViews / sessions).toFixed(1) : 0;

  // 2. Page Popularity Data (for Chart)
  const pathCounts = events.reduce((acc: { [key: string]: number }, event: any) => {
    const path = event.path || '/';
    acc[path] = (acc[path] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(pathCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Top 5 pages

  // 3. Recent Events
  const recentEvents = events.slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
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
              {chartData[0]?.value || 0} views today
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Page Views Chart */}
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

        {/* Recent Events List */}
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
