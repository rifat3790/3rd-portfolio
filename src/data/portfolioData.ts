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
  { name: 'React', level: 95, years: 5, category: 'frontend', projectsUsing: ['HydroStore Portal', 'SaaS Dashboard Hub'], certifications: ['Meta Certified Front-End Developer'] },
  { name: 'TypeScript', level: 90, years: 4, category: 'frontend', projectsUsing: ['HydroStore Portal', 'AI Resume Engine'], certifications: ['Advanced TS Architect'] },
  { name: 'Next.js', level: 88, years: 3, category: 'frontend', projectsUsing: ['IHSS'], certifications: [] },
  { name: 'Tailwind CSS', level: 95, years: 4, category: 'frontend', projectsUsing: ['HydroStore Portal', 'SaaS Dashboard Hub'], certifications: [] },
  { name: 'Framer Motion', level: 85, years: 2, category: 'frontend', projectsUsing: ['Interactive Portfolio'], certifications: [] },
  { name: 'Node.js', level: 85, years: 4, category: 'backend', projectsUsing: ['IHSS', 'SaaS Dashboard Hub'], certifications: [] },
  { name: 'Express / Fastify', level: 82, years: 3, category: 'backend', projectsUsing: ['IHSS'], certifications: [] },
  { name: 'GraphQL', level: 88, years: 3, category: 'backend', projectsUsing: ['HydroStore Portal'], certifications: [] },
  { name: 'REST APIs', level: 92, years: 5, category: 'backend', projectsUsing: ['SaaS Dashboard Hub'], certifications: [] },
  { name: 'Hydrogen & Oxygen', level: 90, years: 2, category: 'shopify', projectsUsing: ['HydroStore Portal'], certifications: ['Shopify Apps & Headless Dev Cert'] },
  { name: 'Shopify Liquid', level: 95, years: 4, category: 'shopify', projectsUsing: ['iBlue Labs', 'Ferri Fashion', '5 Star Magnets'], certifications: ['Shopify Plus Developer'] },
  { name: 'Storefront API', level: 92, years: 3, category: 'shopify', projectsUsing: ['HydroStore Portal'], certifications: [] },
  { name: 'MySQL', level: 85, years: 3, category: 'database', projectsUsing: ['IHSS'], certifications: [] },
  { name: 'Supabase / Firebase', level: 88, years: 3, category: 'database', projectsUsing: ['AI Resume Engine', 'Green Healthcare'], certifications: [] },
  { name: 'PostgreSQL', level: 82, years: 3, category: 'database', projectsUsing: ['SaaS Dashboard Hub'], certifications: [] },
  { name: 'OpenAI API & Vector DBs', level: 85, years: 2, category: 'ai', projectsUsing: ['AI Portfolio Assistant'], certifications: [] },
  { name: 'LLM Prompt Engineering', level: 90, years: 2, category: 'ai', projectsUsing: ['AI Resume Engine'], certifications: [] },
  { name: 'Figma UI/UX Design', level: 80, years: 3, category: 'design', projectsUsing: ['Interactive Portfolio'], certifications: [] },
  { name: 'Wireframing & Prototyping', level: 85, years: 4, category: 'design', projectsUsing: ['HydroStore Portal'], certifications: [] },
];

const SH = 'Shopify'; // shorthand
const LIQ = ['Shopify', 'Liquid', 'JavaScript', 'HTML', 'CSS'];
const SH_METRICS = (type: string, year: string) => [
  { label: 'Platform', value: SH },
  { label: 'Type', value: type },
  { label: 'Year', value: year },
];
const SH_CS = (storeName: string, niche: string) => ({
  problem: `${storeName} needed a high-converting Shopify store tailored for the ${niche} market that would build trust and drive sales.`,
  solution: `Built a fully custom Shopify theme with brand-aligned visuals, optimized product pages, trust sections, and a seamless checkout experience.`,
  process: [
    'Designed brand-consistent layouts with niche-specific visual language.',
    'Built custom Liquid sections for hero, product pages, and trust elements.',
    'Optimized mobile UX and page speed for maximum conversion.',
  ],
  result: `Delivered a polished, professional ${niche} storefront that elevates the brand and improves conversion rates.`,
});

