/**
 * AXIVAI Hero Section Component
 * Full-width concept rendering with tagline, positioning statement and the four customer outcomes.
 *
 * Copy source: docs/planning/AXIVAI_Improved_Concept_Paper_October_2026.md (§1, §3)
 * Brand rules: docs/planning/50_Design_System.md — rendered imagery carries a "Concept rendering" label.
 */

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Move, ShieldCheck, Timer } from "lucide-react";

const OUTCOMES = [
  {
    icon: Zap,
    title: "Availability",
    description:
      "Suitable electrical capacity reserved or furnished for a defined requirement.",
  },
  {
    icon: Move,
    title: "Flexibility",
    description:
      "Capacity sized, located, relocated and removed as operational needs change.",
  },
  {
    icon: ShieldCheck,
    title: "Resilience",
    description:
      "Specified loads sustained through defined disruptions, within duration and recharge limits.",
  },
  {
    icon: Timer,
    title: "Speed of deployment",
    description:
      "Temporary solutions in place sooner than permanent grid expansion, where approvals permit.",
  },
];

export function HeroSection() {
  return (
    <section className="relative flex flex-col">
      {/* Concept rendering */}
      <div className="container mx-auto px-4 pt-6 md:pt-10">
        <figure className="relative rounded-2xl overflow-hidden border border-border/50 shadow-xl bg-card">
          <Image
            src="/images/hero/axivai-hero.png"
            alt="Concept rendering. AXIVAI wordmark and the tagline “Power anywhere. Ready when needed.” above four outcomes: power availability, flexibility, resilience and speed of deployment. Below, a battery transport truck labelled mobile energy infrastructure stands between modular storage units at an energy hub and a row of electric school buses charging at sunrise, with mountains and a city skyline behind."
            width={1983}
            height={793}
            sizes="(min-width: 1536px) 1536px, 100vw"
            className="w-full h-auto"
            priority
          />
          <figcaption className="absolute bottom-3 right-3 rounded-md bg-primary/80 px-2.5 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm">
            Concept rendering
          </figcaption>
        </figure>
      </div>

      {/* Positioning */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Badge
            variant="outline"
            className="border-accent/40 text-accent-ink bg-accent/5 text-xs font-medium"
          >
            Concept stage · research and development
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15]">
            Power anywhere. Ready when needed.
          </h1>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            AXIVAI is a deployable power infrastructure concept. It seeks to make
            electrical capacity available when fixed infrastructure is too slow,
            too limited or too inflexible, through modular storage,
            mission-specific deployment and managed operations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              <Link href="#approach">See the approach</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto font-medium">
              <Link href="#applications">Explore applications</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Four customer outcomes */}
      <div className="border-y border-border/50 bg-card/50">
        <div className="container mx-auto px-4">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-border/50">
            {OUTCOMES.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-3 px-4 py-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent-ink" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{title}</div>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
