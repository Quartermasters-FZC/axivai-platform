import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { purgeExpiredGapReportData } from "@/lib/retention";

/**
 * Daily retention job. Call from a cron with the shared secret:
 *   curl -fsS -X POST -H "Authorization: Bearer $MAINTENANCE_TOKEN" https://axivai.com/api/maintenance/purge
 * Returns 404 unless MAINTENANCE_TOKEN is configured, so the endpoint is invisible by default.
 */
export async function POST(req: Request) {
  const token = process.env.MAINTENANCE_TOKEN;
  if (!token) return new NextResponse(null, { status: 404 });

  const given = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  const a = Buffer.from(given);
  const b = Buffer.from(token);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await purgeExpiredGapReportData(getPrisma());
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("/api/maintenance/purge error", error);
    return NextResponse.json({ error: "Purge failed" }, { status: 503 });
  }
}
