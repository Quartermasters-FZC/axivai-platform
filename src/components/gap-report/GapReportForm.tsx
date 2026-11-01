"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  APPLICATIONS,
  DURATIONS,
  ORGANIZATION_TYPES,
  PROBLEM_TYPES,
  US_STATES,
  UTILITY_DELAYS,
  gapReportSchema,
  type GapReportInput,
} from "@/lib/gap-report";
import { cn } from "@/lib/utils";

type FormState = {
  [K in keyof GapReportInput]-?: K extends "followUpConsent" ? boolean : string;
};

type FieldErrors = Partial<Record<keyof FormState, string[]>>;

const initialState: FormState = {
  organizationType: "",
  organizationName: "",
  role: "",
  state: "",
  city: "",
  problemType: "",
  application: "",
  description: "",
  peakKw: "",
  dailyKwh: "",
  durationNeeded: "",
  utilityDelay: "",
  currentApproach: "",
  costOfDelay: "",
  contactName: "",
  email: "",
  followUpConsent: false,
  website: "",
};

function toPayload(form: FormState) {
  // Empty strings become undefined so optional enums validate.
  return Object.fromEntries(
    Object.entries(form).map(([k, v]) => [k, v === "" ? undefined : v])
  );
}

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="text-sm text-destructive">
      {errors[0]}
    </p>
  );
}

function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border bg-card p-5 md:p-6">
      <fieldset className="space-y-5">
        <legend className="font-display text-lg font-semibold">{title}</legend>
        {description && <p className="text-sm text-muted-foreground -mt-4">{description}</p>}
        {children}
      </fieldset>
    </div>
  );
}

