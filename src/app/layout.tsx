import type { Metadata } from "next";
import { Inter, Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AXIVAI | Deployable power infrastructure",
  description:
    "AXIVAI delivers usable electrical capacity where fixed infrastructure is too slow, too limited or too inflexible: battery power trucked to fleet depots and sites waiting on the grid, through modular storage, mission-specific deployment and managed operations.",
  keywords: [
    "deployable power",
    "modular energy storage",
    "temporary power",
    "mobile battery storage",
    "fleet charging",
    "electric school bus charging",
    "managed charging",
    "power resilience",
  ],
  authors: [{ name: SITE.entity }],
  openGraph: {
    title: "AXIVAI | Power anywhere. Ready when needed.",
    description:
      "Deployable power infrastructure: mobile, stationed or managed capacity where conventional infrastructure falls short.",
    url: "https://axivai.com",
    siteName: "AXIVAI",
    type: "website",
    images: [
      {
        url: "/og/axivai-og.jpg",
        width: 1200,
        height: 630,
        alt: "AXIVAI: Power anywhere. Ready when needed. Deployable power infrastructure, beside a rendering of a battery transport trailer at sunrise.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AXIVAI | Power anywhere. Ready when needed.",
    description:
      "Deployable power infrastructure: mobile, stationed or managed capacity where conventional infrastructure falls short.",
    images: ["/og/axivai-og.jpg"],
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
        className={`${inter.variable} ${montserrat.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
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
                "Deployable power infrastructure: modular storage, mission-specific deployment and managed operations.",
              logo: "https://axivai.com/brand/axivai-wordmark.png",
              founder: { "@type": "Organization", name: SITE.entity, url: SITE.entityUrl },
              contactPoint: {
                "@type": "ContactPoint",
                email: SITE.email.privacy,
                contactType: "privacy",
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
            }),
          }}
        />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
