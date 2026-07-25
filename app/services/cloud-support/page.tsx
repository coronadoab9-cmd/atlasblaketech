import type { Metadata } from "next";
import ServiceDetailPage from "../../components/ServiceDetailPage";

export const metadata: Metadata = { title: "Cloud Hosting & Support", description: "Cloud deployment, monitoring, maintenance, security updates, continued support, and feature expansion.", alternates: { canonical: "/services/cloud-support" } };
export default function Page() { return <ServiceDetailPage slug="cloud-support" />; }
