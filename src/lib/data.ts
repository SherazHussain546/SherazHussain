import { Code, Server, Cloud, Database, BrainCircuit, ShieldCheck, Smartphone, Award, Star, School, LucideIcon, Bitcoin, Cpu, Zap, Users, Globe } from 'lucide-react';

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
    items: ['Next.js 15', 'React', 'Angular', 'Node.js', 'FastAPI', 'Django', 'Ionic', 'Tailwind CSS'],
  },
  'Cloud & DevOps': {
    icon: Cloud,
    items: ['AWS (Lambda, S3, EC2)', 'Google Cloud (GCP)', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
  },
  'AI & Intelligent Systems': {
    icon: BrainCircuit,
    items: ['Generative AI', 'Google Genkit', 'LLM Prompt Engineering', 'OpenAI', 'Automated Agents'],
  },
  'Databases': {
    icon: Database,
    items: ['PostgreSQL', 'MongoDB', 'Firebase Firestore', 'MySQL', 'BigQuery'],
  },
  'Web & Mobile Architecture': {
    icon: Smartphone,
    items: ['Cross-Platform Development', 'Capacitor', 'Zero-Latency UX', 'SEO Dominance', 'Responsive Design'],
  },
  'Cybersecurity & Integrity': {
    icon: ShieldCheck,
    items: ['Zero Trust Architecture', 'Penetration Testing', 'Data Encryption', 'Secure Authentication'],
  },
  'Strategic Leadership': {
    icon: Users,
    items: ['Technical Mentorship', 'Client Strategy', 'Agile Product Management', 'Market Innovation'],
  },
};

export const experiences = [
  {
    role: 'Principal Engineer & AI Architect',
    company: 'Independent Technical Consultant',
    link: 'https://www.synctech.ie',
    period: 'August 2025 - Present',
    description: 'Spearheading the delivery of high-stakes AI and Cloud solutions for international enterprise clients.',
    points: [
      'Architecting high-performance digital ecosystems utilizing Next.js 15 and Google Genkit, focused on sub-second responsiveness.',
      'Integrating advanced Generative AI agents into complex business workflows to automate decision-making and lead generation.',
      'Consulting on global technical SEO strategies, ensuring clients dominate their niche markets through high-fidelity indexing.',
      'Engineering scalable cloud infrastructure on AWS and GCP to support massive concurrent user growth.'
    ],
  },
  {
    role: 'Lead Technical Consultant',
    company: 'APTLY DRESSED',
    link: 'https://www.aptlydressed.com',
    period: 'September 2025 - Present',
    description: 'Orchestrating the technical strategy for a global affiliate marketing powerhouse.',
    points: [
      'Engineered a high-concurrency API infrastructure capable of handling millions of daily data points from global brands.',
      'Optimized site architecture for extreme performance, resulting in significant organic search growth and revenue conversion.',
      'Implemented automated tracking systems that ensure 100% attribution accuracy across multi-domain environments.',
    ],
  },
  {
    role: 'Full-Stack Software Architect',
    company: 'blogify.blog',
    link: 'https://www.blogify.blog',
    period: 'September 2025 - Present',
    description: 'Developing next-generation SaaS content distribution platforms.',
    points: [
      'Architected a multi-tenant publishing engine with secure, isolated data structures using Firebase Firestore.',
      'Pioneered a "Snippet-as-a-Service" model, allowing seamless integration of dynamic content into external domains.',
      'Engineered a high-speed payment and subscription gateway focused on micro-transaction efficiency.',
    ],
  },
  {
    role: 'E-Commerce Strategy Lead',
    company: 'Stylish Marble Art',
    link: 'https://www.stylishmarbleart.com',
    period: 'May 2025 – Present',
    description: 'Transforming luxury retail through advanced geospatial intelligence and SEO dominance.',
    points: [
      'Led the digital migration of a provincial industry leader, achieving #1 rankings for high-intent regional search queries.',
      'Integrated sophisticated Google Maps geospatial discovery for multiple brick-and-mortar showrooms.',
    ],
  },
  {
    role: 'Strategic Deputy Manager',
    company: 'Castore',
    period: 'April 2024 - Present',
    description: 'Driving operational excellence and technical data-analysis for a premium retail leader.',
    points: [
      'Utilizing data-driven insights to optimize customer experience and sales floor efficiency.',
      'Developed proprietary feedback-loop systems to surface technical improvements for brand scaling.',
    ],
  },
  {
    role: 'Peer Mentor (with Distinction)',
    company: 'Dublin Business School',
    period: 'Sept 2022 – May 2023',
    description: 'Providing advanced technical mentorship and academic leadership in computing.',
    points: [
      'Awarded "Peer Mentor with Distinction" for exceptional contributions to student technical growth.',
    ],
  },
];

