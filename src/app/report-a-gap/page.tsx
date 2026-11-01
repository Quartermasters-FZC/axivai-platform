import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { GapReportForm } from "@/components/gap-report/GapReportForm";

export const metadata: Metadata = {
  title: "Report a power-access gap | AXIVAI",
  description:
    "Tell AXIVAI where a site can't get the power it needs in time. Reports feed research into when deployable power beats the alternatives.",
  alternates: { canonical: "/report-a-gap" },
};

export default function ReportAGapPage() {
  return (
    <div className="bg-background">
      <main id="main-content" tabIndex={-1} className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-10 space-y-4">
            <Badge variant="outline" className="border-accent/40 text-accent-ink bg-accent/5">
              Research · problem mapping
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Report a power-access gap
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Is a site you work with waiting on a utility upgrade, short on peak power,
              or in need of temporary or backup power? Tell us about it. We&apos;ll look
              at the load, the timeline and the options, and we&apos;re choosing AXIVAI&apos;s
              first pilot sites from these reports.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
              <li>Takes about 5 minutes. Only the starred fields are required.</li>
              
              <li>Contact details are optional and kept only if you ask for follow-up.</li>
            </ul>
          </div>

          <GapReportForm />
        </div>
      </main>

    </div>
  );
}