export function GapReportForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const describedBy = (key: keyof FormState, hint?: string) =>
    [hint, errors[key] ? `${key}-error` : undefined].filter(Boolean).join(" ") || undefined;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(undefined);

    const payload = toPayload(form);
    const check = gapReportSchema.safeParse(payload);
    if (!check.success) {
      setErrors(check.error.flatten().fieldErrors as FieldErrors);
      setFormError("Please check the highlighted fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/gap-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setFormError(data.error || "We couldn't save your report just now. Please try again later.");
        return;
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setFormError("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <Card role="status">
        <CardHeader className="text-center">
          <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-accent-ink" aria-hidden="true" />
          <CardTitle className="text-2xl">Thank you. Your report is in.</CardTitle>
          <CardDescription className="text-base">
            It goes into AXIVAI&apos;s problem-mapping research.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <ul className="space-y-2 list-disc pl-5">
            <li>We review each report to understand where, when and why power access falls short.</li>
            <li>
              {form.followUpConsent
                ? "You agreed to follow-up, so we may email you with questions about this report."
                : "You didn't ask for follow-up, so we won't contact you."}
            </li>
            <li>AXIVAI isn&apos;t selling anything, and submitting creates no commitment on either side.</li>
          </ul>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Button
              variant="outline"
              onClick={() => {
                setForm(initialState);
                setSubmitted(false);
              }}
            >
              Report another site
            </Button>
            <Button asChild>
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <Section title="The problem" description="What's happening, in your own words.">
        <div className="space-y-3">
          <Label id="problemType-label" className="text-sm font-medium">
            Which fits best? *
          </Label>
          <div
            role="radiogroup"
            aria-labelledby="problemType-label"
            aria-describedby={describedBy("problemType")}
            className="grid gap-3 sm:grid-cols-2"
          >
            {PROBLEM_TYPES.map((p) => (
              <label
                key={p.value}
                className={cn(
                  "flex cursor-pointer gap-3 rounded-lg border bg-background p-3 text-sm transition-colors hover:border-accent",
                  form.problemType === p.value && "border-accent bg-accent/5"
                )}
              >
                <input
                  type="radio"
                  name="problemType"
                  value={p.value}
                  checked={form.problemType === p.value}
                  onChange={() => update("problemType", p.value)}
                  className="mt-1 accent-[var(--accent-ink)]"
                />
                <span>
                  <span className="block font-medium">{p.label}</span>
                  <span className="text-muted-foreground">{p.description}</span>
                </span>
              </label>
            ))}
          </div>
          <FieldError id="problemType-error" errors={errors.problemType} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="application">What is the power for? *</Label>
          <Select value={form.application} onValueChange={(v) => update("application", v)}>
            <SelectTrigger
              id="application"
              aria-invalid={!!errors.application}
              aria-describedby={describedBy("application")}
            >
              <SelectValue placeholder="Choose one" />
            </SelectTrigger>
            <SelectContent>
              {APPLICATIONS.map((a) => (
                <SelectItem key={a} value={a}>
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError id="application-error" errors={errors.application} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Describe the situation *</Label>
          <Textarea
            id="description"
            rows={5}
            maxLength={3000}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            aria-invalid={!!errors.description}
            aria-describedby={describedBy("description", "description-hint")}
            placeholder="For example: 40 electric buses arrive in August. The utility says the transformer upgrade takes 18 months. We can charge 10 buses today."
          />
          <p id="description-hint" className="text-xs text-muted-foreground">
            Please don&apos;t include anyone else&apos;s personal details.
          </p>
          <FieldError id="description-error" errors={errors.description} />
        </div>
      </Section>

      <Section
        title="The need"
        description="Rough numbers help most. Leave anything blank if you don't know; that's useful to know too."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="peakKw">Peak power needed (kW)</Label>
            <Input
              id="peakKw"
              inputMode="numeric"
              value={form.peakKw}
              onChange={(e) => update("peakKw", e.target.value.replace(/[^\d]/g, ""))}
              aria-invalid={!!errors.peakKw}
              aria-describedby={describedBy("peakKw", "peakKw-hint")}
              placeholder="e.g. 800"
            />
            <p id="peakKw-hint" className="text-xs text-muted-foreground">
              The most power drawn at once.
            </p>
            <FieldError id="peakKw-error" errors={errors.peakKw} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dailyKwh">Energy needed per day (kWh)</Label>
            <Input
              id="dailyKwh"
              inputMode="numeric"
              value={form.dailyKwh}
              onChange={(e) => update("dailyKwh", e.target.value.replace(/[^\d]/g, ""))}
              aria-invalid={!!errors.dailyKwh}
              aria-describedby={describedBy("dailyKwh", "dailyKwh-hint")}
              placeholder="e.g. 4000"
            />
            <p id="dailyKwh-hint" className="text-xs text-muted-foreground">
              Total energy used over a typical day.
            </p>
            <FieldError id="dailyKwh-error" errors={errors.dailyKwh} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="durationNeeded">How long is the need?</Label>
            <Select value={form.durationNeeded} onValueChange={(v) => update("durationNeeded", v)}>
              <SelectTrigger id="durationNeeded">
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>
              <SelectContent>
                {DURATIONS.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="utilityDelay">Utility upgrade wait</Label>
            <Select value={form.utilityDelay} onValueChange={(v) => update("utilityDelay", v)}>
              <SelectTrigger id="utilityDelay">
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>
              <SelectContent>
                {UTILITY_DELAYS.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentApproach">What are you doing about it now?</Label>
          <Textarea
            id="currentApproach"
            rows={3}
            maxLength={2000}
            value={form.currentApproach}
            onChange={(e) => update("currentApproach", e.target.value)}
            placeholder="For example: staggered charging, renting diesel generators, delaying the rollout."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="costOfDelay">What does the delay or shortfall cost you?</Label>
          <Textarea
            id="costOfDelay"
            rows={3}
            maxLength={2000}
            value={form.costOfDelay}
            onChange={(e) => update("costOfDelay", e.target.value)}
            aria-describedby="costOfDelay-hint"
            placeholder="Money, missed deadlines, grant timelines, downtime: whatever applies."
          />
          <p id="costOfDelay-hint" className="text-xs text-muted-foreground">
            This helps test whether available power is worth more than the electricity itself.
          </p>
        </div>
      </Section>

      <Section title="Where and who">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="state">State or territory *</Label>
            <Select value={form.state} onValueChange={(v) => update("state", v)}>
              <SelectTrigger
                id="state"
                aria-invalid={!!errors.state}
                aria-describedby={describedBy("state")}
              >
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>
              <SelectContent>
                {US_STATES.map(([code, name]) => (
                  <SelectItem key={code} value={code}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError id="state-error" errors={errors.state} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City or county</Label>
            <Input
              id="city"
              maxLength={120}
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="organizationType">Type of organization *</Label>
            <Select value={form.organizationType} onValueChange={(v) => update("organizationType", v)}>
              <SelectTrigger
                id="organizationType"
                aria-invalid={!!errors.organizationType}
                aria-describedby={describedBy("organizationType")}
              >
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>
              <SelectContent>
                {ORGANIZATION_TYPES.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError id="organizationType-error" errors={errors.organizationType} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="organizationName">Organization name</Label>
            <Input
              id="organizationName"
              maxLength={200}
              autoComplete="organization"
              value={form.organizationName}
              onChange={(e) => update("organizationName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Your role</Label>
            <Input
              id="role"
              maxLength={120}
              autoComplete="organization-title"
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
              placeholder="e.g. Transportation director"
            />
          </div>
        </div>
      </Section>

      <Section
        title="Follow-up (optional)"
        description="Only if you're happy for us to ask questions about this report. Contact details are saved only when you tick the box."
      >
        <div className="flex items-start gap-3">
          <Checkbox
            id="followUpConsent"
            checked={form.followUpConsent}
            onCheckedChange={(v) => update("followUpConsent", v === true)}
          />
          <Label htmlFor="followUpConsent" className="text-sm font-normal leading-snug">
            AXIVAI may email me about this report. I can ask for my details to be deleted at any time.
          </Label>
        </div>
        {form.followUpConsent && (
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contactName">Name</Label>
              <Input
                id="contactName"
                maxLength={120}
                autoComplete="name"
                value={form.contactName}
                onChange={(e) => update("contactName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                maxLength={254}
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={describedBy("email")}
              />
              <FieldError id="email-error" errors={errors.email} />
            </div>
          </div>
        )}
      </Section>

      <div className="space-y-3">
        {formError && (
          <p role="alert" className="text-sm text-destructive">
            {formError}
          </p>
        )}
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
        >
          {submitting ? "Sending…" : "Send report"}
        </Button>
        <p className="text-xs text-muted-foreground">
          By sending, you agree that AXIVAI may use this report for research. See the{" "}
          <Link href="/privacy" className="underline hover:text-foreground">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
