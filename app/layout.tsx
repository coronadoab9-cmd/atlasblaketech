import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AtlasBlake Technologies | Dispatch & eTicket Operations Software",
  description:
    "AtlasBlake Technologies builds modern dispatch, delivery, eTicket, and operations software for concrete, trucking, and construction companies.",
  keywords: [
    "AtlasBlake Technologies",
    "dispatch software",
    "eTicket software",
    "concrete ticket software",
    "delivery operations software",
    "fleet operations software",
    "construction dispatch software",
  ],
  openGraph: {
    title: "AtlasBlake Technologies",
    description:
      "Modern dispatch, delivery, eTicket, and operations software.",
    url: "https://atlasblaketech.com",
    siteName: "AtlasBlake Technologies",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
