import type { Metadata } from "next";
import ServiceDetailPage from "../../components/ServiceDetailPage";
export const metadata: Metadata = { title: "Custom Business Technology", description: "Customer portals, dashboards, mobile workflows, internal systems, and custom software built around company-specific needs.", alternates: { canonical: "/services/custom-technology" } };
export default function Page(){ return <ServiceDetailPage slug="custom-technology" />; }
