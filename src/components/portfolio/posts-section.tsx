'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, ArrowRight, Rss } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Skeleton } from '../ui/skeleton';

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

export default function PostsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const db = useFirestore();

  const postsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
  }, [db]);


  useEffect(() => {
    if (!postsQuery) {
      setLoading(!db);
      return;
    };

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
      setPosts(fetchedPosts);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching posts: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [postsQuery, db]);

  return (
    <section id="posts" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Featured <span className="text-primary">Posts</span>
        </h2>
        {loading ? (
            <div className="w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
                <Skeleton className="h-[450px] w-full" />
                <Skeleton className="h-[450px] w-full hidden md:block" />
            </div>
        ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground">No posts have been featured yet. Check back soon!</p>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: posts.length > 1,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {posts.map((post) => (
                <CarouselItem key={post.id} className="md:basis-1/2">
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
                                <Linkedin className="h-6 w-6 text-white drop-shadow-md transition-transform hover:scale-110" />
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
              ))}
            </CarouselContent>
            {posts.length > 2 && (
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
