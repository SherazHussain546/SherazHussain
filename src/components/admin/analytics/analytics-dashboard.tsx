'use client';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Eye, Globe, Clock, Smartphone, Computer, BarChart2 } from 'lucide-react';
import { VisitsOverTimeChart } from './visits-over-time-chart';
import { TopSectionsChart } from './top-sections-chart';
import { DeviceBrowserChart } from './device-browser-chart';
import { GeoTable } from './geo-table';
import { subDays } from 'date-fns';

interface AnalyticsData {
  id: string;
  timestamp: Timestamp;
  userId: string;
  path: string;
  device: string;
  browser: string;
  country: string;
  city: string;
  sessionDuration: number;
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const thirtyDaysAgo = subDays(new Date(), 30);
    const q = query(
      collection(db, 'analytics'),
      where('timestamp', '>=', thirtyDaysAgo)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AnalyticsData));
      setData(docs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching analytics data: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const totalPageViews = data.length;
  const totalUniqueVisits = new Set(data.map(d => d.userId)).size;
  const totalDuration = data.reduce((acc, curr) => acc + (curr.sessionDuration || 0), 0);
  const averageTimeSpent = totalUniqueVisits > 0 ? (totalDuration / totalUniqueVisits) / 60 : 0; // in minutes

  const visitsOverTime = data.reduce((acc, curr) => {
    const date = curr.timestamp.toDate().toLocaleDateString('en-CA'); // YYYY-MM-DD
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedVisits = Object.entries(visitsOverTime)
    .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
    .map(([date, visits]) => ({ date, visits }));

  const topSections = data.reduce((acc, curr) => {
    const section = curr.path.startsWith('/#') ? curr.path.substring(2) : 'home';
    const capitalizedSection = section.charAt(0).toUpperCase() + section.slice(1);
    acc[capitalizedSection] = (acc[capitalizedSection] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const deviceData = data.reduce((acc, curr) => {
    const device = curr.device || 'Unknown';
    acc[device] = (acc[device] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const browserData = data.reduce((acc, curr) => {
    const browser = curr.browser || 'Unknown';
    acc[browser] = (acc[browser] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const geoData = data.reduce((acc, curr) => {
    const location = `${curr.city || 'Unknown'}, ${curr.country || 'Unknown'}`;
    if (!acc.some(item => item.location === location)) {
        acc.push({
            location,
            country: curr.country || 'Unknown',
            city: curr.city || 'Unknown',
            visits: 0
        });
    }
    const locationIndex = acc.findIndex(item => item.location === location);
    acc[locationIndex].visits++;
    return acc;
  }, [] as { location: string; country: string; city: string, visits: number }[]).sort((a,b) => b.visits - a.visits);

  if (loading) {
    return <p>Loading analytics...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPageViews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Unique Visits</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUniqueVisits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageTimeSpent.toFixed(2)} min</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <VisitsOverTimeChart data={sortedVisits} />
        <TopSectionsChart data={Object.entries(topSections).map(([name, value]) => ({ name, value }))} />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <DeviceBrowserChart title="Device Breakdown" data={Object.entries(deviceData).map(([name, value]) => ({ name, value }))} />
        <DeviceBrowserChart title="Browser Breakdown" data={Object.entries(browserData).map(([name, value]) => ({ name, value }))} />
        <GeoTable data={geoData} />
      </div>
    </div>
  );
}
