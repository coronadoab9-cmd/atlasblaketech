export const site = {
  name: "AtlasBlake Technologies LLC",
  shortName: "AtlasBlake",
  url: "https://atlasblaketech.com",
  email: "contact@atlasblaketech.com",
  supportEmail: "contact@atlasblaketech.com",
  location: "Dallas–Fort Worth, Texas",
  description:
    "AtlasBlake Technologies creates professional websites, local SEO foundations, managed website care, automation, and custom business technology with clear scope and fair pricing.",
};

export const services = [
  {
    slug: "website-design",
    eyebrow: "Professional online presence",
    title: "Website Design",
    shortTitle: "Websites",
    icon: "browser" as const,
    summary:
      "Custom, mobile-ready websites that help a business look credible, explain its services clearly, and turn visitors into inquiries.",
    description:
      "AtlasBlake plans, designs, builds, tests, and launches professional websites around your company, customers, services, branding, and goals—not a recycled industry template.",
    outcomes: [
      "Custom visual direction and reusable design system",
      "Core, service, and priority city pages based on the selected package",
      "Clear click-to-call, request-service, and lead-capture paths",
      "Mobile optimization and technical SEO foundation",
      "Google Analytics and Search Console baseline when included",
      "Two consolidated revision rounds",
    ],
  },
  {
    slug: "local-seo-growth",
    eyebrow: "Be easier to find",
    title: "Local SEO & Growth",
    shortTitle: "SEO & Growth",
    icon: "chart" as const,
    summary:
      "Search-friendly content, service structure, reviews, analytics, and local foundations designed for steady growth.",
    description:
      "We help search engines and customers understand what your business does, where it works, and why people should trust it—without making ranking, lead, or revenue promises no company can honestly guarantee.",
    outcomes: [
      "Service and priority-city page planning",
      "Titles, descriptions, headings, sitemap, indexing, and redirects",
      "Localized content, FAQs, proof, and calls to action",
      "Business-name, phone, hours, licensing, and service-area consistency",
      "Google Analytics and Search Console measurement",
      "Ongoing technical review through eligible care plans",
    ],
  },
  {
    slug: "website-care",
    eyebrow: "Support after launch",
    title: "Managed Hosting & Care",
    shortTitle: "Website Care",
    icon: "shield" as const,
    summary:
      "Managed hosting, SSL, backups, security, updates, monitoring, minor edits, and dependable support after launch.",
    description:
      "Core, Growth, and Premium websites are paired with corresponding month-to-month care plans. Care begins at launch, is billed monthly in advance, and may be canceled with 30 days’ written notice under the signed agreement.",
    outcomes: [
      "AtlasBlake-managed hosting, SSL, and uptime monitoring",
      "Automated daily backups and routine compatible software updates",
      "Security, spam monitoring, and reasonable restoration assistance",
      "Monthly minor-edit allowance based on the selected care tier",
      "Technical SEO, performance, and conversion review at eligible tiers",
      "Email support and priority support based on the selected care tier",
    ],
  },
  {
    slug: "custom-technology",
    eyebrow: "Beyond the public website",
    title: "Custom Technology",
    shortTitle: "Custom Technology",
    icon: "code" as const,
    summary:
      "Portals, dashboards, internal systems, mobile tools, and software built around a company-specific workflow.",
    description:
      "Custom software, API integrations, e-commerce, and advanced systems are separate services unless expressly included in a signed custom scope.",
    outcomes: [
      "Customer and employee portals",
      "Administrative dashboards",
      "Mobile and tablet workflows",
      "Inventory and job systems",
      "Role-based access",
      "Reporting and document tools",
    ],
  },
  {
    slug: "automation-integrations",
    eyebrow: "Connect the work",
    title: "Automation & Integrations",
    shortTitle: "Automation",
    icon: "link" as const,
    summary:
      "Practical connections and automated workflows that reduce repetitive work, delay, and duplicate entry.",
    description:
      "AtlasBlake can connect forms, systems, documents, data, and notifications under a separately approved scope so information moves more dependably.",
    outcomes: [
      "Third-party integrations",
      "Automated forms and emails",
      "Document generation",
      "Data synchronization",
      "Notifications and alerts",
      "AI-assisted customer workflows",
    ],
  },
];

