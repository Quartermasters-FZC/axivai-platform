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

export const metadata: Metadata = {
  title: "AXIVAI - School Bus Electrification Platform",
  description:
    "Decision-grade infrastructure intelligence for U.S. school bus electrification. Planning-grade TCO calculator, research engine, and mobile charging solutions.",
  keywords: [
    "electric school bus",
    "school bus electrification",
    "TCO calculator",
    "mobile charging",
    "EPA Clean School Bus Program",
    "V1G",
    "fleet electrification",
  ],
  authors: [{ name: "Aliff Capital, LLC", url: "https://aliffcapital.com" }],
  openGraph: {
    title: "AXIVAI - School Bus Electrification Platform",
    description:
      "Decision-grade infrastructure intelligence for U.S. school bus electrification",
    url: "https://axivai.com",
    siteName: "AXIVAI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
