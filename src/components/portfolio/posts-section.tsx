import { posts } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, ArrowRight } from 'lucide-react';

export default function PostsSection() {
  return (
    <section id="posts" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Featured <span className="text-primary">Posts</span>
        </h2>
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
          {posts.map((post) => (
            <Card key={post.title} className="flex flex-col overflow-hidden bg-card transition-all hover:shadow-primary/20 hover:shadow-lg">
              <div className="relative h-56 w-full">
                <Image
                  src={post.image}
                  alt={`Cover image for the post titled ${post.title}`}
                  fill
                  className="object-cover"
                  data-ai-hint={post.imageHint}
                />
                 <div className="absolute top-4 right-4">
                    <Link href={post.link} target="_blank" rel="noopener noreferrer" aria-label="Read on LinkedIn">
                      <Linkedin className="h-6 w-6 text-white drop-shadow-md transition-transform hover:scale-110" />
                    </Link>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">{post.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="default">
                  <Link href={post.link} target="_blank" rel="noopener noreferrer">
                    Read on LinkedIn
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