export const PROJECTS: Project[] = [
  // ─── SHOPIFY — 2026 ────────────────────────────────────────────────────────
  {
    id: 53, title: 'iBlue Labs', date: '2026', team: 'Solo', featured: false,
    subtitle: 'Premium wellness & supplement brand with bold visuals and high-converting product layout',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/ibluelabs.png', tags: LIQ,
    metrics: SH_METRICS('Wellness', '2026'),
    demoUrl: 'https://www.ibluelabs.co.uk/', githubUrl: '',
    caseStudy: SH_CS('iBlue Labs', 'wellness supplement'),
  },
  {
    id: 52, title: 'Ferri Fashion Store', date: '2026', team: 'Solo', featured: false,
    subtitle: 'Luxury fashion brand with elegant design and refined high-end shopping experience',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/ferri.png', tags: LIQ,
    metrics: SH_METRICS('Fashion', '2026'),
    demoUrl: 'https://ferri-9103.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Ferri Fashion', 'luxury fashion'),
  },
  {
    id: 51, title: '5 Star Magnets', date: '2026', team: 'Solo', featured: false,
    subtitle: 'Custom sports magnet brand with personalized products and conversion-focused layout',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/5star-magnets.png', tags: LIQ,
    metrics: SH_METRICS('Sports', '2026'),
    demoUrl: 'https://5-star-magnets-2.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('5 Star Magnets', 'custom sports merchandise'),
  },
  {
    id: 50, title: 'RoaVO Shop', date: '2026', team: 'Solo', featured: false,
    subtitle: 'Voice-over apparel brand with lifestyle-driven design and niche-focused branding',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/roavoshop.png', tags: LIQ,
    metrics: SH_METRICS('Apparel', '2026'),
    demoUrl: 'https://www.roavoshop.com/', githubUrl: '',
    caseStudy: SH_CS('RoaVO Shop', 'niche voice-over apparel'),
  },
  {
    id: 49, title: 'LorenzAc Beauty Box', date: '2026', team: 'Solo', featured: false,
    subtitle: 'Beauty subscription box store with elegant flows and visually appealing product pages',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/lorenze.png', tags: LIQ,
    metrics: SH_METRICS('Beauty', '2026'),
    demoUrl: 'https://lorenzac-beauty-box.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('LorenzAc Beauty Box', 'beauty subscription'),
  },
  {
    id: 48, title: 'Amone', date: '2026', team: 'Solo', featured: false,
    subtitle: 'Modern lifestyle brand store with clean aesthetics and premium product presentation',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/amone.png', tags: LIQ,
    metrics: SH_METRICS('Lifestyle', '2026'),
    demoUrl: 'https://amonebln.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Amone', 'lifestyle brand'),
  },
  {
    id: 47, title: 'Anush Scales', date: '2026', team: 'Solo', featured: false,
    subtitle: 'Precision weighing & scale equipment brand with professional B2B Shopify storefront',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/anush-scales.png', tags: LIQ,
    metrics: SH_METRICS('Equipment', '2026'),
    demoUrl: 'https://anush-scales.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Anush Scales', 'precision equipment'),
  },
  {
    id: 46, title: 'ARMRA', date: '2026', team: 'Solo', featured: false,
    subtitle: 'Health & immunity brand powered by colostrum with science-backed storytelling',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/armra.png', tags: LIQ,
    metrics: SH_METRICS('Health', '2026'),
    demoUrl: 'https://tryarmra.com/', githubUrl: '',
    caseStudy: SH_CS('ARMRA', 'health & immunity'),
  },
  {
    id: 45, title: 'Ascend', date: '2026', team: 'Solo', featured: false,
    subtitle: 'Premium brand store with modern design, strong CTAs, and conversion-optimized layout',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/ascend.jpg', tags: LIQ,
    metrics: SH_METRICS('Premium', '2026'),
    demoUrl: 'https://ascend-brands.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Ascend', 'premium brand'),
  },
  // ─── SHOPIFY — 2025 ────────────────────────────────────────────────────────
  {
    id: 44, title: 'Big D Energy', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Bold lifestyle & apparel brand with high-energy branding and direct-to-consumer layout',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/big-d-energy.png', tags: LIQ,
    metrics: SH_METRICS('Apparel', '2025'),
    demoUrl: 'https://big-d-energy.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Big D Energy', 'bold lifestyle apparel'),
  },
  {
    id: 43, title: 'Blank Club', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Minimalist blank apparel brand with clean visuals and a blank-canvas aesthetic',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/blank-club.png', tags: LIQ,
    metrics: SH_METRICS('Apparel', '2025'),
    demoUrl: 'https://blank-club.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Blank Club', 'minimalist apparel'),
  },
  {
    id: 42, title: 'Bloomshine', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Beauty & skincare brand with vibrant product photography and trust-first design',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/bloomshine.png', tags: LIQ,
    metrics: SH_METRICS('Beauty', '2025'),
    demoUrl: 'https://bloomshine.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Bloomshine', 'beauty & skincare'),
  },
  {
    id: 41, title: 'BUR', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Contemporary fashion brand with editorial-style product pages and bold typography',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/bur.png', tags: LIQ,
    metrics: SH_METRICS('Fashion', '2025'),
    demoUrl: 'https://bur-store.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('BUR', 'contemporary fashion'),
  },
  {
    id: 40, title: 'Burlap & Barrel', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Single-origin spices & specialty food brand with storytelling-led product pages',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/burlap.png', tags: LIQ,
    metrics: SH_METRICS('Food', '2025'),
    demoUrl: 'https://burlapandbarrel.com/', githubUrl: '',
    caseStudy: SH_CS('Burlap & Barrel', 'specialty spices & food'),
  },
  {
    id: 39, title: 'Caring Gate', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Healthcare & caregiving products brand with compassionate branding and accessible UX',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/caring-gate.png', tags: LIQ,
    metrics: SH_METRICS('Healthcare', '2025'),
    demoUrl: 'https://caring-gate.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Caring Gate', 'caregiving & healthcare products'),
  },
  {
    id: 38, title: 'Coffee Brand', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Artisan coffee brand with rich imagery, origin storytelling, and subscription upsell',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/coffee.png', tags: LIQ,
    metrics: SH_METRICS('Food & Beverage', '2025'),
    demoUrl: 'https://coffee-brand-store.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Coffee Brand', 'artisan coffee'),
  },
  {
    id: 37, title: 'Cross Store', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Multi-category Shopify store with clean navigation and conversion-optimized layout',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/cross.png', tags: LIQ,
    metrics: SH_METRICS('Multi-category', '2025'),
    demoUrl: 'https://cross-store.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Cross Store', 'multi-category retail'),
  },
  {
    id: 36, title: 'Dizzy Doodle', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Playful kids art & craft brand with fun visual identity and a family-friendly layout',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/dizzy-doodle.png', tags: LIQ,
    metrics: SH_METRICS('Kids & Art', '2025'),
    demoUrl: 'https://dizzy-doodle.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Dizzy Doodle', 'kids art & craft'),
  },
  {
    id: 35, title: 'Essence of Peace', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Wellness & aromatherapy brand with calming design and mindful product presentation',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/essence-of-peace.png', tags: LIQ,
    metrics: SH_METRICS('Wellness', '2025'),
    demoUrl: 'https://essence-of-peace.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Essence of Peace', 'wellness & aromatherapy'),
  },
  {
    id: 34, title: 'Expedition Rally', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Outdoor adventure & gear brand with rugged visuals and an action-oriented layout',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/expedition-rally.png', tags: LIQ,
    metrics: SH_METRICS('Outdoor', '2025'),
    demoUrl: 'https://expedition-rally.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Expedition Rally', 'outdoor adventure gear'),
  },
  {
    id: 33, title: 'Eye Care Store', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Optical & eye care brand with clinical-clean design and product-focused UX',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/eye.jpeg', tags: LIQ,
    metrics: SH_METRICS('Health', '2025'),
    demoUrl: 'https://eye-care-store.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Eye Care Store', 'optical & eye care'),
  },
  {
    id: 32, title: 'FODN Furniture', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Modern furniture brand with immersive room visualization and premium product pages',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/fodn-furniture.png', tags: LIQ,
    metrics: SH_METRICS('Furniture', '2025'),
    demoUrl: 'https://fodn-furniture.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('FODN Furniture', 'modern furniture & home decor'),
  },
  {
    id: 31, title: 'Furroow', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Pet care & accessories brand with friendly branding and a pet-owner-first layout',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/furroow.png', tags: LIQ,
    metrics: SH_METRICS('Pet Care', '2025'),
    demoUrl: 'https://furroow.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Furroow', 'pet care & accessories'),
  },
  {
    id: 30, title: 'Giselle', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Elegant women\'s fashion boutique with editorial-style product displays and refined UX',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/giselle.png', tags: LIQ,
    metrics: SH_METRICS('Fashion', '2025'),
    demoUrl: 'https://giselle-store.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Giselle', 'women\'s fashion boutique'),
  },
  {
    id: 29, title: 'Health Fire & Ice', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Contrast therapy & recovery brand with energetic design and performance-focused layout',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/health-fire-ice.png', tags: LIQ,
    metrics: SH_METRICS('Health', '2025'),
    demoUrl: 'https://health-fire-ice.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Health Fire & Ice', 'contrast therapy & recovery'),
  },
  {
    id: 28, title: 'KitFix', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Sports kit repair & customization service with a bold athletic brand identity',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/kitfix.png', tags: LIQ,
    metrics: SH_METRICS('Sports', '2025'),
    demoUrl: 'https://kitfix.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('KitFix', 'sports kit repair & customization'),
  },
  {
    id: 27, title: 'Little Blue Pigeon', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Children\'s clothing brand with soft, whimsical design and family-friendly shopping UX',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/little-blue-pigeon.png', tags: LIQ,
    metrics: SH_METRICS('Kids Fashion', '2025'),
    demoUrl: 'https://little-blue-pigeon.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Little Blue Pigeon', 'children\'s clothing'),
  },
  {
    id: 26, title: 'Lyqora', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Premium spirits & liquor brand with sophisticated design and age-verified storefront',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/lyqora.png', tags: LIQ,
    metrics: SH_METRICS('Spirits', '2025'),
    demoUrl: 'https://lyqora.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Lyqora', 'premium spirits & liquor'),
  },
  {
    id: 25, title: 'Make Store', date: '2025', team: 'Solo', featured: false,
    subtitle: 'DIY & maker brand with community-driven design and tool-focused product layout',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/Make.jfif', tags: LIQ,
    metrics: SH_METRICS('DIY / Maker', '2025'),
    demoUrl: 'https://make-store.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Make Store', 'DIY & maker tools'),
  },
  {
    id: 24, title: 'Masonic Store', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Masonic regalia & gifts store with distinguished branding and detailed product pages',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/masonic.png', tags: LIQ,
    metrics: SH_METRICS('Gifts', '2025'),
    demoUrl: 'https://masonic-store.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Masonic Store', 'masonic regalia & specialty gifts'),
  },
  {
    id: 23, title: 'Muffits', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Snack & food brand with playful packaging-style design and impulse-buy optimized layout',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/muffits.jfif', tags: LIQ,
    metrics: SH_METRICS('Food', '2025'),
    demoUrl: 'https://muffits.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Muffits', 'snack & food brand'),
  },
  {
    id: 22, title: 'OGH Auto Parts', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Automotive parts & accessories store with functional catalog and performance-focused design',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/ogh-auto-parts.png', tags: LIQ,
    metrics: SH_METRICS('Automotive', '2025'),
    demoUrl: 'https://ogh-auto-parts.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('OGH Auto Parts', 'automotive parts & accessories'),
  },
  {
    id: 21, title: 'Panama Store', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Tropical lifestyle brand with warm, vibrant aesthetics and a travel-inspired layout',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/panama.jfif', tags: LIQ,
    metrics: SH_METRICS('Lifestyle', '2025'),
    demoUrl: 'https://panama-store.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Panama Store', 'tropical lifestyle'),
  },
  {
    id: 20, title: 'Phase', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Fashion-forward brand with phase-driven seasonal collections and editorial product pages',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/phase.png', tags: LIQ,
    metrics: SH_METRICS('Fashion', '2025'),
    demoUrl: 'https://phase-store.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Phase', 'seasonal fashion collections'),
  },
  {
    id: 19, title: 'Renewed Mind', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Mental wellness & self-improvement brand with calming design and motivational product copy',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/RenewedMind.png', tags: LIQ,
    metrics: SH_METRICS('Wellness', '2025'),
    demoUrl: 'https://renewedmind.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Renewed Mind', 'mental wellness & self-improvement'),
  },
  {
    id: 18, title: 'Rumizi', date: '2025', team: 'Solo', featured: false,
    subtitle: 'African-inspired lifestyle brand with vibrant cultural aesthetics and modern Shopify layout',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/rumizi.png', tags: LIQ,
    metrics: SH_METRICS('Lifestyle', '2025'),
    demoUrl: 'https://rumizi.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Rumizi', 'African-inspired lifestyle'),
  },
  {
    id: 17, title: 'Sofi', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Elegant women\'s accessories brand with minimalist design and premium product showcase',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/sofi.jpeg', tags: LIQ,
    metrics: SH_METRICS('Accessories', '2025'),
    demoUrl: 'https://sofi-store.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Sofi', 'women\'s accessories'),
  },
  {
    id: 16, title: 'Soniva', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Audio & sound equipment brand with tech-forward design and detailed product specs',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/soniva.png', tags: LIQ,
    metrics: SH_METRICS('Electronics', '2025'),
    demoUrl: 'https://soniva.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Soniva', 'audio & sound equipment'),
  },
  {
    id: 15, title: 'Sparex', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Agricultural & tractor parts brand with industrial-grade catalog and dealer-focused layout',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/sparex.png', tags: LIQ,
    metrics: SH_METRICS('Agriculture', '2025'),
    demoUrl: 'https://sparex.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Sparex', 'agricultural parts & equipment'),
  },
  {
    id: 14, title: 'Strong Supplement', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Sports nutrition & supplement brand with bold athletic design and trust-building sections',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/strong.png', tags: LIQ,
    metrics: SH_METRICS('Supplements', '2025'),
    demoUrl: 'https://strong-supplement.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Strong Supplement', 'sports nutrition & supplements'),
  },
  {
    id: 13, title: 'Strutivo', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Contemporary fashion label with clean, structural design and editorial product storytelling',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/strutivo.png', tags: LIQ,
    metrics: SH_METRICS('Fashion', '2025'),
    demoUrl: 'https://strutivo.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Strutivo', 'contemporary fashion label'),
  },
  {
    id: 12, title: 'Varotis', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Luxury home goods brand with premium product styling and curated collection pages',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/varotis.png', tags: LIQ,
    metrics: SH_METRICS('Home Goods', '2025'),
    demoUrl: 'https://varotis.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Varotis', 'luxury home goods'),
  },
  {
    id: 11, title: 'Water Brand', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Premium water & hydration brand with clean, minimal design and health-focused messaging',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/water.png', tags: LIQ,
    metrics: SH_METRICS('Beverage', '2025'),
    demoUrl: 'https://water-brand.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Water Brand', 'premium hydration'),
  },
  {
    id: 10, title: 'Winomma', date: '2025', team: 'Solo', featured: false,
    subtitle: 'Wine & fine dining brand with sophisticated dark aesthetics and curated wine collections',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/winomma.png', tags: LIQ,
    metrics: SH_METRICS('Wine', '2025'),
    demoUrl: 'https://winomma.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Winomma', 'fine wine & dining'),
  },
  {
    id: 9, title: 'Wolle4You', date: '2025', team: 'Solo', featured: false,
    subtitle: 'German yarn & knitting supplies brand with cozy aesthetics and craft-community focus',
    category: 'shopify', displayCategory: 'E-commerce',
    image: '/wolle4you.png', tags: LIQ,
    metrics: SH_METRICS('Craft', '2025'),
    demoUrl: 'https://wolle4you.myshopify.com/', githubUrl: '',
    caseStudy: SH_CS('Wolle4You', 'yarn & knitting supplies'),
  },
  // ─── REACT / AI PROJECTS ───────────────────────────────────────────────────
  {
    id: 'hydrostore', title: 'HydroStore Headless Portal', featured: true,
    subtitle: 'High-performance headless ecommerce client with Shopify Storefront API & GraphQL',
    category: 'react', displayCategory: 'Headless Commerce',
    image: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
    tags: ['React', 'TypeScript', 'Shopify Storefront API', 'GraphQL', 'Tailwind CSS'],
    metrics: [{ label: 'Page Load', value: '0.4s' }, { label: 'Conv. Lift', value: '+34%' }, { label: 'Lighthouse', value: '99/100' }],
    demoUrl: '#', githubUrl: '#',
    caseStudy: {
      problem: 'Client had declining sales from slow legacy Liquid layouts with inflexible catalog systems.',
      solution: 'Built a fully headless React client querying Shopify Storefront API with compiled GraphQL queries and edge caching.',
      process: ['Audited catalog endpoints and compiled high-performance query batches.', 'Engineered responsive UI with Tailwind.', 'Wired cart state persistence using Zustand.'],
      result: 'Accelerated page loading by 70%, lifting checkout conversion by 34%.',
    },
  },
  {
    id: 'saas-dashboard', title: 'SaaS Dashboard Hub', featured: true,
    subtitle: 'Next-gen real-time analytics dashboard for financial statistics and team operations',
    category: 'react', displayCategory: 'React Web App',
    image: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    tags: ['React', 'TypeScript', 'Recharts', 'Zustand', 'Supabase', 'Tailwind'],
    metrics: [{ label: 'Sync Latency', value: '<50ms' }, { label: 'Users', value: '15k+' }, { label: 'Cost Cut', value: '-28%' }],
    demoUrl: '#', githubUrl: '#',
    caseStudy: {
      problem: 'Corporate managers struggled to align metrics across disjointed database sources.',
      solution: 'Built a consolidated real-time dashboard with live charts, transaction flows, and optimized PostgreSQL indexing.',
      process: ['Designed light/dark Figma mockups.', 'Wired real-time WebSocket sync pipelines.', 'Implemented memoized client-side calculations for heavy charts.'],
      result: 'Reduced decision latency and saved 28% in infrastructure costs.',
    },
  },
  {
    id: 'resume-builder', title: 'AI ATS Resume Customizer', featured: true,
    subtitle: 'Live CV editor with ATS score analysis, multiple templates, and one-click PDF export',
    category: 'ai', displayCategory: 'AI Product',
    image: 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)',
    tags: ['React', 'TypeScript', 'Zustand', 'Tailwind CSS', 'Print Engine'],
    metrics: [{ label: 'Resumes Built', value: '1.2k+' }, { label: 'ATS Boost', value: '+18 pts' }, { label: 'PDF Build', value: '<2s' }],
    demoUrl: '#', githubUrl: '#',
    caseStudy: {
      problem: 'Job seekers lacked tools to adapt resumes to ATS parsing, losing recruiter attention.',
      solution: 'Built a full editing workstation with immediate ATS checks, smart bullet formatting, and crisp PDF export.',
      process: ['Created modular resume schema for personal data, work history, and skills.', 'Built regex-based ATS keyword density parser.', 'Implemented optimized @media print styles for single-page PDFs.'],
      result: 'Empowered job hunters to boost ATS scores and get more recruiter callbacks.',
    },
  },
  // ─── FULLSTACK / HEALTHCARE ─────────────────────────────────────────────────
  {
    id: 'ihss', title: 'Integrated Healthcare Support', date: '2024', team: 'Solo', featured: true,
    subtitle: 'Full-stack healthcare system — appointments, digital records, face-verified discounts & admin control',
    category: 'fullstack', displayCategory: 'Healthcare',
    image: '/ihss.png', tags: ['React', 'Next.js', 'Node.js', 'MySQL'],
    password: 'IHSS2024',
    metrics: [{ label: 'Stack', value: 'Next.js' }, { label: 'DB', value: 'MySQL' }, { label: 'Year', value: '2024' }],
    demoUrl: '', githubUrl: 'https://github.com/rifat3790/Integrated-Healthcare-Support-System-IHSS-',
    caseStudy: {
      problem: 'Healthcare providers needed a secure digital system to manage patient appointments, records, and access control.',
      solution: 'Built a full-stack healthcare platform with role-based auth, appointment scheduling, medical records, and face-verified discount validation.',
      process: ['Designed secure role-based portals for admin and patients.', 'Implemented doctor appointment scheduling with calendar integration.', 'Built face verification for identity-confirmed discounts.', 'Created comprehensive admin panel for full system control.'],
      result: 'Delivered a production-ready healthcare management platform securing patient data while streamlining administrative efficiency.',
    },
  },
  {
    id: 'green-healthcare', title: 'Green Healthcare', date: '2024', team: 'Solo', featured: true,
    subtitle: 'React & Firebase health fair platform with workshops, fitness programs, screenings & auth',
    category: 'react', displayCategory: 'Healthcare',
    image: '/green.png', tags: ['React', 'Firebase'],
    password: 'GH2024',
    metrics: [{ label: 'Backend', value: 'Firebase' }, { label: 'Auth', value: 'Enabled' }, { label: 'Year', value: '2024' }],
    demoUrl: 'https://health-fairs-664ee.web.app/', githubUrl: '',
    caseStudy: {
      problem: 'A health initiative needed an accessible digital platform for community wellness engagement.',
      solution: 'Built a responsive React + Firebase app with authentication, workshop registration, fitness listings, and health resource library.',
      process: ['Implemented Firebase auth with secure session management.', 'Created workshop and fitness program discovery screens.', 'Built health screening booking flows and resource library.', 'Designed mobile-first responsive layouts.'],
      result: 'Launched a functional health fair platform connecting users with wellness resources and community health programs.',
    },
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    id: 't-1', year: '2024 - Present', type: 'work',
    title: 'Lead React & Shopify Developer', subtitle: 'Freelance / Remote',
    description: 'Building premium Shopify storefronts and React web applications for international clients. Delivered 40+ production Shopify stores and multiple full-stack applications.',
    tags: ['React', 'Shopify Liquid', 'TypeScript', 'Next.js', 'Firebase'],
  },
  {
    id: 't-2', year: '2022 - 2024', type: 'work',
    title: 'Shopify Storefront Specialist', subtitle: 'Shopify Craft Studios',
    description: 'Developed headless storefront networks using Hydrogen. Converted legacy Liquid themes and boosted Lighthouse performance scores across 15+ client projects.',
    tags: ['Liquid', 'GraphQL', 'Shopify Storefront API'],
  },
  {
    id: 't-3', year: '2024', type: 'achievement',
    title: 'IHSS Healthcare System — Solo Build', subtitle: 'University Engineering Council',
    description: 'Designed and delivered a full-stack Integrated Healthcare Support System as a solo project, receiving recognition for technical excellence and real-world applicability.',
  },
  {
    id: 't-4', year: '2018 - 2022', type: 'education',
    title: 'B.Sc. in Computer Science & Engineering', subtitle: 'University of Engineering and Technology',
    description: 'Specialized in Software Engineering, DBMS, and interactive client systems.',
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
    id: 'serv-shopify', title: 'Custom Shopify Development', price: '$1,200+', delivery: '2 - 4 Weeks',
    description: 'Build fast, customized Shopify storefronts using custom Liquid themes, Hydrogen headless, and Storefront APIs.',
    process: ['Requirement alignment & wireframes', 'Custom Liquid theme development', 'Component coding & animations', 'Launch & post-delivery support'],
    iconName: 'ShoppingBag',
  },
  {
    id: 'serv-react', title: 'React & Next.js Web Apps', price: '$2,500+', delivery: '4 - 6 Weeks',
    description: 'Premium web portals written in React, TypeScript, Next.js, and state-managed via Zustand or Redux.',
    process: ['UX Prototyping & Theme design', 'State management & DB schema', 'Full stack feature coding', 'Lighthouse optimization'],
    iconName: 'Code',
  },
  {
    id: 'serv-opt', title: 'Shopify Theme Customization', price: '$500+', delivery: '3 - 7 Days',
    description: 'Customize existing Shopify themes with new sections, features, and performance improvements.',
    process: ['Theme audit & review', 'Custom Liquid section coding', 'Responsive design adjustments', 'Performance testing & launch'],
    iconName: 'Zap',
  },
];
