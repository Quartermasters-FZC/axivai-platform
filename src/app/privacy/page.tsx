/**
 * AXIVAI Privacy Policy Page
 * © 2025-2050 Aliff Capital, LLC. All Rights Reserved.
 *
 * Comprehensive privacy policy compliant with:
 * - CCPA/CPRA (California)
 * - GDPR (EU)
 * - VCDPA, CPA, CTDPA, UCPA (State Privacy Laws)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Privacy Policy | AXIVAI",
  description:
    "Learn how AXIVAI collects, uses, and protects your personal information. GDPR and CCPA compliant privacy practices for our school bus electrification platform.",
  robots: "index, follow",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "December 25, 2025";

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
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

      {/* Content */}
      <main className="py-16 px-4">
        <article className="container mx-auto max-w-3xl prose prose-stone dark:prose-invert">
          <div className="not-prose mb-8">
            <Badge variant="outline" className="mb-4">
              Legal
            </Badge>
            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last Updated: {lastUpdated}
            </p>
          </div>

          <Separator className="my-8" />

          {/* Introduction */}
          <section id="introduction">
            <h2>1. Introduction</h2>
            <p>
              Welcome to AXIVAI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). AXIVAI is operated by
              Aliff Capital, LLC. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our
              website at{" "}
              <Link href="https://axivai.com">axivai.com</Link> and use our
              school bus electrification decision-support platform, including
              our TCO Calculator and related services (collectively, the
              &quot;Services&quot;).
            </p>
            <p>
              By accessing or using our Services, you agree to this Privacy
              Policy. If you do not agree with the terms of this Privacy Policy,
              please do not access the Services.
            </p>
          </section>

          {/* Information We Collect */}
          <section id="information-collected">
            <h2>2. Information We Collect</h2>

            <h3>2.1 Information You Provide Directly</h3>
            <p>
              When you use our Services, you may voluntarily provide us with
              information, including:
            </p>
            <ul>
              <li>
                <strong>Fleet Profile Data:</strong> State/location, bus counts
                by type (Type A, C, D), daily mileage, operating days, park-out
                percentages, and optional cost overrides.
              </li>
              <li>
                <strong>Contact Information:</strong> If you contact us via
                email or other channels, we may collect your name, email
                address, and the content of your message.
              </li>
              <li>
                <strong>Business Information:</strong> Organization name, role,
                and professional contact details if you request a consultation
                or quote.
              </li>
            </ul>

            <h3>2.2 Information Collected Automatically</h3>
            <p>
              When you access our Services, we may automatically collect certain
              information, including:
            </p>
            <ul>
              <li>
                <strong>Device Information:</strong> Browser type, operating
                system, device identifiers, and screen resolution.
              </li>
              <li>
                <strong>Usage Data:</strong> Pages visited, time spent on pages,
                click patterns, and navigation paths.
              </li>
              <li>
                <strong>IP Address:</strong> Your Internet Protocol address,
                which may indicate your general geographic location.
              </li>
              <li>
                <strong>Cookies and Similar Technologies:</strong> See our{" "}
                <Link href="/cookies">Cookie Policy</Link> for details.
              </li>
            </ul>

            <h3>2.3 Information from Third Parties</h3>
            <p>
              We may receive information about you from third-party sources,
              including:
            </p>
            <ul>
              <li>
                <strong>AI Service Providers:</strong> When you use AI-powered
                features, interactions may be processed by OpenAI, Anthropic, or
                Google, subject to their respective privacy policies.
              </li>
              <li>
                <strong>Analytics Providers:</strong> Aggregated usage data to
                help us improve our Services.
              </li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section id="how-we-use">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>
                <strong>Provide and Improve Services:</strong> Calculate TCO
                estimates, generate analysis reports, and enhance platform
                functionality.
              </li>
              <li>
                <strong>Respond to Inquiries:</strong> Answer your questions and
                provide customer support.
              </li>
              <li>
                <strong>Analytics and Research:</strong> Understand usage
                patterns to improve our offerings (in anonymized/aggregated
                form).
              </li>
              <li>
                <strong>Legal Compliance:</strong> Comply with applicable laws,
                regulations, and legal processes.
              </li>
              <li>
                <strong>Security:</strong> Detect, prevent, and address fraud,
                security vulnerabilities, and technical issues.
              </li>
            </ul>
          </section>

          {/* Legal Basis (GDPR) */}
          <section id="legal-basis">
            <h2>4. Legal Basis for Processing (GDPR)</h2>
            <p>
              If you are located in the European Economic Area (EEA), United
              Kingdom, or Switzerland, we process your personal data based on
              the following legal grounds:
            </p>
            <ul>
              <li>
                <strong>Consent:</strong> When you have given explicit consent
                for specific processing activities (e.g., marketing
                communications, non-essential cookies).
              </li>
              <li>
                <strong>Contract Performance:</strong> When processing is
                necessary to provide Services you have requested.
              </li>
              <li>
                <strong>Legitimate Interests:</strong> When processing is
                necessary for our legitimate business interests (e.g., improving
                Services, security), provided your rights do not override these
                interests.
              </li>
              <li>
                <strong>Legal Obligation:</strong> When we must process data to
                comply with applicable laws.
              </li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section id="information-sharing">
            <h2>5. How We Share Your Information</h2>
            <p>We may share your information in the following circumstances:</p>

            <h3>5.1 Service Providers</h3>
            <p>
              We engage trusted third-party service providers to perform
              functions on our behalf, including:
            </p>
            <ul>
              <li>Cloud hosting and infrastructure (e.g., Vercel, AWS)</li>
              <li>AI/ML processing (OpenAI, Anthropic, Google)</li>
              <li>Analytics services</li>
            </ul>
            <p>
              These providers are contractually bound to protect your data and
              use it only for the services they provide to us.
            </p>

            <h3>5.2 Legal Requirements</h3>
            <p>We may disclose your information if required by law, including:</p>
            <ul>
              <li>In response to lawful requests by public authorities</li>
              <li>To comply with a subpoena, court order, or legal process</li>
              <li>To protect our rights, property, or safety</li>
            </ul>

            <h3>5.3 Business Transfers</h3>
            <p>
              If Aliff Capital, LLC is involved in a merger, acquisition, or
              sale of assets, your information may be transferred as part of
              that transaction.
            </p>

            <h3>5.4 No Sale of Personal Information</h3>
            <p className="font-semibold">
              We do not sell, rent, or trade your personal information to third
              parties for monetary compensation.
            </p>
          </section>

          {/* International Transfers */}
          <section id="international-transfers">
            <h2>6. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in the United
              States and other countries where our service providers operate. If
              you are located in the EEA, UK, or Switzerland, we rely on:
            </p>
            <ul>
              <li>
                <strong>EU-U.S. Data Privacy Framework:</strong> For transfers
                to certified organizations in the United States.
              </li>
              <li>
                <strong>Standard Contractual Clauses (SCCs):</strong> For other
                international transfers, ensuring adequate data protection.
              </li>
            </ul>
          </section>

          {/* Data Retention */}
          <section id="data-retention">
            <h2>7. Data Retention</h2>
            <p>We retain your personal information only as long as necessary to:</p>
            <ul>
              <li>Provide the Services you requested</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
            </ul>
            <p>
              TCO calculation data is processed in real-time and is not
              persistently stored unless you create an account (feature not yet
              available). Anonymized, aggregated data may be retained
              indefinitely for analytical purposes.
            </p>
          </section>

          {/* Your Rights */}
          <section id="your-rights">
            <h2>8. Your Privacy Rights</h2>

            <h3>8.1 Rights for All Users</h3>
            <p>Regardless of your location, you may:</p>
            <ul>
              <li>Request access to your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for optional processing</li>
            </ul>

            <h3>8.2 California Residents (CCPA/CPRA)</h3>
            <p>
              If you are a California resident, you have additional rights under
              the California Consumer Privacy Act and California Privacy Rights
              Act:
            </p>
            <ul>
              <li>
                <strong>Right to Know:</strong> Request disclosure of categories
                and specific pieces of personal information collected.
              </li>
              <li>
                <strong>Right to Delete:</strong> Request deletion of your
                personal information, subject to legal exceptions.
              </li>
              <li>
                <strong>Right to Opt-Out of Sale/Sharing:</strong> We do not
                sell or share personal information, but you may still exercise
                this right.
              </li>
              <li>
                <strong>Right to Correct:</strong> Request correction of
                inaccurate personal information.
              </li>
              <li>
                <strong>Right to Limit Use of Sensitive Data:</strong> Limit how
                we use sensitive personal information.
              </li>
              <li>
                <strong>Right to Non-Discrimination:</strong> We will not
                discriminate against you for exercising your privacy rights.
              </li>
            </ul>
            <p>
              To exercise these rights, email us at{" "}
              <a href="mailto:privacy@aliffcapital.com">
                privacy@aliffcapital.com
              </a>{" "}
              or use our{" "}
              <Link href="/privacy-request">Privacy Request Form</Link>. We will
              respond within 45 days.
            </p>

            <h3>8.3 EU/UK Residents (GDPR)</h3>
            <p>
              If you are located in the European Economic Area or United
              Kingdom, you have the following rights:
            </p>
            <ul>
              <li>
                <strong>Right of Access:</strong> Obtain a copy of your personal
                data.
              </li>
              <li>
                <strong>Right to Rectification:</strong> Correct inaccurate or
                incomplete data.
              </li>
              <li>
                <strong>Right to Erasure:</strong> Request deletion (&quot;right to
                be forgotten&quot;) in certain circumstances.
              </li>
              <li>
                <strong>Right to Restrict Processing:</strong> Limit how we use
                your data while resolving a dispute.
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Receive your data in
                a structured, machine-readable format.
              </li>
              <li>
                <strong>Right to Object:</strong> Object to processing based on
                legitimate interests or direct marketing.
              </li>
              <li>
                <strong>Rights Related to Automated Decisions:</strong> Not be
                subject to solely automated decisions with legal effects.
              </li>
            </ul>
            <p>
              To exercise these rights, contact us at{" "}
              <a href="mailto:privacy@aliffcapital.com">
                privacy@aliffcapital.com
              </a>
              . You also have the right to lodge a complaint with your local
              data protection authority.
            </p>

            <h3>8.4 Other U.S. State Privacy Laws</h3>
            <p>
              Residents of Virginia, Colorado, Connecticut, Utah, and other
              states with comprehensive privacy laws have similar rights to
              those described above. Contact us to exercise your rights under
              applicable state law.
            </p>
          </section>

          {/* Cookies */}
          <section id="cookies">
            <h2>9. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience.
              For detailed information about the types of cookies we use and how
              to manage your preferences, please see our{" "}
              <Link href="/cookies">Cookie Policy</Link>.
            </p>
          </section>

          {/* Children's Privacy */}
          <section id="children">
            <h2>10. Children&apos;s Privacy</h2>
            <p>
              Our Services are not directed to children under 13 years of age
              (or 16 in the EEA). We do not knowingly collect personal
              information from children. If we learn that we have collected
              information from a child under the applicable age, we will delete
              it promptly. If you believe a child has provided us with personal
              information, please contact us at{" "}
              <a href="mailto:privacy@aliffcapital.com">
                privacy@aliffcapital.com
              </a>
              .
            </p>
          </section>

          {/* Security */}
          <section id="security">
            <h2>11. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information, including:
            </p>
            <ul>
              <li>Encryption of data in transit (TLS/HTTPS)</li>
              <li>Secure cloud infrastructure with access controls</li>
              <li>Regular security assessments and monitoring</li>
              <li>Employee training on data protection</li>
            </ul>
            <p>
              However, no method of transmission over the Internet is 100%
              secure. We cannot guarantee absolute security.
            </p>
          </section>

          {/* Do Not Track */}
          <section id="do-not-track">
            <h2>12. Do Not Track Signals</h2>
            <p>
              Some browsers transmit &quot;Do Not Track&quot; (DNT) signals. We currently
              honor DNT signals by disabling non-essential tracking when
              detected. However, there is no industry standard for DNT, and this
              behavior may change.
            </p>
          </section>

          {/* Changes */}
          <section id="changes">
            <h2>13. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we make
              material changes, we will:
            </p>
            <ul>
              <li>Update the &quot;Last Updated&quot; date at the top of this page</li>
              <li>
                Provide notice on our website or via email for significant
                changes
              </li>
            </ul>
            <p>
              Your continued use of the Services after any changes indicates
              your acceptance of the updated Privacy Policy.
            </p>
          </section>

          {/* Contact */}
          <section id="contact">
            <h2>14. Contact Us</h2>
            <p>
              If you have questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us:
            </p>
            <address className="not-italic">
              <strong>Aliff Capital, LLC</strong>
              <br />
              Privacy Inquiries
              <br />
              Email:{" "}
              <a href="mailto:privacy@aliffcapital.com">
                privacy@aliffcapital.com
              </a>
              <br />
              Website:{" "}
              <Link href="https://aliffcapital.com">aliffcapital.com</Link>
            </address>
            <p className="mt-4">
              For GDPR-related inquiries, you may also contact our Data
              Protection point of contact at the email address above.
            </p>
          </section>

          <Separator className="my-8" />

          {/* Quick Links */}
          <section id="related" className="not-prose">
            <h2 className="text-xl font-semibold mb-4">Related Policies</h2>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="outline" size="sm">
                <Link href="/terms">Terms of Service</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/cookies">Cookie Policy</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/accessibility">Accessibility</Link>
              </Button>
            </div>
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
