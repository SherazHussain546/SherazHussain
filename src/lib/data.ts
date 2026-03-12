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
  solutions: { title: string; description: string }[];
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
    description: 'Sheraz Hussain, founder of SYNC TECH, delivers high-end Software Engineering and AI solutions globally.',
    points: [
      'Engineered custom full-stack web applications for international clients, optimizing digital infrastructure for SYNC TECH Solutions.',
      'Specialized in high-performance AI integration and scalable cloud systems using Next.js and React.',
      'Provided strategic technical consulting for startups, focusing on competitive technical SEO and user conversion.',
      'Expertise: AI/ML Engineering, Cloud Architecture, and Advanced Full-Stack Development.'
    ],
  },
  {
    role: 'Freelance Consultant',
    company: 'APTLY DRESSED',
    link: 'https://www.aptlydressed.com',
    period: 'September 2025 - Present',
    description: 'Technical lead for high-volume affiliate marketing systems.',
    points: [
      'Developed and maintained core platform architecture for global affiliate operations.',
      'Engineered high-concurrency API integrations for world-leading brands.',
      'Optimized site architecture for competitive SEO rankings and affiliate revenue growth.',
    ],
  },
  {
    role: 'Freelance Web Developer',
    company: 'blogify.blog',
    link: 'https://www.blogify.blog',
    period: 'September 2025 - Present',
    description: 'Full-stack development for content-heavy publishing platforms.',
    points: [
      'Customized CMS features to improve technical SEO and publishing velocity.',
      'Enhanced platform performance through specialized technical audits and speed optimization.',
      'Managed cloud deployment and continuous integration pipelines.',
    ],
  },
  {
    role: 'Web Developer & Consultant',
    company: 'Stylish Marble Art',
    link: 'https://www.stylishmarbleart.com',
    period: 'May 2025 – Present',
    description: 'E-commerce and SEO lead for luxury retail services.',
    points: [
      'Implemented advanced SEO strategies, resulting in a significant uplift in organic traffic and sales leads.',
      'Transformed the digital presence of a traditional marble business into a modern e-commerce powerhouse.',
    ],
  },
  {
    role: 'Deputy Manager',
    company: 'Castore',
    period: 'April 2024 - Present',
    description: 'Strategic leadership and team management at a premium sportswear retailer.',
    points: [
      'Led a team of 12+, focusing on data-driven sales performance and customer experience optimization.',
      'Developed customer-feedback portals to surface technical insights for brand improvement.',
    ],
  },
  {
    role: 'E-Commerce Manager',
    company: 'LUXE THREADS',
    period: 'May 2024 – Jan 2025',
    description: 'End-to-end brand management and technical marketing.',
    points: [
      'Executed full-scale SEO and digital advertising campaigns that doubled organic traffic.',
      'Architected high-conversion marketing funnels and handled technical brand scaling.',
    ],
  },
  {
    role: 'Peer Mentor',
    company: 'Dublin Business School',
    period: 'Sept 2022 – May 2023',
    description: 'Academic leadership and technical mentorship for undergraduate students.',
    points: [
      'Recognized with the Peer Mentor with Distinction award for exceptional leadership in computing education.',
    ],
  },
];

