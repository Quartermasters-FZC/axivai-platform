/**
 * Report figure: an animated diagram from public/images/research/<file>, with a caption.
 * A `<name>-portrait.svg` beside it, or a phone video (see diagramVariants), is used automatically on phones.
 * With `headline`, the caption reads image first, then headline, then standfirst (`caption`) and small print (`note`).
 */

import { AnimatedSvg } from "@/components/diagram/AnimatedSvg";
import { diagramVariants } from "@/components/diagram/variants";

export function ReportDiagram({
  file,
  caption,
  headline,
  note,
}: {
  file: string;
  caption?: string;
  headline?: string;
  note?: string;
}) {
  const { landscape, portrait, portraitVideo } = diagramVariants("images/research", file.replace(/\.svg$/, ""));
  const label = [headline, caption].filter(Boolean).join(": ") || "Diagram";
  return (
    <figure className="axr-card" style={{ padding: 0, overflow: "hidden" }}>
      <AnimatedSvg landscape={landscape} portrait={portrait} portraitVideo={portraitVideo} label={label} />
      {headline ? (
        <figcaption className="border-t px-5 py-5 md:px-6" style={{ borderColor: "var(--line)" }}>
          <p className="axr-h2">{headline}</p>
          {caption && <p className="axr-lead mt-2">{caption}</p>}
          {note && <p className="axr-caption mt-3">{note}</p>}
        </figcaption>
      ) : (
        caption && (
          <figcaption className="border-t px-4 py-3 axr-caption" style={{ borderColor: "var(--line)" }}>
            {caption}
            {note && <> {note}</>}
          </figcaption>
        )
      )}
    </figure>
  );
}
