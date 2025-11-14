import { posts } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function PostsSection() {
  return (
    <section id="posts" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Featured <span className="text-primary">Posts</span>
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {posts.map((post, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <div className="p-1">
                  <Card className="flex h-full flex-col overflow-hidden bg-card transition-all hover:shadow-primary/20 hover:shadow-lg">
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
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
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
