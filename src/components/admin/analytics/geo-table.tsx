'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Globe } from 'lucide-react';

interface GeoData {
  location: string;
  city: string;
  country: string;
  visits: number;
}

interface GeoTableProps {
  data: GeoData[];
}

export function GeoTable({ data }: GeoTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Visitor Locations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Visits</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.slice(0, 7).map((item) => (
              <TableRow key={item.location}>
                <TableCell>{item.location}</TableCell>
                <TableCell className="text-right">{item.visits}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
