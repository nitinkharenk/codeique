export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/#services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export const clientLogos = [
  "Northstar",
  "Orbital",
  "Lucent",
  "Axiom",
  "Monarch",
  "Kinetic",
] as const;

export const introStatement =
  "We build brands, websites, and digital experiences with intention, clarity, and care.";

export const stats = [
  { value: 5, suffix: "+", label: "Years shaping modern digital brands" },
  { value: 120, suffix: "+", label: "Projects launched across product and web" },
  { value: 98, suffix: "%", label: "Client satisfaction across retained work" },
] as const;

export const featuredProjects = [
  {
    number: "01",
    slug: "cyberhr",
    title: "cyberHr",
    description:
      "A multi-tenant HRMS platform for managing onboarding, attendance, leave, payroll, approvals, and workforce operations in one place.",
    image: "/cyberHr 1.png",
    gallery: ["/cyberHr 1.png", "/cyberHr 2.png", "/cyberHr3.png"],
    category: "HRMS Platform",
    insight:
      "Built around enterprise-ready people operations with dashboard visibility, approval queues, payroll readiness, and secure tenant-based access.",
    liveUrl: "https://cyber-hr-v2-0-y975.vercel.app/",
    highlights: ["Onboarding", "Payroll", "Attendance"],
    overview:
      "cyberHr is positioned as a modern HRMS product for organizations that need one system for employee lifecycle management across multiple tenants or business units.",
    challenge:
      "The project needed to communicate a wide feature set without making the platform feel overwhelming or enterprise-heavy for first-time visitors.",
    solution:
      "The final structure uses a strong hero, dashboard-led visuals, and grouped proof points to explain the platform through workflows rather than feature dumping.",
    outcome:
      "The result is a more product-like sales experience that makes payroll, attendance, approvals, and operational control feel connected and easier to understand.",
    audience:
      "HR leaders, operations teams, and decision-makers evaluating whether the platform can handle people operations across multiple teams or entities.",
    scope: "Product positioning, feature architecture, dashboard-led storytelling, and conversion-focused product presentation.",
    deliverables: ["Homepage direction", "Feature storytelling", "Dashboard showcase", "Conversion pathways"],
    results: ["Clearer product narrative", "Stronger enterprise trust", "Better feature discoverability"],
    details: [
      "The hero immediately frames cyberHr as a premium multi-tenant HRMS product rather than a generic admin tool.",
      "The dashboard preview helps visitors understand the platform visually before they need to read deeper into the feature set.",
      "The platform messaging groups related workflows like approvals, payroll readiness, onboarding, and attendance so the product feels organized.",
      "Trust-building language around enterprise readiness, role-based access, and audit control supports higher-value buyer conversations.",
    ],
    year: "2025",
    duration: "8 weeks",
    role: "Design & Development",
    techStack: {
      frontend: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Recharts"],
      backend: ["Node.js", "Express", "PostgreSQL", "Prisma ORM", "Redis"],
      infrastructure: ["Vercel", "Supabase", "AWS S3", "Cloudflare CDN"],
      tools: ["Figma", "GitHub Actions", "Sentry", "PostHog Analytics"],
    },
    uiux: {
      designPhilosophy:
        "Dashboard-first design language that prioritizes data density without visual clutter. Every screen follows a consistent card-based grid system with clear hierarchy.",
      colorPalette: [
        { name: "Primary Blue", value: "#2563EB", usage: "Actions, links, active states" },
        { name: "Success Green", value: "#16A34A", usage: "Approvals, positive metrics" },
        { name: "Warning Amber", value: "#F59E0B", usage: "Pending states, alerts" },
        { name: "Surface Dark", value: "#0F172A", usage: "Sidebar, cards, panels" },
      ],
      typography: "Inter for UI elements and data tables. DM Sans for headings and marketing pages. Mono for IDs and timestamps.",
      keyDecisions: [
        "Sidebar navigation with collapsible modules keeps the workspace focused while providing quick access to all HRMS features.",
        "Dashboard cards use a bento-grid layout that adapts from 4 columns on desktop to stacked on mobile without losing context.",
        "Approval workflows use a Kanban-style drag interface with status pills — HR managers can process requests without opening individual records.",
        "Payroll views combine table data with inline sparkline charts so trends are visible without switching to a separate analytics page.",
      ],
    },
    frontend: {
      architecture: "App Router with route groups for tenant isolation. Each tenant gets a scoped layout with role-based navigation and theme overrides.",
      patterns: [
        "Server Components for initial data fetch — employee lists, dashboard stats, and payroll summaries render server-side for faster TTFB.",
        "Client Components only where interactivity is required — filters, date pickers, approval actions, and real-time notification badges.",
        "Optimistic UI updates on approval/rejection actions so managers get instant feedback while the server processes in the background.",
        "Custom hook useMultiTenant() manages tenant context, switching, and scoped API calls across the entire application.",
      ],
      performance: "Lighthouse score 94+. Dynamic imports for heavy modules like payroll charts and report generators. Image optimization via next/image with blur placeholders.",
    },
    backend: {
      architecture: "REST API with Express running on Node.js. Multi-tenant data isolation using PostgreSQL Row-Level Security policies tied to tenant JWT claims.",
      keyFeatures: [
        "Prisma ORM with custom middleware for automatic tenant scoping — every query filters by tenant_id without developers writing it manually.",
        "Redis-backed session management and caching layer for frequently accessed data like employee directories and org charts.",
        "Background job queue using BullMQ for payroll calculations, bulk email notifications, and scheduled report generation.",
        "Role-based access control with fine-grained permissions — admin, HR manager, team lead, and employee each see different data and actions.",
      ],
      database: "PostgreSQL with tenant-scoped schemas. Indexed on employee_id, tenant_id, and common query patterns. Automated migrations via Prisma.",
    },
  },
  {
    number: "02",
    slug: "develozy",
    title: "Develozy",
    description:
      "A digital studio website for startups, growing brands, and enterprise teams covering strategy, design, development, and content systems.",
    image: "/develozy 1.png",
    gallery: ["/develozy 1.png", "/develozy 2.png", "/develozy 3.png"],
    category: "Studio Website",
    insight:
      "Showcases service offerings, editorial content, team positioning, and conversion pathways for clients looking for end-to-end digital delivery.",
    liveUrl: "https://develozy-v2-0.vercel.app/",
    highlights: ["Services", "Content", "Studio positioning"],
    overview:
      "Develozy is a studio website designed to present a broad digital-service offering in a way that still feels clear, premium, and conversion-ready.",
    challenge:
      "The site had to speak to very different client sizes, from startups to enterprise teams, without losing focus or turning the homepage into a long generic agency pitch.",
    solution:
      "The project organizes service categories, editorial content, and credibility signals into a structured narrative that helps visitors understand the studio quickly.",
    outcome:
      "That approach makes the brand feel more established, improves service discoverability, and gives prospects a clearer path from exploration to inquiry.",
    audience:
      "Founders, marketing teams, and operators looking for a studio that can support brand, site, and content execution in one engagement.",
    scope: "Studio messaging, service positioning, editorial structure, and inquiry-driven website flow.",
    deliverables: ["Service architecture", "Editorial sections", "Trust elements", "Lead-generation flow"],
    results: ["Sharper positioning", "Improved credibility", "Clearer inquiry journey"],
    details: [
      "The site balances studio branding with practical service explanation, helping visitors quickly understand what Develozy offers.",
      "Editorial content and proof elements make the website feel more established than a simple agency landing page.",
      "Navigation, sectioning, and calls to action are spread across the experience so visitors can enter from multiple intent levels.",
      "The overall structure supports both discovery and conversion, which is important for a studio serving startups through enterprise teams.",
    ],
    year: "2025",
    duration: "6 weeks",
    role: "Full-stack Design & Development",
    techStack: {
      frontend: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
      backend: ["Next.js API Routes", "Resend (Email)", "Sanity CMS"],
      infrastructure: ["Vercel", "Cloudflare", "Sanity CDN"],
      tools: ["Figma", "Lottie", "Spline 3D", "Vercel Analytics"],
    },
    uiux: {
      designPhilosophy:
        "Editorial-meets-conversion layout philosophy. Each scroll section tells a story piece — from studio identity to services to proof — building trust progressively rather than listing features.",
      colorPalette: [
        { name: "Ink Black", value: "#0A0A0A", usage: "Primary background, depth" },
        { name: "Warm White", value: "#F5F0EB", usage: "Text, contrast panels" },
        { name: "Accent Violet", value: "#7C3AED", usage: "CTAs, links, hover states" },
        { name: "Muted Stone", value: "#78716C", usage: "Secondary text, captions" },
      ],
      typography: "Satoshi for body text and navigation. Clash Display for headings and editorial moments. Space Mono for labels and metadata.",
      keyDecisions: [
        "Full-viewport hero with kinetic typography creates an immediate premium impression — the studio name animates in with split-text reveals.",
        "Service cards use a horizontal scroll on mobile and a staggered grid on desktop, keeping the browsing experience native to each device.",
        "Case study previews use a magazine-style asymmetric layout with large imagery and pull quotes, differentiating from typical agency grids.",
        "The inquiry form is embedded in context rather than a separate page — reducing friction from intent to action.",
      ],
    },
    frontend: {
      architecture: "Static-first with ISR for blog content. Page transitions use shared layout animations for seamless navigation between routes.",
      patterns: [
        "GSAP ScrollTrigger for complex scroll-driven animations — parallax layers, text reveals, and pinned sections work together for editorial pacing.",
        "Framer Motion handles micro-interactions and page transitions while GSAP manages heavier scroll sequences to avoid performance conflicts.",
        "Sanity CMS integration with real-time preview mode — editorial content updates reflect instantly without rebuild.",
        "Custom cursor component with context-aware states — changes shape and label based on what the user is hovering.",
      ],
      performance: "Lighthouse score 96+. Fonts subset and preloaded. Heavy animations lazy-loaded below the fold. Aggressive image optimization with AVIF/WebP fallbacks.",
    },
    backend: {
      architecture: "Serverless API routes on Vercel. Sanity CMS as the structured content backend with GROQ queries for editorial pages and case studies.",
      keyFeatures: [
        "Resend integration for transactional emails — inquiry confirmations, newsletter subscriptions, and internal notifications.",
        "Sanity webhook triggers ISR revalidation so new blog posts and case studies go live without manual deploys.",
        "Rate-limited contact form with honeypot field and server-side validation to prevent spam without CAPTCHAs.",
        "Structured JSON-LD schema generation for each page type — organization, article, and service schemas for SEO.",
      ],
      database: "Sanity Content Lake with custom schemas for projects, blog posts, team members, and testimonials. GROQ query language for filtered content fetching.",
    },
  },
  {
    number: "03",
    slug: "lastsongonly",
    title: "lastsongonly",
    description:
      "A music discovery and release archive experience built around artist pages, release notes, discovery feeds, and a dramatic editorial interface.",
    image: "/lastsongonly 1.png",
    gallery: ["/lastsongonly 1.png", "/lastsongonly 2.png", "/lastsongonly 3.png"],
    category: "Music Platform",
    insight:
      "The interface leans into a dark poster-like visual system with discovery navigation, highlighted releases, and a stage-inspired content layout.",
    liveUrl: "https://lastsongonly-v2-0.vercel.app/",
    highlights: ["Artist pages", "Release archive", "Discovery feed"],
    overview:
      "lastsongonly reads like a music editorial platform built for showcasing latest releases, artist identity, and discovery in a more atmospheric way.",
    challenge:
      "The challenge is balancing expressive visual storytelling with enough structure for users to browse artists, songs, moods, and release content smoothly.",
    solution:
      "The design uses strong typography, a dark stage-like canvas, and a modular content panel system to make browsing feel curated instead of generic.",
    outcome:
      "The result feels distinct and memorable, giving the platform a recognizable identity while still supporting search, discovery, and artist-focused browsing.",
    audience:
      "Music fans, artists, and culture-focused users who want discovery to feel atmospheric, curated, and identity-rich.",
    scope: "Editorial art direction, discovery UX, content hierarchy, and immersive browsing design.",
    deliverables: ["Discovery layout", "Artist-focused navigation", "Release storytelling", "Visual system direction"],
    results: ["Stronger product identity", "More immersive discovery", "Better content hierarchy"],
    details: [
      "The homepage behaves more like a release stage than a standard web app landing page, which gives it strong personality immediately.",
      "Large typography and focused content panels make the browsing experience feel curated around music culture rather than generic product UI.",
      "The navigation supports different discovery paths like explore, blog, artist-focused actions, and search from the first screen.",
      "That mix of atmosphere and utility makes the platform feel both branded and usable at the same time.",
    ],
    year: "2025",
    duration: "10 weeks",
    role: "Art Direction & Development",
    techStack: {
      frontend: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Howler.js"],
      backend: ["Next.js API Routes", "Supabase", "Spotify Web API", "Edge Functions"],
      infrastructure: ["Vercel", "Supabase", "Cloudinary", "Upstash Redis"],
      tools: ["Figma", "Rive", "Vercel Analytics", "Axiom Logging"],
    },
    uiux: {
      designPhilosophy:
        "Stage-inspired dark canvas with cinematic typography. The interface treats each release like a poster and each artist like a headline act — discovery feels like flipping through a curated music magazine.",
      colorPalette: [
        { name: "Void Black", value: "#050505", usage: "Primary canvas, immersion" },
        { name: "Stage White", value: "#EDEDED", usage: "Primary text, focus elements" },
        { name: "Neon Red", value: "#FF2D2D", usage: "Now playing, active states, CTAs" },
        { name: "Smoke Gray", value: "#3A3A3A", usage: "Borders, secondary panels, metadata" },
      ],
      typography: "Neue Montreal for body and navigation. PP Editorial New for artist names and release titles. JetBrains Mono for timestamps, track numbers, and metadata.",
      keyDecisions: [
        "Full-bleed album art with gradient overlays creates an immersive hero that changes per featured release — the platform feels alive and always current.",
        "Artist pages use a split layout: large portrait on left, discography timeline on right — giving identity and catalog equal weight.",
        "Discovery feed uses a masonry layout with varying card sizes based on release recency — newer content naturally draws more attention.",
        "Audio preview hover states let users sample tracks without leaving the browse view — reducing clicks to discovery.",
      ],
    },
    frontend: {
      architecture: "Hybrid rendering — artist and release pages use SSG with ISR for SEO and speed. Discovery feed and search are client-rendered for real-time interaction.",
      patterns: [
        "Howler.js audio engine with custom React wrapper for seamless track previews — audio state persists across route changes via context provider.",
        "Intersection Observer-powered lazy loading for the masonry discovery grid — only visible cards load images and metadata.",
        "Custom keyboard navigation system — arrow keys browse releases, spacebar toggles preview, Enter opens full page.",
        "CSS scroll-snap for horizontal artist carousels with momentum scrolling and drag-to-browse on touch devices.",
      ],
      performance: "Lighthouse score 91+. Cloudinary transformations serve responsive images per device. Audio chunks streamed progressively, not preloaded. Route prefetching on hover.",
    },
    backend: {
      architecture: "Supabase as the primary data layer with real-time subscriptions for live feed updates. Vercel Edge Functions for geo-aware content delivery and search.",
      keyFeatures: [
        "Spotify Web API integration for pulling verified artist metadata, album art, and track previews — keeping content accurate without manual data entry.",
        "Supabase real-time channels power the live discovery feed — new releases appear for all connected users without page refresh.",
        "Upstash Redis caching for search queries and popular artist pages — sub-50ms response times for repeat lookups.",
        "Edge Functions handle geo-routing to serve region-relevant release highlights and trending content.",
      ],
      database: "Supabase PostgreSQL with tables for artists, releases, tracks, genres, and user interactions. Full-text search with pg_trgm for fuzzy artist and track matching.",
    },
  },
] as const;

