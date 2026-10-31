/**
 * Power-access gap report: options and validation shared by the form and the API.
 * Feeds Stage I problem mapping (concept paper §10, priority question 3).
 * Keep enum values in sync with prisma/schema.prisma.
 */

import { z } from "zod";

export const ORGANIZATION_TYPES = [
  { value: "SCHOOL_DISTRICT", label: "School district or student transportation" },
  { value: "FLEET_OPERATOR", label: "Commercial fleet or depot operator" },
  { value: "CONSTRUCTION", label: "Construction or temporary site" },
  { value: "INDUSTRIAL", label: "Industrial facility" },
  { value: "PORT_LOGISTICS", label: "Port, logistics yard or warehouse" },
  { value: "UTILITY", label: "Utility" },
  { value: "GOVERNMENT", label: "Government or defense" },
  { value: "EMERGENCY_MANAGEMENT", label: "Emergency management or disaster recovery" },
  { value: "CONSULTANT", label: "Consultant, engineer or researcher" },
  { value: "OTHER", label: "Other" },
] as const;

export const PROBLEM_TYPES = [
  {
    value: "CONNECTION_DELAY",
    label: "Connection delay",
    description: "We're ready, but a transformer, feeder or service upgrade isn't.",
  },
  {
    value: "PEAK_CAPACITY",
    label: "Peak-capacity mismatch",
    description: "We have enough energy over the day, but not enough kW at peak.",
  },
  {
    value: "TEMPORARY_DEMAND",
    label: "Temporary or relocatable demand",
    description: "We need power for a limited period or at a site that moves.",
  },
  {
    value: "RESILIENCE_GAP",
    label: "Resilience gap",
    description: "A critical load needs to keep running through outages.",
  },
  {
    value: "REMOTE_LOAD",
    label: "Remote or dispersed load",
    description: "We need power at one or more sites without an adequate connection.",
  },
  {
    value: "NOT_SURE",
    label: "Not sure",
    description: "We know there's a power problem but haven't pinned down which kind.",
  },
] as const;

export const APPLICATIONS = [
  "Electric school buses",
  "Commercial fleet charging",
  "Construction site power",
  "Temporary industrial power",
  "Port or yard equipment",
  "Utility support",
  "Backup for critical facilities",
  "Disaster recovery",
  "Government or defense",
  "Events",
  "Other",
] as const;

export const DURATIONS = [
  { value: "DAYS", label: "Days" },
  { value: "WEEKS", label: "Weeks" },
  { value: "MONTHS", label: "Months" },
  { value: "ONE_TO_TWO_YEARS", label: "1–2 years" },
  { value: "MORE_THAN_TWO_YEARS", label: "More than 2 years" },
  { value: "UNKNOWN", label: "Not sure" },
] as const;

export const UTILITY_DELAYS = [
  { value: "NONE", label: "No utility upgrade involved" },
  { value: "UNDER_6_MONTHS", label: "Under 6 months" },
  { value: "SIX_TO_12_MONTHS", label: "6–12 months" },
  { value: "ONE_TO_2_YEARS", label: "1–2 years" },
  { value: "MORE_THAN_2_YEARS", label: "More than 2 years" },
  { value: "UNKNOWN", label: "Not sure" },
] as const;

export const US_STATES = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"],
  ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"],
  ["DC", "District of Columbia"], ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"],
  ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"],
  ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"],
  ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"],
  ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"],
  ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"],
  ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"],
  ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"], ["PR", "Puerto Rico"],
  ["RI", "Rhode Island"], ["SC", "South Carolina"], ["SD", "South Dakota"], ["TN", "Tennessee"],
  ["TX", "Texas"], ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"],
  ["WA", "Washington"], ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
  ["GU", "Guam"], ["VI", "U.S. Virgin Islands"], ["AS", "American Samoa"], ["MP", "Northern Mariana Islands"],
] as const;

const values = <T extends readonly { value: string }[]>(list: T) =>
  list.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().transform((v) => (v ? v : undefined));

// Blank number fields mean "unknown", which is a valid answer.
const optionalWholeNumber = (max: number) =>
  z
    .union([z.number(), z.string()])
    .optional()
    .transform((v, ctx) => {
      if (v === undefined || v === "") return undefined;
      const n = typeof v === "number" ? v : Number(v);
      if (!Number.isInteger(n) || n < 0 || n > max) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Enter a whole number from 0 to ${max.toLocaleString()}, or leave blank.` });
        return z.NEVER;
      }
      return n;
    });

export const gapReportSchema = z
  .object({
    organizationType: z.enum(values(ORGANIZATION_TYPES), {
      errorMap: () => ({ message: "Choose the option closest to your organization." }),
    }),
    organizationName: optionalText(200),
    role: optionalText(120),

    state: z.enum(US_STATES.map(([code]) => code) as [string, ...string[]], {
      errorMap: () => ({ message: "Choose a state or territory." }),
    }),
    city: optionalText(120),

    problemType: z.enum(values(PROBLEM_TYPES), {
      errorMap: () => ({ message: "Choose the problem that fits best, or Not sure." }),
    }),
    application: z.enum(APPLICATIONS, {
      errorMap: () => ({ message: "Choose what the power is for." }),
    }),
    description: z
      .string()
      .trim()
      .min(30, "Tell us a bit more: at least 30 characters.")
      .max(3000, "Keep this under 3,000 characters."),

    peakKw: optionalWholeNumber(1_000_000),
    dailyKwh: optionalWholeNumber(10_000_000),
    durationNeeded: z.enum(values(DURATIONS)).optional(),
    utilityDelay: z.enum(values(UTILITY_DELAYS)).optional(),
    currentApproach: optionalText(2000),
    costOfDelay: optionalText(2000),

    contactName: optionalText(120),
    email: z
      .string()
      .trim()
      .max(254)
      .optional()
      .transform((v) => (v ? v : undefined))
      .pipe(z.string().email("Enter a valid email address.").optional()),
    followUpConsent: z.boolean().default(false),

    // Honeypot: real visitors never see or fill this field.
    // The API drops filled submissions silently, so bots get no error signal.
    website: z.string().max(500).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.followUpConsent && !data.email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Add an email address so we can follow up, or untick the box.",
      });
    }
  });

export type GapReportInput = z.input<typeof gapReportSchema>;
export type GapReport = z.output<typeof gapReportSchema>;
