export interface Skill {
  name: string;
  level: number; // 0-100
  years: number;
  category: 'frontend' | 'backend' | 'shopify' | 'database' | 'design' | 'ai';
  projectsUsing: string[];
  certifications?: string[];
}

export interface Project {
  id: string | number;
  title: string;
  subtitle: string;
  category: 'shopify' | 'react' | 'fullstack' | 'ai' | 'healthcare';
  displayCategory: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  demoUrl: string;
  githubUrl: string;
  password?: string;
  featured: boolean;
  date?: string;
  team?: string;
  caseStudy: {
    problem: string;
    solution: string;
    process: string[];
    result: string;
  };
}

export interface TimelineItem {
  id: string;
  year: string;
  type: 'work' | 'education' | 'achievement';
  title: string;
  subtitle: string;
  description: string;
  tags?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  feedback: string;
  rating: number;
  avatar: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  delivery: string;
  process: string[];
  iconName: string;
}

export const SKILLS: Skill[] = [
  { name: 'React', level: 95, years: 5, category: 'frontend', projectsUsing: ['HydroStore Portal', 'সাস (SaaS) ড্যাশবোর্ড Hub'], certifications: ['Meta Certified Front-End Developer'] },
  { name: 'TypeScript', level: 90, years: 4, category: 'frontend', projectsUsing: ['HydroStore Portal', 'AI Resume Engine'], certifications: ['Advanced TS Architect'] },
  { name: 'Next.js', level: 88, years: 3, category: 'frontend', projectsUsing: ['IHSS'], certifications: [] },
  { name: 'Tailwind CSS', level: 95, years: 4, category: 'frontend', projectsUsing: ['HydroStore Portal', 'সাস (SaaS) ড্যাশবোর্ড Hub'], certifications: [] },
  { name: 'Framer Motion', level: 85, years: 2, category: 'frontend', projectsUsing: ['Interactive Portfolio'], certifications: [] },
  { name: 'Node.js', level: 85, years: 4, category: 'backend', projectsUsing: ['IHSS', 'সাস (SaaS) ড্যাশবোর্ড Hub'], certifications: [] },
  { name: 'Express / Fastify', level: 82, years: 3, category: 'backend', projectsUsing: ['IHSS'], certifications: [] },
  { name: 'GraphQL', level: 88, years: 3, category: 'backend', projectsUsing: ['HydroStore Portal'], certifications: [] },
  { name: 'REST APIs', level: 92, years: 5, category: 'backend', projectsUsing: ['সাস (SaaS) ড্যাশবোর্ড Hub'], certifications: [] },
  { name: 'Hydrogen & Oxygen', level: 90, years: 2, category: 'shopify', projectsUsing: ['HydroStore Portal'], certifications: ['Shopify Apps & Headless Dev Cert'] },
  { name: 'Shopify Liquid', level: 95, years: 4, category: 'shopify', projectsUsing: ['iBlue Labs', 'Ferri Fashion', '5 Star Magnets'], certifications: ['Shopify Plus Developer'] },
  { name: 'Storefront API', level: 92, years: 3, category: 'shopify', projectsUsing: ['HydroStore Portal'], certifications: [] },
  { name: 'MySQL', level: 85, years: 3, category: 'database', projectsUsing: ['IHSS'], certifications: [] },
  { name: 'Supabase / Firebase', level: 88, years: 3, category: 'database', projectsUsing: ['AI Resume Engine', 'Green হেলথকেয়ার'], certifications: [] },
  { name: 'PostgreSQL', level: 82, years: 3, category: 'database', projectsUsing: ['সাস (SaaS) ড্যাশবোর্ড Hub'], certifications: [] },
  { name: 'OpenAI API & Vector DBs', level: 85, years: 2, category: 'ai', projectsUsing: ['AI Portfolio Assistant'], certifications: [] },
  { name: 'LLM Prompt Engineering', level: 90, years: 2, category: 'ai', projectsUsing: ['AI Resume Engine'], certifications: [] },
  { name: 'Figma UI/UX Design', level: 80, years: 3, category: 'design', projectsUsing: ['Interactive Portfolio'], certifications: [] },
  { name: 'Wireframing & Prototyping', level: 85, years: 4, category: 'design', projectsUsing: ['HydroStore Portal'], certifications: [] },
];



