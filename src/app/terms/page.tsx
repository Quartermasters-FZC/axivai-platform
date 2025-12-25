/**
 * AXIVAI Terms of Service Page
 * © 2025-2050 Aliff Capital, LLC. All Rights Reserved.
 *
 * Comprehensive Terms of Service covering:
 * - Platform usage terms
 * - Subscription and payment terms
 * - Intellectual property
 * - Liability limitations
 * - Dispute resolution
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Terms of Service | AXIVAI",
  description:
    "Terms and conditions for using AXIVAI school bus electrification platform, including TCO Calculator, subscription terms, acceptable use, and user rights.",
  robots: "index, follow",
};

export default function TermsOfServicePage() {
  const lastUpdated = "December 25, 2025";
  const effectiveDate = "December 25, 2025";

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
            <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last Updated: {lastUpdated} | Effective Date: {effectiveDate}
            </p>
          </div>

          <Separator className="my-8" />

          {/* Introduction */}
          <section id="agreement">
            <h2>1. Agreement to Terms</h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) constitute a legally binding
              agreement between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and Aliff
              Capital, LLC (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), governing your
              access to and use of the AXIVAI platform, website at{" "}
              <Link href="https://axivai.com">axivai.com</Link>, and all
              related services, features, content, and applications
              (collectively, the &quot;Services&quot;).
            </p>
            <p>
              <strong>By accessing or using our Services, you agree to be bound
              by these Terms and our{" "}
              <Link href="/privacy">Privacy Policy</Link>.</strong> If you do
              not agree to these Terms, you must not access or use our Services.
            </p>
            <p>
              If you are using the Services on behalf of an organization, you
              represent and warrant that you have the authority to bind that
              organization to these Terms.
            </p>
          </section>

          {/* Eligibility */}
          <section id="eligibility">
            <h2>2. Eligibility</h2>
            <p>
              To use our Services, you must:
            </p>
            <ul>
              <li>Be at least 18 years old (or the age of majority in your jurisdiction)</li>
              <li>Have the legal capacity to enter into binding agreements</li>
              <li>Not be prohibited from using the Services under applicable law</li>
              <li>Provide accurate and complete registration information (if required)</li>
            </ul>
            <p>
              If you are under 18, you may only use the Services with the
              involvement and consent of a parent or legal guardian.
            </p>
          </section>

          {/* Description of Services */}
          <section id="services">
            <h2>3. Description of Services</h2>
            <p>
              AXIVAI provides decision-grade infrastructure intelligence for
              U.S. school bus electrification. Our Services include:
            </p>

            <h3>3.1 TCO Calculator</h3>
            <p>
              A planning-grade Total Cost of Ownership calculator that compares
              diesel, self-managed EV, Electrification-as-a-Service (EaaS), and
              AXIVAI mobile charging scenarios. The TCO Calculator provides:
            </p>
            <ul>
              <li>Fleet-specific cost estimates based on user inputs</li>
              <li>Multi-scenario comparison with transparent assumptions</li>
              <li>Evidence strength indicators and applicability warnings</li>
              <li>Export capabilities (JSON/CSV)</li>
            </ul>

            <h3>3.2 AI-Powered Analysis (Preview)</h3>
            <p>
              Optional AI-powered explanations and audit insights using
              third-party AI providers (OpenAI, Anthropic, Google). AI outputs
              are informational only and should not replace professional advice.
            </p>

            <h3>3.3 Future Services</h3>
            <p>
              Additional modules including Research Engine, Solution Explorer,
              Trust Center, and AXIVAI Chat are planned for future release.
              These Terms will govern those services upon availability.
            </p>
          </section>

          {/* Account Terms */}
          <section id="accounts">
            <h2>4. Account Registration</h2>
            <p>
              Some features may require account registration. If you create an
              account, you agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information to keep it accurate</li>
              <li>Maintain the security and confidentiality of your login credentials</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized access or security breach</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these Terms or appear to involve fraudulent or unauthorized
              activity.
            </p>
          </section>

          {/* Acceptable Use */}
          <section id="acceptable-use">
            <h2>5. Acceptable Use Policy</h2>
            <p>
              You agree to use the Services only for lawful purposes and in
              accordance with these Terms. You may NOT:
            </p>
            <ul>
              <li>
                <strong>Violate Laws:</strong> Use the Services for any purpose
                that violates applicable local, state, national, or international
                laws or regulations.
              </li>
              <li>
                <strong>Infringe Rights:</strong> Violate the intellectual
                property, privacy, or other rights of any third party.
              </li>
              <li>
                <strong>Harmful Content:</strong> Transmit malware, viruses, or
                other malicious code; engage in phishing or social engineering.
              </li>
              <li>
                <strong>Unauthorized Access:</strong> Attempt to gain unauthorized
                access to our systems, other users&apos; accounts, or connected
                networks.
              </li>
              <li>
                <strong>Data Scraping:</strong> Use automated means (bots,
                scrapers, crawlers) to access the Services except as expressly
                permitted or via our APIs with proper authorization.
              </li>
              <li>
                <strong>Competitive Use:</strong> Use output from the Services
                to develop competing products without our written consent.
              </li>
              <li>
                <strong>Misrepresentation:</strong> Impersonate any person or
                entity, or falsely claim affiliation with any person or entity.
              </li>
              <li>
                <strong>Interference:</strong> Interfere with or disrupt the
                integrity or performance of the Services or related systems.
              </li>
              <li>
                <strong>Excessive Use:</strong> Place unreasonable load on our
                infrastructure or exceed usage limits (if applicable).
              </li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section id="intellectual-property">
            <h2>6. Intellectual Property</h2>

            <h3>6.1 Our Ownership</h3>
            <p>
              The Services, including all content, features, functionality,
              software, designs, text, graphics, logos, and trademarks
              (&quot;AXIVAI Materials&quot;), are owned by Aliff Capital, LLC and
              protected by U.S. and international copyright, trademark, patent,
              trade secret, and other intellectual property laws.
            </p>
            <p>
              The AXIVAI name, logo, and related marks are trademarks of Aliff
              Capital, LLC. You may not use these marks without our prior
              written consent.
            </p>

            <h3>6.2 License to Use Services</h3>
            <p>
              Subject to your compliance with these Terms, we grant you a
              limited, non-exclusive, non-transferable, revocable license to
              access and use the Services for your internal business purposes.
              This license does not include:
            </p>
            <ul>
              <li>The right to sublicense, sell, or distribute the Services</li>
              <li>The right to modify, reverse engineer, or create derivative works</li>
              <li>The right to use the Services for competitive benchmarking without consent</li>
            </ul>

            <h3>6.3 User Content</h3>
            <p>
              You retain ownership of any data, inputs, or content you submit
              to the Services (&quot;User Content&quot;). By submitting User Content, you
              grant us a non-exclusive, worldwide, royalty-free license to use,
              process, and display your User Content solely to provide the
              Services.
            </p>

            <h3>6.4 Feedback</h3>
            <p>
              If you provide feedback, suggestions, or ideas about the Services,
              you grant us the right to use such feedback without restriction or
              compensation to you.
            </p>
          </section>

          {/* Third-Party Services */}
          <section id="third-party">
            <h2>7. Third-Party Services and Content</h2>
            <p>
              The Services may integrate with or contain links to third-party
              services, including:
            </p>
            <ul>
              <li>AI providers (OpenAI, Anthropic, Google)</li>
              <li>Data sources (EIA, EPA, government databases)</li>
              <li>Analytics and infrastructure providers</li>
            </ul>
            <p>
              Your use of third-party services is governed by their respective
              terms and privacy policies. We are not responsible for third-party
              content, accuracy, or practices.
            </p>
          </section>

          {/* Disclaimers */}
          <section id="disclaimers">
            <h2>8. Disclaimers</h2>

            <h3>8.1 &quot;As Is&quot; Provision</h3>
            <p className="uppercase text-sm">
              <strong>The Services are provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;
              without warranties of any kind, either express or implied,
              including but not limited to implied warranties of
              merchantability, fitness for a particular purpose, title, and
              non-infringement.</strong>
            </p>

            <h3>8.2 No Professional Advice</h3>
            <p>
              The Services, including TCO calculations and AI insights, provide
              <strong> planning-grade estimates only</strong> and do not
              constitute:
            </p>
            <ul>
              <li>Financial, investment, or accounting advice</li>
              <li>Legal advice</li>
              <li>Engineering or technical specifications</li>
              <li>Procurement recommendations or bid documents</li>
            </ul>
            <p>
              You should consult qualified professionals before making
              procurement or investment decisions based on our Services.
            </p>

            <h3>8.3 Data Accuracy</h3>
            <p>
              We strive for accuracy but do not warrant that:
            </p>
            <ul>
              <li>All data, calculations, or estimates are accurate, complete, or current</li>
              <li>Default assumptions apply to your specific situation</li>
              <li>Third-party data sources are error-free or up-to-date</li>
              <li>AI-generated content is factually correct or bias-free</li>
            </ul>
            <p>
              Users are responsible for verifying outputs against their own
              data and circumstances.
            </p>

            <h3>8.4 Service Availability</h3>
            <p>
              We do not guarantee uninterrupted, error-free, or secure access
              to the Services. We may modify, suspend, or discontinue any
              aspect of the Services at any time without liability.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section id="liability">
            <h2>9. Limitation of Liability</h2>
            <p className="uppercase text-sm">
              <strong>To the maximum extent permitted by applicable law, Aliff
              Capital, LLC and its officers, directors, employees, agents,
              affiliates, successors, and assigns shall not be liable for:</strong>
            </p>
            <ul className="uppercase text-sm">
              <li>Any indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, use, goodwill, or other intangible losses</li>
              <li>Damages arising from your use of or inability to use the Services</li>
              <li>Damages arising from unauthorized access to or alteration of your data</li>
              <li>Damages arising from third-party conduct or content</li>
            </ul>
            <p className="uppercase text-sm">
              <strong>In no event shall our total liability exceed the greater
              of (a) the amount you paid us in the 12 months prior to the claim,
              or (b) $100 USD.</strong>
            </p>
            <p>
              Some jurisdictions do not allow exclusion of certain warranties
              or limitation of liability. In such jurisdictions, our liability
              is limited to the maximum extent permitted by law.
            </p>
          </section>

          {/* Indemnification */}
          <section id="indemnification">
            <h2>10. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Aliff Capital,
              LLC and its officers, directors, employees, agents, and affiliates
              from and against any claims, liabilities, damages, losses, costs,
              or expenses (including reasonable attorneys&apos; fees) arising from:
            </p>
            <ul>
              <li>Your use of the Services</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Your User Content</li>
              <li>Any misuse of the Services under your account</li>
            </ul>
          </section>

          {/* Dispute Resolution */}
          <section id="disputes">
            <h2>11. Dispute Resolution</h2>

            <h3>11.1 Governing Law</h3>
            <p>
              These Terms and any dispute arising from them shall be governed
              by the laws of the State of Delaware, United States, without
              regard to conflict of law principles.
            </p>

            <h3>11.2 Informal Resolution</h3>
            <p>
              Before filing any formal dispute, you agree to contact us at{" "}
              <a href="mailto:legal@aliffcapital.com">legal@aliffcapital.com</a>{" "}
              to attempt to resolve the dispute informally. Most disputes can
              be resolved within 30 days.
            </p>

            <h3>11.3 Binding Arbitration</h3>
            <p>
              If informal resolution fails, any dispute shall be resolved by
              binding arbitration administered by JAMS under its Streamlined
              Arbitration Rules. The arbitration shall take place in Delaware
              or virtually. The arbitrator&apos;s decision shall be final and
              binding.
            </p>

            <h3>11.4 Class Action Waiver</h3>
            <p>
              <strong>You and we agree that any arbitration or court proceeding
              shall be conducted only on an individual basis and not as a class,
              consolidated, or representative action.</strong> If this waiver is
              found unenforceable, the entire arbitration provision shall be
              void.
            </p>

            <h3>11.5 Exceptions</h3>
            <p>
              Either party may seek injunctive or equitable relief in court
              for intellectual property infringement or unauthorized access.
              Small claims court actions are also excluded from arbitration.
            </p>
          </section>

          {/* Termination */}
          <section id="termination">
            <h2>12. Termination</h2>
            <p>
              <strong>Termination by You:</strong> You may stop using the
              Services at any time. If you have an account, you may request
              account deletion by contacting us.
            </p>
            <p>
              <strong>Termination by Us:</strong> We may suspend or terminate
              your access to the Services at any time, with or without cause,
              with or without notice, including for:
            </p>
            <ul>
              <li>Violation of these Terms</li>
              <li>Conduct harmful to us, other users, or third parties</li>
              <li>Extended periods of inactivity (for accounts)</li>
              <li>Business reasons (e.g., discontinuation of Services)</li>
            </ul>
            <p>
              <strong>Effect of Termination:</strong> Upon termination, your
              license to use the Services ends immediately. Sections that by
              their nature should survive termination will survive, including
              Intellectual Property, Disclaimers, Limitation of Liability,
              Indemnification, and Dispute Resolution.
            </p>
          </section>

          {/* Changes to Terms */}
          <section id="changes">
            <h2>13. Changes to These Terms</h2>
            <p>
              We may modify these Terms at any time. When we make material
              changes:
            </p>
            <ul>
              <li>We will update the &quot;Last Updated&quot; date at the top</li>
              <li>We will provide notice on our website or via email</li>
              <li>We may require you to accept the new terms to continue using the Services</li>
            </ul>
            <p>
              Your continued use of the Services after changes take effect
              constitutes acceptance of the modified Terms. If you do not
              agree to the changes, you must stop using the Services.
            </p>
          </section>

          {/* General Provisions */}
          <section id="general">
            <h2>14. General Provisions</h2>

            <h3>14.1 Entire Agreement</h3>
            <p>
              These Terms, together with the Privacy Policy and Cookie Policy,
              constitute the entire agreement between you and us regarding the
              Services and supersede all prior agreements.
            </p>

            <h3>14.2 Severability</h3>
            <p>
              If any provision of these Terms is found unenforceable, the
              remaining provisions will continue in full force and effect.
            </p>

            <h3>14.3 Waiver</h3>
            <p>
              Our failure to enforce any right or provision of these Terms will
              not constitute a waiver of that right or provision.
            </p>

            <h3>14.4 Assignment</h3>
            <p>
              You may not assign or transfer your rights under these Terms
              without our prior written consent. We may assign our rights and
              obligations without restriction.
            </p>

            <h3>14.5 Force Majeure</h3>
            <p>
              We are not liable for any failure or delay due to causes beyond
              our reasonable control, including natural disasters, war,
              terrorism, pandemics, or utility failures.
            </p>

            <h3>14.6 Headings</h3>
            <p>
              Section headings are for convenience only and have no legal effect.
            </p>
          </section>

          {/* EU-Specific Terms */}
          <section id="eu-terms">
            <h2>15. Additional Terms for EU Users</h2>
            <p>
              If you are a consumer in the European Union:
            </p>
            <ul>
              <li>
                <strong>Right of Withdrawal:</strong> For paid digital services,
                you have 14 days to withdraw from a purchase. By requesting
                immediate access to digital content, you may waive this right.
              </li>
              <li>
                <strong>Consumer Rights:</strong> Nothing in these Terms limits
                your statutory consumer rights under applicable EU law.
              </li>
              <li>
                <strong>Dispute Resolution:</strong> You may submit disputes to
                the EU Online Dispute Resolution platform at{" "}
                <a
                  href="https://ec.europa.eu/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://ec.europa.eu/odr
                </a>
                .
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section id="contact">
            <h2>16. Contact Information</h2>
            <p>
              For questions about these Terms, please contact us:
            </p>
            <address className="not-italic">
              <strong>Aliff Capital, LLC</strong>
              <br />
              Legal Department
              <br />
              Email:{" "}
              <a href="mailto:legal@aliffcapital.com">legal@aliffcapital.com</a>
              <br />
              Website:{" "}
              <Link href="https://aliffcapital.com">aliffcapital.com</Link>
            </address>
          </section>

          <Separator className="my-8" />

          {/* Quick Links */}
          <section id="related" className="not-prose">
            <h2 className="text-xl font-semibold mb-4">Related Policies</h2>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="outline" size="sm">
                <Link href="/privacy">Privacy Policy</Link>
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
