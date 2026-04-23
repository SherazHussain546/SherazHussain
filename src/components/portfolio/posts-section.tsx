
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, ArrowRight, Rss, Instagram, Facebook, Github } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { collection, query, orderBy, Timestamp, CollectionReference, DocumentData } from 'firebase/firestore';
import { useFirestore, useMemoFirebase, useCollection } from '@/firebase';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Post } from '@/types/database';
import { cn } from '@/lib/utils';

const platformIcons: { [key: string]: React.ElementType } = {
  LinkedIn: Linkedin,
  Instagram: Instagram,
  Facebook: Facebook,
  GitHub: Github,
  Other: Rss,
};

interface PostsSectionProps {
  title?: React.ReactNode;
  subtitle?: string;
  showImages?: boolean;
  layout?: 'carousel' | 'grid';
}

function PostCard({ post, showImages, className }: { post: Post; showImages: boolean; className?: string }) {
  const Icon = platformIcons[post.platform] || Rss;
  return (
    <Card className={cn(
      "group flex flex-col overflow-hidden border bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/20",
      className
    )}>
      {showImages && (
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={post.image || 'https://picsum.photos/seed/1/600/400'}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={post.imageHint || "social post"}
            />
            <div className="absolute top-4 right-4 rounded-full bg-background/80 p-2 shadow-sm backdrop-blur-sm">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardHeader>
      )}
      <CardContent className="flex-1 space-y-4 p-6 text-center">
        {!showImages && (
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-primary/10 p-2">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          </div>
        )}
        <h3 className="line-clamp-2 text-lg font-bold text-foreground font-serif">{post.title}</h3>
        <p className="line-clamp-3 text-sm text-muted-foreground leading-relaxed italic">"{post.description}"</p>
        {post.hashtags && (
          <div className="flex flex-wrap justify-center gap-1.5 pt-2">
            {post.hashtags.split(',').map(tag => (
              <Badge key={tag.trim()} variant="secondary" className="text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary border-none">
                {tag.trim()}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0 border-t bg-muted/5 group-hover:bg-primary/5 transition-colors">
        <Button asChild variant="ghost" className="w-full justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all">
          <Link
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest">Read on {post.platform}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function PostsSection({ 
  title = <>Featured <span className="text-primary">Posts</span></>,
  subtitle = "Updates and insights from my latest projects and social platforms.",
  showImages = true,
  layout = 'carousel'
}: PostsSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const firestore = useFirestore();

  const postsCollection = useMemo(() => {
    return firestore ? collection(firestore, 'posts') as CollectionReference<DocumentData> : null;
  }, [firestore]);

  const postsQuery = useMemoFirebase(() => {
    return postsCollection ? query(postsCollection, orderBy('createdAt', 'desc')) : null;
  }, [postsCollection]);

  const { data: firestorePosts, isLoading: loading } = useCollection<Post>(postsQuery);

  const allPosts = useMemo(() => {
    const githubPost: Post = {
      id: 'static-github-post',
      platform: 'GitHub',
      title: 'Explore My Code on GitHub!',
      description: "Curious about how I build things? Dive into my GitHub profile to see my latest projects, contributions to open-source, and the code behind my portfolio.",
      link: 'https://github.com/SherazHussain546',
      image: 'https://picsum.photos/seed/github-post/600/400',
      imageHint: 'github code',
      hashtags: '#OpenSource, #Developer, #SherazHussain546',
      createdAt: Timestamp.now(),
    };

    const combined = [githubPost, ...(firestorePosts || [])];
    return combined.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
  }, [firestorePosts]);

  useEffect(() => {
    if (!api || layout !== 'carousel' || allPosts.length <= 1) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api, layout, allPosts]);

  if (loading) {
    return (
      <section id="posts" className="bg-card py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
           <h2 className="mb-12 text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[400px] w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="posts" className={cn("py-20 md:py-32", layout === 'carousel' ? 'bg-card' : 'bg-background')}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <div className="text-3xl font-bold tracking-tight md:text-4xl text-foreground text-balance">
            {title}
          </div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-balance">
            {subtitle}
          </p>
        </div>

        {layout === 'carousel' ? (
          <div className="mx-auto max-w-md mt-12">
            <Carousel
              setApi={setApi}
              opts={{
                  align: 'start',
                  loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {allPosts.map((post) => (
                  <CarouselItem key={post.id} className="basis-full">
                    <div className="p-1">
                      <PostCard post={post} showImages={showImages} className="mx-auto max-w-md" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {allPosts.length > 1 && (
                <div className="flex justify-center gap-4 mt-8">
                  <CarouselPrevious className="static translate-y-0 h-10 w-10 border-primary/20 hover:bg-primary/10 text-primary" />
                  <CarouselNext className="static translate-y-0 h-10 w-10 border-primary/20 hover:bg-primary/10 text-primary" />
                </div>
              )}
            </Carousel>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {allPosts.map((post) => (
              <PostCard key={post.id} post={post} showImages={showImages} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
