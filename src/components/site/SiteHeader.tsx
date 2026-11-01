"use client";

/**
 * Site-wide header. Rendered once in src/app/layout.tsx.
 * Brand rules: docs/planning/50_Design_System.md — gold is a fill, never text on light;
 * active and hover states use ink with a gold underline.
 */

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home", exact: true },
  { href: "/#approach", label: "Approach" },
  { href: "/#applications", label: "Applications" },
  { href: "/research", label: "Research", match: "/research" },
] as const;

const CTA = { href: "/report-a-gap", label: "Report a power gap" };

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu after navigating, and on Escape.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset UI state on route change
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (link: (typeof NAV_LINKS)[number]) =>
    "exact" in link ? pathname === link.href : "match" in link && pathname.startsWith(link.match);
  const ctaActive = pathname.startsWith(CTA.href);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e4dc] bg-[#fefdfb]/90 backdrop-blur-md print:hidden">
      <div className="container mx-auto flex h-16 items-center justify-between gap-6 px-4">
        <Link
          href="/"
          aria-label="AXIVAI home"
          className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6914] focus-visible:ring-offset-2"
        >
          <Image src="/brand/axivai-wordmark.svg" alt="AXIVAI" width={1864} height={330} priority className="h-6 w-auto" />
        </Link>

        {/* Desktop */}
        <nav aria-label="Main" className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-sm font-medium transition-colors rounded-sm",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6914] focus-visible:ring-offset-2",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-[#d4a017] after:transition-transform after:origin-left",
                      active
                        ? "text-[#1c1917] after:scale-x-100"
                        : "text-[#57534e] hover:text-[#1c1917] after:scale-x-0 hover:after:scale-x-100"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <CtaButton active={ctaActive} />
        </nav>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="md:hidden -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-[#1c1917] hover:bg-[#f6f3ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6914]"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      <nav
        id={menuId}
        aria-label="Main"
        hidden={!open}
        className="md:hidden border-t border-[#e8e4dc] bg-[#fefdfb]"
      >
        <ul className="container mx-auto px-4 py-2">
          {NAV_LINKS.map((link) => {
            const active = isActive(link);
            return (
              <li key={link.href} className="border-b border-[#e8e4dc] last:border-b-0">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex min-h-12 items-center justify-between text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6914]",
                    active ? "text-[#1c1917]" : "text-[#57534e]"
                  )}
                >
                  {link.label}
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-[#d4a017]" aria-hidden="true" />}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="container mx-auto px-4 pb-5 pt-1">
          <CtaButton active={ctaActive} block onClick={() => setOpen(false)} />
        </div>
      </nav>
    </header>
  );
}

function CtaButton({ active, block, onClick }: { active: boolean; block?: boolean; onClick?: () => void }) {
  return (
    <Link
      href={CTA.href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded px-5 font-display text-[12px] font-semibold uppercase tracking-[0.14em]",
        "border border-[#8b6914] bg-[#d4a017] text-[#1c1917] transition-colors hover:bg-[#e2ae25]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6914] focus-visible:ring-offset-2",
        block && "h-11 w-full"
      )}
    >
      {CTA.label}
    </Link>
  );
}
