/**
 * Animated five-step approach diagram for the homepage (landscape, with a portrait variant for phones).
 * Decorative here: the step list beside it in the page carries the content for screen readers.
 */

import { AnimatedSvg } from "@/components/diagram/AnimatedSvg";
import { diagramVariants } from "@/components/diagram/variants";

export function ApproachDiagram() {
  const { landscape, portrait } = diagramVariants("images/overview", "axivai-approach");
  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <AnimatedSvg landscape={landscape} portrait={portrait} label="AXIVAI approach" decorative />
    </div>
  );
}