export type Project = (typeof featuredProjects)[number];

export function getProjectBySlug(slug: string) {
  return featuredProjects.find((project) => project.slug === slug);
}

export const whyUsStats = [
  { value: 150, suffix: "+", label: "Successful projects" },
  { value: 5, suffix: "+", label: "Years of experience" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 2, prefix: "$", suffix: "M+", label: "Client revenue growth" },
] as const;

export const services = [
  {
    number: "01",
    title: "Web Design & Development",
    description:
      "Affordable business websites and landing pages that are clean, fast, mobile-friendly, and easy to manage after launch.",
    items: ["Landing Pages", "Business Websites", "CMS Setup", "Basic SEO"],
    image: "https://picsum.photos/id/26/1400/1000",
  },
  {
    number: "02",
    title: "Branding & Identity",
    description:
      "Practical branding support for small businesses and startups that need a clean logo, colors, and a consistent visual direction.",
    items: ["Logo Design", "Brand Colors", "Typography", "Social Kit"],
    image: "https://picsum.photos/id/20/1400/1000",
  },
  {
    number: "03",
    title: "UI/UX Design",
    description:
      "Simple, usable interface design for dashboards, web apps, and admin panels with a strong focus on clarity and flow.",
    items: ["Wireframes", "App Screens", "User Flow", "Prototypes"],
    image: "https://picsum.photos/id/60/1400/1000",
  },
  {
    number: "04",
    title: "Motion & Interaction",
    description:
      "Lightweight animations and interactions that make websites feel modern without making them heavy or expensive to build.",
    items: ["Scroll Effects", "Hover States", "Section Reveals", "Framer Motion"],
    image: "https://picsum.photos/id/96/1400/1000",
  },
] as const;

