/**
 * AXIVAI Cookie Policy Page
 * © 2025–2026 Aliff Capital, LLC. All Rights Reserved.
 *
 * Describes what the site actually does: it sets no cookies and uses no analytics,
 * advertising or tracking technologies. If that changes, this policy and a consent
 * mechanism must be updated before the change ships.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy | AXIVAI",
  description:
    "AXIVAI sets no cookies and uses no analytics, advertising or tracking technologies. What the site does store, and how that would change.",
  robots: "index, follow",
  alternates: { canonical: "/cookies" },
};

export default function CookiePolicyPage() {
  const lastUpdated = "November 1, 2026";

  return (
    <div className="bg-background">
      <main id="main-content" tabIndex={-1} className="py-16 px-4">
        <article className="container mx-auto max-w-3xl prose prose-stone dark:prose-invert">
          <div className="not-prose mb-8">
            <Badge variant="outline" className="mb-4">
              Legal
            </Badge>
            <h1 className="text-3xl font-bold mb-2">Cookie Policy</h1>
            <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
          </div>

          <Separator className="my-8" />

          <section id="summary">
            <h2>1. Summary</h2>
            <p>
              <strong>AXIVAI does not set cookies.</strong> The website uses no analytics, advertising, social-media
              or other tracking technologies, and it does not build a profile of you. Because nothing non-essential is
              stored on your device, the site does not show a cookie consent banner.
            </p>
          </section>

          <section id="what-are-cookies">
            <h2>2. What Cookies Are</h2>
            <p>
              Cookies are small text files a website can store on your device. Similar technologies include browser
              local storage, pixels and device fingerprinting. AXIVAI uses none of them.
            </p>
          </section>

          <section id="what-we-process">
            <h2>3. What the Site Does Process</h2>
            <ul>
              <li>
                <strong>Server requests.</strong> Like any website, our hosting provider ({SITE.host}) receives your IP
                address and basic request details in order to deliver pages. See the{" "}
                <Link href="/privacy">Privacy Policy</Link> for how this is handled.
              </li>
              <li>
                <strong>Power-access gap reports.</strong> If you submit a report, we store a one-way hash of your IP
                address for up to {SITE.retention.ipHashDays} days to prevent abuse. This happens on our server, not in
                a cookie.
              </li>
              <li>
                <strong>Narration audio.</strong> Some research diagrams offer optional narration. The audio files load
                only when you press Listen, and nothing is stored on your device.
              </li>
            </ul>
          </section>

          <section id="third-parties">
            <h2>4. Third-Party Content</h2>
            <p>
              Research pages link to external sources, such as government reports and news articles. Those sites have
              their own cookie practices, which apply only once you follow a link to them. The AXIVAI site does not
              embed third-party scripts, videos or widgets.
            </p>
          </section>

          <section id="browser-controls">
            <h2>5. Your Browser Controls</h2>
            <p>
              You can block or delete cookies in your browser settings at any time. Doing so does not affect how this
              site works, because it does not rely on cookies. We also honour Global Privacy Control and Do Not Track
              signals, though there is no tracking for them to switch off.
            </p>
          </section>

          <section id="changes">
            <h2>6. Changes to This Policy</h2>
            <p>
              If we ever introduce analytics or any other non-essential cookies or similar technologies, we will update
              this policy first and ask for your consent before setting them where the law requires it. The &quot;Last
              Updated&quot; date above shows when this policy last changed.
            </p>
          </section>

          <section id="contact">
            <h2>7. Contact Us</h2>
            <p>If you have questions about this policy, please contact us:</p>
            <address className="not-italic">
              <strong>{SITE.entity}</strong>
              <br />
              Privacy Team
              <br />
              Email: <a href={`mailto:${SITE.email.privacy}`}>{SITE.email.privacy}</a>
            </address>
          </section>

          <Separator className="my-8" />

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

    </div>
  );
}