export const websitePackages = [
  {
    name: "Core Website",
    option: "Option A",
    setup: "$3,000",
    careName: "Core Care",
    monthly: "$150/month",
    pages: "Up to 5 core/service pages",
    bestFor: "Businesses that need a professional, credible website foundation.",
    featured: false,
    features: [
      "Custom design and core website foundation",
      "Up to 5 core/service pages",
      "Contact forms and basic lead tracking",
      "Mobile optimization and technical SEO",
      "Two consolidated revision rounds",
    ],
  },
  {
    name: "Growth Website",
    option: "Recommended · Option B",
    setup: "$5,000",
    careName: "Growth Care",
    monthly: "$250/month",
    pages: "Up to 12 total pages",
    bestFor: "Local service businesses that want stronger content, trust, and local visibility.",
    featured: true,
    features: [
      "Everything in the Core Website package",
      "Up to 12 total pages",
      "Expanded service and priority city pages",
      "Reviews, FAQs, and trust-content sections",
      "Analytics and Search Console baseline",
    ],
  },
  {
    name: "Premium Website",
    option: "Option C",
    setup: "$7,500+",
    careName: "Premium Care",
    monthly: "$400+/month",
    pages: "20+ page custom architecture",
    bestFor: "Established, growth-focused businesses competing across multiple services or cities.",
    featured: false,
    features: [
      "Custom scope for established growth-focused businesses",
      "20+ page service and city architecture",
      "Advanced local SEO and conversion tracking",
      "Migration, integrations, and premium content structure",
      "Priority production and launch support",
    ],
  },
];

export const carePlans = [
  {
    name: "Core Care",
    label: "Reliable essentials",
    monthly: "$150/month",
    featured: false,
    features: [
      "Managed hosting, SSL, and uptime monitoring",
      "Daily backups and routine software updates",
      "Security and spam monitoring",
      "Up to 30 minutes of minor edits monthly",
      "Standard email support",
    ],
  },
  {
    name: "Growth Care",
    label: "Active growth support",
    monthly: "$250/month",
    featured: true,
    features: [
      "Everything included in Core Care",
      "Up to 60 minutes of minor edits monthly",
      "Monthly performance and broken-link review",
      "Monthly Search Console and technical SEO review",
      "Priority email support and summary update",
    ],
  },
  {
    name: "Premium Care",
    label: "Hands-on partnership",
    monthly: "$400+/month",
    featured: false,
    features: [
      "Everything included in Growth Care",
      "Up to 2 hours of approved updates monthly",
      "Monthly technical SEO and conversion review",
      "Reasonable Google Business Profile support",
      "Priority support and quarterly strategy review",
    ],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discovery and planning",
    text: "Week 1: kickoff, goals, services, service areas, competitor review, page map, required access, and asset checklist.",
  },
  {
    number: "02",
    title: "Design direction",
    text: "Weeks 1–2: homepage concept, visual system, calls to action, mobile layout, and the first client review.",
  },
  {
    number: "03",
    title: "Website build and content",
    text: "Weeks 2–5: agreed core pages, service pages, city pages, forms, reviews, integrations, and approved revisions.",
  },
  {
    number: "04",
    title: "Testing and launch",
    text: "Weeks 5–6: mobile testing, links, forms, redirects, analytics, search tools, final approval, domain connection, and launch.",
  },
  {
    number: "05",
    title: "Managed care",
    text: "After launch: hosting, security, backups, updates, monitoring, support, and minor website changes under the selected care plan.",
  },
];

export const projectTerms = {
  estimatedDuration: "5–7 weeks from kickoff",
  revisions: "Two consolidated revision rounds",
  deposit: "50%",
  launchBalance: "50%",
  additionalDevelopment: "$125/hour",
  cancellationNotice: "30 days’ written notice",
  firstYearHandoff: "$2,500",
  laterHandoff: "$750 after 12 consecutive months of Managed Hosting & Care",
};
