import type { Metadata } from "next";
import ServiceDetailPage from "../../components/ServiceDetailPage";

export const metadata: Metadata = { title: "Mobile & Field App Development", description: "Mobile and tablet applications for employees, drivers, field teams, technicians, and customers.", alternates: { canonical: "/services/mobile-apps" } };
export default function Page() { return <ServiceDetailPage slug="mobile-apps" />; }
