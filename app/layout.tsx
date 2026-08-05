import type { Metadata } from "next";
import "./globals.css";
import { site } from "./lib/marketing";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AtlasBlake Technologies | Professional Websites & Business Technology",
    template: "%s | AtlasBlake Technologies",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "professional website design",
    "small business website design",
    "local SEO website",
    "website maintenance",
    "custom business software",
    "business automation",
    "Dallas Fort Worth web design",
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
    title: "AtlasBlake Technologies | Professional Websites & Business Technology",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "AtlasBlake Technologies",
    description: site.description,
  },
  icons: {
    icon: "/brand-icon.png",
    apple: "/brand-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
