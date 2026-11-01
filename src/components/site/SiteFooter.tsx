/**
 * Site-wide footer. Rendered once in src/app/layout.tsx, after every page.
 * Obsidian band: gold is used as text only on this dark background, where it passes contrast.
 */

import Image from "next/image";
import Link from "next/link";
import { PARTNERS, SITE } from "@/lib/site";

const COLUMNS: { title: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/#approach", label: "Approach" },
      { href: "/#applications", label: "Applications" },
      { href: "/off-grid-fleet-charging", label: "Off-grid fleet charging" },
      { href: "/electric-school-buses", label: "Electric school buses" },
      { href: "/research", label: "Research" },
      { href: "/report-a-gap", label: "Report a power gap" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "About AXIVAI" },
      { href: "/faq", label: "FAQ" },
      { href: "/about#people", label: "Founder and advisors" },
      { href: `mailto:${SITE.email.privacy}`, label: SITE.email.privacy, external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
      { href: "/accessibility", label: "Accessibility" },
      { href: "/ccpa", label: "CCPA Notice" },
      { href: "/ccpa#opt-out", label: "Do Not Sell or Share" },
      { href: "/privacy-request", label: "Privacy request" },
    ],
  },
];

const linkClass =
  "rounded-sm text-sm text-[#e8e4dc] transition-colors hover:text-[#d4a017] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1917]";

export function SiteFooter() {
  return (
    <footer className="bg-[#1c1917] text-[#e8e4dc] print:hidden">
      <div className="h-1 bg-[linear-gradient(90deg,#1c1917_0%,#7a5012_45%,#d4a017_80%,#edb02a_100%)]" aria-hidden="true" />
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[minmax(0,1.7fr)_repeat(3,minmax(0,1fr))] md:gap-12">
          <div className="col-span-2 max-w-sm md:col-span-1">
            <Link href="/" aria-label="AXIVAI home" className="inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1917]">
              <Image src="/brand/axivai-wordmark-reverse.svg" alt="AXIVAI" width={1864} height={330} className="h-7 w-auto" />
            </Link>
            <p className="mt-5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-[#d4a017] whitespace-nowrap">
              Power anywhere. Ready when needed.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#bdb6aa]">
              Deployable power for fleets and sites the grid can&apos;t serve yet: battery energy delivered by
              truck, stationed on site and managed around the clock.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={`Footer: ${col.title}`} className={col.title === "Legal" ? "col-span-2 md:col-span-1" : undefined}>
              <h2 className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a8a094]">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {l.external ? (
                      <a href={l.href} className={`${linkClass} break-all`}>
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className={linkClass}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#3d3833] pt-6 text-xs text-[#a8a094] md:flex-row md:items-center md:justify-between">
          <p>
            © 2025–2026 {SITE.entity}. All rights reserved. · Website by{" "}
            <a href={PARTNERS[1].url} target="_blank" rel="noopener" className="text-[#e8e4dc] underline decoration-[#d4a017] decoration-1 underline-offset-4 hover:text-[#d4a017]">
              {PARTNERS[1].name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
          <p>
            {PARTNERS.map((p, i) => (
              <span key={p.name}>
                {i === 0 ? "Founded and seed-funded by " : i === 1 ? " · Consultants " : " and "}
                <a href={p.url} target="_blank" rel="noopener" className="text-[#e8e4dc] underline decoration-[#d4a017] decoration-1 underline-offset-4 hover:text-[#d4a017]">
                  {p.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
