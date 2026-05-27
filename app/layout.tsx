import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AtlasBlake Technologies | Dispatch & eTicket Operations Software",
  description:
    "AtlasBlake Technologies builds modern dispatch, delivery, eTicket, and operations software for concrete, trucking, and construction companies.",
    icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}