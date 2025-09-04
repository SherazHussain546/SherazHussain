import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 md:grid-cols-3 md:px-6">
        <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full shadow-lg md:h-64 md:w-64">
          <Image
            src="https://picsum.photos/300/300"
            alt="Sheraz Hussain, Full-Stack Software Engineer & AI/Cloud Developer"
            width={300}
            height={300}
            className="object-cover"
            data-ai-hint="professional portrait"
          />
        </div>
        <div className="space-y-4 text-center md:col-span-2 md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">
            Full-Stack Software Engineer & AI/Cloud Developer
          </h1>
          <p className="text-lg text-foreground/80 md:text-xl">
            Highly motivated First-Class Honors graduate with a robust skill set in Software Engineering, AI/ML, and Cloud Computing. Proven ability to design, develop, and deploy innovative solutions using a full-stack approach (Angular, React, Node.js). Expertise in DevSecOps practices, AWS, and Kubernetes, ensuring scalable and secure systems. Eager to contribute technical expertise and a collaborative spirit to a dynamic team.
          </p>
        </div>
      </div>
    </section>
  );
}
