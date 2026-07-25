import type { Metadata } from "next";
import ServiceDetailPage from "../../components/ServiceDetailPage";

export const metadata: Metadata = { title: "Custom Software Development", description: "Internal tools, dashboards, customer portals, operational platforms, and company-specific business software.", alternates: { canonical: "/services/custom-software" } };
export default function Page() { return <ServiceDetailPage slug="custom-software" />; }
