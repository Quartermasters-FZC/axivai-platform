import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "@/components/cookie-consent/CookieConsent";

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
  metadataBase: new URL("https://axivai.com"),
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
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AXIVAI",
              url: "https://axivai.com",
              description:
                "Decision-grade infrastructure intelligence for U.S. school bus electrification.",
              logo: "https://axivai.com/logo.png",
              sameAs: ["https://aliffcapital.com"],
              contactPoint: {
                "@type": "ContactPoint",
                email: "privacy@aliffcapital.com",
                contactType: "customer service",
                availableLanguage: ["en"],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AXIVAI",
              url: "https://axivai.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://axivai.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