export const projects: Project[] = [
  {
    slug: 'sync-tech-solutions',
    name: 'Enterprise AI & Cloud Transformation – Strategic Engineering',
    description: 'Architecting high-fidelity, AI-driven digital ecosystems for global market dominance.',
    fullDescription: 'At the intersection of AI and Cloud, I engineer the digital future. This case study focuses on the strategic deployment of enterprise-grade systems that leverage Google Genkit and Firebase to automate complex business logic. By prioritizing "Technical Integrity," I have helped international brands transform their legacy systems into high-performance, SEO-dominant platforms that convert traffic into strategic growth.',
    challenges: [
      'Integrating custom AI reasoning engines into established business operations.',
      'Scaling cloud infrastructure to handle 10x traffic spikes without latency.',
      'Maintaining rigorous data security standards in multi-cloud environments.'
    ],
    solutions: [
      {
        title: 'Intelligent Automation',
        description: 'Developed bespoke Gemini-powered agents that handle automated lead analysis and customer interactions.'
      },
      {
        title: 'Elastic Infrastructure',
        description: 'Leveraged serverless architectures to ensure 99.9% availability during high-concurrency events.'
      },
      {
        title: 'SEO Performance Tuning',
        description: 'Conducted deep-level optimization of Core Web Vitals, ensuring sub-2s load speeds globally.'
      }
    ],
    results: [
      'Achieved a 40% reduction in operational bottlenecks for enterprise partners.',
      'Propelled client domains to the #1 spot for high-value technical keywords.',
      'Deployed over 10 production-grade solutions with global reach.'
    ],
    stack: ['Next.js 15', 'TypeScript', 'Google Genkit', 'Firebase', 'AWS', 'GCP', 'Tailwind CSS', 'Technical SEO'],
    link: 'https://www.synctech.ie',
    image: 'https://picsum.photos/seed/synctech-solutions/800/600',
    imageHint: 'enterprise cloud architecture',
  },
  {
    slug: 'market-genius',
    name: 'Market Genius – AI-Powered Financial Intelligence Engine',
    description: 'Engineering the future of financial signals with LLM-based technical analysis and real-time market data.',
    fullDescription: 'Market Genius is an elite financial analytics platform designed to bridge the gap between raw volatility and strategic decision-making. By integrating real-time data from AlphaVantage and Crypto.com, the platform utilizes Google Genkit to perform complex sentiment and technical analysis. It provides users with instant, data-backed "Buy," "Hold," or "Sell" signals, showcasing my expertise in high-concurrency data engineering and AI-driven insights.',
    challenges: [
      'Processing high-frequency financial data with zero attribution loss.',
      'Developing a reliable LLM reasoning layer for volatile market indicators.',
      'Delivering real-time alerts to a global user base with sub-second latency.'
    ],
    solutions: [
      {
        title: 'Signal Logic Architecture',
        description: 'Built a sophisticated reasoning engine that translates complex market indicators into human-readable strategy.'
      },
      {
        title: 'Real-time Data Fabric',
        description: 'Utilized Firebase Cloud Messaging and Firestore to sync market shifts instantly across all user devices.'
      }
    ],
    results: [
      'Reduced user decision-making time by 75% via AI-automated analysis.',
      'Maintained sub-100ms response times for high-frequency data ingestion.',
      'Successfully tracked 100+ asset pairs with production-grade consistency.'
    ],
    stack: ['Next.js', 'Google Genkit', 'Firebase Firestore', 'AlphaVantage API', 'Crypto.com API', 'TypeScript'],
    link: 'https://github.com/SherazHussain546/Market-Genius',
    liveLink: 'https://marketgenius546.netlify.app/',
    image: 'https://picsum.photos/seed/market-genius/800/600',
    imageHint: 'AI financial dashboard',
  },
  {
    slug: 'job4you',
    name: 'Job4You – AI Recruitment Ecosystem & ATS Optimizer',
    description: 'Empowering job seekers with ATS-optimized document generation and AI-verified employment boards.',
    fullDescription: 'Job4You is a comprehensive career acceleration platform that democratizes the power of AI for job seekers. My goal was to create a tool that removes the "technical barrier" of resume tailoring. Using custom Gemini AI workflows, the platform generates perfectly formatted LaTeX resumes and cover letters. It also features an AI-governed job board that uses machine learning to filter fraudulent listings, ensuring a high-trust environment for the community.',
    challenges: [
      'Engineering a multi-stage AI workflow for high-fidelity document generation.',
      'Developing ML models to detect and score job listing legitimacy.',
      'Ensuring a native-quality experience for non-technical users.'
    ],
    solutions: [
      {
        title: 'ATS Engine Dominance',
        description: 'Created a proprietary prompt-chaining system that ensures resumes pass through advanced recruitment filters.'
      },
      {
        title: 'Trust-Score Algorithm',
        description: 'Implemented scikit-learn based classifiers to identify and block deceptive job postings automatically.'
      }
    ],
    results: [
      'Automated resume tailoring from 2 hours down to 60 seconds.',
      'Empowered 500+ users with high-fidelity application packages.',
      'Achieved a 95% filtration rate for low-trust job opportunities.'
    ],
    stack: ['Next.js', 'Firebase Auth', 'Gemini API', 'Python', 'scikit-learn', 'LaTeX Engineering'],
    link: 'https://github.com/SherazHussain546/Job4You',
    liveLink: 'https://job4yo.netlify.app/',
    image: 'https://picsum.photos/seed/job4you/800/600',
    imageHint: 'AI recruitment platform',
  },
  {
    slug: 'stylish-marble-art',
    name: 'Stylish Marble Art – Digital Hegemony for Luxury Retail',
    description: 'Transforming a provincial leader into a search engine giant through technical SEO and geospatial intelligence.',
    fullDescription: 'Stylish Marble Art is a legendary name in high-end stone retail. I led their digital transformation to capture the luxury market by building a high-performance Next.js platform. By implementing advanced geospatial discovery and a rigorous technical SEO strategy, I propelled the brand to the #1 spot on search engines, ensuring their physical showrooms remain the primary destination for luxury stone in the region.',
    challenges: [
      'Optimizing for high-resolution imagery without sacrificing sub-second load times.',
      'Dominating high-competition search rankings for regional commerce.'
    ],
    solutions: [
      {
        title: 'Geospatial Discovery',
        description: 'Integrated multi-marker Google Maps intelligence to drive foot traffic to all three physical showrooms.'
      },
      {
        title: 'Technical SEO Layer',
        description: 'Architected a sophisticated metadata strategy that outperformed established competitors in organic search.'
      }
    ],
    results: [
      'Increased digital inquiries by 400% through search dominance.',
      'Achieved 100% Core Web Vitals pass rate on all devices.',
      'Secured and maintained the top organic spot for all primary keywords.'
    ],
    stack: ['Next.js', 'Google Maps API', 'Netlify', 'Technical SEO', 'Metadata Engineering'],
    link: 'https://www.stylishmarbleart.com',
    image: 'https://picsum.photos/seed/stylishmarble/800/600',
    imageHint: 'luxury marble interior',
  },
];

