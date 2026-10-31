import type { Metadata } from "next";
import { Inter, Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "@/components/cookie-consent/CookieConsent";

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
    "AXIVAI is a concept for making usable electrical capacity available where fixed infrastructure is too slow, too limited or too inflexible, through modular storage, mission-specific deployment and managed operations. Research and concept development stage.",
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
  authors: [{ name: "Aliff Capital, LLC", url: "https://aliffcapital.com" }],
  openGraph: {
    title: "AXIVAI | Power anywhere. Ready when needed.",
    description:
      "A deployable power infrastructure concept: mobile, stationed or managed capacity where conventional infrastructure falls short.",
    url: "https://axivai.com",
    siteName: "AXIVAI",
    type: "website",
    images: [
      {
        url: "/images/hero/axivai-hero.png",
        width: 1983,
        height: 793,
        alt: "Concept rendering of AXIVAI deployable power: a battery transport truck, modular storage units and an electric school-bus depot at sunrise",
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
        className={`${inter.variable} ${montserrat.variable} ${geistMono.variable} antialiased`}
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
                "Deployable power infrastructure concept: modular storage, mission-specific deployment and managed operations.",
              logo: "https://axivai.com/brand/axivai-wordmark.png",
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
            }),
          }}
        />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
