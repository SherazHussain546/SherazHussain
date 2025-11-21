'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, ArrowRight, Rss, Instagram, Facebook } from 'lucide-react';
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
}

const platformIcons: { [key: string]: React.ElementType } = {
  LinkedIn: Linkedin,
  Instagram: Instagram,
  Facebook: Facebook,
  Other: Rss,
};

// Mock data, as we are removing firebase
const mockPosts: Post[] = [
    {
        id: '1',
        platform: 'LinkedIn',
        title: 'Excited to Join the Tech Industry!',
        description: 'Just landed my first role as a Junior Developer. A deep dive into my journey, the challenges, and what I learned along the way.',
        link: 'https://www.linkedin.com/in/sherazhussain546/',
        image: 'https://picsum.photos/seed/post1/600/400',
        imageHint: 'celebration office',
    },
    {
        id: '2',
        platform: 'Other',
        title: 'My First Open Source Contribution',
        description: 'I finally contributed to an open-source project! Here’s a breakdown of the process and why you should do it too.',
        link: 'https://github.com/SherazHussain546',
        image: 'https://picsum.photos/seed/post2/600/400',
        imageHint: 'code collaboration',
    },
    {
        id: '3',
        platform: 'Instagram',
        title: 'New Portfolio Site is LIVE!',
        description: 'After weeks of coding, my new personal portfolio is up and running. Built with Next.js and Tailwind CSS. Check it out!',
        link: '#',
        image: 'https://picsum.photos/seed/post3/600/400',
        imageHint: 'website design',
    },
    {
        id: '4',
        platform: 'LinkedIn',
        title: 'The Power of AI in Modern Development',
        description: 'Exploring how AI tools like Genkit are changing the landscape for developers. Are you using AI in your workflow?',
        link: 'https://www.linkedin.com/in/sherazhussain546/',
        image: 'https://picsum.photos/seed/post4/600/400',
        imageHint: 'artificial intelligence',
    }
]

export default function PostsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Simulate fetching data
    setTimeout(() => {
        setPosts(mockPosts);
        setLoading(false);
    }, 1000);
  }, []);

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
        {loading ? (
            <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-3">
                <Skeleton className="h-[450px] w-full" />
                <Skeleton className="h-[450px] w-full hidden md:block" />
                <Skeleton className="h-[450px] w-full hidden md:block" />
            </div>
        ) : posts.length === 0 ? (
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
