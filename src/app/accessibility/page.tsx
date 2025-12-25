/**
 * AXIVAI Accessibility Statement Page
 * © 2025-2050 Aliff Capital, LLC. All Rights Reserved.
 *
 * Accessibility Statement compliant with:
 * - ADA (Americans with Disabilities Act)
 * - Section 508 of the Rehabilitation Act
 * - WCAG 2.1 Level AA
 * - EU Web Accessibility Directive
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Accessibility Statement | AXIVAI",
  description:
    "AXIVAI is committed to ensuring digital accessibility for people with disabilities. Learn about our accessibility features and how to report issues.",
  robots: "index, follow",
};

export default function AccessibilityPage() {
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
        <article className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <Badge variant="outline" className="mb-4">
              Accessibility
            </Badge>
            <h1 className="text-3xl font-bold mb-2">Accessibility Statement</h1>
            <p className="text-muted-foreground">
              Last Updated: {lastUpdated}
            </p>
          </div>

          <Separator className="my-8" />

          {/* Commitment */}
          <section className="prose prose-stone dark:prose-invert mb-12">
            <h2>Our Commitment to Accessibility</h2>
            <p>
              Aliff Capital, LLC is committed to ensuring that the AXIVAI
              platform is accessible to all users, including people with
              disabilities. We strive to provide an inclusive digital experience
              that allows everyone to access and use our decision-support tools
              for school bus electrification.
            </p>
            <p>
              We are continually improving the user experience for everyone and
              applying relevant accessibility standards to achieve these goals.
            </p>
          </section>

          {/* Conformance Status */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Conformance Status</h2>
            <Card>
              <CardHeader>
                <CardTitle>WCAG 2.1 Level AA</CardTitle>
                <CardDescription>
                  Web Content Accessibility Guidelines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-yellow-500 text-yellow-950">
                    Partially Conformant
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  AXIVAI is partially conformant with WCAG 2.1 Level AA. This
                  means that some content may not fully conform to the
                  accessibility standard. We are actively working to address
                  identified accessibility gaps.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Accessibility Features */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Accessibility Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Keyboard Navigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    All interactive elements can be accessed using a keyboard.
                    Tab through page elements, use Enter to activate buttons,
                    and use arrow keys within components.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Screen Reader Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our pages are structured with semantic HTML and ARIA
                    attributes to work with screen readers like NVDA, JAWS, and
                    VoiceOver.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Color Contrast</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Text and interactive elements meet WCAG AA contrast ratio
                    requirements (4.5:1 for normal text, 3:1 for large text and
                    UI components).
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Focus Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Visible focus rings indicate which element is currently
                    selected, making keyboard navigation clear and intuitive.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Responsive Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Content reflows and remains usable on various screen sizes
                    and when zoomed up to 200% without loss of content or
                    functionality.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Text Alternatives</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Images include alternative text descriptions. Icons used for
                    actions have accessible labels. Charts include data tables.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Clear Language</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Content is written in plain language with clear headings,
                    logical structure, and descriptive link text.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Form Accessibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Form inputs have associated labels, error messages are
                    announced to screen readers, and required fields are clearly
                    indicated.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Known Limitations */}
          <section className="prose prose-stone dark:prose-invert mb-12">
            <h2>Known Limitations</h2>
            <p>
              Despite our best efforts, some content on AXIVAI may not be fully
              accessible. Known limitations include:
            </p>
            <ul>
              <li>
                <strong>TCO Calculator Charts:</strong> Complex data
                visualizations may not be fully accessible to screen readers.
                We provide tabular data alternatives where possible.
              </li>
              <li>
                <strong>AI-Generated Content:</strong> Responses from AI
                features may not always follow accessibility best practices in
                formatting.
              </li>
              <li>
                <strong>PDF Exports:</strong> Exported reports may have limited
                accessibility features. We are working on improving PDF
                accessibility.
              </li>
              <li>
                <strong>Third-Party Components:</strong> Some embedded
                third-party content may not meet WCAG standards.
              </li>
            </ul>
            <p>
              We are actively working to address these limitations and improve
              accessibility across all features.
            </p>
          </section>

          {/* Technical Specifications */}
          <section className="prose prose-stone dark:prose-invert mb-12">
            <h2>Technical Specifications</h2>
            <p>
              Accessibility of AXIVAI relies on the following technologies to
              work with the particular combination of web browser and assistive
              technologies:
            </p>
            <ul>
              <li>HTML5</li>
              <li>CSS3</li>
              <li>JavaScript (React)</li>
              <li>WAI-ARIA</li>
            </ul>

            <h3>Compatible Browsers</h3>
            <p>AXIVAI is designed to be compatible with:</p>
            <ul>
              <li>Google Chrome (latest 2 versions)</li>
              <li>Mozilla Firefox (latest 2 versions)</li>
              <li>Apple Safari (latest 2 versions)</li>
              <li>Microsoft Edge (latest 2 versions)</li>
            </ul>

            <h3>Compatible Assistive Technologies</h3>
            <p>We test compatibility with:</p>
            <ul>
              <li>NVDA (Windows)</li>
              <li>JAWS (Windows)</li>
              <li>VoiceOver (macOS, iOS)</li>
              <li>TalkBack (Android)</li>
            </ul>
          </section>

          {/* Assessment Methods */}
          <section className="prose prose-stone dark:prose-invert mb-12">
            <h2>Assessment Methods</h2>
            <p>
              Aliff Capital, LLC assessed the accessibility of AXIVAI using the
              following methods:
            </p>
            <ul>
              <li>
                <strong>Self-Evaluation:</strong> Internal review using WCAG 2.1
                checklist
              </li>
              <li>
                <strong>Automated Testing:</strong> Axe, WAVE, and Lighthouse
                accessibility audits
              </li>
              <li>
                <strong>Manual Testing:</strong> Keyboard-only navigation,
                screen reader testing
              </li>
              <li>
                <strong>User Feedback:</strong> Ongoing feedback from users with
                disabilities
              </li>
            </ul>
          </section>

          {/* Feedback */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Feedback and Contact</h2>
            <Card className="border-accent/20">
              <CardContent className="pt-6">
                <div className="prose prose-stone dark:prose-invert">
                  <p>
                    We welcome your feedback on the accessibility of AXIVAI. If
                    you encounter accessibility barriers or have suggestions for
                    improvement, please contact us:
                  </p>
                  <address className="not-italic">
                    <strong>Accessibility Team</strong>
                    <br />
                    Aliff Capital, LLC
                    <br />
                    Email:{" "}
                    <a href="mailto:accessibility@aliffcapital.com">
                      accessibility@aliffcapital.com
                    </a>
                  </address>
                  <p>
                    We aim to respond to accessibility feedback within 5
                    business days and will work to resolve issues as quickly as
                    possible.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Reporting Format */}
          <section className="prose prose-stone dark:prose-invert mb-12">
            <h2>When Reporting an Issue</h2>
            <p>To help us address your concern effectively, please include:</p>
            <ul>
              <li>Your name and contact information</li>
              <li>The web address (URL) of the content you had trouble with</li>
              <li>A description of the problem you encountered</li>
              <li>
                The assistive technology you use (if any), including browser and
                version
              </li>
              <li>Suggestions for how we might improve accessibility</li>
            </ul>
          </section>

          {/* Enforcement Procedure (EU) */}
          <section className="prose prose-stone dark:prose-invert mb-12">
            <h2>Enforcement Procedure (EU Users)</h2>
            <p>
              If you are an EU resident and are not satisfied with our response
              to your accessibility complaint, you may escalate your concern to
              your national enforcement body. In the EU, you have the right to
              lodge a complaint with the national authority responsible for
              enforcing the Web Accessibility Directive.
            </p>
          </section>

          {/* Commitment to Improvement */}
          <section className="prose prose-stone dark:prose-invert mb-12">
            <h2>Our Ongoing Commitment</h2>
            <p>We are committed to:</p>
            <ul>
              <li>
                Training our team on accessibility best practices
              </li>
              <li>
                Including accessibility requirements in our development process
              </li>
              <li>
                Conducting regular accessibility audits
              </li>
              <li>
                Consulting with users with disabilities
              </li>
              <li>
                Staying current with accessibility standards and guidelines
              </li>
            </ul>
            <p>
              This statement was last reviewed and updated on {lastUpdated}. We
              review our accessibility practices regularly and update this
              statement as our platform evolves.
            </p>
          </section>

          <Separator className="my-8" />

          {/* Quick Links */}
          <section className="not-prose">
            <h2 className="text-xl font-semibold mb-4">Related Resources</h2>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="outline" size="sm">
                <Link href="/privacy">Privacy Policy</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/terms">Terms of Service</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/cookies">Cookie Policy</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a
                  href="https://www.w3.org/WAI/standards-guidelines/wcag/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WCAG Guidelines
                </a>
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
