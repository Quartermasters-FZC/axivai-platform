/**
 * AXIVAI Cookie Policy Page
 * © 2025-2050 Aliff Capital, LLC. All Rights Reserved.
 *
 * Comprehensive Cookie Policy compliant with:
 * - GDPR (EU)
 * - ePrivacy Directive
 * - CCPA/CPRA (California)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CookieSettingsButton } from "@/components/cookie-consent/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Cookie Policy | AXIVAI",
  description:
    "Learn about the cookies and tracking technologies used on AXIVAI. Manage your cookie preferences and understand how we protect your privacy.",
  robots: "index, follow",
};

export default function CookiePolicyPage() {
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
            <h1 className="text-3xl font-bold mb-2">Cookie Policy</h1>
            <p className="text-muted-foreground">
              Last Updated: {lastUpdated}
            </p>
          </div>

          <Separator className="my-8" />

          {/* Introduction */}
          <section id="introduction">
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device
              (computer, tablet, or mobile phone) when you visit a website.
              They are widely used to make websites work more efficiently, as
              well as to provide information to website owners.
            </p>
            <p>
              This Cookie Policy explains what cookies are, how we use them on
              the AXIVAI platform (&quot;website&quot;), and how you can manage your
              cookie preferences.
            </p>

            <h3>Types of Cookies</h3>
            <ul>
              <li>
                <strong>Session Cookies:</strong> Temporary cookies that are
                deleted when you close your browser. They are essential for
                website functionality.
              </li>
              <li>
                <strong>Persistent Cookies:</strong> Cookies that remain on your
                device for a set period or until you delete them. They remember
                your preferences and settings.
              </li>
              <li>
                <strong>First-Party Cookies:</strong> Set by the website you are
                visiting (AXIVAI).
              </li>
              <li>
                <strong>Third-Party Cookies:</strong> Set by domains other than
                the one you are visiting (e.g., analytics providers).
              </li>
            </ul>
          </section>

          {/* Why We Use Cookies */}
          <section id="why-cookies">
            <h2>2. Why We Use Cookies</h2>
            <p>We use cookies for several purposes:</p>
            <ul>
              <li>
                <strong>Essential Functionality:</strong> To enable core features
                like security, session management, and accessibility preferences.
              </li>
              <li>
                <strong>Performance and Analytics:</strong> To understand how
                visitors use our website and identify areas for improvement.
              </li>
              <li>
                <strong>Preferences:</strong> To remember your settings and
                choices (e.g., cookie consent, theme preferences).
              </li>
              <li>
                <strong>Security:</strong> To protect against fraud and ensure
                secure use of our Services.
              </li>
            </ul>
          </section>

          {/* Cookies We Use */}
          <section id="cookies-we-use">
            <h2>3. Cookies We Use</h2>

            <h3>3.1 Strictly Necessary Cookies</h3>
            <p>
              These cookies are essential for the website to function properly.
              They cannot be disabled without affecting core functionality.
            </p>
            <div className="not-prose overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cookie Name</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-sm">axivai_consent</TableCell>
                    <TableCell>Stores your cookie consent preferences</TableCell>
                    <TableCell>1 year</TableCell>
                    <TableCell>First-party</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-sm">__Host-session</TableCell>
                    <TableCell>Session management and security</TableCell>
                    <TableCell>Session</TableCell>
                    <TableCell>First-party</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-sm">csrf_token</TableCell>
                    <TableCell>Cross-site request forgery protection</TableCell>
                    <TableCell>Session</TableCell>
                    <TableCell>First-party</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <h3>3.2 Performance and Analytics Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our
              website by collecting and reporting information anonymously. They
              are only set if you consent to analytics cookies.
            </p>
            <div className="not-prose overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cookie Name</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-sm">_ga</TableCell>
                    <TableCell>Google Analytics: Distinguishes users</TableCell>
                    <TableCell>2 years</TableCell>
                    <TableCell>Third-party</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-sm">_ga_*</TableCell>
                    <TableCell>Google Analytics 4: Session state</TableCell>
                    <TableCell>2 years</TableCell>
                    <TableCell>Third-party</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-sm">_gid</TableCell>
                    <TableCell>Google Analytics: Distinguishes users</TableCell>
                    <TableCell>24 hours</TableCell>
                    <TableCell>Third-party</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Note: Analytics cookies are only loaded after you provide consent
              via our cookie banner.
            </p>

            <h3>3.3 Functional Cookies</h3>
            <p>
              These cookies enable enhanced functionality and personalization.
              They may be set by us or third-party providers.
            </p>
            <div className="not-prose overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cookie Name</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-sm">axivai_theme</TableCell>
                    <TableCell>Remembers your theme preference (light/dark)</TableCell>
                    <TableCell>1 year</TableCell>
                    <TableCell>First-party</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-sm">axivai_preferences</TableCell>
                    <TableCell>Stores user interface preferences</TableCell>
                    <TableCell>1 year</TableCell>
                    <TableCell>First-party</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <h3>3.4 Marketing Cookies</h3>
            <p>
              <strong>We currently do not use marketing or advertising
              cookies.</strong> If this changes in the future, we will update
              this policy and request your consent before setting such cookies.
            </p>
          </section>

          {/* Third-Party Cookies */}
          <section id="third-party">
            <h2>4. Third-Party Cookies</h2>
            <p>
              Some cookies are set by third-party services that appear on our
              pages. We do not control these cookies. Below are the third-party
              services that may set cookies:
            </p>

            <h3>Google Analytics</h3>
            <p>
              We use Google Analytics to understand how visitors use our
              website. Google Analytics uses cookies to collect information
              about your use of the website in an anonymized form.
            </p>
            <ul>
              <li>
                Privacy Policy:{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  policies.google.com/privacy
                </a>
              </li>
              <li>
                Opt-out:{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
              </li>
            </ul>

            <h3>AI Service Providers</h3>
            <p>
              When you use AI-powered features (optional), your interactions
              may be processed by OpenAI, Anthropic, or Google. These providers
              may use their own cookies or tracking technologies. Please refer
              to their privacy policies for details:
            </p>
            <ul>
              <li>
                <a
                  href="https://openai.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OpenAI Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://www.anthropic.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Anthropic Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Privacy Policy
                </a>
              </li>
            </ul>
          </section>

          {/* Managing Cookies */}
          <section id="manage-cookies">
            <h2>5. How to Manage Cookies</h2>

            <h3>5.1 Cookie Consent Banner</h3>
            <p>
              When you first visit our website, you will see a cookie consent
              banner that allows you to:
            </p>
            <ul>
              <li>Accept all cookies</li>
              <li>Reject non-essential cookies</li>
              <li>Customize your preferences by category</li>
            </ul>
            <p>
              You can change your preferences at any time by clicking the
              &quot;Cookie Settings&quot; link in our website footer or by using the
              button below:
            </p>
            <div className="not-prose mt-4">
              <CookieSettingsButton />
            </div>

            <h3>5.2 Browser Settings</h3>
            <p>
              Most web browsers allow you to control cookies through their
              settings. You can:
            </p>
            <ul>
              <li>Block all cookies</li>
              <li>Block only third-party cookies</li>
              <li>Delete existing cookies</li>
              <li>Enable/disable cookies for specific websites</li>
            </ul>
            <p>Here are links to cookie management instructions for common browsers:</p>
            <ul>
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>

            <h3>5.3 Impact of Disabling Cookies</h3>
            <p>
              If you disable or reject cookies, some features of our website may
              not function correctly. Specifically:
            </p>
            <ul>
              <li>Session management may be affected</li>
              <li>Your preferences may not be saved between visits</li>
              <li>Some interactive features may not work as expected</li>
            </ul>
          </section>

          {/* Do Not Track */}
          <section id="do-not-track">
            <h2>6. Do Not Track (DNT) Signals</h2>
            <p>
              Some browsers send a &quot;Do Not Track&quot; signal to websites they visit.
              While there is no industry standard for responding to DNT signals,
              we respect your browser&apos;s DNT setting and will not load
              non-essential tracking cookies when DNT is enabled.
            </p>
          </section>

          {/* Global Privacy Control */}
          <section id="gpc">
            <h2>7. Global Privacy Control (GPC)</h2>
            <p>
              We honor the Global Privacy Control (GPC) signal as a valid
              opt-out mechanism for the sale or sharing of personal information
              under applicable privacy laws (e.g., CCPA/CPRA). When we detect
              GPC, we will treat it as a &quot;Do Not Sell or Share&quot; request.
            </p>
          </section>

          {/* Updates */}
          <section id="updates">
            <h2>8. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect
              changes in our practices or legal requirements. When we make
              material changes:
            </p>
            <ul>
              <li>We will update the &quot;Last Updated&quot; date at the top</li>
              <li>We may prompt you to review and re-consent to cookies</li>
            </ul>
            <p>
              We encourage you to review this policy periodically.
            </p>
          </section>

          {/* Contact */}
          <section id="contact">
            <h2>9. Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact us:
            </p>
            <address className="not-italic">
              <strong>Aliff Capital, LLC</strong>
              <br />
              Privacy Team
              <br />
              Email:{" "}
              <a href="mailto:privacy@aliffcapital.com">
                privacy@aliffcapital.com
              </a>
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
                <Link href="/terms">Terms of Service</Link>
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