export const processSteps = [
  {
    title: "Discovery Phase",
    description:
      "Understanding your goals, pain points, audience, and what sets you apart.",
  },
  {
    title: "Project Kickoff",
    description:
      "Setting up projects, aligning on scope, and building a clear, shared roadmap.",
  },
  {
    title: "Receive & Refine",
    description:
      "Sharing early concepts, gathering feedback, and fine-tuning together.",
  },
  {
    title: "Continue & Grow",
    description:
      "Launching with confidence and supporting the next chapter of your brand.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Codeique brought an unusual level of taste and rigor. The final product felt far more expensive than it was.",
    name: "Nadia Chen",
    role: "Founder, Zenith",
  },
  {
    quote:
      "We came in needing a new site. We left with a sharper story, stronger positioning, and a team our customers trust.",
    name: "Marcus Hale",
    role: "CEO, Vertex",
  },
  {
    quote:
      "Fast, collaborative, and deeply thoughtful. Every interaction felt like working with true partners, not vendors.",
    name: "Alina Brooks",
    role: "Marketing Lead, Lumina",
  },
] as const;

export const pricingTiers = [
  {
    name: "Basic",
    price: { monthly: 399, annual: 319 },
    description: "Affordable design support for founders and small businesses that need steady help without a large monthly commitment.",
    features: ["1 active request", "3-4 day delivery", "Website or graphic tasks", "WhatsApp + async support"],
    popular: false,
  },
  {
    name: "Standard",
    price: { monthly: 699, annual: 559 },
    description: "A more balanced plan for growing brands that need faster turnaround, better design consistency, and regular monthly output.",
    features: ["2 active requests", "2-3 day delivery", "UI/UX + web design", "Priority revisions"],
    popular: true,
  },
  {
    name: "Custom",
    price: { monthly: null, annual: null },
    description: "Custom pricing for full websites, product design, larger builds, or longer-term retainers with a tailored scope.",
    features: ["Custom scope", "Flexible timeline", "Design + development", "Project-based quote"],
    popular: false,
  },
] as const;

