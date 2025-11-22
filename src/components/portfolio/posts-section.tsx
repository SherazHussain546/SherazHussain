'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, ArrowRight, Rss, Instagram, Facebook } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '@/firebase/client';
import { Timestamp } from 'firebase/firestore';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';

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
  Other: Rss,
};

export default function PostsSection() {
  const postsCollection = collection(firestore, 'posts');
  const postsQuery = query(postsCollection, orderBy('createdAt', 'desc'));
  const [postsSnapshot, loading, error] = useCollection(postsQuery);

  const posts = postsSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post)) || [];

  if (loading) {
    return (
      <section id="posts" className="bg-card py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
           <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Featured <span className="text-primary">Posts</span>
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
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Featured <span className="text-primary">Posts</span>
        </h2>
        
        {error && (
            <p className="text-center text-destructive">Failed to load posts. Please try again later.</p>
        )}

        {!loading && !error && posts.length === 0 ? (
            <p className="text-center text-muted-foreground">No posts have been featured yet. Check back soon!</p>
        ) : (
           <Carousel
                opts={{
                    align: 'start',
                    loop: true,
                }}
                className="w-full"
            >
            <CarouselContent>
              {posts.map((post) => {
                const Icon = platformIcons[post.platform] || Rss;
                return (
                  <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-primary/20 hover:shadow-lg">
                        <CardHeader>
                            <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                                <Image
                                    src={post.image || 'https://picsum.photos/seed/1/600/400'}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={post.imageHint}
                                />
                                <div className="absolute top-2 right-2 flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold">
                                    <Icon className="h-4 w-4 text-primary" />
                                    <span>{post.platform}</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-3">
                          <h3 className="line-clamp-2 text-lg font-bold">{post.title}</h3>
                          <p className="line-clamp-3 text-sm text-muted-foreground">{post.description}</p>
                           {post.hashtags && (
                            <div className="flex flex-wrap gap-1">
                                {post.hashtags.split(',').map(tag => (
                                    <Badge key={tag.trim()} variant="secondary" className="text-xs">{tag.trim()}</Badge>
                                ))}
                            </div>
                           )}
                        </CardContent>
                        <CardFooter>
                          <Link
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex w-full items-center justify-between text-sm font-semibold text-primary"
                          >
                            <span>Read on {post.platform}</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
             {posts.length > 3 && (
                <>
                    <CarouselPrevious className="hidden lg:flex" />
                    <CarouselNext className="hidden lg:flex" />
                </>
             )}
          </Carousel>
        )}

      </div>
    </section>
  );
}
