import type { Metadata } from "next";
import ServiceDetailPage from "../../components/ServiceDetailPage";
export const metadata: Metadata = { title: "Website Care & Support", description: "Website hosting coordination, security, backups, updates, performance monitoring, content help, and continued support.", alternates: { canonical: "/services/website-care" } };
export default function Page(){ return <ServiceDetailPage slug="website-care" />; }
