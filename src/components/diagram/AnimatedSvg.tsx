"use client";

/**
 * Plays an animated SVG diagram from /public, inlined so its text uses the site fonts.
 * - Loads only the variant that fits: portrait below 768 px when one exists, landscape otherwise.
 * - Starts from the beginning when it scrolls into view and pauses when it leaves.
 * - Pause/play button (WCAG 2.2.2). Hidden, with the animation stopped, for reduced motion,
 *   where the SVG shows its own static layer.
 * - Chapter buttons when the SVG declares data-chapters='[{"t":0.5,"label":"…"}]' and data-duration.
 * - Optional narration: when chapters carry "audio" and the first file exists, a Listen button plays
 *   one clip per chapter. The voice leads: the animation holds at a chapter boundary until its clip
 *   ends, then moves on. Never autoplays; the on-screen captions are the transcript.
 * - Optional phone video: below 768 px a `portraitVideo` (with its own narration) replaces the SVG.
 *   Never autoplays; its on-screen captions are the transcript.
 * Only use with SVGs checked into this repo: the markup is inserted as-is.
 */

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = { src: string; width: number; height: number };
type Chapter = { t: number; label: string; audio?: string };
type Video = { src: string; poster?: string; width: number; height: number };

export function AnimatedSvg({
  landscape,
  portrait,
  portraitVideo,
  label,
  decorative = false,
  className,
}: {
  landscape: Variant;
  portrait?: Variant;
  portraitVideo?: Video;
  /** Accessible name for the controls (and the no-JS fallback image). */
  label: string;
  /** Hide the SVG from assistive tech when the page already carries its content as text. */
  decorative?: boolean;
  className?: string;
}) {
  const prefix = `svg${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const hostRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);
  const visibleRef = useRef(false);
  const userPausedRef = useRef(false);
  const narratingRef = useRef(false);
  const clipRef = useRef(-1);
  const holdRef = useRef(false);
  const [narrow, setNarrow] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [active, setActive] = useState(-1);
  const [hasAudio, setHasAudio] = useState(false);
  const [narrating, setNarrating] = useState(false);
  const durationRef = useRef(0);
  const playNextRef = useRef<(k: number) => void>(() => undefined);

  const variant = portrait && narrow ? portrait : landscape;
  const useVideo = narrow && !!portraitVideo;

  // Track viewport width and motion preference.
  useEffect(() => {
    const mqNarrow = window.matchMedia("(max-width: 767px)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setNarrow(mqNarrow.matches);
      setReduced(mqReduce.matches);
    };
    sync();
    mqNarrow.addEventListener("change", sync);
    mqReduce.addEventListener("change", sync);
    return () => {
      mqNarrow.removeEventListener("change", sync);
      mqReduce.removeEventListener("change", sync);
    };
  }, []);

  const apply = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const running = visibleRef.current && !userPausedRef.current;
    const shouldRun = running && !reduced && !holdRef.current;
    if (shouldRun) {
      if (!startedRef.current) {
        svg.setCurrentTime(0);
        startedRef.current = true;
      }
      svg.unpauseAnimations();
    } else {
      svg.pauseAnimations();
    }
    const audio = audioRef.current;
    if (audio && narratingRef.current) {
      if (running && audio.paused && !audio.ended) void audio.play().catch(() => undefined);
      if (!running && !audio.paused) audio.pause();
    }
  }, [reduced]);

  // Load the chosen variant.
  useEffect(() => {
    if (useVideo) return;
    let cancelled = false;
    fetch(variant.src)
      .then((r) => r.text())
      .then((raw) => {
        const host = hostRef.current;
        if (cancelled || !host) return;
        let markup = raw
          .replace(/<\?xml[^>]*>\s*/, "")
          // Namespace ids so diagrams can't collide on one page.
          .replace(/\bid="([^"]+)"/g, `id="${prefix}-$1"`)
          .replace(/href="#([^"]+)"/g, `href="#${prefix}-$1"`)
          .replace(/aria-labelledby="([^"]+)"/, (_, ids: string) =>
            `aria-labelledby="${ids.split(/\s+/).map((id) => `${prefix}-${id}`).join(" ")}"`
          );
        if (decorative) {
          markup = markup.replace(/ role="img" aria-labelledby="[^"]*"/, ' aria-hidden="true" focusable="false"');
        }
        host.innerHTML = markup;
        const svg = host.querySelector("svg");
        svgRef.current = svg;
        startedRef.current = false;
        let parsed: Chapter[] = [];
        try {
          parsed = JSON.parse(svg?.getAttribute("data-chapters") ?? "[]");
        } catch {
          parsed = [];
        }
        setChapters(parsed);
        durationRef.current = Number(svg?.getAttribute("data-duration") ?? 0);
        // Offer narration only if the audio has actually been published.
        const first = parsed[0]?.audio;
        if (first) {
          fetch(first, { method: "HEAD" })
            .then((r) => !cancelled && setHasAudio(r.ok))
            .catch(() => setHasAudio(false));
        }
        svg?.pauseAnimations();
        setReady(true);
        apply();
      })
      .catch(() => setReady(false));
    return () => {
      cancelled = true;
    };
  }, [variant.src, prefix, decorative, apply, useVideo]);

  // Run only while on screen.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        apply();
      },
      { threshold: 0.25 }
    );
    io.observe(host);
    return () => io.disconnect();
  }, [apply, useVideo]);

  useEffect(apply, [apply, reduced]);

  // Highlight the chapter playing; while narrating, hold at the next chapter until the clip ends.
  useEffect(() => {
    if (!chapters.length) return;
    const id = window.setInterval(() => {
      const svg = svgRef.current;
      const dur = durationRef.current;
      if (!svg || !dur) return;
      const t = svg.getCurrentTime() % dur;
      let i = -1;
      chapters.forEach((c, k) => {
        if (t >= c.t) i = k;
      });
      if (narratingRef.current) {
        const next = chapters[clipRef.current + 1];
        const audio = audioRef.current;
        if (next && audio && !audio.ended && t >= next.t - 0.15 && !holdRef.current) {
          holdRef.current = true;
          apply();
        }
        setActive(clipRef.current);
      } else if (!reduced) {
        setActive(i);
      }
    }, 150);
    return () => window.clearInterval(id);
  }, [chapters, reduced, apply]);

  const playClip = useCallback(
    (k: number) => {
      const svg = svgRef.current;
      const c = chapters[k];
      if (!svg || !c?.audio) return;
      clipRef.current = k;
      holdRef.current = false;
      svg.setCurrentTime(c.t + 0.05);
      startedRef.current = true;
      setActive(k);
      if (!audioRef.current) audioRef.current = new Audio();
      const audio = audioRef.current;
      audio.onended = () => {
        if (!narratingRef.current) return;
        if (k + 1 < chapters.length) {
          playNextRef.current(k + 1);
        } else {
          // Last clip done: let the animation finish its loop silently.
          narratingRef.current = false;
          setNarrating(false);
          holdRef.current = false;
          apply();
        }
      };
      audio.src = c.audio;
      apply();
      void audio.play().catch(() => undefined);
    },
    [chapters, apply]
  );

  useEffect(() => {
    playNextRef.current = playClip;
  }, [playClip]);

  const stopNarration = useCallback(() => {
    narratingRef.current = false;
    setNarrating(false);
    holdRef.current = false;
    audioRef.current?.pause();
    apply();
  }, [apply]);

  useEffect(() => () => audioRef.current?.pause(), []);

  const toggleNarration = () => {
    if (narratingRef.current) {
      stopNarration();
      return;
    }
    narratingRef.current = true;
    setNarrating(true);
    userPausedRef.current = false;
    setPaused(false);
    playClip(0);
  };

  const jump = (k: number) => {
    if (narratingRef.current) {
      playClip(k);
      return;
    }
    const svg = svgRef.current;
    if (!svg) return;
    svg.setCurrentTime(chapters[k].t + 0.05);
    startedRef.current = true;
    setActive(k);
    apply();
  };

  const toggle = () => {
    userPausedRef.current = !userPausedRef.current;
    setPaused(userPausedRef.current);
    apply();
  };

  const controlsVisible = ready && (!reduced || hasAudio);

  if (useVideo && portraitVideo) {
    return (
      <div className={className}>
        <video
          controls
          playsInline
          preload="metadata"
          poster={portraitVideo.poster}
          width={portraitVideo.width}
          height={portraitVideo.height}
          aria-label={label}
          className="block h-auto w-full"
        >
          <source src={portraitVideo.src} type="video/mp4" />
        </video>
        <p className="border-t border-[#e8e4dc] px-3 py-2 text-[11px] leading-4 text-[#57534e]">
          Narration: AI-generated voice. The captions in the video are the full transcript.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("svg-site-fonts", className)}>
      <div ref={hostRef} style={{ aspectRatio: `${variant.width} / ${variant.height}` }} />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={landscape.src} alt={label} width={landscape.width} height={landscape.height} />
      </noscript>
      {controlsVisible && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e8e4dc] px-3 py-2">
          {chapters.length > 0 && (!reduced || narrating) ? (
            <div className="flex flex-wrap items-center gap-1" role="group" aria-label={`Chapters: ${label}`}>
              {chapters.map((c, k) => (
                <button
                  key={c.t}
                  type="button"
                  onClick={() => jump(k)}
                  aria-label={`Chapter ${k + 1}: ${c.label}`}
                  aria-current={active === k ? "step" : undefined}
                  title={c.label}
                  className={cn(
                    "inline-flex h-11 min-w-11 items-center justify-center rounded-full border text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6914] focus-visible:ring-offset-2",
                    active === k
                      ? "border-[#8b6914] bg-[#d4a017] text-[#1c1917]"
                      : "border-[#e8e4dc] bg-[#fefdfb] text-[#57534e] hover:bg-[#f6f3ed]"
                  )}
                >
                  {k + 1}
                </button>
              ))}
            </div>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-2">
            {hasAudio && (
              <button
                type="button"
                onClick={toggleNarration}
                aria-pressed={narrating}
                className={cn(
                  "inline-flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full border px-3 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6914] focus-visible:ring-offset-2",
                  narrating
                    ? "border-[#8b6914] bg-[#d4a017] text-[#1c1917]"
                    : "border-[#e8e4dc] bg-[#fefdfb] text-[#1c1917] hover:bg-[#f6f3ed]"
                )}
              >
                {narrating ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
                <span>{narrating ? "Stop narration" : "Listen"}</span>
                <span className="sr-only"> to the narration: {label}</span>
              </button>
            )}
            {!reduced && (
              <button
                type="button"
                onClick={toggle}
                aria-pressed={paused}
                className="inline-flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full border border-[#e8e4dc] bg-[#fefdfb] px-3 text-xs font-medium text-[#1c1917] hover:bg-[#f6f3ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6914] focus-visible:ring-offset-2"
              >
                {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
                <span>{paused ? "Play" : "Pause"}</span>
                <span className="sr-only"> animation: {label}</span>
              </button>
            )}
          </div>
          {hasAudio && (
            <p className="basis-full text-[11px] leading-4 text-[#57534e]">
              Narration: AI-generated voice. The captions in the diagram are the full transcript.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
