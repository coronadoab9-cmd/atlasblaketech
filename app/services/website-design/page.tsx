import type { Metadata } from "next";
import ServiceDetailPage from "../../components/ServiceDetailPage";
export const metadata: Metadata = { title: "Professional Website Design", description: "Custom mobile-friendly business websites designed to establish credibility, explain services clearly, and generate customer inquiries.", alternates: { canonical: "/services/website-design" } };
export default function Page(){ return <ServiceDetailPage slug="website-design" />; }
