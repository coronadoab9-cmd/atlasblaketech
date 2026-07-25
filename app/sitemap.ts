import type { MetadataRoute } from "next";
import { services, site } from "./lib/marketing";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/work",
    "/work/big-town-concrete",
    "/work/materiory",
    "/work/websites",
    "/products",
    "/products/btc-fleet",
    "/products/materiory",
    "/about",
    "/contact",
    "/support",
    "/privacy",
    "/terms",
  ];
  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  return [...staticRoutes, ...serviceRoutes].map((route, index) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route === "/contact" ? 0.9 : 0.8,
  }));
}
