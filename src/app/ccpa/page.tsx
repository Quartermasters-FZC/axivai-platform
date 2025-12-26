import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "CCPA / CPRA Notice | AXIVAI",
  description:
    "California resident privacy rights for AXIVAI: know, delete, correct, and opt-out of sale/share. Submit requests and learn how we honor GPC signals.",
  robots: "index, follow",
};

export default function CCPA() {
  const lastUpdated = "December 25, 2025";
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold gradient-text">
            AXIVAI
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </nav>

      <main className="py-16 px-4">
        <article className="container mx-auto max-w-3xl prose prose-stone dark:prose-invert">
          <div className="not-prose mb-8">
            <Badge variant="outline" className="mb-4">
              Legal
            </Badge>
            <h1 className="text-3xl font-bold mb-2">CCPA / CPRA Notice</h1>
            <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
          </div>

          <Separator className="my-8" />

          <section>
            <h2>1. California Resident Rights</h2>
            <ul>
              <li>Right to know what personal information we collect, use, disclose, and share.</li>
              <li>Right to delete personal information (subject to exceptions).</li>
              <li>Right to correct inaccurate personal information.</li>
              <li>Right to opt-out of sale or sharing of personal information.</li>
              <li>Right to limit use of sensitive personal information.</li>
              <li>Right to non-discrimination for exercising your rights.</li>
            </ul>
          </section>

          <section>
            <h2>2. Categories of Personal Information</h2>
            <p>We may collect the following categories in the past 12 months:</p>
            <ul>
              <li>Identifiers: name, email, IP address (approximate geolocation).</li>
              <li>Commercial information: service interest, TCO analysis inputs you provide.</li>
              <li>Internet activity: pages viewed, interactions (if analytics is enabled by consent).</li>
              <li>Professional information: organization and role if you share them.</li>
            </ul>
            <p>
              Sources include information you provide directly (forms, emails), automated collection (device/usage data), and service providers (e.g., analytics if enabled). Business purposes include service delivery, security, analytics (with consent), and compliance. We do not sell personal information, but you may still opt-out of sale/share below.
            </p>
          </section>

          <section>
            <h2>3. How to Exercise Your Rights</h2>
            <p>Email requests to <Link href="mailto:privacy@aliffcapital.com">privacy@aliffcapital.com</Link>. Provide your name, state of residence, the right you wish to exercise, and a contact email. We will verify requests by confirming control of the email address and may request limited additional information to verify identity.</p>
            <p>Response timeline: we aim to respond within 45 days; extensions may apply as permitted by law.</p>
          </section>

          <section>
            <h2>4. Do Not Sell or Share My Personal Information</h2>
            <p>We do not sell personal information. If you want to opt-out of any future sale or sharing, submit a request via the link below or by emailing <Link href="mailto:privacy@aliffcapital.com">privacy@aliffcapital.com</Link>. We honor Global Privacy Control (GPC) signals where applicable.</p>
            <div className="not-prose mt-4">
              <Button asChild size="sm" variant="secondary">
                <Link href="mailto:privacy@aliffcapital.com?subject=CCPA%20Opt-Out%20Request">Submit opt-out request</Link>
              </Button>
            </div>
          </section>

          <section>
            <h2>5. Sensitive Information</h2>
            <p>We do not intentionally collect sensitive personal information. If you believe you provided such data, contact us to limit or delete it.</p>
          </section>

          <section>
            <h2>6. Data Retention</h2>
            <p>We retain personal information only as long as necessary for the purposes described, including security, legal compliance, and service delivery. Retention varies by category and lawful basis.</p>
          </section>

          <section>
            <h2>7. Contact for CCPA Requests</h2>
            <p>Email: <Link href="mailto:privacy@aliffcapital.com">privacy@aliffcapital.com</Link></p>
            <p>Mail: Aliff Capital, LLC (Attn: Privacy), 1201 Wilson Blvd, Arlington, VA 22209</p>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold gradient-text text-lg">AXIVAI</p>
              <p className="text-sm text-muted-foreground">
                Resilience Infrastructure for School Bus Electrification
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-foreground">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="hover:text-foreground">
                Accessibility
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            © 2025–2050 Aliff Capital, LLC. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
