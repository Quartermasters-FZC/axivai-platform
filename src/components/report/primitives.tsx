/**
 * AXIVAI research report primitives.
 * Mirrors the design system components (DataTag, Notice, Metric) as server components.
 * Styles: src/app/research/report.css (scoped under .axr).
 */

import type { ReactNode } from "react";
import { Check, CircleHelp, Info, TriangleAlert } from "lucide-react";

export type Provenance = "verified" | "estimate" | "default" | "unknown" | "risk";

const PROVENANCE: Record<Provenance, { word: string; glyph: ReactNode }> = {
  verified: { word: "Verified", glyph: <Check className="w-3 h-3" aria-hidden="true" /> },
  estimate: { word: "Estimate", glyph: <span aria-hidden="true">≈</span> },
  default: { word: "Default", glyph: <span aria-hidden="true">◌</span> },
  unknown: { word: "Unknown", glyph: <CircleHelp className="w-3 h-3" aria-hidden="true" /> },
  risk: { word: "Risk", glyph: <TriangleAlert className="w-3 h-3" aria-hidden="true" /> },
};

/** Provenance chip. Never mark a value verified without a source. */
export function DataTag({ status, source }: { status: Provenance; source?: string }) {
  const { word, glyph } = PROVENANCE[status];
  return (
    <span className={`axr-tag axr-tag-${status}`} title={source}>
      {glyph}
      {word}
      {source && <span className="sr-only">. Source: {source}</span>}
    </span>
  );
}

export type EvidenceLevel = "established" | "feasible" | "hypothesis" | "validated";

const EVIDENCE: Record<EvidenceLevel, string> = {
  established: "Established",
  feasible: "Feasible",
  hypothesis: "Hypothesis",
  validated: "Validated",
};

/** Status chip (legacy; not used in report copy). */
export function Evidence({ level }: { level: EvidenceLevel }) {
  return (
    <span className={`axr-evidence axr-evidence-${level}`}>
      <span className="axr-evidence-dot" aria-hidden="true" />
      {EVIDENCE[level]}
    </span>
  );
}

export function Notice({
  tone = "assumption",
  title,
  children,
}: {
  tone?: "assumption" | "risk" | "info";
  title?: string;
  children: ReactNode;
}) {
  const Icon = tone === "risk" ? TriangleAlert : Info;
  return (
    <div className={`axr-notice axr-notice-${tone}`} role="note">
      <Icon className="axr-notice-icon w-4 h-4" aria-hidden="true" />
      <div>
        {title && <div className="axr-notice-title">{title}</div>}
        <div className="axr-notice-body">{children}</div>
      </div>
    </div>
  );
}

export function Metric({
  label,
  value,
  unit,
  status,
  source,
}: {
  label: string;
  value: string;
  unit?: string;
  status: Provenance;
  source: string;
}) {
  return (
    <figure className="axr-metric">
      <figcaption className="axr-metric-label">{label}</figcaption>
      <div className="axr-metric-value">
        {value}
        {unit && <span className="axr-metric-unit">{unit}</span>}
      </div>
      <div className="axr-metric-meta">
        <DataTag status={status} source={source} />
        <span className="axr-metric-source">{source}</span>
      </div>
    </figure>
  );
}

export type Tier = { spareKw: number; overnightKwh: number; dayKwh: number; verdict: string };

/**
 * Horizontal bars: energy available overnight and over 24 hours, against the daily need.
 * Two series validated with the dataviz palette checker (accent-ink, gold on cream);
 * gold is below 3:1, so every bar carries a visible value label and the tier table is the table view.
 */
export function TierChart({ tiers, needKwh, maxKwh }: { tiers: Tier[]; needKwh: number; maxKwh: number }) {
  const pct = (v: number) => `${(v / maxKwh) * 100}%`;
  const fmt = (v: number) => v.toLocaleString("en-US");
  const ticks = [0, 2000, 4000, 6000, 8000, 10000].filter((t) => t <= maxKwh);

  return (
    <figure className="axr-chart axr-card" aria-labelledby="tier-chart-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div id="tier-chart-title" className="axr-h2">
            Energy the site can supply versus what the fleet needs
          </div>
          <p className="axr-caption mt-1">
            Example depot, 40 buses. kWh per day at the grid connection. Hover or focus a bar for detail.
          </p>
        </div>
        <div className="axr-legend" aria-hidden="true">
          <span className="axr-legend-item">
            <span className="axr-swatch" style={{ background: "var(--accent-ink)" }} />
            Overnight, 12 hours
          </span>
          <span className="axr-legend-item">
            <span className="axr-swatch" style={{ background: "var(--gold)" }} />
            Full 24 hours, with a battery
          </span>
          <span className="axr-legend-item">
            <span className="axr-swatch axr-swatch-line" />
            Daily need
          </span>
        </div>
      </div>

      <div className="axr-chart-rows">
        {tiers.map((t, i) => (
          <div key={t.spareKw} className="axr-chart-row">
            <div className="axr-chart-label">
              {t.spareKw} kW
              <span>spare at site</span>
            </div>
            <div className="axr-plot">
              <div className="axr-need" style={{ left: pct(needKwh) }} aria-hidden="true">
                {i === 0 && <span className="axr-need-label">Need {fmt(needKwh)} kWh</span>}
              </div>
              {(
                [
                  ["overnight", t.overnightKwh, "Overnight (12 h)"],
                  ["day", t.dayKwh, "Full 24 h with a battery"],
                ] as const
              ).map(([key, v, name]) => (
                <div key={key} className="axr-bar-track">
                  <div
                    className={`axr-bar axr-bar-${key}`}
                    style={{ width: pct(Math.min(v, maxKwh)) }}
                    tabIndex={0}
                    role="img"
                    aria-label={`${t.spareKw} kW spare, ${name}: ${fmt(v)} kWh, ${Math.round((v / needKwh) * 100)}% of the ${fmt(needKwh)} kWh need`}
                  >
                    <span className="axr-bar-value" aria-hidden="true">
                      {fmt(v)}
                    </span>
                    <span className="axr-tip" aria-hidden="true">
                      <strong>{t.spareKw} kW spare · {name}</strong>
                      <br />
                      {fmt(v)} kWh available, {Math.round((v / needKwh) * 100)}% of the daily need.
                      <br />
                      {t.verdict}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="axr-axis" aria-hidden="true">
        <div />
        <div className="axr-axis-ticks">
          {ticks.map((t) => (
            <span key={t} style={{ left: pct(t) }}>
              {t === 0 ? "0" : `${t / 1000}K`}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="axr-caption mt-6">
        Need = 40 buses × 60 miles × 1.5 kWh/mile ÷ 90% charging efficiency. All figures are estimates; see
        the assumptions above and the table below.
      </figcaption>
    </figure>
  );
}
