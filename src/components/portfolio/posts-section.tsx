'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, ArrowRight, Rss, Instagram, Facebook } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Skeleton } from '../ui/skeleton';
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '@/firebase/client';
import { Timestamp } from 'firebase/firestore';

export interface Post {
    id: string;
    platform: string;
    title: string;
    description: string;
    link: string;
    image?: string;
    imageHint?: string;
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const posts = postsSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post)) || [];
  
  if (!isClient) {
    return (
      <section id="posts" className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Featured <span className="text-primary">Posts</span>
          </h2>
          <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-3">
              <Skeleton className="h-[450px] w-full" />
              <Skeleton className="h-[450px] w-full hidden md:block" />
              <Skeleton className="h-[450px] w-full hidden md:block" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="posts" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Featured <span className="text-primary">Posts</span>
        </h2>
        {loading && (
            <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-3">
                <Skeleton className="h-[450px] w-full" />
                <Skeleton className="h-[450px] w-full hidden md:block" />
                <Skeleton className="h-[450px] w-full hidden md:block" />
            </div>
        )}
        {error && (
            <p className="text-center text-destructive">Failed to load posts. Please try again later.</p>
        )}
        {!loading && !error && posts.length === 0 ? (
            <p className="text-center text-muted-foreground">No posts have been featured yet. Check back soon!</p>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: posts.length > 3,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {posts.map((post) => {
                const Icon = platformIcons[post.platform] || Rss;
                return (
                  <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="flex h-full flex-col overflow-hidden bg-card transition-all hover:shadow-primary/20 hover:shadow-lg">
                        {post.image && (
                          <div className="relative h-56 w-full">
                            <Image
                              src={post.image}
                              alt={`Cover image for the post titled ${post.title}`}
                              fill
                              className="object-cover"
                              data-ai-hint={post.imageHint}
                            />
                            <div className="absolute top-4 right-4">
                              <Link href={post.link} target="_blank" rel="noopener noreferrer" aria-label={`Read on ${post.platform}`}>
                                <Icon className="h-6 w-6 text-white drop-shadow-md transition-transform hover:scale-110" />
                              </Link>
                            </div>
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <p className="text-sm text-muted-foreground">{post.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Button asChild variant="default">
                            <Link href={post.link} target="_blank" rel="noopener noreferrer">
                              Read on {post.platform}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            {posts.length > 3 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        )}
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="https://www.linkedin.com/in/sherazhussain546/" target="_blank" rel="noopener noreferrer">
              Let's Connect
              <Linkedin className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
