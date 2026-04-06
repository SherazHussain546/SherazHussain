
'use client';

import { useMemo } from 'react';
import { collection, query, orderBy, CollectionReference, DocumentData } from 'firebase/firestore';
import { useFirestore, useMemoFirebase, useCollection } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Activity, 
  Users, 
  MousePointer2, 
  TrendingUp, 
  Globe,
  ArrowUpRight,
  AlertCircle,
  Zap,
  Target
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Bar, 
  BarChart as RechartsBarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AnalyticsEvent } from '@/types/database';

/**
 * AnalyticsDashboard - High-Fidelity Visitor Tracking Visualization.
 * Uses real-time Firestore synchronization to display system-wide engagement metrics.
 */
export default function AnalyticsDashboard() {
  const firestore = useFirestore();

  const analyticsCollection = useMemo(() => {
    return firestore ? collection(firestore, 'analyticsEvents') as CollectionReference<DocumentData> : null;
  }, [firestore]);

  const analyticsQuery = useMemoFirebase(() => {
    return analyticsCollection ? query(analyticsCollection, orderBy('timestamp', 'desc')) : null;
  }, [analyticsCollection]);

  const { data: events, isLoading: loading, error } = useCollection<AnalyticsEvent>(analyticsQuery);

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

  const allEvents = events || [];
  const totalViews = allEvents.length;
  const sessions = new Set(allEvents.map(e => e.sessionId)).size;
  const viewsPerSession = sessions > 0 ? (totalViews / sessions).toFixed(1) : 0;

  // A/B Test Processing
  const abStats = allEvents.reduce((acc: { A: number, B: number }, event) => {
    if (event.testGroup === 'A') acc.A++;
    if (event.testGroup === 'B') acc.B++;
    return acc;
  }, { A: 0, B: 0 });

  const abData = [
    { name: 'Group A (Frontier)', value: abStats.A, fill: 'hsl(var(--primary))' },
    { name: 'Group B (Supremacy)', value: abStats.B, fill: 'hsl(var(--secondary))' }
  ];

  const pathCounts = allEvents.reduce((acc: { [key: string]: number }, event: AnalyticsEvent) => {
    const path = event.path || '/';
    acc[path] = (acc[path] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(pathCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const recentEvents = allEvents.slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card shadow-sm">
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

        <Card className="bg-card shadow-sm">
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

        <Card className="bg-card shadow-sm border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Group B Conversion</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalViews > 0 ? ((abStats.B / totalViews) * 100).toFixed(1) : 0}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Relative engagement rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Views per Session</CardTitle>
            <MousePointer2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{viewsPerSession}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Engagement depth
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
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Strategy Performance
            </CardTitle>
            <CardDescription>A/B Test Group Distribution</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex flex-col justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={abData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {abData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {abData.map(group => (
                <div key={group.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: group.fill }} />
                    {group.name}
                  </span>
                  <span className="font-bold">{group.value} views</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Real-time Feed</CardTitle>
          <CardDescription>Most recent user activity</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px] uppercase tracking-wider">Path</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider">Group</TableHead>
                <TableHead className="text-right text-[10px] uppercase tracking-wider">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEvents.map((event: AnalyticsEvent) => (
                <TableRow key={event.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-mono text-[11px] max-w-[150px] truncate">
                    {event.path}
                  </TableCell>
                  <TableCell>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${event.testGroup === 'B' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
                      {event.testGroup || 'N/A'}
                    </span>
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
  );
}
