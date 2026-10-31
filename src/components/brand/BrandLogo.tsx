import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * AXIVAI wordmark
 * Source: public/brand/axivai-wordmark.png (master), cropped for UI use.
 * Replace with the SVG wordmark from the design system when available.
 */
export function BrandLogo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/axivai-wordmark-cropped.png"
      alt="AXIVAI"
      width={1760}
      height={330}
      priority={priority}
      className={cn("h-6 w-auto", className)}
    />
  );
}
