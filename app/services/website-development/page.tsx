import type { Metadata } from "next";
import ServiceDetailPage from "../../components/ServiceDetailPage";

export const metadata: Metadata = { title: "Website Development", description: "Modern, mobile-first business websites designed to build trust, generate opportunities, and support long-term growth.", alternates: { canonical: "/services/website-development" } };
export default function Page() { return <ServiceDetailPage slug="website-development" />; }
