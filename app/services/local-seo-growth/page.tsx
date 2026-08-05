import type { Metadata } from "next";
import ServiceDetailPage from "../../components/ServiceDetailPage";
export const metadata: Metadata = { title: "Local SEO & Website Growth", description: "Service pages, location content, analytics, reviews, and technical SEO foundations for local businesses.", alternates: { canonical: "/services/local-seo-growth" } };
export default function Page(){ return <ServiceDetailPage slug="local-seo-growth" />; }
