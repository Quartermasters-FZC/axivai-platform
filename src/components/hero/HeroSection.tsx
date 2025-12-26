"use client";

/**
 * AXIVAI Hero Section Component
 * Cinematic split-screen design with scroll storytelling
 *
 * Design: Option A - Split-screen with Image 3 (bus + charger) as focal point
 * Color Schema: Matches AXIVAI brand (#D4A017 gold, #1C1917 dark, #FEFDFB light)
 */

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Floating stat card component
function StatCard({
  value,
  label,
  delay = 0
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn(
        "bg-card/90 backdrop-blur-sm border border-accent/20 rounded-lg px-4 py-3 shadow-lg",
        "transform transition-all duration-700 ease-out",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      )}
    >
      <div className="text-2xl md:text-3xl font-bold text-accent">{value}</div>
      <div className="text-xs md:text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

// Scroll indicator component
function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
      <span className="text-xs text-muted-foreground">Scroll to explore</span>
      <svg
        className="w-5 h-5 text-accent"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100vh] flex items-center overflow-hidden"
    >
      {/* Background Layer - US Map with network */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/HERO-Assets/1.png"
          alt=""
          fill
          className="object-cover object-center opacity-[0.04] dark:opacity-[0.08]"
          priority
          aria-hidden="true"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">

          {/* Left Column - Text Content */}
          <div
            className={cn(
              "space-y-6 md:space-y-8 text-center lg:text-left",
              "transform transition-all duration-1000 ease-out",
              mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}
          >
            <Badge
              variant="outline"
              className="border-accent/30 text-accent bg-accent/5"
            >
              Resilience Infrastructure Platform
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Electrify Your Fleet.
              <br />
              <span className="gradient-text">Bypass the Grid.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              AXIVAI delivers decision-grade intelligence for school bus
              electrification. Our mobile charging architecture bypasses utility
              interconnection queues—deploying in <strong className="text-foreground">weeks, not years</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20"
              >
                <Link href="/tco">Calculate Your TCO</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="#solutions">Explore Solutions</Link>
              </Button>
            </div>

            {/* Mobile Stats - Show below text on small screens */}
            <div className="flex flex-wrap justify-center lg:hidden gap-3 pt-4">
              <StatCard value="480K" label="School Buses" delay={300} />
              <StatCard value="$12B+" label="Annual Market" delay={500} />
              <StatCard value="13,263" label="Districts" delay={700} />
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div
            className={cn(
              "relative",
              "transform transition-all duration-1000 ease-out delay-300",
              mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}
          >
            {/* Main Image Container */}
            <div className="relative aspect-[4/3] lg:aspect-square max-w-2xl mx-auto">
              {/* Glow effect behind the image */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent rounded-3xl blur-3xl transform scale-110" />

              {/* Main Bus Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-accent/10">
                <Image
                  src="/images/HERO-Assets/3.png"
                  alt="Electric school bus with charging infrastructure - The industrial metamorphosis of student transportation"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />

                {/* Charging cable glow overlay */}
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-accent/30 via-accent/10 to-transparent pointer-events-none" />
              </div>

              {/* Floating Stats - Desktop only */}
              <div className="hidden lg:block absolute -bottom-4 -left-4 z-20">
                <StatCard value="480K" label="School Buses" delay={600} />
              </div>
              <div className="hidden lg:block absolute top-1/4 -right-4 z-20">
                <StatCard value="$12B+" label="Annual Market" delay={800} />
              </div>
              <div className="hidden lg:block absolute -top-4 left-1/4 z-20">
                <StatCard value="13,263" label="Districts" delay={1000} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}

// Story section for scroll reveal
export function StorySection({
  badge,
  title,
  description,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  children,
  className,
}: {
  badge?: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  children?: React.ReactNode;
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn("py-16 md:py-24 px-4", className)}
    >
      <div className="container mx-auto">
        <div className={cn(
          "grid lg:grid-cols-2 gap-8 lg:gap-16 items-center",
          imagePosition === "left" && "lg:grid-flow-dense"
        )}>
          {/* Text Content */}
          <div
            className={cn(
              "space-y-6 transform transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              imagePosition === "left" && "lg:col-start-2"
            )}
          >
            {badge && (
              <Badge variant="secondary" className="mb-2">
                {badge}
              </Badge>
            )}
            <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
            <p className="text-lg text-muted-foreground">{description}</p>
            {children}
          </div>

          {/* Image */}
          <div
            className={cn(
              "transform transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              imagePosition === "left" && "lg:col-start-1 lg:row-start-1"
            )}
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl border border-accent/10">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Timeline comparison component (for Image 5)
export function TimelineComparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 px-4 bg-muted/30"
    >
      <div className="container mx-auto max-w-5xl">
        <div
          className={cn(
            "text-center mb-12 transform transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Badge variant="secondary" className="mb-4">
            The Bottleneck
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Buses Arrive, But Power Does Not
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The single largest impediment to scaled deployment is not the bus,
            but the charging infrastructure.
          </p>
        </div>

        <div
          className={cn(
            "relative rounded-xl overflow-hidden shadow-xl border border-accent/10 bg-card",
            "transform transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Image
            src="/images/HERO-Assets/5.png"
            alt="Timeline comparison showing bus production takes 3-6 months while utility interconnection and upgrades take 18-36 months"
            width={1200}
            height={600}
            className="w-full h-auto"
          />
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6 max-w-3xl mx-auto">
          An EPA Inspector General report highlighted that hundreds of
          taxpayer-funded buses are sitting idle in parking lots, unable to charge.
          <strong className="text-accent"> AXIVAI eliminates this bottleneck.</strong>
        </p>
      </div>
    </section>
  );
}

// Platform services visual (for Image 6)
export function PlatformServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 px-4"
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <div
            className={cn(
              "transform transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl border border-accent/10 bg-card">
              <Image
                src="/images/HERO-Assets/6.png"
                alt="AXIVAI integrated platform showing concentric circles of services: Mobile Charging at the core, surrounded by Licensed Insurance Services, Carbon Credit Monetization, VPP/Energy Services, and Grant Facilitation Model"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Text Content */}
          <div
            className={cn(
              "space-y-6 transform transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}
          >
            <Badge variant="secondary">
              Complete Platform
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              More Than Charging Infrastructure
            </h2>
            <p className="text-lg text-muted-foreground">
              AXIVAI is a complete financial and operational partner for school
              districts. Our integrated platform unlocks multiple revenue streams
              while reducing total cost of ownership.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="space-y-1">
                <div className="font-semibold text-accent">Grant Facilitation</div>
                <p className="text-sm text-muted-foreground">
                  Pro bono grant application support
                </p>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-accent">VPP/Energy Services</div>
                <p className="text-sm text-muted-foreground">
                  $450–$1,850/vehicle annually
                </p>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-accent">Carbon Credits</div>
                <p className="text-sm text-muted-foreground">
                  $150–$500/vehicle from LCFS
                </p>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-accent">Insurance Services</div>
                <p className="text-sm text-muted-foreground">
                  15–25% fleet insurance reduction
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
