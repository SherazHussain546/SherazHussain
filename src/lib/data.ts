import { Code, Server, Cloud, Database, BrainCircuit, ShieldCheck, Smartphone, Award, Star, School, LucideIcon, Bitcoin } from 'lucide-react';

type CertificateType = {
  title: string;
  issuer: string;
  date?: string;
  credentialId?: string;
  credentialUrl?: string;
  icon: LucideIcon;
  skills?: string[];
  points?: string[];
};

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
    role: 'Freelance Consultant (via SYNC TECH)',
    company: 'APTLY DRESSED',
    link: 'https://www.aptlydressed.com',
    period: 'September 2024 - Present',
    description: 'Provided web development and affiliate integration services for an affiliate marketing agency that partners with world-leading brands.',
    points: [
      'Developed and maintained the core platform, ensuring high performance and scalability.',
      'Engineered custom integrations for various affiliate marketing platforms and brand partners.',
      'Optimized the site architecture for SEO to maximize organic traffic and affiliate revenue.',
    ],
  },
  {
    role: 'Freelance Web Developer (via SYNC TECH)',
    company: 'blogify.blog',
    link: 'https://www.blogify.blog',
    period: 'September 2024 - Present',
    description: 'Delivered freelance web solutions for a platform that enables businesses to publish and promote their blog content to a wider audience.',
    points: [
      'Built and customized features for the content management system to improve the authoring experience.',
      'Enhanced the platform\'s online presence and user engagement through technical SEO and performance tuning.',
      'Provided ongoing technical support and consultation to ensure platform stability and growth.',
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
    image: '/images/marketgenius.png',
    imageHint: 'AI financial platform'
  },
  {
    name: 'Job4You – Your Personal AI Recruiter',
    description: 'Created an automated job-application assistant with Python and GPT-4, which successfully processed over 100 simulated job applications. Used scikit-learn for end-to-end resume, cover letter, and email generation, demonstrating expertise in AI development.',
    stack: ['Angular', 'Firebase', 'GPT-4', 'scikit-learn'],
    link: 'https://github.com/SherazHussain546',
    image: '/images/job4you.png',
    imageHint: 'AI job recruiter'
  },
  {
    name: 'ChattyAI – A Conversational AI Assistant',
    description: 'Architected and built a cross-platform AI chatbot using the Gemini API, Angular, and Ionic. Deployed the bot as a university study aid that facilitated over 200 daily interactions with sub-second response times.',
    stack: ['Firebase', 'TypeScript', 'Tailwind', 'SQLite'],
    link: 'https://github.com/SherazHussain546',
    image: '/images/chattyai.jpg',
    imageHint: 'AI chatbot conversation'
  },
  {
    name: 'GoExploree – Real Estate Mobile App',
    description: 'Developed a cross-platform mobile app using Ionic Angular, Capacitor, and Firebase Auth. Simulated a property management system that enabled 30+ prospective tenants to browse and schedule viewings.',
    stack: ['Ionic', 'Angular', 'Capacitor', 'Firebase', 'PostgreSQL', 'Google Maps API'],
    link: 'https://github.com/SherazHussain546',
    image: '/images/goexploree.jpg',
    imageHint: 'real estate mobile'
  },
];

export const education = {
  degree: 'Bachelor of Science in Computing (First Class Honors)',
  university: 'Dublin Business School',
  graduationDate: 'Sept 2021 – April 2025',
  awards: ['Peer-Mentor Leadership Award', 'Graduate Work Readiness Badges: Gold, Silver, Bronze'],
};

export const certifications: CertificateType[] = [
  {
    title: 'Electronic Arts (EA) Software Engineering Virtual Experience',
    issuer: 'Forage',
    date: 'Issued Aug 2025',
    credentialId: 'RhcwgiXcxFS6oSNyY',
    icon: Award,
    skills: ['Communication', 'Object-Oriented Programming (OOP)'],
    points: [
      'Built a class diagram and created a header file in C++ for each object.',
      'Patched a bugfix and optimized the codebase by implementing an improved data structure.',
    ],
  },
  {
    title: 'Mastercard Cybersecurity Virtual Experience Program',
    issuer: 'Forage',
    date: 'Issued Feb 2025',
    credentialId: '2tPnnhF5JNy65YhvK',
    icon: ShieldCheck,
    skills: ['Problem Solving', 'Time Management', 'Attention to Detail', 'Test and Learn Agile Methodology'],
    points: [
      'Served as an analyst on Mastercard’s Security Awareness Team.',
      'Helped identify and report security threats such as phishing.',
    ],
  },
  {
    title: 'Deloitte Australia - Technology Job Simulation',
    issuer: 'Forage',
    date: 'Issued Aug 2025',
    credentialId: 'o8nD9KWXc6iKB4igL',
    icon: Code,
    skills: ['Python (Programming Language)'],
    points: [
      'Completed job simulations involving reading web activity logs and developing code.',
      'Created a data dashboard using Tableau and used Excel to classify data.',
    ],
  },
   {
    title: 'Student Leader Awards 2023 Peer Mentor (with Distinction)',
    issuer: 'Dublin Business School',
    date: 'Issued Jun 2023',
    icon: Award,
    skills: ['Problem Solving', 'Time Management', 'Attention to Detail', 'Teamwork', 'Leadership', 'Communication'],
  },
  {
    title: 'Graduate Work Readiness (Bronze, Silver and Gold)',
    issuer: 'Dublin Business School',
    date: 'Issued May 2023',
    icon: School,
    skills: ['Problem Solving', 'Time Management', 'Attention to Detail', 'Teamwork', 'Leadership', 'Communication'],
  },
];

export const otherCertificates: CertificateType[] = [
    { title: 'Deloitte Australia - Cyber Job Simulation', issuer: 'Forage', date: 'Aug 2025', icon: ShieldCheck },
    { title: 'Deloitte Australia - Data Analytics Job Simulation', issuer: 'Forage', date: 'Aug 2025', icon: Database },
    { title: 'Google Ads AI-Powered Performance Certification', issuer: 'Google', date: 'Jun 2023', icon: BrainCircuit },
    { title: 'Introduction to Virtual, Augmented & Mixed Reality', issuer: 'FutureLearn', date: 'Jul 2020', icon: Smartphone },
    { title: 'Sophomore Trader', issuer: 'Crypto.com', date: 'Jan 2024', icon: Bitcoin },
    { title: 'Junior Trader', issuer: 'Crypto.com', date: 'Jan 2024', icon: Bitcoin },
    { title: 'Freshman Trader', issuer: 'Crypto.com', date: 'Jan 2024', icon: Bitcoin },
    { title: 'Duolingo English Test', issuer: 'Duolingo', date: '', icon: Award },
];
