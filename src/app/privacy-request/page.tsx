/**
 * AXIVAI Privacy Request (DSAR) Page
 * © 2025-2050 Aliff Capital, LLC. All Rights Reserved.
 *
 * Data Subject Access Request form for:
 * - CCPA/CPRA (California)
 * - GDPR (EU)
 * - State Privacy Laws (VCDPA, CPA, CTDPA, UCPA)
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type RequestType =
  | "access"
  | "deletion"
  | "correction"
  | "opt-out"
  | "portability"
  | "limit-sensitive"
  | "other";

type FormState = {
  requestType: RequestType | "";
  firstName: string;
  lastName: string;
  email: string;
  stateOfResidence: string;
  description: string;
  agreeToVerification: boolean;
};

const initialFormState: FormState = {
  requestType: "",
  firstName: "",
  lastName: "",
  email: "",
  stateOfResidence: "",
  description: "",
  agreeToVerification: false,
};

const requestTypes: { value: RequestType; label: string; description: string }[] = [
  {
    value: "access",
    label: "Access My Data",
    description: "Request a copy of the personal information we have about you",
  },
  {
    value: "deletion",
    label: "Delete My Data",
    description: "Request deletion of your personal information (subject to legal exceptions)",
  },
  {
    value: "correction",
    label: "Correct My Data",
    description: "Request correction of inaccurate personal information",
  },
  {
    value: "opt-out",
    label: "Opt-Out of Sale/Sharing",
    description: "Opt-out of the sale or sharing of your personal information",
  },
  {
    value: "portability",
    label: "Data Portability",
    description: "Receive your data in a portable, machine-readable format",
  },
  {
    value: "limit-sensitive",
    label: "Limit Sensitive Data Use",
    description: "Limit how we use your sensitive personal information",
  },
  {
    value: "other",
    label: "Other Request",
    description: "Another privacy-related request not listed above",
  },
];

const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming", "District of Columbia",
  "Outside USA",
];

export default function PrivacyRequestPage() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    form.requestType !== "" &&
    form.firstName.trim() !== "" &&
    form.lastName.trim() !== "" &&
    form.email.trim() !== "" &&
    form.stateOfResidence !== "" &&
    form.agreeToVerification;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);

    // In production, this would send to an API endpoint
    // For now, we'll open a mailto link with the form data
    const subject = encodeURIComponent(`Privacy Request: ${form.requestType}`);
    const body = encodeURIComponent(
      `Privacy Request Submission\n` +
      `========================\n\n` +
      `Request Type: ${form.requestType}\n` +
      `Name: ${form.firstName} ${form.lastName}\n` +
      `Email: ${form.email}\n` +
      `State of Residence: ${form.stateOfResidence}\n\n` +
      `Description:\n${form.description || "N/A"}\n\n` +
      `---\n` +
      `Submitted: ${new Date().toISOString()}\n` +
      `Verification Agreed: Yes`
    );

    window.location.href = `mailto:privacy@aliffcapital.com?subject=${subject}&body=${body}`;

    // Show success state
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold gradient-text">
              AXIVAI
            </Link>
            <Button asChild variant="outline" size="sm">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </nav>

        <main className="py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <CardTitle className="text-2xl">Request Submitted</CardTitle>
                <CardDescription className="text-base">
                  Your privacy request has been initiated
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  An email has been opened with your request details. Please send
                  the email to complete your submission.
                </p>
                <div className="bg-background rounded-lg p-4 text-left">
                  <h4 className="font-semibold mb-2">What happens next?</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>1. We will verify your identity using the email address provided</li>
                    <li>2. You may receive a verification email within 1-3 business days</li>
                    <li>3. Once verified, we will process your request</li>
                    <li>4. You will receive a response within:
                      <ul className="ml-4 mt-1">
                        <li>- 45 days (CCPA/CPRA - California residents)</li>
                        <li>- 30 days (GDPR - EU/UK residents)</li>
                        <li>- 45 days (Other US state privacy laws)</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 flex flex-wrap gap-3 justify-center">
                  <Button asChild variant="outline">
                    <Link href="/privacy">View Privacy Policy</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/">Return to Home</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold gradient-text">
            AXIVAI
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </nav>

      {/* Content */}
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8">
            <Badge variant="outline" className="mb-4">
              Privacy
            </Badge>
            <h1 className="text-3xl font-bold mb-2">Privacy Request Form</h1>
            <p className="text-muted-foreground">
              Submit a request to exercise your privacy rights under CCPA, GDPR,
              or other applicable privacy laws.
            </p>
          </div>

          <Separator className="my-8" />

          {/* Info Card */}
          <Card className="mb-8 border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Before You Submit</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                We take your privacy seriously. To protect your data from
                unauthorized access, we will verify your identity before
                processing your request.
              </p>
              <p>
                <strong>Response Times:</strong> We aim to respond within 45 days
                for CCPA requests and 30 days for GDPR requests. Extensions may
                apply for complex requests as permitted by law.
              </p>
              <p>
                <strong>Alternative:</strong> You can also submit requests by
                emailing{" "}
                <a
                  href="mailto:privacy@aliffcapital.com"
                  className="text-foreground underline"
                >
                  privacy@aliffcapital.com
                </a>{" "}
                directly.
              </p>
            </CardContent>
          </Card>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Request Type */}
            <div className="space-y-3">
              <Label htmlFor="requestType" className="text-base font-semibold">
                What would you like to request? *
              </Label>
              <Select
                value={form.requestType}
                onValueChange={(value: RequestType) => updateField("requestType", value)}
              >
                <SelectTrigger id="requestType">
                  <SelectValue placeholder="Select request type" />
                </SelectTrigger>
                <SelectContent>
                  {requestTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex flex-col">
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.requestType && (
                <p className="text-sm text-muted-foreground">
                  {requestTypes.find((t) => t.value === form.requestType)?.description}
                </p>
              )}
            </div>

            {/* Name */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="Enter your email address"
                required
              />
              <p className="text-xs text-muted-foreground">
                We will use this email to verify your identity and respond to your request.
              </p>
            </div>

            {/* State of Residence */}
            <div className="space-y-2">
              <Label htmlFor="state">State/Region of Residence *</Label>
              <Select
                value={form.stateOfResidence}
                onValueChange={(value) => updateField("stateOfResidence", value)}
              >
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select your state or region" />
                </SelectTrigger>
                <SelectContent>
                  {usStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                This helps us determine which privacy laws apply to your request.
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Additional Details (Optional)
              </Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateField("description", e.target.value)}
                placeholder="Provide any additional context or specific information about your request..."
                rows={4}
              />
            </div>

            {/* Verification Agreement */}
            <div className="flex items-start space-x-3 rounded-lg border p-4">
              <Checkbox
                id="verification"
                checked={form.agreeToVerification}
                onCheckedChange={(checked: boolean | "indeterminate") =>
                  updateField("agreeToVerification", checked === true)
                }
              />
              <div className="space-y-1">
                <Label htmlFor="verification" className="cursor-pointer">
                  I understand and agree to identity verification *
                </Label>
                <p className="text-xs text-muted-foreground">
                  I understand that AXIVAI will verify my identity before
                  processing this request. I confirm that I am authorized to
                  submit this request on my own behalf (or as an authorized agent
                  with proper documentation).
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "Processing..." : "Submit Request"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/privacy">View Privacy Policy</Link>
              </Button>
            </div>
          </form>

          <Separator className="my-8" />

          {/* Additional Info */}
          <div className="prose prose-stone dark:prose-invert text-sm">
            <h3>Your Privacy Rights</h3>
            <p>
              Depending on your location, you may have rights including:
            </p>
            <ul>
              <li>
                <strong>California (CCPA/CPRA):</strong> Right to know, delete,
                correct, opt-out of sale/sharing, and limit sensitive data use.
              </li>
              <li>
                <strong>EU/UK (GDPR):</strong> Right of access, rectification,
                erasure, restriction, portability, and to object.
              </li>
              <li>
                <strong>Virginia, Colorado, Connecticut, Utah:</strong> Similar
                rights to CCPA with some variations.
              </li>
            </ul>
            <p>
              For more details, please review our{" "}
              <Link href="/privacy">Privacy Policy</Link> and{" "}
              <Link href="/ccpa">CCPA Notice</Link>.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold gradient-text text-lg">AXIVAI</p>
              <p className="text-sm text-muted-foreground">
                Resilience Infrastructure for School Bus Electrification
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-foreground">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="hover:text-foreground">
                Accessibility
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            © 2025–2050 Aliff Capital, LLC. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
