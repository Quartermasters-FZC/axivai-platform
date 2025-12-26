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
    images: [
      {
        url: "/images/axivai-three-lanes-architecture.svg",
        width: 1200,
        height: 800,
        alt: "AXIVAI Three-Lane Mobile Charging Architecture showing Direct Injection, Mothership, and Valet solutions",
      },
    ],
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
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ImageObject",
              name: "AXIVAI Three-Lane Mobile Charging Architecture",
              description:
                "Diagram showing AXIVAI's three-lane mobile charging solution: Direct Injection (Class 6 trucks, 500kWh), Mothership (Class 8 trailers, 2MWh), and Valet (electric vans, 150kWh) powered by wholesale energy sources at $0.03-$0.08/kWh",
              url: "https://axivai.com/images/axivai-three-lanes-architecture.svg",
              contentUrl: "https://axivai.com/images/axivai-three-lanes-architecture.svg",
              license: "https://axivai.com/terms",
              acquireLicensePage: "https://axivai.com/terms",
              creditText: "AXIVAI by Aliff Capital",
              creator: {
                "@type": "Organization",
                name: "AXIVAI",
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
