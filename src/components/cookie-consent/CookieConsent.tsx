"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CONSENT_KEY = "axivai_consent_v1";

type ConsentState = {
  necessary: true;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  updatedAt: string;
};

const defaultConsent: ConsentState = {
  necessary: true,
  analytics: false,
  functional: false,
  marketing: false,
  updatedAt: "",
};

function loadConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed === "object" && parsed.necessary === true) return parsed as ConsentState;
  } catch (err) {
    console.warn("Failed to parse consent", err);
  }
  return null;
}

function saveConsent(consent: ConsentState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  document.cookie = `axivai_consent=${encodeURIComponent(consent.updatedAt)}; Path=/; Max-Age=31536000; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent("axivai-consent-changed", { detail: consent }));
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState | null>(() => loadConsent());
  const [showBanner, setShowBanner] = useState(() => loadConsent() === null);
  const [showPrefs, setShowPrefs] = useState(false);
  const [draft, setDraft] = useState<ConsentState>(defaultConsent);

  const updateDraft = (key: keyof Omit<ConsentState, "necessary" | "updatedAt">, value: boolean) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const persist = (next: ConsentState) => {
    setConsent(next);
    saveConsent(next);
    setShowBanner(false);
    setShowPrefs(false);
  };

  const acceptAll = () => {
    const next = {
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
      updatedAt: new Date().toISOString(),
    } satisfies ConsentState;
    persist(next);
  };

  const rejectAll = () => {
    const next = {
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false,
      updatedAt: new Date().toISOString(),
    } satisfies ConsentState;
    persist(next);
  };

  const savePreferences = () => {
    const next = {
      ...draft,
      necessary: true,
      updatedAt: new Date().toISOString(),
    } satisfies ConsentState;
    persist(next);
  };

  const bannerVisible = useMemo(() => showBanner && !consent, [showBanner, consent]);

  if (!bannerVisible && !showPrefs) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        <Card className="bg-card/95 border border-border shadow-lg">
          <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div className="space-y-2">
                <p className="font-semibold">Cookies & Privacy</p>
                <p className="text-sm text-muted-foreground">
                  We use essential cookies to make this site work. With your permission, we also use analytics, functional, and marketing cookies to improve experience. You can change your choices anytime.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setDraft(consent ?? defaultConsent);
                    setShowPrefs(true);
                    setShowBanner(true);
                  }}
                >
                  Manage preferences
                </Button>
                <Button variant="secondary" size="sm" onClick={rejectAll}>
                  Reject non-essential
                </Button>
                <Button size="sm" onClick={acceptAll}>
                  Accept all
                </Button>
              </div>
            </div>

            {showPrefs && (
              <div className="rounded-md border border-border bg-muted/30 p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">Strictly necessary</p>
                    <p className="text-sm text-muted-foreground">Always on. Needed for security, consent storage, and core functionality.</p>
                  </div>
                  <BadgePill>Always on</BadgePill>
                </div>

                <ConsentRow
                  label="Performance & analytics"
                  description="Helps us understand site usage to improve features."
                  checked={draft.analytics}
                  onChange={(v) => updateDraft("analytics", v)}
                />
                <ConsentRow
                  label="Functional"
                  description="Remembers preferences like saved inputs or view modes."
                  checked={draft.functional}
                  onChange={(v) => updateDraft("functional", v)}
                />
                <ConsentRow
                  label="Marketing"
                  description="Allows personalized or retargeting content if enabled."
                  checked={draft.marketing}
                  onChange={(v) => updateDraft("marketing", v)}
                />

                <div className="flex flex-wrap gap-2 justify-end pt-2">
                  <Button variant="outline" size="sm" onClick={() => setShowPrefs(false)}>
                    Cancel
                  </Button>
                  <Button variant="secondary" size="sm" onClick={rejectAll}>
                    Reject non-essential
                  </Button>
                  <Button size="sm" onClick={savePreferences}>
                    Save preferences
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ConsentRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void; }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button
        variant={checked ? "secondary" : "outline"}
        size="sm"
        onClick={() => onChange(!checked)}
        className="min-w-[96px]"
      >
        {checked ? "Enabled" : "Disabled"}
      </Button>
    </div>
  );
}

function BadgePill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium",
        "bg-accent/10 text-accent-foreground"
      )}
    >
      {children}
    </span>
  );
}
