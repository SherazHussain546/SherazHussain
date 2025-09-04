import { Code, Server, Cloud, Database, BrainCircuit, ShieldCheck, Smartphone } from 'lucide-react';

export const skills = {
  'Languages': {
    icon: Code,
    items: ['Python', 'C#', 'TypeScript', 'JavaScript', 'SQL'],
  },
  'Frameworks & Libraries': {
    icon: Server,
    items: ['Angular', 'React.js', 'Node.js', 'Express', 'FastAPI', 'Django', 'Flask', 'Ionic', 'scikit-learn'],
  },
  'Cloud & DevOps': {
    icon: Cloud,
    items: ['AWS (EC2, S3, Lambda, IAM)', 'GCP', 'Azure', 'Kubernetes', 'Docker', 'CI/CD', 'DevSecOps', 'GitHub Actions', 'Terraform'],
  },
  'AI/ML': {
    icon: BrainCircuit,
    items: ['Generative AI', 'Prompt Engineering', 'OpenAI', 'Google AI Studio'],
  },
  'Databases': {
    icon: Database,
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase Realtime Database', 'BigQuery'],
  },
  'Web & Mobile': {
    icon: Smartphone,
    items: ['HTML5', 'CSS3', 'Tailwind', 'Material UI', 'Capacitor', 'Google Maps API', 'REST API'],
  },
  'Cybersecurity': {
    icon: ShieldCheck,
    items: ['Penetration Testing', 'Network Security', 'Zero Trust Architecture', 'Data Encryption', 'Threat Detection'],
  },
};

export const experiences = [
  {
    role: 'Web Developer & Consultant',
    company: 'Stylish Marble Art',
    period: 'May 2024 – Present',
    description: 'Developed and maintain a responsive e-commerce website for a marble art and services business, leveraging WordPress, WooCommerce, and custom HTML/CSS.',
    points: [
      'Implemented site-wide SEO strategies and integrated contact forms to generate and manage sales leads.',
      'Continuously optimize the user experience and site performance to support business growth and expand online presence.',
    ],
  },
  {
    role: 'Deputy Manager',
    company: 'Castore',
    period: 'April 2024 - Present',
    description: 'Led and mentored a team of 12+ staff, conducting daily stand-ups and performance reviews to drive a 55% increase in monthly sales targets.',
    points: [
      'Developed and delivered customer-service training programs that boosted customer satisfaction scores by 70% and increased repeat business.',
      'Collaborated on a customer-feedback portal, which surfaced actionable insights that elevated the Net Promoter Score by 38%',
    ],
  },
  {
    role: 'E-Commerce Manager',
    company: 'LUXE THREADS',
    period: 'May 2024 – Jan 2025',
    description: 'Launched and managed an online fashion brand on WordPress/WooCommerce, implementing custom HTML/CSS.',
    points: [
      'Executed SEO and Google Ads campaigns that increased organic traffic by 50% and lifted conversion rates by 25%.',
      'Architected marketing funnels and influencer partnerships, growing subscriber lists by 45% and driving consistent monthly sales.',
    ],
  },
  {
    role: 'Peer Mentor',
    company: 'Dublin Business School',
    period: 'Sept 2022 – May 2023',
    description: 'Mentored over 20 students each semester, providing guidance on academic study techniques, project work, and professional development.',
    points: [
      'Recognized with the Student Leader Award (Peer Mentor with Distinction) for exceptional leadership and support within the academic community.',
    ],
  },
];

export const projects = [
  {
    name: 'Market Genius',
    description: 'Developed a real-time financial signal platform using Next.js and Genkit that delivers AI-generated insights for stocks and cryptocurrencies.',
    stack: ['Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'ShadCN UI', 'Google Genkit', 'Firebase Cloud Messaging'],
    link: 'https://github.com/SherazHussain546',
    image: 'https://picsum.photos/600/400?random=1',
    imageHint: 'financial chart stock',
  },
  {
    name: 'Job4You',
    description: 'Created an automated job-application assistant with Python and GPT-4, which successfully processed over 100 simulated job applications.',
    stack: ['Angular', 'Firebase', 'GPT-4', 'scikit-learn'],
    link: 'https://github.com/SherazHussain546',
    image: 'https://picsum.photos/600/400?random=2',
    imageHint: 'resume job application',
  },
  {
    name: 'ChattyAI',
    description: 'Architected and built a cross-platform AI chatbot using the Gemini API, Angular, and Ionic.',
    stack: ['Firebase', 'TypeScript', 'Tailwind', 'SQLite'],
    link: 'https://github.com/SherazHussain546',
    image: 'https://picsum.photos/600/400?random=3',
    imageHint: 'robot conversation',
  },
  {
    name: 'GoExploree',
    description: 'Developed a cross-platform mobile app using Ionic Angular, Capacitor, and Firebase Auth for a simulated property management system.',
    stack: ['Ionic', 'Angular', 'Capacitor', 'Firebase', 'PostgreSQL', 'Google Maps API'],
    link: 'https://github.com/SherazHussain546',
    image: 'https://picsum.photos/600/400?random=4',
    imageHint: 'real estate mobile',
  },
];

export const education = {
  degree: 'Bachelor of Science in Computing (First Class Honors)',
  university: 'Dublin Business School',
  graduationDate: 'Sept 2021 – April 2025',
  awards: ['Peer-Mentor Leadership Award', 'Graduate Work Readiness Badges: Gold, Silver, Bronze'],
};
