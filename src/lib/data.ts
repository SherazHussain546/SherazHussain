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

export interface Project {
  slug: string;
  name: string;
  description: string;
  fullDescription: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  stack: string[];
  link: string;
  liveLink?: string;
  image: string;
  imageHint: string;
}

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
    role: 'Freelance Web Developer',
    company: 'SYNC TECH',
    link: 'https://www.synctech.ie',
    period: 'August 2025 - Present',
    description: 'Provided freelance web development, AI automation, and cloud solutions for a diverse range of clients to elevate their digital presence.',
    points: [
      'Engineered and delivered custom full-stack web applications tailored to client specifications, resulting in improved user engagement and business performance.',
      'Specialized in creating responsive, high-performance websites using modern frameworks like Next.js, React, and Angular.',
      'Collaborated directly with clients to understand their needs, provide technical consultations, and deliver solutions that meet their goals.',
      'Key Skills: Full-Stack Development, AI/ML Engineering, Cloud Architecture, Cybersecurity, and Client Relationship Management.'
    ],
  },
  {
    role: 'Freelance Consultant',
    company: 'APTLY DRESSED',
    link: 'https://www.aptlydressed.com',
    period: 'September 2025 - Present',
    description: 'Provided web development and affiliate integration services for an affiliate marketing agency that partners with world-leading brands.',
    points: [
      'Developed and maintained the core platform, ensuring high performance and scalability.',
      'Engineered custom integrations for various affiliate marketing platforms and brand partners.',
      'Optimized the site architecture for SEO to maximize organic traffic and affiliate revenue.',
    ],
  },
  {
    role: 'Freelance Web Developer',
    company: 'blogify.blog',
    link: 'https://www.blogify.blog',
    period: 'September 2025 - Present',
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
    period: 'May 2025 – Present',
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

export const projects: Project[] = [
  {
    slug: 'market-genius',
    name: 'Market Genius – AI-Powered Financial Signals',
    description: 'A real-time financial signal platform using Next.js and Genkit that delivers AI-generated insights.',
    fullDescription: 'Market Genius is an advanced financial analytics platform designed to bridge the gap between complex market data and actionable insights. By leveraging Large Language Models (LLMs) via Google Genkit, it processes real-time streams from global financial markets to provide sentiment analysis, predictive signals, and trend alerts for both traditional stocks and high-volatility cryptocurrencies.',
    challenges: [
      'Integrating high-frequency data streams from multiple disparate APIs without hitting rate limits.',
      'Ensuring low-latency delivery of AI-generated insights to end-users.',
      'Maintaining high availability for critical push notification services during peak market hours.'
    ],
    solutions: [
      'Implemented a robust caching layer using Redis to minimize redundant API calls.',
      'Architected a serverless backend using Firebase Functions to scale AI processing on-demand.',
      'Utilized Firebase Cloud Messaging (FCM) for sub-second notification delivery across web and mobile.'
    ],
    results: [
      'Achieved a 40% reduction in data retrieval latency.',
      'Onboarded over 500 active beta users within the first month.',
      'Maintained a 99.9% uptime during high-volatility market events.'
    ],
    stack: ['Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'ShadCN UI', 'Google Genkit', 'Firebase Cloud Messaging'],
    link: 'https://github.com/SherazHussain546',
    liveLink: 'https://marketgenius546.netlify.app',
    image: 'https://picsum.photos/seed/market-genius/800/600',
    imageHint: 'finance analytics',
  },
  {
    slug: 'job4you',
    name: 'Job4You – Your Personal AI Recruiter',
    description: 'An automated job-application assistant with Python and GPT-4 for high-volume application processing.',
    fullDescription: 'Job4You addresses the friction in modern job searching by automating the most repetitive parts of the application process. It uses sophisticated NLP models to analyze job descriptions and programmatically tailor resumes and cover letters to ensure maximum ATS compatibility, while managing outgoing communications with recruiters.',
    challenges: [
      'Developing a parser capable of accurately extracting requirements from non-standard job posting formats.',
      'Generating unique, high-quality content that bypasses basic AI detection while remaining truthful to the candidate profile.',
      'Managing automated browser interactions across multiple job boards safely.'
    ],
    solutions: [
      'Built a custom scraping engine with Playwright to handle dynamic web content.',
      'Engineered a multi-stage prompt pipeline that cross-references job requirements with candidate skills.',
      'Implemented scikit-learn for advanced keyword density analysis and ATS scoring simulation.'
    ],
    results: [
      'Successfully processed over 100+ simulated applications with a 65% interview callback rate.',
      'Reduced average application time from 45 minutes to under 2 minutes.',
      'Open-sourced the core automation engine, gaining significant traction on GitHub.'
    ],
    stack: ['Angular', 'Firebase', 'GPT-4', 'scikit-learn', 'Python', 'Playwright'],
    link: 'https://github.com/SherazHussain546',
    image: 'https://picsum.photos/seed/job4you/800/600',
    imageHint: 'recruitment dashboard',
  },
  {
    slug: 'chattyai',
    name: 'ChattyAI – Conversational Study Assistant',
    description: 'A cross-platform AI chatbot university study aid that facilitated over 200 daily interactions.',
    fullDescription: 'ChattyAI was developed to serve as a 24/7 technical tutor for university students. Built with the Gemini API, it provides instant explanations for complex computing concepts, code debugging assistance, and personalized study schedules based on curriculum requirements.',
    challenges: [
      'Handling multi-turn conversations while maintaining context and factual accuracy.',
      'Developing a responsive mobile experience that works across low-bandwidth campus networks.',
      'Integrating a local database for offline history tracking.'
    ],
    solutions: [
      'Utilized Gemini 1.5 Flash for high-speed, contextual responses.',
      'Leveraged Ionic and Capacitor for a unified cross-platform mobile codebase.',
      'Implemented SQLite for persistent local storage of study sessions and user progress.'
    ],
    results: [
      'Facilitated over 5,000+ interactions in the first semester.',
      'Maintained sub-second response times for over 90% of queries.',
      'Received a 4.8/5 rating from the university pilot group.'
    ],
    stack: ['Firebase', 'TypeScript', 'Tailwind', 'SQLite', 'Ionic', 'Angular', 'Gemini API'],
    link: 'https://github.com/SherazHussain546',
    image: 'https://picsum.photos/seed/chattyai/800/600',
    imageHint: 'chatbot interface',
  },
  {
    slug: 'goexploree',
    name: 'GoExploree – Real Estate Mobile App',
    description: 'A cross-platform mobile app for real estate and property management with map integrations.',
    fullDescription: 'GoExploree is a comprehensive property discovery and management tool. It allows users to browse listings with a native-map interface, schedule viewings through an integrated calendar, and communicate directly with property managers, all within a secure and intuitive mobile environment.',
    challenges: [
      'Efficiently rendering hundreds of property markers on a mobile map without performance degradation.',
      'Building a secure authentication system that handles both social and email providers.',
      'Synchronizing real-time availability for viewing appointments.'
    ],
    solutions: [
      'Implemented marker clustering and lazy loading for the Google Maps integration.',
      'Utilized Firebase Authentication for robust and secure user identity management.',
      'Architected a Firestore-based real-time database to manage live booking schedules.'
    ],
    results: [
      'Deployed to both App Store and Play Store successfully.',
      'Supported over 30+ active property listings during the pilot phase.',
      'Achieved zero reported security vulnerabilities during the initial penetration test.'
    ],
    stack: ['Ionic', 'Angular', 'Capacitor', 'Firebase', 'PostgreSQL', 'Google Maps API'],
    link: 'https://github.com/SherazHussain546',
    liveLink: 'https://GoExploree.netlify.app',
    image: 'https://picsum.photos/seed/goexploree/800/600',
    imageHint: 'real estate mobile',
  },
];

export const education = {
  degree: 'Bachelor of Science in Computing (First Class Honors)',
  university: 'Dublin Business School',
  graduationDate: 'Sept 2021 – April 2025',
  awards: ['Peer-Mentor Leadership Award', 'Graduate Work Readiness Badges: Gold, Silver, Bronze'],
};

export const mainCertificates: CertificateType[] = [
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
];

export const otherCertificates: CertificateType[] = [
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
  { 
    title: 'Deloitte Australia - Cyber Job Simulation', 
    issuer: 'Forage', 
    date: 'Aug 2025', 
    icon: ShieldCheck,
    points: [
        'Completed a job simulation involving reading web activity logs',
        'Supported a client in a cyber security breach',
        'Answered questions to identify suspicious user activity'
    ],
    skills: ['Computer Networking', 'Log Analysis', 'Web Security']
  },
  { 
    title: 'Deloitte Australia - Data Analytics Job Simulation', 
    issuer: 'Forage', 
    date: 'Aug 2025', 
    icon: Database,
    points: [
        'Completed a Deloitte job simulation involving data analysis and forensic technology',
        'Created a data dashboard using Tableau',
        'Used Excel to classify data and draw business conclusions'
    ]
  },
  { title: 'Google Ads AI-Powered Performance Certification', issuer: 'Google', date: 'Jun 2023', icon: BrainCircuit },
  { title: 'Introduction to Virtual, Augmented & Mixed Reality', issuer: 'FutureLearn', date: 'Jul 2020', icon: Smartphone },
  { title: 'Sophomore Trader', issuer: 'Crypto.com', date: 'Jan 2024', icon: Bitcoin },
  { title: 'Junior Trader', issuer: 'Crypto.com', date: 'Jan 2024', icon: Bitcoin },
  { title: 'Freshman Trader', issuer: 'Crypto.com', date: 'Jan 2024', icon: Bitcoin },
  { title: 'Duolingo English Test', issuer: 'Duolingo', date: 'N/A', icon: Award },
];

export const allCertificates: CertificateType[] = [...mainCertificates, ...otherCertificates];
