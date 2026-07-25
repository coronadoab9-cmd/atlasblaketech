import type { Metadata } from "next";
import "./globals.css";
import { site } from "./lib/marketing";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AtlasBlake Technologies | Custom Software, Websites & Automation",
    template: "%s | AtlasBlake Technologies",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "custom software development",
    "website development",
    "mobile application development",
    "business automation",
    "API integration",
    "customer portals",
    "Dallas Fort Worth software company",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "AtlasBlake Technologies | Custom Software, Websites & Automation",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "AtlasBlake Technologies",
    description: site.description,
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
