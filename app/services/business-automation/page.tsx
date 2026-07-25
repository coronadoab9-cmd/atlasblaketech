import type { Metadata } from "next";
import ServiceDetailPage from "../../components/ServiceDetailPage";

export const metadata: Metadata = { title: "Business Automation", description: "Automated workflows, reporting, notifications, document generation, and AI-assisted business processes.", alternates: { canonical: "/services/business-automation" } };
export default function Page() { return <ServiceDetailPage slug="business-automation" />; }