export const projects: Project[] = [
  {
    slug: 'market-genius',
    name: 'Market Genius – AI-Powered Financial Signals & Market Intelligence',
    description: 'Sheraz Hussain engineered Market Genius: A high-fidelity financial signal platform providing real-time Buy, Sell, and Hold alerts using Google Genkit and advanced technical indicators.',
    fullDescription: 'Market Genius, developed by Sheraz Hussain (SYNC TECH Solutions), is a sophisticated market analytics engine designed for professional-grade stock and cryptocurrency intelligence. It bridges the gap between raw financial volatility and actionable insights. By integrating high-frequency data from AlphaVantage and Crypto.com, the platform leverages Google Genkit (LLMs) to perform complex sentiment and technical analysis. The core engineering delivers instant "Buy," "Hold," or "Sell" signals, empowering users with data-backed confidence in high-stakes markets.',
    challenges: [
      'Managing high-concurrency data ingestion from AlphaVantage and Crypto.com APIs with sub-second latency.',
      'Developing a reliable LLM-based reasoning engine with Google Genkit to ensure accurate financial signaling.',
      'Implementing real-time Firebase Cloud Messaging (FCM) for instant push alerts across a global user base.'
    ],
    solutions: [
      {
        title: 'Core AI Intelligence',
        description: 'Architected a sophisticated reasoning engine using Google Genkit that processes technical market indicators into human-readable signals.'
      },
      {
        title: 'Cloud Infrastructure',
        description: 'Leveraged Next.js, Firebase Firestore, and Serverless functions for a resilient, scalable backend that caches high-frequency market data.'
      },
      {
        title: 'Real-time Connectivity',
        description: 'Integrated Firebase Authentication and Messaging to provide a secure, real-time alert system that keeps users ahead of market shifts.'
      }
    ],
    results: [
      'Delivered sub-second AI reasoning for over 100+ stock and crypto asset pairs.',
      'Maintained 99.9% uptime for high-frequency data synchronization.',
      'Achieved a 75% faster decision-making process for users through AI-summarized technical insights.'
    ],
    stack: ['Next.js', 'TypeScript', 'Google Genkit', 'Firebase Firestore', 'Firebase Messaging', 'Firebase Auth', 'AlphaVantage API', 'Crypto.com API', 'Tailwind CSS', 'ShadCN UI'],
    link: 'https://github.com/SherazHussain546/Market-Genius',
    liveLink: 'https://marketgenius546.netlify.app/',
    image: 'https://picsum.photos/seed/market-genius/800/600',
    imageHint: 'AI finance dashboard',
  },
  {
    slug: 'job4you',
    name: 'Job4You – Your Personal AI Recruiter & ATS Optimization Engine',
    description: 'An AI-powered career assistant by Sheraz Hussain that generates ATS-optimized resumes, LaTeX cover letters, and verified job postings.',
    fullDescription: 'Job4You is a comprehensive career acceleration platform engineered by Sheraz Hussain. It automates the complex job application lifecycle using advanced AI Workflows. Users can securely sign up via Google (Firebase Auth) to manage their profiles. By processing job descriptions through Gemini AI Agents, the system generates perfect LaTeX code for ATS-optimized resumes, tailored cover letters, and hiring manager outreach emails. The platform also features a trust-verified job board where an AI Agent analyzes listing legitimacy before allowing them to go live.',
    challenges: [
      'Building a multi-stage AI Agent workflow to cross-reference candidate skills with complex ATS criteria.',
      'Developing a trust-verification system using Python and scikit-learn to identify fraudulent job postings.',
      'Engineering a seamless LaTeX rendering pipeline for professional, high-fidelity document generation.'
    ],
    solutions: [
      {
        title: 'ATS Intelligence Engine',
        description: 'Utilized Gemini API and custom AI Agents to re-engineer resume content for maximum compatibility with recruitment algorithms.'
      },
      {
        title: 'Trust & Verification',
        description: 'Implemented a fraud-detection agent that scores job posting legitimacy before admin approval, ensuring a high-quality community job board.'
      },
      {
        title: 'Next-Gen Document Pipeline',
        description: 'Created a structured LaTeX output system that allows users to download professional, industry-standard application documents instantly.'
      }
    ],
    results: [
      'Reduces resume tailoring time from hours to under 60 seconds per application.',
      'Successfully identified and filtered 95% of low-trust job postings via AI verification.',
      'Enabled over 500+ users to generate ATS-ready application documents.'
    ],
    stack: ['Next.js', 'React', 'Angular', 'Firebase Auth', 'Firestore', 'Python', 'scikit-learn', 'Gemini API', 'AI Agents', 'Netlify'],
    link: 'https://github.com/SherazHussain546/Job4You',
    liveLink: 'https://job4yo.netlify.app/',
    image: 'https://picsum.photos/seed/job4you/800/600',
    imageHint: 'AI recruitment platform',
  },
  {
    slug: 'chattyai',
    name: 'ChattyAI – AI-Driven Conversational Study Assistant & Document Intelligence',
    description: 'Sheraz Hussain engineered ChattyAI, a high-performance study platform helping 400+ DBS students with document intelligence, live screen sharing, and AI-driven summarization.',
    fullDescription: 'ChattyAI is a premier educational technology platform developed by Sheraz Hussain (Founder of SYNC TECH Solutions). Inspired by industry giants like ChatGPT and Gemini, ChattyAI was specifically architected to support the academic rigor at Dublin Business School (DBS). The platform features an advanced Document Intelligence engine capable of transforming static PDFs and instructional videos into interactive quizzes, comprehensive summaries, and dynamic flashcards. Uniquely, it integrates live video streaming for screen sharing, allowing the AI to "see" and assist with real-time technical problem-solving. By leveraging a hybrid AI architecture (Gemini & OpenAI), ChattyAI provides a resilient, high-context study companion that has directly empowered over 400+ students.',
    challenges: [
      'Implementing high-throughput PDF and Video processing for real-time document-to-quiz transformations.',
      'Architecting a low-latency live video streaming interface for real-time AI screen analysis.',
      'Managing multi-modal context synchronization between Gemini and OpenAI providers for seamless study sessions.'
    ],
    solutions: [
      {
        title: 'Document Intelligence',
        description: 'Developed a robust data-extraction pipeline using Supabase and Firestore to handle multi-modal inputs like PDFs and video transcripts, generating automated flashcards and quizzes.'
      },
      {
        title: 'Hybrid AI Core',
        description: 'Engineered a provider-agnostic AI layer that intelligently switches between Gemini and OpenAI models based on task complexity, ensuring cost-effective and accurate tutoring.'
      },
      {
        title: 'Real-time Vision',
        description: 'Integrated live video streaming capabilities that allow the Gemini-powered assistant to interpret visual data from the user’s screen for real-time debugging and tutoring.'
      }
    ],
    results: [
      'Successfully empowered 400+ students at Dublin Business School with automated study material generation.',
      'Achieved a 60% reduction in study preparation time through AI-driven summarization and quiz generation.',
      'Maintained 98% accuracy across 10,000+ technical tutoring interactions.'
    ],
    stack: ['Ionic', 'Angular', 'Firebase Auth', 'Firestore', 'Gemini API', 'OpenAI API', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Capacitor'],
    link: 'https://github.com/SherazHussain546',
    image: 'https://picsum.photos/seed/chattyai/800/600',
    imageHint: 'AI study assistant',
  },
  {
    slug: 'goexploree',
    name: 'GoExploree – Real Estate Mobile Discovery Platform',
    description: 'A full-stack real estate property discovery app with native map integrations and real-time scheduling.',
    fullDescription: 'GoExploree is a robust real estate tool engineered by Sheraz Hussain. It features a high-performance map interface for property discovery, integrated calendar systems for scheduling, and real-time communication between users and managers.',
    challenges: [
      'Efficiently rendering high-density marker clusters on mobile map interfaces.',
      'Synchronizing real-time property availability across multiple user sessions.'
    ],
    solutions: [
      {
        title: 'Geospatial Performance',
        description: 'Implemented advanced marker clustering and lazy loading for the Google Maps integration.'
      },
      {
        title: 'Real-time Operations',
        description: 'Architected a Firestore-based database to handle live booking schedules and property status updates.'
      }
    ],
    results: [
      'Successfully deployed to both App Store and Play Store.',
      'Zero security vulnerabilities reported during the initial penetration testing phase.'
    ],
    stack: ['Ionic', 'Angular', 'Capacitor', 'Firebase Auth', 'Firestore', 'Google Maps API', 'PostgreSQL'],
    link: 'https://github.com/SherazHussain546',
    liveLink: 'https://GoExploree.netlify.app',
    image: 'https://picsum.photos/seed/goexploree/800/600',
    imageHint: 'Real estate app',
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
