'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, ArrowRight, Rss, Instagram, Facebook } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '@/firebase/client';
import { Timestamp } from 'firebase/firestore';
import { Button } from '../ui/button';
import styles from './posts-slider.module.css';
import { cn } from '@/lib/utils';

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
  const [activeIndex, setActiveIndex] = useState(0);

  const posts = postsSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post)) || [];

  useEffect(() => {
    if (posts.length > 0) {
      setActiveIndex(Math.floor(posts.length / 2));
    }
  }, [posts.length]);
  
  if (loading) {
    return (
      <section id="posts" className="bg-card py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
           <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Featured <span className="text-primary">Posts</span>
          </h2>
          <div className="flex justify-center items-center h-[400px]">
            <Skeleton className="h-[280px] w-[280px]" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="posts" className="bg-card py-20 md:py-32">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Featured <span className="text-primary">Posts</span>
        </h2>
        
        {error && (
            <p className="text-center text-destructive">Failed to load posts. Please try again later.</p>
        )}

        {!loading && !error && posts.length === 0 ? (
            <p className="text-center text-muted-foreground">No posts have been featured yet. Check back soon!</p>
        ) : (
          <div className={styles.container}>
            <div className={styles.wghSlider}>
              {posts.map((post, index) => (
                <input
                  key={post.id}
                  className={styles.wghSliderTarget}
                  type="radio"
                  id={`slide-${post.id}`}
                  name="slider"
                  checked={activeIndex === index}
                  onChange={() => setActiveIndex(index)}
                />
              ))}

              <div className={styles.wghSliderViewport}>
                <div className={styles.wghSliderViewbox}>
                  <div className={styles.wghSliderContainer}>
                    {posts.map((post, index) => {
                      const Icon = platformIcons[post.platform] || Rss;
                      const isActive = index === activeIndex;
                      return (
                        <div key={post.id} className={cn(styles.wghSliderItem, isActive && 'active-slide')} style={{'--i': index, '--total': posts.length, '--active': activeIndex} as React.CSSProperties}>
                          <div className={styles.wghSliderItemInner}>
                            <figure className={styles.wghSliderItemFigure}>
                              <Image
                                className={styles.wghSliderItemFigureImage}
                                src={post.image || 'https://picsum.photos/seed/1/480/480'}
                                alt={post.title}
                                width={480}
                                height={480}
                                data-ai-hint={post.imageHint}
                              />
                              <figcaption className={styles.wghSliderItemFigureCaption}>
                                <Link href={post.link} target="_blank" rel="noopener noreferrer">
                                  {post.title}
                                </Link>
                                <span>{post.platform}</span>
                              </figcaption>
                            </figure>
                            <label
                              className={styles.wghSliderItemTrigger}
                              htmlFor={`slide-${post.id}`}
                              title={`Show post ${index + 1}`}
                            ></label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
