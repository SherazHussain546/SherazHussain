'use client';

import React, { useState, useEffect } from 'react';
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
import { collection, query, orderBy, Timestamp } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '@/firebase/client';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface Post {
    id: string;
    platform: string;
    title: string;
    description: string;
    link: string;
    image?: string;
    imageHint?: string;
    hashtags?: string;
    createdAt: Timestamp;
}

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
}

export default function PostsSection({ 
  title = <>Featured <span className="text-primary">Posts</span></>,
  subtitle = "Updates and insights from my latest projects and social platforms.",
  showImages = true
}: PostsSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const postsCollection = collection(firestore, 'posts');
  const postsQuery = query(postsCollection, orderBy('createdAt', 'desc'));
  const [postsSnapshot, loading, error] = useCollection(postsQuery);

  const firestorePosts = postsSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post)) || [];

  const githubPost: Post = {
    id: 'static-github-post',
    platform: 'GitHub',
    title: 'Explore My Code on GitHub!',
    description: 'Curious about how I build things? Dive into my GitHub profile to see my latest projects, contributions to open-source, and the code behind my portfolio. Follow me for updates!',
    link: 'https://github.com/SherazHussain546',
    image: 'https://picsum.photos/seed/github-post/600/400',
    imageHint: 'github code',
    hashtags: '#OpenSource, #Developer, #Coding, #Portfolio, #NextJS, #React',
    createdAt: Timestamp.now(),
  };

  const allPosts = [githubPost, ...firestorePosts];
  allPosts.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  if (loading) {
    return (
      <section id="posts" className="bg-card py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
           <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl text-foreground">
            {title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[400px] w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="posts" className="bg-card py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground text-balance">
            {title}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-balance">
            {subtitle}
          </p>
        </div>
        
        {error && (
            <p className="text-center text-destructive">Failed to load posts. Please try again later.</p>
        )}

        {!loading && !error && allPosts.length === 0 ? (
            <p className="text-center text-muted-foreground">No posts have been featured yet. Check back soon!</p>
        ) : (
           <div className="mx-auto max-w-md">
              <Carousel
                setApi={setApi}
                opts={{
                    align: 'start',
                    loop: true,
                }}
                className="w-full"
            >
            <CarouselContent>
              {allPosts.map((post) => {
                const Icon = platformIcons[post.platform] || Rss;
                return (
                  <CarouselItem key={post.id} className="basis-full">
                    <div className="p-1">
                      <Card className="group mx-auto flex max-w-md flex-col overflow-hidden border bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/20">
                        {showImages && (
                          <CardHeader className="p-0">
                              <div className="relative aspect-video w-full overflow-hidden">
                                  <Image
                                      src={post.image || 'https://picsum.photos/seed/1/600/400'}
                                      alt={post.title}
                                      fill
                                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                                      data-ai-hint={post.imageHint}
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
                          <h3 className="line-clamp-2 text-lg font-bold text-foreground">{post.title}</h3>
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
                              <span>Read on {post.platform}</span>
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 h-10 w-10 border-primary/20 hover:bg-primary/10 text-primary" />
              <CarouselNext className="static translate-y-0 h-10 w-10 border-primary/20 hover:bg-primary/10 text-primary" />
            </div>
          </Carousel>
           </div>
        )}

      </div>
    </section>
  );
}
