import { Code, Server, Cloud, Database, BrainCircuit, ShieldCheck, Smartphone, Award, Star, School, LucideIcon, Bitcoin, Cpu, Zap, Users } from 'lucide-react';

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
  'Soft Skills': {
    icon: Users,
    items: ['Strategic Leadership', 'Technical Mentorship', 'Client Relationship Management', 'Problem Solving', 'Agile Methodology', 'Effective Communication'],
  },
};

export const experiences = [
  {
    role: 'Freelance Web Developer',
    company: 'SYNC TECH',
    link: 'https://www.synctech.ie',
    period: 'August 2025 - Present',
    description: 'Sheraz Hussain, a Freelancer working with SYNC TECH Solutions, delivers high-end Software Engineering and AI solutions globally.',
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
    description: 'Full-stack development for content-heavy publishing platforms and SaaS solutions.',
    points: [
      'Architected a multi-tenant blogging platform with secure Firebase Authentication and Firestore database management.',
      'Developed a "Snippet-as-a-Service" feature allowing users to embed blog feeds into external sites for a subscription fee.',
      'Implemented a subscription logic modeled after the "cheapest coffee" concept (€2.99) to drive user retention.',
      'Managed cloud deployment and continuous integration on Google Cloud Platform.',
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
    slug: 'sync-tech-solutions',
    name: 'SYNC TECH Solutions – Strategic AI & Cloud Infrastructure Transformation',
    description: 'Sheraz Hussain (Freelancer working with SYNC TECH Solutions) architected and deployed high-performance AI-driven enterprise systems for global clients.',
    fullDescription: 'As a Lead Freelancer at SYNC TECH Solutions, Sheraz Hussain specializes in the strategic digital transformation of enterprise-level systems. This case study highlights the development of several bespoke full-stack applications that integrate Google Cloud, Firebase, and Gemini-based AI agents to automate complex business workflows. By implementing high-concurrency cloud architectures and technical SEO optimization, these projects delivered measurable growth in both operational efficiency and organic reach for international partners.',
    challenges: [
      'Orchestrating multi-cloud environments (AWS & GCP) for high-availability enterprise services.',
      'Integrating custom Generative AI agents into legacy business processes for automated lead generation.',
      'Maintaining zero-downtime during the technical migration of high-traffic content platforms.'
    ],
    solutions: [
      {
        title: 'Enterprise AI Integration',
        description: 'Developed custom Gemini-powered agents for automated client interaction and document analysis, increasing workflow velocity.'
      },
      {
        title: 'Scalable Cloud Architecture',
        description: 'Implemented serverless cloud functions and edge-side rendering to handle sudden traffic spikes without performance degradation.'
      },
      {
        title: 'Technical SEO & Performance',
        description: 'Conducted deep-level technical audits and performance tuning, achieving 95+ Core Web Vitals scores across all client platforms.'
      }
    ],
    results: [
      'Boosted client operational efficiency by an average of 40%.',
      'Increased organic search visibility by over 150% for e-commerce partners.',
      'Successfully deployed 10+ professional-grade digital solutions globally.'
    ],
    stack: ['Next.js', 'React', 'Google Genkit', 'Firebase', 'AWS', 'GCP', 'TypeScript', 'Tailwind CSS', 'Technical SEO', 'Cloud Architecture'],
    link: 'https://www.synctech.ie',
    image: 'https://picsum.photos/seed/synctech-solutions/800/600',
    imageHint: 'enterprise cloud architecture',
  },
  {
    slug: 'market-genius',
    name: 'Market Genius – AI-Powered Financial Signals & Market Intelligence',
    description: 'Sheraz Hussain (Freelancer working with SYNC TECH Solutions) engineered Market Genius: A high-fidelity financial signal platform providing real-time Buy, Sell, and Hold alerts using Google Genkit and advanced technical indicators.',
    fullDescription: 'Market Genius is a sophisticated market analytics engine designed by Sheraz Hussain for professional-grade stock and cryptocurrency intelligence. It bridges the gap between raw financial volatility and actionable insights. By integrating high-frequency data from AlphaVantage and Crypto.com, the platform leverages Google Genkit (LLMs) to perform complex sentiment and technical analysis. The core engineering delivers instant "Buy," "Hold," or "Sell" signals, empowering users with data-backed confidence in high-stakes markets. This SYNC TECH Solutions project highlights advanced Full-Stack Software Engineering and Cloud Architecture.',
    challenges: [
      'Managing high-concurrency data ingestion from AlphaVantage and Crypto.com APIs with sub-second latency.',
      'Developing a reliable LLM-based reasoning engine with Google Genkit to ensure accurate financial signaling.',
      'Implementing real-time Firebase Cloud Messaging (FCM) for instant push alerts across a global user base.'
    ],
    solutions: [
      {
        title: 'AI Intelligence',
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
      'Delivered sub-second AI reasoning for over 100+ asset pairs.',
      'Maintained 99.9% uptime for high-frequency data synchronization.',
      'Achieved a 75% faster decision-making process for users.'
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
    description: 'An AI-powered career assistant by Sheraz Hussain (Freelancer working with SYNC TECH Solutions) that generates ATS-optimized resumes, LaTeX cover letters, and verified job postings using Gemini AI agents.',
    fullDescription: 'Job4You is a comprehensive career acceleration platform engineered by Sheraz Hussain (Freelancer working with SYNC TECH Solutions). It automates the complex job application lifecycle using advanced AI Workflows. Users can securely sign up via Google (Firebase Auth) to manage their profiles. By processing job descriptions through Gemini AI Agents, the system generates perfect LaTeX code for ATS-optimized resumes, tailored cover letters, and hiring manager outreach emails. The platform also features a trust-verified job board where an AI Agent analyzes listing legitimacy before allowing them to go live, showcasing expertise in Python, scikit-learn, and Full-Stack Engineering.',
    challenges: [
      'Building a multi-stage AI Agent workflow to cross-reference candidate skills with complex ATS criteria.',
      'Developing a trust-verification system using Python and scikit-learn to identify fraudulent job postings.',
      'Engineering a seamless LaTeX rendering pipeline for professional, high-fidelity document generation.'
    ],
    solutions: [
      {
        title: 'ATS Engine',
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
      'Reduces resume tailoring time from hours to under 60 seconds.',
      'Filtered 95% of low-trust job postings via AI verification.',
      'Enabled over 500+ users to generate ATS-ready application documents.'
    ],
    stack: ['Next.js', 'React', 'Angular', 'Firebase Auth', 'Firestore', 'Python', 'scikit-learn', 'Gemini API', 'AI Agents', 'Netlify'],
    link: 'https://github.com/SherazHussain546/Job4You',
    liveLink: 'https://job4yo.netlify.app/',
    image: 'https://picsum.photos/seed/job4you/800/600',
    imageHint: 'AI recruitment platform',
  },
  {
    slug: 'stylish-marble-art',
    name: 'Stylish Marble Art – Digital Hegemony & SEO Dominance for Luxury Stonework',
    description: 'A Karachi-based marble powerhouse with 3 physical stores, transformed into a search engine leader using Next.js and advanced geospatial intelligence.',
    fullDescription: 'Stylish Marble Art is a legendary name in Karachi and the wider Sindh province, operating three major showrooms. Sheraz Hussain (SYNC TECH Solutions) led a comprehensive digital transformation to capture the high-end luxury market. By implementing a high-performance Next.js frontend deployed on Netlify, integrated with a custom SQL backend and Google Maps API for multi-location discovery, the platform achieved a 100% success rate in search engine visibility. The strategic implementation of niche keywords and technical metadata ensured the brand\'s dominance at the top of global and local search results.',
    challenges: [
      'Optimizing multi-location geospatial discovery for 3 Karachi stores.',
      'Competing for top-tier search rankings in a high-stakes luxury stone market.',
      'Ensuring sub-second load times for high-resolution marble texture displays.'
    ],
    solutions: [
      {
        title: 'Geospatial Multi-Location',
        description: 'Integrated Google Maps API with custom markers for all three physical Karachi showrooms, improving local foot traffic discovery.'
      },
      {
        title: 'Next.js & Netlify Optimization',
        description: 'Leveraged static site generation (SSG) to provide instant load speeds, crucial for retaining high-net-worth clients.'
      },
      {
        title: 'Advanced SEO Engineering',
        description: 'Architected a sophisticated metadata layer and keyword strategy that propelled the site to the #1 spot for regional marble commerce.'
      }
    ],
    results: [
      'Maintained #1 search engine ranking for primary luxury stone keywords.',
      'Successfully digitized a provincial leader with 3 physical branches.',
      'Increased digital lead generation by 400% through technical SEO dominance.'
    ],
    stack: ['Next.js', 'Google Maps API', 'Custom SQL', 'Netlify', 'Technical SEO', 'Metadata Engineering', 'React'],
    link: 'https://www.stylishmarbleart.com',
    image: 'https://picsum.photos/seed/stylishmarble/800/600',
    imageHint: 'luxury marble interior',
  },
  {
    slug: 'chattyai',
    name: 'ChattyAI – AI-Driven Conversational Study Assistant & Document Intelligence',
    description: 'Sheraz Hussain (Freelancer working with SYNC TECH Solutions) engineered ChattyAI, a high-performance study platform that empowered 400+ DBS students with document intelligence, live video streaming, and AI-driven summarization.',
    fullDescription: 'ChattyAI is a premier educational technology platform developed by Sheraz Hussain (Freelancer working with SYNC TECH Solutions). Inspired by industry giants like ChatGPT and Gemini, ChattyAI was specifically architected to support the academic rigor at Dublin Business School (DBS). The platform features an advanced Document Intelligence engine capable of transforming static PDFs and instructional videos into interactive quizzes, comprehensive summaries, and dynamic flashcards. Uniquely, it integrates live video streaming for screen sharing, allowing the AI to "see" and assist with real-time technical problem-solving. While this project reached completion upon Sheraz\'s graduation, its legacy remains as a benchmark for student-focused AI integration, leveraging a hybrid architecture of Gemini, OpenAI, Firebase, and Ionic.',
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
        description: 'Engineered a provider-agnostic AI layer that intelligently switches between Gemini and OpenAI models based on task complexity, ensuring accurate tutoring.'
      },
      {
        title: 'Real-time Vision',
        description: 'Integrated live video streaming capabilities that allow the Gemini-powered assistant to interpret visual data from the user’s screen for real-time debugging.'
      }
    ],
    results: [
      'Empowered 400+ students at Dublin Business School with automated study material generation.',
      'Achieved a 60% reduction in study preparation time through AI-driven summarization.',
      'Maintained 98% accuracy across 10,000+ technical tutoring interactions.'
    ],
    stack: ['Ionic', 'Angular', 'Firebase Auth', 'Firestore', 'Gemini API', 'OpenAI API', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Capacitor'],
    link: 'https://github.com/SherazHussain546/ChattyAI',
    image: 'https://picsum.photos/seed/chattyai/800/600',
    imageHint: 'AI study assistant',
  },
  {
    slug: 'goexploree',
    name: 'GoExploree – Real Estate Mobile Discovery Platform & High-Performance Property Search',
    description: 'Sheraz Hussain (Freelancer working with SYNC TECH Solutions) engineered GoExploree: A robust, full-stack real estate discovery engine for buying and renting properties, inspired by Daft.ie and optimized for Irish markets.',
    fullDescription: 'GoExploree is a high-performance real estate discovery platform developed by Sheraz Hussain (Freelancer working with SYNC TECH Solutions) for the Irish property market. Inspired by the market leader Daft.ie, this project showcases a sophisticated integration of mobile-first design and complex geospatial intelligence. Users can securely manage their accounts using Firebase Authentication and browse thousands of property listings stored in a hybrid architecture of Firestore and PostgreSQL. The application features a native-quality mobile experience via Ionic and Capacitor, integrated with the Google Maps API for precise location-based searches and real-time viewing scheduling. This SYNC TECH Solutions project highlights expert-level cross-platform development and enterprise-grade cloud integration.',
    challenges: [
      'Optimizing high-density geospatial data rendering for smooth interactions on mobile map interfaces.',
      'Implementing a hybrid database architecture between real-time Firestore updates and relational PostgreSQL property metadata.',
      'Ensuring seamless cross-platform performance across iOS, Android, and Web using a single Ionic/Capacitor codebase.'
    ],
    solutions: [
      {
        title: 'Geospatial Intelligence',
        description: 'Leveraged the Google Maps API with advanced marker clustering and spatial indexing to provide a responsive, high-fidelity property discovery experience.'
      },
      {
        title: 'Hybrid Cloud Backend',
        description: 'Architected a dual-database system using Firebase for real-time user sessions and PostgreSQL for complex property relations and search filtering.'
      },
      {
        title: 'Cross-Platform Excellence',
        description: 'Developed a unified codebase using Angular and Ionic, deployed via Capacitor to provide native performance on mobile devices with web-speed deployment.'
      }
    ],
    results: [
      'Achieved 99.9% data consistency across hybrid database sync.',
      'Reduced property search latency by 45% through spatial indexing.',
      'Successfully deployed a production-ready real estate ecosystem on Netlify.'
    ],
    stack: ['Ionic', 'Angular', 'Capacitor', 'Firebase Auth', 'Firestore', 'PostgreSQL', 'Google Maps API', 'TypeScript', 'Tailwind CSS', 'Netlify'],
    link: 'https://github.com/SherazHussain546/GoExploree',
    liveLink: 'https://goexploree.netlify.app/home',
    image: 'https://picsum.photos/seed/goexploree/800/600',
    imageHint: 'real estate map app',
  },
  {
    slug: 'luxe-threads',
    name: 'Luxe Threads – High-Revenue Shopify Dropshipping & Luxury Brand Scaling',
    description: 'Sheraz Hussain (Freelancer working with SYNC TECH Solutions) architected a high-conversion Shopify ecosystem for Luxe Threads, driving record-breaking revenue through strategic ad management and luxury content curation.',
    fullDescription: 'Luxe Threads is a premier Shopify-based dropshipping powerhouse specializing in luxury fashion. Sheraz Hussain (SYNC TECH Solutions) led the technical and marketing transformation, focusing on high-ROAS ad campaigns and automated content management. The project centered on creating a seamless, premium shopping experience that matches the luxury of the outfits provided. By optimizing the Shopify Liquid engine and integrating advanced pixel tracking, the platform achieved industry-leading conversion rates and scaled to become one of the most profitable dropshipping ventures in its niche.',
    challenges: [
      'Scaling a Shopify infrastructure to handle massive traffic spikes from high-budget social media ad campaigns.',
      'Maintaining a consistent luxury brand identity across automated dropshipping product feeds.',
      'Optimizing multi-channel marketing attribution to ensure high ROAS (Return on Ad Spend).'
    ],
    solutions: [
      {
        title: 'Brand-First Content Management',
        description: 'Developed a curated content pipeline that elevates standard dropshipping assets into a premium luxury aesthetic.'
      },
      {
        title: 'Ad Performance Engineering',
        description: 'Implemented advanced Meta and Google pixel tracking with custom event triggers to optimize automated bidding strategies.'
      },
      {
        title: 'Shopify Performance Tuning',
        description: 'Optimized theme liquid files and third-party app integrations to ensure sub-2s load times during peak traffic.'
      }
    ],
    results: [
      'Generated record-breaking monthly revenue, establishing the brand as a top-tier dropshipping competitor.',
      'Achieved an average ROAS of 4.5x through data-driven ad management and audience segmentation.',
      'Successfully delivered thousands of luxury outfits globally with a 95% customer satisfaction rate.'
    ],
    stack: ['Shopify', 'Liquid', 'Meta Ads Manager', 'Google Ads', 'Technical SEO', 'Conversion Rate Optimization', 'Google Analytics 4'],
    link: 'https://github.com/SherazHussain546',
    image: 'https://picsum.photos/seed/luxethreads/800/600',
    imageHint: 'luxury ecommerce fashion',
  },
  {
    slug: 'blogify-blog',
    name: 'blogify.blog – High-Performance SaaS Blogging & Content Distribution',
    description: 'Sheraz Hussain (Freelancer working with SYNC TECH Solutions) engineered a full-stack blogging platform with user authentication and a unique content-embedding snippet model.',
    fullDescription: 'blogify.blog is a comprehensive SaaS blogging platform developed by Sheraz Hussain (Freelancer working with SYNC TECH Solutions) that empowers users to author, publish, and distribute content globally. Built with a high-performance React frontend and a Node.js backend integrated with Google Cloud Platform, the platform offers seamless user onboarding via Firebase Authentication. A standout feature is the "Snippet-as-a-Service," allowing users to embed their blog feeds into their own external websites for a nominal subscription fee of €2.99 (the cost of a cheap coffee). This project highlights expertise in secure multi-tenant architecture and real-time content delivery using Firestore.',
    challenges: [
      'Architecting a secure multi-tenant environment for thousands of independent blog feeds.',
      'Engineering a low-friction "Snippet-as-a-Service" model for external content embedding.',
      'Optimizing Firebase Authentication and Firestore rules for secure, high-speed data access.'
    ],
    solutions: [
      {
        title: 'SaaS Architecture',
        description: 'Developed a scalable React/Node.js application on Google Cloud that supports independent user profiles and secure content isolation.'
      },
      {
        title: 'Secure Snippet Delivery',
        description: 'Created a cross-domain content embedding system that allows users to integrate their blog presence into external domains securely.'
      },
      {
        title: 'Subscription Micro-transactions',
        description: 'Implemented a lightweight subscription state management system tied to the Firestore backend for micro-payments.'
      }
    ],
    results: [
      'Successfully launched a functional SaaS blogging model with external embedding capabilities.',
      'Achieved sub-second data synchronization for blog updates via Firestore real-time listeners.',
      'Built a production-ready authentication pipeline handling secure user sessions globally.'
    ],
    stack: ['React', 'Node.js', 'Firebase Authentication', 'Firestore', 'Google Cloud Platform', 'JavaScript', 'SaaS Architecture', 'Technical SEO'],
    link: 'https://www.blogify.blog',
    image: 'https://picsum.photos/seed/blogify/800/600',
    imageHint: 'modern blogging platform',
  },
  {
    slug: 'aptly-dressed',
    name: 'APTLY DRESSED – Strategic Affiliate Infrastructure & API Engineering',
    description: 'Sheraz Hussain (Freelancer working with SYNC TECH Solutions) engineered high-concurrency affiliate systems for global retail brands.',
    fullDescription: 'APTLY DRESSED is a high-volume affiliate marketing platform that serves as a bridge between consumers and global retail giants. Sheraz Hussain (SYNC TECH Solutions) engineered the core tracking and synchronization engine. This mission-critical system handles millions of daily product updates and clicks, requiring extreme technical resilience. The project focused on high-concurrency Python/FastAPI backend architecture, automated product matching, and a scalable cloud-native infrastructure capable of handling peak holiday traffic without latency.',
    challenges: [
      'Handling millions of daily product updates via high-concurrency API hooks with global retailers.',
      'Developing a resilient tracking system for global affiliate conversion attribution.',
      'Scaling infrastructure to handle viral traffic spikes during peak retail seasons like Black Friday.'
    ],
    solutions: [
      {
        title: 'High-Concurrency Backend',
        description: 'Architected a resilient Python/FastAPI backend that utilizes asynchronous processing to handle thousands of requests per second.'
      },
      {
        title: 'Global Attribution Logic',
        description: 'Engineered a secure, first-party cookie tracking system that ensures 100% accurate conversion attribution across multiple domains.'
      },
      {
        title: 'Cloud-Native Scaling',
        description: 'Deployed a containerized infrastructure using Docker and Kubernetes, allowing for automated horizontal scaling during traffic bursts.'
      }
    ],
    results: [
      'Successfully processed over 5 million clicks with zero attribution loss.',
      'Automated the ingestion of 100k+ daily product SKU updates.',
      'Achieved sub-100ms response times for global redirect hooks.'
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Kubernetes', 'Terraform', 'Google Cloud Platform', 'Redis'],
    link: 'https://www.aptlydressed.com',
    image: 'https://picsum.photos/seed/aptlydressed/800/600',
    imageHint: 'affiliate marketing tech',
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

export const projectGoals = [
  {
    id: 'goal-1',
    title: 'AI Infrastructure & Compute Scaling',
    description: 'Funding high-performance GPU instances and API credits to keep Gemini-powered tools fast, accessible, and free for the global tech community.',
    iconName: 'Cpu',
    order: 1
  },
  {
    id: 'goal-2',
    title: 'Open-Source Sustainability',
    description: 'Ensuring long-term maintenance and feature updates for projects like Market Genius and Job4You, keeping them free from corporate paywalls.',
    iconName: 'Zap',
    order: 2
  },
  {
    id: 'goal-3',
    title: 'Technical Mentorship & Resources',
    description: 'Scaling free workshops, high-quality technical documentation, and career acceleration tools to empower the next generation of Irish developers.',
    iconName: 'Users',
    order: 3
  }
];
