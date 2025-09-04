import { Code, Server, Cloud, Database, BrainCircuit, BotMessageSquare } from 'lucide-react';

export const skills = {
  'Languages': {
    icon: Code,
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'HTML5', 'CSS3', 'SQL'],
  },
  'Frameworks & Libraries': {
    icon: Server,
    items: ['React', 'Next.js', 'Angular', 'Node.js', 'Express.js', 'Spring Boot', 'Tailwind CSS'],
  },
  'Cloud & DevOps': {
    icon: Cloud,
    items: ['AWS', 'Google Cloud', 'Firebase', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
  },
  'Databases': {
    icon: Database,
    items: ['PostgreSQL', 'MongoDB', 'Firestore', 'MySQL', 'Redis'],
  },
  'AI/ML': {
    icon: BrainCircuit,
    items: ['TensorFlow', 'PyTorch', 'scikit-learn', 'LangChain', 'Genkit'],
  },
};

export const experiences = [
  {
    role: 'Senior Full-Stack Engineer',
    company: 'Innovatech Solutions',
    period: 'Jan 2021 - Present',
    description: 'Lead developer for a suite of cloud-native applications. Responsible for architecting scalable solutions, mentoring junior developers, and integrating AI-powered features.',
    points: [
      'Architected and deployed a microservices-based platform on AWS, reducing latency by 40% and improving scalability.',
      'Developed and maintained a CI/CD pipeline using Jenkins and Docker, automating testing and deployment processes.',
      'Integrated a recommendation engine using Python and TensorFlow, increasing user engagement by 25%.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Data Dynamics',
    period: 'Jun 2018 - Dec 2020',
    description: 'Developed features for a data analytics platform, working across the full stack from database design to front-end implementation.',
    points: [
      'Built responsive UI components with React and Redux, improving user experience and application performance.',
      'Designed and implemented RESTful APIs using Node.js and Express, serving data to the front-end application.',
      'Managed a PostgreSQL database, optimizing queries and ensuring data integrity.',
    ],
  },
];

export const projects = [
  {
    name: 'Aetherfolio',
    description: 'This very portfolio website, built as a responsive single-page application with a secure admin portal for content management and an AI resume analyzer.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Genkit'],
    link: 'https://github.com/example/aetherfolio',
    image: 'https://picsum.photos/600/400?random=1',
    imageHint: 'abstract code',
  },
  {
    name: 'Cloud Orchestrator',
    description: 'A dashboard to manage and visualize cloud resources across multiple providers using Infrastructure as Code principles.',
    stack: ['Angular', 'TypeScript', 'Node.js', 'Terraform', 'AWS SDK'],
    link: 'https://github.com/example/cloud-orchestrator',
    image: 'https://picsum.photos/600/400?random=2',
    imageHint: 'cloud infrastructure',
  },
  {
    name: 'AI-Powered Chatbot',
    description: 'A customer service chatbot that understands natural language and provides intelligent responses, built with a large language model.',
    stack: ['Python', 'Flask', 'LangChain', 'Docker', 'GCP'],
    link: 'https://github.com/example/ai-chatbot',
    image: 'https://picsum.photos/600/400?random=3',
    imageHint: 'robot conversation',
  },
  {
    name: 'E-commerce Platform',
    description: 'A full-featured e-commerce site with product listings, a shopping cart, and a secure checkout process.',
    stack: ['React', 'Java', 'Spring Boot', 'PostgreSQL', 'Stripe API'],
    link: 'https://github.com/example/ecommerce-platform',
    image: 'https://picsum.photos/600/400?random=4',
    imageHint: 'online shopping',
  },
];

export const education = {
  degree: 'Bachelor of Science in Computer Science',
  university: 'University of Technology',
  graduationDate: 'May 2018',
  awards: ['Summa Cum Laude', 'Dean\'s List for all semesters'],
};
