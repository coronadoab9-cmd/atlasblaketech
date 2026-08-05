import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/services/website-development", destination: "/services/website-design", permanent: true },
      { source: "/services/custom-software", destination: "/services/custom-technology", permanent: true },
      { source: "/services/mobile-apps", destination: "/services/custom-technology", permanent: true },
      { source: "/services/business-automation", destination: "/services/automation-integrations", permanent: true },
      { source: "/services/api-integrations", destination: "/services/automation-integrations", permanent: true },
      { source: "/services/cloud-support", destination: "/services/website-care", permanent: true },
      { source: "/features", destination: "/services", permanent: true },
      { source: "/industries", destination: "/services", permanent: true },
      { source: "/product", destination: "/services/custom-technology", permanent: true },
      { source: "/products", destination: "/services/custom-technology", permanent: true },
      { source: "/products/:path*", destination: "/services/custom-technology", permanent: true },
      { source: "/case-studies", destination: "/work", permanent: true },
      { source: "/ai-automation", destination: "/services/automation-integrations", permanent: true },
      { source: "/demo", destination: "/start-a-project", permanent: true },
      { source: "/contact", destination: "/start-a-project", permanent: true },
      { source: "/work/big-town-concrete", destination: "/services/custom-technology", permanent: true },
      { source: "/work/materiory", destination: "/services/custom-technology", permanent: true },
      { source: "/work/websites", destination: "/work/nexdrain-plumbing", permanent: true },
    ];
  },
};

export default nextConfig;
