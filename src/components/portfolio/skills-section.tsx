'use client';

import { useState } from 'react';
import { skills } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

type Category = keyof typeof skills | 'All';

const typedSkills = skills as Record<string, { icon: LucideIcon; items: string[] }>;

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const categories: Category[] = ['All', ...Object.keys(typedSkills) as (keyof typeof skills)[]];

  return (
    <section id="skills" className="bg-card py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Technical <span className="text-primary">Skills</span>
        </h2>
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'secondary'}
              onClick={() => setActiveCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(activeCategory === 'All' ? Object.entries(typedSkills) : [[activeCategory, typedSkills[activeCategory as keyof typeof skills]]]).map(([categoryName, categoryData]) => (
            <Card key={categoryName} className="flex flex-col bg-background/50 transition-all hover:shadow-primary/20 hover:shadow-lg">
              <CardHeader className="flex-row items-center gap-4">
                <categoryData.icon className="h-8 w-8 text-primary" />
                <CardTitle>{categoryName}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {categoryData.items.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