export const education = {
  degree: 'Bachelor of Science in Computing (First Class Honors)',
  university: 'Dublin Business School',
  graduationDate: 'Sept 2021 – April 2025',
  awards: ['Peer-Mentor Leadership Award (Distinction)', 'Graduate Work Readiness: Gold Standard'],
};

export const allCertificates: CertificateType[] = [
  {
    title: 'Mastercard Cybersecurity Virtual Experience Program',
    issuer: 'Forage',
    date: 'March 2026',
    credentialUrl: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/mfxGwGDp6WkQmtmTf/vcKAB5yYAgvemepGQ_mfxGwGDp6WkQmtmTf_uuJYSQRPzdEooqNQY_1739812883226_completion_certificate.pdf',
    icon: ShieldCheck,
    skills: ['Communication', 'Cybersecurity', 'Data Analysis', 'Data Visualization', 'Design Thinking', 'Problem Solving', 'Security Awareness', 'Security Training', 'Strategy'],
    points: [
      'Completed a job simulation where I served as an analyst on Mastercard’s Security Awareness Team',
      'Helped identify and report security threats such as phishing',
      'Analyzed and identified which areas of the business needed more robust security training and implemented training courses and procedures for those teams',
    ],
  },
  {
    title: 'Electronic Arts Software Engineering Virtual Experience',
    issuer: 'Forage',
    date: 'August 31, 2025',
    credentialUrl: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/j43dGscQHtJJ57N54/a77WE3de8qrxWferQ_j43dGscQHtJJ57N54_uuJYSQRPzdEooqNQY_1756679570418_completion_certificate.pdf',
    icon: Award,
    skills: ['Code Quality', 'Code Review', 'Communication', 'Data Structures', 'Feature Development', 'Game Development', 'Object-Oriented Design', 'Object-Oriented Programming', 'Product Management'],
    points: [
      'Proposed a new feature for the EA Sports College Football and wrote a Feature Proposal describing it to other stakeholders.',
      'Built a class diagram and created a header file in C++ with class definitions for each object.',
      'Patched a bugfix and optimized the EA Sports College Football codebase by implementing an improved data structure.',
    ],
  },
  {
    title: 'Deloitte Australia Technology Job Simulation',
    issuer: 'Forage',
    date: 'August 31, 2025',
    credentialUrl: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_uuJYSQRPzdEooqNQY_1756600268754_completion_certificate.pdf',
    icon: Code,
    skills: ['Computer Networking', 'Data Analysis', 'Data Modeling', 'Data Structures', 'Data Visualization Tools', 'Formal Communication', 'Log Analysis', 'Planning', 'Programming', 'Python Programming', 'Software Development', 'Spreadsheet Skills', 'Web Security'],
    points: [
      'Completed a job simulation involving development and coding',
      'Wrote a proposal for creating a dashboard',
    ],
  },
  {
    title: 'Deloitte Australia Data Analytics Job Simulation',
    issuer: 'Forage',
    date: 'August 31, 2025',
    credentialUrl: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_uuJYSQRPzdEooqNQY_1756596432652_completion_certificate.pdf',
    icon: Database,
    skills: ['Computer Networking', 'Data Analysis', 'Data Modeling', 'Data Structures', 'Data Visualization Tools', 'Formal Communication', 'Log Analysis', 'Planning', 'Programming', 'Python Programming', 'Software Development', 'Spreadsheet Skills', 'Web Security'],
    points: [
      'Completed a Deloitte job simulation involving data analysis and forensic technology',
      'Created a data dashboard using Tableau',
      'Used Excel to classify data and draw business conclusions',
    ],
  },
  {
    title: 'Deloitte Australia Cyber Job Simulation',
    issuer: 'Forage',
    date: 'August 30, 2025',
    credentialUrl: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_uuJYSQRPzdEooqNQY_1756591635335_completion_certificate.pdf',
    icon: ShieldCheck,
    skills: ['Computer Networking', 'Data Analysis', 'Data Modeling', 'Data Structures', 'Data Visualization Tools', 'Formal Communication', 'Log Analysis', 'Planning', 'Programming', 'Python Programming', 'Software Development', 'Spreadsheet Skills', 'Web Security'],
    points: [
      'Completed a job simulation involving reading web activity logs',
      'Supported a client in a cyber security breach',
      'Answered questions to identify suspicious user activity',
    ],
  },
  {
    title: 'AI-Powered Performance Certification',
    issuer: 'Google',
    date: 'Jun 2023',
    icon: BrainCircuit,
    skills: ['Predictive Analytics', 'Automated Advertising'],
  },
  {
    title: 'Sophomore & Junior Trader Certifications',
    issuer: 'Crypto.com',
    date: 'Jan 2024',
    icon: Bitcoin,
    skills: ['Market Analysis', 'Asset Liquidity', 'Financial Signals'],
  },
];

export const projectGoals = [
  {
    id: 'goal-1',
    title: 'Inclusive Compute Scaling',
    description: 'Funding high-performance GPU instances to keep AI tools free and fast for everyone, regardless of their technical background.',
    iconName: 'Cpu',
    order: 1
  },
  {
    id: 'goal-2',
    title: 'Open-Source Sustainability',
    description: 'Ensuring the long-term maintenance of tools like Job4You and Market Genius, protecting them from corporate paywalls.',
    iconName: 'Zap',
    order: 2
  },
  {
    id: 'goal-3',
    title: 'Global Technical Mentorship',
    description: 'Building free resources and workshops to empower the next generation of engineers who prioritize user accessibility.',
    iconName: 'Users',
    order: 3
  }
];
