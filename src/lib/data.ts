import { Code, Server, Cloud, Database, BrainCircuit, ShieldCheck, Smartphone, Award as Certificate } from 'lucide-react';

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
    items: ['AWS (EC2, S3, Lambda, IAM)', 'Google Cloud Platform (GCP)', 'Azure', 'Kubernetes', 'Docker', 'CI/CD', 'DevSecOps', 'GitHub Actions', 'Terraform'],
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
    role: 'Founder & Director',
    company: 'SYNC TECH',
    link: 'https://www.synctech.ie',
    period: 'August 2024 - Present',
    description: 'Founded and directed an IT solutions company specializing in Web Development, AI Automation, Cloud Hosting, and Cybersecurity.',
    points: [
      'Architected, developed, and delivered bespoke digital solutions for clients, driving their business growth and digital transformation.',
      'Managed the end-to-end client lifecycle, from initial consultation and proposal creation to project delivery and ongoing support.',
      'Spearheaded the company\'s digital marketing and SEO strategies, successfully building the online presence and generating leads.',
      'Key Skills: Entrepreneurship, Business Development, Project Management, Full-Stack Development, AI/ML Engineering, Cloud Architecture, Cybersecurity, and Client Relationship Management.'
    ],
  },
  {
    role: 'Web Developer & Consultant',
    company: 'Stylish Marble Art',
    link: 'https://www.stylishmarbleart.com',
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
    name: 'Market Genius – An AI-Powered Financial Signal Platform',
    description: 'Developed a real-time financial signal platform using Next.js and Genkit that delivers AI-generated insights for stocks and cryptocurrencies. Integrated Alpha Vantage and Crypto.com APIs and Firebase push notifications for seamless, real-time access.',
    stack: ['Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'ShadCN UI', 'Google Genkit', 'Firebase Cloud Messaging'],
    link: 'https://github.com/SherazHussain546',
    image: 'https://picsum.photos/seed/market-genius/600/400',
    imageHint: 'financial chart stock',
  },
  {
    name: 'Job4You – Your Personal AI Recruiter',
    description: 'Created an automated job-application assistant with Python and GPT-4, which successfully processed over 100 simulated job applications. Used scikit-learn for end-to-end resume, cover letter, and email generation, demonstrating expertise in AI development.',
    stack: ['Angular', 'Firebase', 'GPT-4', 'scikit-learn'],
    link: 'https://github.com/SherazHussain546',
    image: 'https://picsum.photos/seed/job4you/600/400',
    imageHint: 'resume job application',
  },
  {
    name: 'ChattyAI – A Conversational AI Assistant',
    description: 'Architected and built a cross-platform AI chatbot using the Gemini API, Angular, and Ionic. Deployed the bot as a university study aid that facilitated over 200 daily interactions with sub-second response times.',
    stack: ['Firebase', 'TypeScript', 'Tailwind', 'SQLite'],
    link: 'https://github.com/SherazHussain546',
    image: 'https://picsum.photos/seed/chattyai/600/400',
    imageHint: 'robot conversation',
  },
  {
    name: 'GoExploree – Real Estate Mobile App',
    description: 'Developed a cross-platform mobile app using Ionic Angular, Capacitor, and Firebase Auth. Simulated a property management system that enabled 30+ prospective tenants to browse and schedule viewings.',
    stack: ['Ionic', 'Angular', 'Capacitor', 'Firebase', 'PostgreSQL', 'Google Maps API'],
    link: 'https://github.com/SherazHussain546',
    image: 'https://picsum.photos/seed/goexploree/600/400',
    imageHint: 'real estate mobile',
  },
];

export const education = {
  degree: 'Bachelor of Science in Computing (First Class Honors)',
  university: 'Dublin Business School',
  graduationDate: 'Sept 2021 – April 2025',
  awards: ['Peer-Mentor Leadership Award', 'Graduate Work Readiness Badges: Gold, Silver, Bronze'],
};

export const certifications = [
  {
    title: 'Electronic Arts (EA) Software Engineering Virtual Experience Program',
    icon: Certificate,
    points: [
      'Built a class diagram and created a header file in C++ for each object.',
      'Patched a bugfix and optimized the codebase by implementing an improved data structure.',
    ],
  },
  {
    title: 'Mastercard Cybersecurity Virtual Experience Program',
    icon: Certificate,
    points: [
      'Served as an analyst on Mastercard’s Security Awareness Team.',
      'Helped identify and report security threats such as phishing.',
    ],
  },
  {
    title: 'Deloitte Australia Cyber, Data Analytics & Technology Job Simulations',
    icon: Certificate,
    points: [
      'Completed job simulations involving reading web activity logs and developing code.',
      'Created a data dashboard using Tableau and used Excel to classify data.',
    ],
  },
];

export const otherCertificates = [
  'Duolingo English Test',
  'Introduction to Virtual, Augmented & Mixed Reality | FutureLearn',
];
