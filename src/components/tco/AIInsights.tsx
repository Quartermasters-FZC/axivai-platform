"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface AIInsightsProps {
  mode: "explain" | "audit";
  provider?: string;
  message?: string;
  loading?: boolean;
  error?: string;
}

export function AIInsights({ mode, provider, message, loading, error }: AIInsightsProps) {
  const title = useMemo(() => (mode === "audit" ? "AI Audit" : "AI Explanation"), [mode]);
  const badge = mode === "audit" ? "Risk" : "Summary";

  return (
    <Card className="border-accent/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {title}
          <Badge variant="outline">{badge}</Badge>
          {provider && <Badge variant="secondary">{provider}</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading && <p className="text-sm text-muted-foreground">Thinking...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!loading && !error && message && (
          <p className="text-sm whitespace-pre-line leading-relaxed">{message}</p>
        )}
        <Separator />
        <p className="text-[11px] text-muted-foreground">
          AI output is informational, non-binding, and may be incomplete if inputs are missing.
        </p>
      </CardContent>
    </Card>
  );
}
