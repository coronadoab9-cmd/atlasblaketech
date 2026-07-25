import type { Metadata } from "next";
import ServiceDetailPage from "../../components/ServiceDetailPage";

export const metadata: Metadata = { title: "API Integrations", description: "Connect third-party platforms, business systems, data feeds, and custom applications with dependable API integrations.", alternates: { canonical: "/services/api-integrations" } };
export default function Page() { return <ServiceDetailPage slug="api-integrations" />; }
