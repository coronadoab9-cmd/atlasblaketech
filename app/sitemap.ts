import type { MetadataRoute } from "next";
import { services, site } from "./lib/marketing";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/work", "/work/nexdrain-plumbing", "/approach", "/about", "/start-a-project", "/privacy", "/terms", "/support"];
  const serviceRoutes = services.map((service) => `/services/${service.slug}`);
  return [...routes, ...serviceRoutes].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/services") || route === "/approach" || route.startsWith("/work") ? 0.8 : 0.6,
  }));
}