export const faqItems = [
  {
    question: "What’s your typical process?",
    answer:
      "We start with discovery, then move into direction, design, build, and refinement. You stay closely involved without needing to manage the details.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Most focused marketing sites land in 4-8 weeks. Larger identity or product-focused engagements are scoped around milestones and review cycles.",
  },
  {
    question: "Do you offer packages or custom quotes?",
    answer:
      "Both. We keep a few clear retainers for speed, and we scope custom work when the challenge or timeline is more unique.",
  },
  {
    question: "What’s included in a branding package?",
    answer:
      "Typically positioning support, visual direction, logo options, typography, color, and a practical usage system your team can actually maintain.",
  },
  {
    question: "Can you work with our existing team?",
    answer:
      "Yes. We regularly plug into in-house marketing, product, and engineering teams and adapt to the tools and pace already in place.",
  },
] as const;

export const blogPosts = [
  {
    title: "Designing credibility into early-stage product sites",
    category: "Strategy",
    date: "March 10, 2026",
    image: "https://picsum.photos/id/119/1200/900",
    excerpt:
      "Credibility rarely comes from one loud claim. It comes from how clearly a site frames the problem, signals judgment, and removes hesitation.",
    readTime: "6 min read",
  },
  {
    title: "How motion can guide attention without stealing it",
    category: "Motion",
    date: "February 22, 2026",
    image: "https://picsum.photos/id/201/1200/900",
    excerpt:
      "The best motion systems work like a quiet editor. They introduce structure, sequence, and focus without turning the interface into a performance.",
    readTime: "4 min read",
  },
  {
    title: "Why editorial layouts still outperform template thinking",
    category: "Design",
    date: "January 31, 2026",
    image: "https://picsum.photos/id/225/1200/900",
    excerpt:
      "Editorial composition gives brands room to breathe. It creates rhythm, contrast, and narrative pacing that generic blocks rarely achieve.",
    readTime: "5 min read",
  },
] as const;

export const aboutPillars = [
  {
    title: "Clarity First",
    description:
      "We shape positioning, structure, and messaging so the right people understand your value quickly.",
  },
  {
    title: "Taste With Intent",
    description:
      "Visual decisions are never decoration alone. Every layout, type choice, and interaction should reinforce perception.",
  },
  {
    title: "Built To Perform",
    description:
      "Our work balances craft with speed, responsiveness, and practical implementation from the first concept onward.",
  },
] as const;

export const aboutTimeline = [
  {
    phase: "Discovery",
    detail:
      "We audit the story, audience, and conversion gaps so the work starts from real context instead of assumption.",
  },
  {
    phase: "Direction",
    detail:
      "We define a visual and verbal direction that sharpens how your brand should feel, sound, and move online.",
  },
  {
    phase: "Design & Build",
    detail:
      "We design and develop in tandem, keeping the final experience cohesive, responsive, and launch ready.",
  },
  {
    phase: "Refinement",
    detail:
      "We polish the details, improve flow, and leave you with a site that feels intentional at every touchpoint.",
  },
] as const;

export const studioPrinciples = [
  "Small team, high involvement",
  "Strategy and execution under one roof",
  "Senior-level design judgment",
  "Front-end craft with performance in mind",
] as const;