export const PROJECTS: Project[] = [
  {
    id: 53,
    title: "iBlue Labs",
    subtitle: "Shopify store for a premium wellness brand featuring bold visuals, trust-focused sections, and a high-converting supplement product layout.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/ibluelabs.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://www.ibluelabs.co.uk/",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"iBlue Labs"} to improve user engagement and operations.`,
      solution: "Shopify store for a premium wellness brand featuring bold visuals, trust-focused sections, and a high-converting supplement product layout.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"iBlue Labs"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 52,
    title: "Ferri Fashion Store",
    subtitle: "Shopify store for a luxury fashion brand featuring elegant design, refined aesthetics, and a clean, high-end shopping experience.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/ferri.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://ferri-9103.myshopify.com/",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Ferri Fashion Store"} to improve user engagement and operations.`,
      solution: "Shopify store for a luxury fashion brand featuring elegant design, refined aesthetics, and a clean, high-end shopping experience.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Ferri Fashion Store"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 51,
    title: "5 Star Magnets",
    subtitle: "Shopify store for a custom sports magnet brand featuring personalized products, strong visual storytelling, and a conversion-focused layout.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/5star-magnets.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://5-star-magnets-2.myshopify.com/",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"5 Star Magnets"} to improve user engagement and operations.`,
      solution: "Shopify store for a custom sports magnet brand featuring personalized products, strong visual storytelling, and a conversion-focused layout.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"5 Star Magnets"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 50,
    title: "RoaVO Shop",
    subtitle: "Shopify store for a voice-over apparel brand featuring lifestyle-driven design, niche-focused branding, and a conversion-optimized product layout.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/roavoshop.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://www.roavoshop.com/",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"RoaVO Shop"} to improve user engagement and operations.`,
      solution: "Shopify store for a voice-over apparel brand featuring lifestyle-driven design, niche-focused branding, and a conversion-optimized product layout.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"RoaVO Shop"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 49,
    title: "Lorenzé Beauty Box",
    subtitle: "Shopify store for a premium beauty brand, featuring bundle offers, product-focused layout, and a luxury conversion-driven design.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/lorenze.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://shop.hairlohne.de/",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Lorenzé Beauty Box"} to improve user engagement and operations.`,
      solution: "Shopify store for a premium beauty brand, featuring bundle offers, product-focused layout, and a luxury conversion-driven design.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Lorenzé Beauty Box"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 48,
    title: "Expedition Rally",
    subtitle: "Shopify store for a motorcycle adventure brand, featuring tour packages, bold visuals, and a conversion-focused booking layout.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/expedition-rally.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://expeditionrally.com/",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Expedition Rally"} to improve user engagement and operations.`,
      solution: "Shopify store for a motorcycle adventure brand, featuring tour packages, bold visuals, and a conversion-focused booking layout.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Expedition Rally"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 47,
    title: "Winomma",
    subtitle: "Shopify store for a macadamia-based food brand, featuring bold visuals, storytelling sections, and a product-focused layout.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/winomma.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://winomma.io/",
    githubUrl: "",
    password: "4000000000",
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Winomma"} to improve user engagement and operations.`,
      solution: "Shopify store for a macadamia-based food brand, featuring bold visuals, storytelling sections, and a product-focused layout.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Winomma"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 46,
    title: "ARMRA Skincare",
    subtitle: "Shopify store for a skincare brand, featuring product-focused landing pages, ingredient highlights, and a clean conversion-driven layout.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/armra.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://armra-colostrum.myshopify.com/",
    githubUrl: "",
    password: "1",
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"ARMRA Skincare"} to improve user engagement and operations.`,
      solution: "Shopify store for a skincare brand, featuring product-focused landing pages, ingredient highlights, and a clean conversion-driven layout.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"ARMRA Skincare"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 45,
    title: "Blank Club",
    subtitle: "Shopify store for a minimal apparel brand, featuring clean design, bundle products, and a simple conversion-focused layout.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/blank-club.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://blank-club.myshopify.com/",
    githubUrl: "",
    password: "1",
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Blank Club"} to improve user engagement and operations.`,
      solution: "Shopify store for a minimal apparel brand, featuring clean design, bundle products, and a simple conversion-focused layout.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Blank Club"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 44,
    title: "BloomShine Florist",
    subtitle: "Shopify store for a flower and gift brand, featuring collection-based shopping, occasion-based categories, and a clean conversion-focused layout.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/bloomshine.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://bloomshine.sg/",
    githubUrl: "",
    password: "rtaygh",
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"BloomShine Florist"} to improve user engagement and operations.`,
      solution: "Shopify store for a flower and gift brand, featuring collection-based shopping, occasion-based categories, and a clean conversion-focused layout.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"BloomShine Florist"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 43,
    title: "Dizzy Doodle Apparel",
    subtitle: "Shopify store for Dizzy Doodle Apparel, a fun and lifestyle-driven apparel brand designed for dog lovers. The website features a vibrant and engaging homepage with lifestyle hero sections, playful product illustrations, and strong emotional storytelling centered around pet companionship. It includes collection-based shopping (seasonal designs, dog sports, outdoor themes), featured and new arrival product grids, promotional offer banners, customer testimonials, and newsletter integration. The overall experience is optimized for conversion with a visually appealing layout, clear product categorization, and a brand-focused shopping journey.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/dizzy-doodle.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://dizzydoodleapparel.com/",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Dizzy Doodle Apparel"} to improve user engagement and operations.`,
      solution: "Shopify store for Dizzy Doodle Apparel, a fun and lifestyle-driven apparel brand designed for dog lovers. The website features a vibrant and engaging homepage with lifestyle hero sections, playful product illustrations, and strong emotional storytelling centered around pet companionship. It includes collection-based shopping (seasonal designs, dog sports, outdoor themes), featured and new arrival product grids, promotional offer banners, customer testimonials, and newsletter integration. The overall experience is optimized for conversion with a visually appealing layout, clear product categorization, and a brand-focused shopping journey.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Dizzy Doodle Apparel"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 42,
    title: "RenewedMind Co.",
    subtitle: "Shopify store for RenewedMind Co., a premium wellness and supplement brand focused on mental clarity, stress relief, and overall body balance. The website features a high-converting lifestyle-driven homepage with strong hero messaging, science-backed ingredient highlights, trust-building certifications, and product-benefit focused storytelling. It includes collection-based product browsing, supplement education sections, customer testimonials, FAQ blocks, and conversion-optimized product presentation designed to enhance user trust and drive sales.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/RenewedMind.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://feguqf-gf.myshopify.com/",
    githubUrl: "",
    password: "imeubi",
    featured: true,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"RenewedMind Co."} to improve user engagement and operations.`,
      solution: "Shopify store for RenewedMind Co., a premium wellness and supplement brand focused on mental clarity, stress relief, and overall body balance. The website features a high-converting lifestyle-driven homepage with strong hero messaging, science-backed ingredient highlights, trust-building certifications, and product-benefit focused storytelling. It includes collection-based product browsing, supplement education sections, customer testimonials, FAQ blocks, and conversion-optimized product presentation designed to enhance user trust and drive sales.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"RenewedMind Co."}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 41,
    title: "FODN Commercial Furniture",
    subtitle: "Shopify store for FODN, specializing in commercial and hospitality furniture including seating, tables, lounge furniture, and workspace solutions. The website focuses on category-driven product discovery, project portfolio showcases, brand partnership displays, commercial-grade product presentation, and B2B-focused conversion experience for hospitality, education, and accommodation sectors.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/fodn-furniture.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://siediti.com.au/",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"FODN Commercial Furniture"} to improve user engagement and operations.`,
      solution: "Shopify store for FODN, specializing in commercial and hospitality furniture including seating, tables, lounge furniture, and workspace solutions. The website focuses on category-driven product discovery, project portfolio showcases, brand partnership displays, commercial-grade product presentation, and B2B-focused conversion experience for hospitality, education, and accommodation sectors.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"FODN Commercial Furniture"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 40,
    title: "Essence of Peace",
    subtitle: "Shopify store for Essence of Peace, specializing in premium home fragrance diffusers and essential oil blends designed to create a calm and relaxing home environment. The website focuses on luxury lifestyle storytelling, fragrance collection education, product-benefit focused content blocks, trust-building customer reviews, and conversion-optimized single and collection-based shopping experience.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/essence-of-peace.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://essenceofpeace.co.uk",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Essence of Peace"} to improve user engagement and operations.`,
      solution: "Shopify store for Essence of Peace, specializing in premium home fragrance diffusers and essential oil blends designed to create a calm and relaxing home environment. The website focuses on luxury lifestyle storytelling, fragrance collection education, product-benefit focused content blocks, trust-building customer reviews, and conversion-optimized single and collection-based shopping experience.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Essence of Peace"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 39,
    title: "Wolle4You",
    subtitle: "Shopify store for Wolle4You, specializing in premium yarns, knitting materials, and wool-based crafting supplies. The website focuses on lifestyle-driven product storytelling, seasonal collection merchandising, category-based yarn discovery, crafting inspiration content, blog-driven community engagement, and conversion-focused product grid shopping experience.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/wolle4you.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://wolle4you.de",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Wolle4You"} to improve user engagement and operations.`,
      solution: "Shopify store for Wolle4You, specializing in premium yarns, knitting materials, and wool-based crafting supplies. The website focuses on lifestyle-driven product storytelling, seasonal collection merchandising, category-based yarn discovery, crafting inspiration content, blog-driven community engagement, and conversion-focused product grid shopping experience.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Wolle4You"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 38,
    title: "BIG D Energy",
    subtitle: "Shopify store for BIG D Energy, specializing in premium testosterone support supplements designed to enhance strength, stamina, and overall performance. The website focuses on single-product conversion strategy, scientific ingredient education, results-driven testimonial storytelling, trust-building certification highlights, and high-converting supplement-focused landing page experience.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/big-d-energy.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://bg-d-energy.myshopify.com/",
    githubUrl: "",
    password: "1",
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"BIG D Energy"} to improve user engagement and operations.`,
      solution: "Shopify store for BIG D Energy, specializing in premium testosterone support supplements designed to enhance strength, stamina, and overall performance. The website focuses on single-product conversion strategy, scientific ingredient education, results-driven testimonial storytelling, trust-building certification highlights, and high-converting supplement-focused landing page experience.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"BIG D Energy"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 37,
    title: "Soniva Ultrasonic Cleaner",
    subtitle: "Shopify store for Soniva, specializing in ultrasonic cleaning machines for jewelry, glasses, watches, and daily accessories. The website focuses on single-product conversion optimization, problem-solution based storytelling, feature-driven trust sections, educational how-it-works blocks, customer review validation, and streamlined add-to-cart buying experience.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/soniva.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://dosetrack.myshopify.com",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Soniva Ultrasonic Cleaner"} to improve user engagement and operations.`,
      solution: "Shopify store for Soniva, specializing in ultrasonic cleaning machines for jewelry, glasses, watches, and daily accessories. The website focuses on single-product conversion optimization, problem-solution based storytelling, feature-driven trust sections, educational how-it-works blocks, customer review validation, and streamlined add-to-cart buying experience.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Soniva Ultrasonic Cleaner"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 36,
    title: "OGH Auto Parts",
    subtitle: "Shopify store for OGH Auto Parts, specializing in OEM and performance auto parts for various vehicle brands. The website features vehicle-based part finder functionality, brand-focused trust sections, hot deals and inventory-driven product grids, automotive brand partnerships display, and conversion-focused shopping experience tailored for auto parts customers.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/ogh-auto-parts.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://jv0c9tqt4dmzrvmu-96131580199.shopifypreview.com/",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"OGH Auto Parts"} to improve user engagement and operations.`,
      solution: "Shopify store for OGH Auto Parts, specializing in OEM and performance auto parts for various vehicle brands. The website features vehicle-based part finder functionality, brand-focused trust sections, hot deals and inventory-driven product grids, automotive brand partnerships display, and conversion-focused shopping experience tailored for auto parts customers.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"OGH Auto Parts"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 35,
    title: "AMONE Fragrance",
    subtitle: "Shopify store for AMONE Fragrance, specializing in modern luxury-inspired fragrance collections for men, women, and unisex audiences. The website focuses on premium brand storytelling, bundle and upsell-driven sales strategy, minimalist luxury product presentation, FAQ-driven customer education, and conversion-focused fragrance collection browsing experience.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/amone.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://r2vhgb-1e.myshopify.com/",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"AMONE Fragrance"} to improve user engagement and operations.`,
      solution: "Shopify store for AMONE Fragrance, specializing in modern luxury-inspired fragrance collections for men, women, and unisex audiences. The website focuses on premium brand storytelling, bundle and upsell-driven sales strategy, minimalist luxury product presentation, FAQ-driven customer education, and conversion-focused fragrance collection browsing experience.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"AMONE Fragrance"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 34,
    title: "Varotis POS Solutions",
    subtitle: "Shopify store for Varotis, specializing in POS systems, payment terminals, and business operation tools. The website focuses on modern B2B product presentation, POS solution bundles, secure payment technology showcasing, and conversion-focused product and solution-driven landing experiences for retail and business owners.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/varotis.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://varotis.com",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Varotis POS Solutions"} to improve user engagement and operations.`,
      solution: "Shopify store for Varotis, specializing in POS systems, payment terminals, and business operation tools. The website focuses on modern B2B product presentation, POS solution bundles, secure payment technology showcasing, and conversion-focused product and solution-driven landing experiences for retail and business owners.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Varotis POS Solutions"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 33,
    title: "Anush Scales",
    subtitle: "High-converting business website for Anush Scales, focused on Google Ads management and lead generation services for local businesses. The website features conversion-driven landing page structure, trust-building social proof sections, service breakdown blocks, client testimonials, founder branding, and strong call-to-action focused UX to maximize booked calls and lead conversions.",
    category: 'shopify',
    displayCategory: "Business / Lead Generation",
    image: "/anush-scales.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "Business / Lead Generation" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://anushscales.com",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Anush Scales"} to improve user engagement and operations.`,
      solution: "High-converting business website for Anush Scales, focused on Google Ads management and lead generation services for local businesses. The website features conversion-driven landing page structure, trust-building social proof sections, service breakdown blocks, client testimonials, founder branding, and strong call-to-action focused UX to maximize booked calls and lead conversions.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Anush Scales"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 32,
    title: "Caring Gate",
    subtitle: "Shopify store for Caring Gate, specializing in mobility aids, elderly support products, and daily living assistance tools. The website focuses on trust-driven product presentation, accessibility-focused shopping experience, health-support product collections, and conversion-optimized product discovery for senior care and independence support.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/caring-gate.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://caring-gate-2.myshopify.com/",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Caring Gate"} to improve user engagement and operations.`,
      solution: "Shopify store for Caring Gate, specializing in mobility aids, elderly support products, and daily living assistance tools. The website focuses on trust-driven product presentation, accessibility-focused shopping experience, health-support product collections, and conversion-optimized product discovery for senior care and independence support.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Caring Gate"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 31,
    title: "LYQORA Fragrance",
    subtitle: "Shopify store for LYQORA Fragrance, featuring premium lifestyle-focused product storytelling for luxury home fragrance products. The website highlights minimalist luxury design, single-product brand focus, emotional brand storytelling, high-end product presentation, and conversion-optimized product detail experience.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/lyqora.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://lyqorahome.de",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"LYQORA Fragrance"} to improve user engagement and operations.`,
      solution: "Shopify store for LYQORA Fragrance, featuring premium lifestyle-focused product storytelling for luxury home fragrance products. The website highlights minimalist luxury design, single-product brand focus, emotional brand storytelling, high-end product presentation, and conversion-optimized product detail experience.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"LYQORA Fragrance"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 30,
    title: "Little Blue Pigeon Bookstore",
    subtitle: "Shopify store for Little Blue Pigeon Bookstore, featuring curated book collections, event-driven community engagement, and a modern bookstore shopping experience. The website includes collection-based browsing, featured book showcases, upcoming event management, newsletter-driven customer retention, and a clean editorial-style layout for book discovery.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/little-blue-pigeon.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://littlebluepigeonbooks.com",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Little Blue Pigeon Bookstore"} to improve user engagement and operations.`,
      solution: "Shopify store for Little Blue Pigeon Bookstore, featuring curated book collections, event-driven community engagement, and a modern bookstore shopping experience. The website includes collection-based browsing, featured book showcases, upcoming event management, newsletter-driven customer retention, and a clean editorial-style layout for book discovery.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Little Blue Pigeon Bookstore"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 29,
    title: "Strutivo",
    subtitle: "Shopify store for Strutivo, specializing in professional masking solutions, painting tools, and industrial surface protection products. The website focuses on B2B-style product presentation, category-driven navigation, bulk-ready product listings, industrial branding, and conversion-focused product grids for trade professionals and businesses.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/strutivo.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://strutivo.de",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Strutivo"} to improve user engagement and operations.`,
      solution: "Shopify store for Strutivo, specializing in professional masking solutions, painting tools, and industrial surface protection products. The website focuses on B2B-style product presentation, category-driven navigation, bulk-ready product listings, industrial branding, and conversion-focused product grids for trade professionals and businesses.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Strutivo"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 28,
    title: "Health Fire Ice",
    subtitle: "Shopify store for Health Fire Ice, specializing in premium home wellness and recovery equipment including cold plunge tubs, indoor saunas, and outdoor sauna solutions. The website features luxury lifestyle visuals, science-backed wellness benefit sections, premium product showcases, brand trust building, and conversion-focused collection and product presentation.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/health-fire-ice.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://healthfireice.com",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Health Fire Ice"} to improve user engagement and operations.`,
      solution: "Shopify store for Health Fire Ice, specializing in premium home wellness and recovery equipment including cold plunge tubs, indoor saunas, and outdoor sauna solutions. The website features luxury lifestyle visuals, science-backed wellness benefit sections, premium product showcases, brand trust building, and conversion-focused collection and product presentation.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Health Fire Ice"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 27,
    title: "Masonic Jewellery",
    subtitle: "Shopify store for Masonic Jewellery, featuring premium Masonic rings, pendants, pins, cufflinks, and accessories. The website focuses on luxury product presentation, collection-based navigation, trust-building service sections, custom jewellery services, and heritage-focused brand storytelling to enhance customer confidence and conversions.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/masonic.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://masonic-jewellery.myshopify.com/",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Masonic Jewellery"} to improve user engagement and operations.`,
      solution: "Shopify store for Masonic Jewellery, featuring premium Masonic rings, pendants, pins, cufflinks, and accessories. The website focuses on luxury product presentation, collection-based navigation, trust-building service sections, custom jewellery services, and heritage-focused brand storytelling to enhance customer confidence and conversions.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Masonic Jewellery"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 26,
    title: "Furroow",
    subtitle: "Shopify store for Furroow, specializing in personalized dog tags and pet accessories. The website features lifestyle-focused hero sections, product customization-focused shopping flow, conversion-optimized product collections, trust-driven feature highlights, customer testimonials, and a strong pet community brand experience.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/furroow.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2026" },
    ],
    demoUrl: "https://furroow.nl",
    githubUrl: "",
    
    featured: false,
    date: "2026",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Furroow"} to improve user engagement and operations.`,
      solution: "Shopify store for Furroow, specializing in personalized dog tags and pet accessories. The website features lifestyle-focused hero sections, product customization-focused shopping flow, conversion-optimized product collections, trust-driven feature highlights, customer testimonials, and a strong pet community brand experience.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Furroow"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 24,
    title: "Burlap & Oak",
    subtitle: "Shopify store for Burlap & Oak, showcasing handcrafted furniture with a refined rustic aesthetic, curated collections, and a premium shopping experience.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/bur.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2025" },
    ],
    demoUrl: "https://burlapandoak.com/",
    githubUrl: "",
    
    featured: false,
    date: "2025",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Burlap & Oak"} to improve user engagement and operations.`,
      solution: "Shopify store for Burlap & Oak, showcasing handcrafted furniture with a refined rustic aesthetic, curated collections, and a premium shopping experience.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Burlap & Oak"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 23,
    title: "Cross Woven",
    subtitle: "Shopify store for Cross Woven, featuring faith-inspired apparel, clean modern layouts, curated collections, and a smooth shopping experience.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/cross.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2025" },
    ],
    demoUrl: "https://crosswoven.shop/",
    githubUrl: "",
    
    featured: false,
    date: "2025",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Cross Woven"} to improve user engagement and operations.`,
      solution: "Shopify store for Cross Woven, featuring faith-inspired apparel, clean modern layouts, curated collections, and a smooth shopping experience.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Cross Woven"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 22,
    title: "Pop Chic Activewear",
    subtitle: "Shopify store for Pop Chic Activewear, featuring a clean lifestyle-focused design, category-based shopping, trending products, and a smooth customer experience.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/Make.jfif",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2025" },
    ],
    demoUrl: "https://zpe8gw-10.myshopify.com/",
    githubUrl: "",
    password: "taodee",
    featured: false,
    date: "2025",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Pop Chic Activewear"} to improve user engagement and operations.`,
      solution: "Shopify store for Pop Chic Activewear, featuring a clean lifestyle-focused design, category-based shopping, trending products, and a smooth customer experience.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Pop Chic Activewear"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 21,
    title: "Muffits",
    subtitle: "Shopify store for Muffits, featuring bold branding, vibrant visuals, custom product sections, and an engaging customer-focused shopping experience.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/muffits.jfif",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2025" },
    ],
    demoUrl: "https://en84v8v903z8v10n-51445301420.shopifypreview.com/",
    githubUrl: "",
    
    featured: false,
    date: "2025",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Muffits"} to improve user engagement and operations.`,
      solution: "Shopify store for Muffits, featuring bold branding, vibrant visuals, custom product sections, and an engaging customer-focused shopping experience.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Muffits"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 20,
    title: "Panama Blue",
    subtitle: "Shopify store for Panama Blue, featuring immersive visual storytelling, premium product presentation, and a nature-inspired brand experience.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/panama.jfif",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2025" },
    ],
    demoUrl: "https://twvzvf-i0.myshopify.com/",
    githubUrl: "",
    
    featured: false,
    date: "2025",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Panama Blue"} to improve user engagement and operations.`,
      solution: "Shopify store for Panama Blue, featuring immersive visual storytelling, premium product presentation, and a nature-inspired brand experience.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Panama Blue"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 19,
    title: "Koffee Lane",
    subtitle: "Shopify store for Koffee Lane, featuring vibrant product galleries, mobile optimization, and user-friendly navigation.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/coffee.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2025" },
    ],
    demoUrl: "https://coffeelane0.myshopify.com/",
    githubUrl: "#",
    password: "rifat",
    featured: false,
    date: "2025",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Koffee Lane"} to improve user engagement and operations.`,
      solution: "Shopify store for Koffee Lane, featuring vibrant product galleries, mobile optimization, and user-friendly navigation.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Koffee Lane"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 18,
    title: "Sofi Swim",
    subtitle: "Shopify store for Sofi Swim, featuring vibrant product galleries, mobile optimization, and user-friendly navigation.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/sofi.jpeg",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2025" },
    ],
    demoUrl: "https://sofi-swim-2.myshopify.com/",
    githubUrl: "",
    
    featured: false,
    date: "2025",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Sofi Swim"} to improve user engagement and operations.`,
      solution: "Shopify store for Sofi Swim, featuring vibrant product galleries, mobile optimization, and user-friendly navigation.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Sofi Swim"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 17,
    title: "Vue 362",
    subtitle: "Developed Vue 362 Shopify store with custom theme enhancements and responsive layouts for a seamless shopping experience.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/eye.jpeg",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2025" },
    ],
    demoUrl: "https://vue-362.myshopify.com/",
    githubUrl: "",
    
    featured: false,
    date: "2025",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Vue 362"} to improve user engagement and operations.`,
      solution: "Developed Vue 362 Shopify store with custom theme enhancements and responsive layouts for a seamless shopping experience.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Vue 362"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 16,
    title: "Shop Giselle",
    subtitle: "Shopify store for Shop Giselle, focusing on elegant design, easy product discovery, and secure checkout.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/giselle.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2025" },
    ],
    demoUrl: "https://shopgiselle.com/",
    githubUrl: "",
    
    featured: false,
    date: "2025",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Shop Giselle"} to improve user engagement and operations.`,
      solution: "Shopify store for Shop Giselle, focusing on elegant design, easy product discovery, and secure checkout.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Shop Giselle"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 15,
    title: "Strong Roots Brand",
    subtitle: "Custom Shopify solution for Strong Roots Brand, with branded visuals, product filtering, and smooth shopping experience.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/strong.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2025" },
    ],
    demoUrl: "https://strongrootsbrand.com/",
    githubUrl: "",
    
    featured: false,
    date: "2025",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Strong Roots Brand"} to improve user engagement and operations.`,
      solution: "Custom Shopify solution for Strong Roots Brand, with branded visuals, product filtering, and smooth shopping experience.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Strong Roots Brand"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 14,
    title: "Water Quality USA",
    subtitle: "Shopify store for Water Quality USA, providing a clean interface for water testing products and efficient order management.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/water.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2025" },
    ],
    demoUrl: "https://waterqualityusa.myshopify.com/",
    githubUrl: "",
    password: "water123",
    featured: false,
    date: "2025",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Water Quality USA"} to improve user engagement and operations.`,
      solution: "Shopify store for Water Quality USA, providing a clean interface for water testing products and efficient order management.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Water Quality USA"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 13,
    title: "Burlap & Oak",
    subtitle: "Developed Burlap & Oak's Shopify store with a focus on rustic design, easy navigation, and optimized for conversions.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/burlap.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2025" },
    ],
    demoUrl: "https://burlapandoak.com/",
    githubUrl: "",
    
    featured: false,
    date: "2025",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Burlap & Oak"} to improve user engagement and operations.`,
      solution: "Developed Burlap & Oak's Shopify store with a focus on rustic design, easy navigation, and optimized for conversions.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Burlap & Oak"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 12,
    title: "Kitfix",
    subtitle: "Shopify e-commerce solution for Kitfix, featuring dynamic product listings, mobile-friendly design, and integrated payment gateways.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/kitfix.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2025" },
    ],
    demoUrl: "https://kitfix.com/",
    githubUrl: "",
    
    featured: true,
    date: "2025",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Kitfix"} to improve user engagement and operations.`,
      solution: "Shopify e-commerce solution for Kitfix, featuring dynamic product listings, mobile-friendly design, and integrated payment gateways.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Kitfix"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 11,
    title: "Ascend Physique of a God",
    subtitle: "Custom Shopify store for Ascend Physique of a God, with tailored product pages, branding, and streamlined checkout process.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/ascend.jpg",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2025" },
    ],
    demoUrl: "https://ascendphysiqueofagod.store/",
    githubUrl: "",
    
    featured: false,
    date: "2025",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Ascend Physique of a God"} to improve user engagement and operations.`,
      solution: "Custom Shopify store for Ascend Physique of a God, with tailored product pages, branding, and streamlined checkout process.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Ascend Physique of a God"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 10,
    title: "Rumizii",
    subtitle: "Developed a Shopify store for Rumizii UK, implementing custom layouts, responsive design, and enhanced user experience for fashion products.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/rumizi.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2025" },
    ],
    demoUrl: "https://rumizii.co.uk/",
    githubUrl: "",
    password: "thewtu",
    featured: false,
    date: "2025",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Rumizii"} to improve user engagement and operations.`,
      solution: "Developed a Shopify store for Rumizii UK, implementing custom layouts, responsive design, and enhanced user experience for fashion products.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Rumizii"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 9,
    title: "Sperax",
    subtitle: "Shopify-based e-commerce platform for Sperax, focusing on brand-centric design, product catalog, and secure payment integration.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/sparex.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2025" },
    ],
    demoUrl: "https://sperax.com/",
    githubUrl: "",
    password: "SPX2025",
    featured: false,
    date: "2025",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Sperax"} to improve user engagement and operations.`,
      solution: "Shopify-based e-commerce platform for Sperax, focusing on brand-centric design, product catalog, and secure payment integration.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Sperax"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 8,
    title: "ITS Phase",
    subtitle: "A modern Shopify store for ITS Phase, featuring custom theme development, optimized product pages, and seamless checkout experience.",
    category: 'shopify',
    displayCategory: "ই-কমার্স",
    image: "/phase.png",
    tags: ["Shopify","Liquid","JavaScript","HTML","CSS"],
    metrics: [
      { label: 'Type', value: "ই-কমার্স" },
      { label: 'Year', value: "2025" },
    ],
    demoUrl: "https://itsphase.com/",
    githubUrl: "",
    password: "ITS2025",
    featured: false,
    date: "2025",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"ITS Phase"} to improve user engagement and operations.`,
      solution: "A modern Shopify store for ITS Phase, featuring custom theme development, optimized product pages, and seamless checkout experience.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"ITS Phase"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 4,
    title: "Portfolio Website",
    subtitle: "A modern, responsive portfolio website with animations and dark mode support.",
    category: 'react',
    displayCategory: "Portfolio",
    image: "/portfolio.png",
    tags: ["React","Tailwind CSS","DaisyUI"],
    metrics: [
      { label: 'Type', value: "Portfolio" },
      { label: 'Year', value: "13/08/2025" },
    ],
    demoUrl: "https://portfolio-tyko.vercel.app/",
    githubUrl: "https://github.com/rifat3790/portfolio",
    password: "PORT2025",
    featured: true,
    date: "13/08/2025",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Portfolio Website"} to improve user engagement and operations.`,
      solution: "A modern, responsive portfolio website with animations and dark mode support.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Portfolio Website"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 2,
    title: "Integrated হেলথকেয়ার Support System",
    subtitle: "The system securely manages user access, doctor appointments, digital medical records, face-verified discounts, and provides admins full control for efficient healthcare management.",
    category: 'fullstack',
    displayCategory: "হেলথকেয়ার",
    image: "/ihss.png",
    tags: ["React","Next.js","Node.js","MySQL"],
    metrics: [
      { label: 'Type', value: "হেলথকেয়ার" },
      { label: 'Year', value: "12/02/2024" },
    ],
    demoUrl: "#",
    githubUrl: "https://github.com/rifat3790/Integrated-হেলথকেয়ার-Support-System-IHSS-",
    password: "IHSS2024",
    featured: true,
    date: "12/02/2024",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Integrated হেলথকেয়ার Support System"} to improve user engagement and operations.`,
      solution: "The system securely manages user access, doctor appointments, digital medical records, face-verified discounts, and provides admins full control for efficient healthcare management.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Integrated হেলথকেয়ার Support System"}, achieving higher conversion and better user experience.`
    }
  },
  {
    id: 1,
    title: "Green হেলথকেয়ার",
    subtitle: "Developed with React and Firebase, featuring user auth, responsive layout, and sections on workshops, fitness, screenings, and health resources.",
    category: 'react',
    displayCategory: "হেলথকেয়ার",
    image: "/green.png",
    tags: ["React","Firebase"],
    metrics: [
      { label: 'Type', value: "হেলথকেয়ার" },
      { label: 'Year', value: "15/12/2024" },
    ],
    demoUrl: "https://health-fairs-664ee.web.app/",
    githubUrl: "",
    password: "GH2024",
    featured: true,
    date: "15/12/2024",
    team: "Solo",
    caseStudy: {
      problem: `Client needed a custom solution tailored for ${"Green হেলথকেয়ার"} to improve user engagement and operations.`,
      solution: "Developed with React and Firebase, featuring user auth, responsive layout, and sections on workshops, fitness, screenings, and health resources.",
      process: ['Analyzed requirements and planned architecture.', 'Developed core features and integrated APIs.', 'Optimized performance and deployed the final application.'],
      result: `Successfully launched ${"Green হেলথকেয়ার"}, achieving higher conversion and better user experience.`
    }
  }
];


export const TIMELINE: TimelineItem[] = [
  {
    id: 't-1', year: 'Nov 2025 - Present', type: 'work',
    title: 'ওয়েব ডেভেলপার এবং টিম লিডার', subtitle: 'Softvence Agency',
    description: 'স্কেলেবল ওয়েব অ্যাপ্লিকেশন তৈরি ও ডেলিভারি করতে ওয়েব ডেভেলপমেন্ট টিমের নেতৃত্ব দিচ্ছি। সিস্টেম আর্কিটেকচার, জুনিয়র ডেভেলপারদের মেন্টরিং এবং হাই-কোয়ালিটি কোড ডেলিভারি নিশ্চিত করছি।',
    tags: ['React', 'Next.js', 'Team Leadership', 'Full Stack Development'],
  },
  {
    id: 't-2', year: 'Jun 2025 - Oct 2025', type: 'work',
    title: 'ওয়েব ডেভেলপার', subtitle: 'Sardar IT',
    description: 'রেসপন্সিভ ওয়েব অ্যাপ্লিকেশন তৈরি এবং রক্ষণাবেক্ষণের কাজ করেছি। ডিজাইনার এবং প্রোডাক্ট ম্যানেজারদের সাথে ঘনিষ্ঠভাবে কাজ করেছি।',
    tags: ['Frontend', 'Backend', 'Web Development'],
  },
  {
    id: 't-3', year: '2024', type: 'achievement',
    title: 'আইএইচএসএস (IHSS) হেলথকেয়ার সিস্টেম — একক প্রোজেক্ট', subtitle: 'Green University of Bangladesh',
    description: 'একটি পূর্ণাঙ্গ ইন্টিগ্রেটেড হেলথকেয়ার সাপোর্ট সিস্টেম (IHSS) তৈরি করেছি, যা টেকনিক্যাল দক্ষতা এবং বাস্তব-জীবনের সমস্যার সমাধানের জন্য প্রশংসিত হয়েছে।',
  },
  {
    id: 't-4', year: '2022 - 2026', type: 'education',
    title: 'বি.এস.সি. ইন কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং', subtitle: 'Green University of Bangladesh',
    description: 'সফটওয়্যার ইঞ্জিনিয়ারিং, ডাটাবেস ম্যানেজমেন্ট (DBMS) এবং ইন্টারঅ্যাক্টিভ ক্লায়েন্ট সিস্টেমে পারদর্শী।',
    tags: ['Data Structures', 'OOP', 'SQL', 'Algorithms'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1', name: 'Marcus Sterling', role: 'CEO & Founder', company: 'Veloce Retail',
    feedback: 'Refayet transformed our online storefront from a slow, legacy Shopify site to a blazing-fast headless store. Our checkout conversion rates increased by 30% within a month of launch.',
    rating: 5, avatar: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
  },
  {
    id: 'test-2', name: 'Elara Vance', role: 'VP of Product', company: 'Synergy SaaS',
    feedback: 'Working with Refayet was a breeze. He structured our React dashboard perfectly using clean, feature-based architectures. The application loads instantaneously and the code quality is top-notch.',
    rating: 5, avatar: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  {
    id: 'test-3', name: 'Lena Cortez', role: 'Founder', company: 'Ferri Fashion',
    feedback: 'Refayet built our entire Shopify store from scratch. The design is stunning, and our customers frequently compliment the shopping experience. Truly professional work.',
    rating: 5, avatar: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
  },
];

export const SERVICES: Service[] = [
  {
    id: 'serv-shopify', title: 'কাস্টম শপিফাই ডেভেলপমেন্ট', price: '$1,200+', delivery: '2 - 4 Weeks',
    description: 'কাস্টম লিকুইড থিম, হেডলেস শপিফাই এবং এপিআই ব্যবহার করে দ্রুতগতির শপিফাই স্টোরফ্রন্ট তৈরি করুন।',
    process: ['Requirement alignment & wireframes', 'Custom Liquid theme development', 'Component coding & animations', 'Launch & post-delivery support'],
    iconName: 'ShoppingBag',
  },
  {
    id: 'serv-react', title: 'রিঅ্যাক্ট ও নেক্সট.জেএস ওয়েব অ্যাপস', price: '$2,500+', delivery: '4 - 6 Weeks',
    description: 'রিঅ্যাক্ট, নেক্সট.জেএস এবং টাইপস্ক্রিপ্ট দিয়ে তৈরি প্রিমিয়াম ওয়েব পোর্টাল এবং ড্যাশবোর্ড।',
    process: ['UX Prototyping & Theme design', 'State management & DB schema', 'Full stack feature coding', 'Lighthouse optimization'],
    iconName: 'Code',
  },
  {
    id: 'serv-opt', title: 'শপিফাই থিম কাস্টমাইজেশন', price: '$500+', delivery: '3 - 7 Days',
    description: 'নতুন সেকশন, ফিচার এবং পারফরম্যান্স অপ্টিমাইজেশন দিয়ে আপনার বর্তমান শপিফাই থিম কাস্টমাইজ করুন।',
    process: ['Theme audit & review', 'Custom Liquid section coding', 'Responsive design adjustments', 'Performance testing & launch'],
    iconName: 'Zap',
  },
];
