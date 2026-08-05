import type { Metadata } from "next";
import ServiceDetailPage from "../../components/ServiceDetailPage";
export const metadata: Metadata = { title: "Business Automation & Integrations", description: "Automated forms, documents, emails, notifications, data synchronization, and third-party system integrations.", alternates: { canonical: "/services/automation-integrations" } };
export default function Page(){ return <ServiceDetailPage slug="automation-integrations" />; }
