export interface Project {
  title: string;
  description: string;
  highlights?: string[];
  url?: string;
  github?: string;
  tag?: string;
}

export interface CareerItem {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location?: string;
  description: string;
  highlights?: string[];
  url?: string;
}

export interface Contribution {
  title: string;
  description: string;
  url: string;
  tag?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    footerName: string;
    role: string;
    subheading?: string;
    bio: string[];
    email: string;
    location: string;
  };
  socials: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    cv?: string;
  };
  projects: Project[];
  career: CareerItem[];
  openSource?: Contribution[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Darshan",
    footerName: "DRSH",
    role: "Associate UI/UX Designer & Frontend Developer",
    subheading: "Frontend Engineer @ WebQraft Solutions",
    bio: [
      "Hi, I'm Darshan, 21 M living in BLR.",
      "Started with design, got hooked on frontend, and now I live somewhere between pixels and code."
    ],
    email: "darshan@gmail.com",
    location: "Bengaluru, India"
  },
  socials: {
    twitter: "https://x.com/cookmithick",
    linkedin: "https://www.linkedin.com/in/darshanjocky/",
    github: "https://github.com/its-darshu",
    cv: "#"
  },
  projects: [
    {
      title: "Design System & UI Library",
      description: "A cohesive multi-brand design system with Figma token synchronizer, accessible component architecture, and responsive design patterns.",
      highlights: [
        "Comprehensive token architecture for color scales, typography, and spacing.",
        "Interactive component playground with light/dark theme contrast validation."
      ],
      url: "https://github.com/its-darshu",
      tag: "UI/UX & Tokens"
    },
    {
      title: "SaaS Analytics & Workflow Dashboard",
      description: "End-to-end product design and frontend implementation for an analytics platform featuring data visualization, customizable cards, and user role management.",
      highlights: [
        "User research, wireframing, high-fidelity prototypes, and design handoff.",
        "Engineered with Next.js, Tailwind CSS, and optimized data density."
      ],
      url: "https://github.com/its-darshu",
      tag: "Product Design"
    },
    {
      title: "Mobile FinTech Interaction Flow",
      description: "Mobile-first financial app experience designed for effortless transactions, glanceable spending breakdowns, and haptic feedback animations.",
      highlights: [
        "Explored fluid gesture navigation and micro-animations.",
        "Conducted usability testing with interactive Figma prototypes."
      ],
      url: "https://github.com/its-darshu",
      tag: "Mobile UI/UX"
    },
    {
      title: "Portfolio Template (Clean & Craft)",
      description: "A high-density minimalist portfolio crafted for designers and engineers, featuring subtle film grain, ambient blur masks, and micro-interactions.",
      highlights: [
        "Zero-layout-shift dark/light theme switching with custom HSL tokens.",
        "Single-column responsive flow optimized for readability and craftsmanship."
      ],
      url: "https://github.com/its-darshu",
      tag: "Design Engineering"
    }
  ],
  career: [
    {
      role: "Frontend Engineer & Android Hosting",
      company: "Webqraft Solution",
      companyUrl: "https://webqraft.in/",
      period: "Present",
      description: "Leading frontend development and managing end-to-end Android application hosting, deployment pipelines, and cloud release environments.",
      highlights: [
        "Engineering responsive web applications with modern component architectures and micro-interactions.",
        "Managing Android APK/AAB build workflows, Google Play Console releases, and server hosting configurations.",
        "Optimizing asset delivery and cross-platform runtime performance across web and mobile interfaces."
      ]
    },
    {
      role: "Associate UI/UX Designer & Frontend Developer",
      company: "Webqraft Solution",
      companyUrl: "https://webqraft.in/",
      period: "Jul 2026- Present",
      description: "Designing Intuitive User Interfaces And Building Responsive, High-Performance Web Applications.",
      highlights: [
        "Crafting Design Systems, User Flows, And Interactive Prototypes In Figma.",
        "Developing Modern Frontend Features With Clean, Accessible Component Architectures."
      ]
    },
    {
      role: "UI/UX Intern",
      company: "Webqraft Solution",
      companyUrl: "https://webqraft.in/",
      period: "Feb-Jul 2026",
      description: "Designing Intuitive User Interfaces And Building Responsive, High-Performance Web Applications."
    }
  ]
};
