import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { gapReportSchema } from "@/lib/gap-report";
import { getPrisma } from "@/lib/prisma";

const MAX_REPORTS_PER_HOUR = 5;
const MAX_BODY_BYTES = 20_000;

function hashIp(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";
  if (!ip) return undefined;
  const salt = process.env.GAP_REPORT_IP_SALT ?? "";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function POST(req: Request) {
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Report is too large." }, { status: 413 });
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = gapReportSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { website, email, contactName, followUpConsent, ...report } = parsed.data;

  // Honeypot filled: accept silently so bots get no signal.
  if (website) return NextResponse.json({ ok: true });

  const ipHash = hashIp(req);

  try {
    const prisma = getPrisma();

    if (ipHash) {
      const recent = await prisma.gapReport.count({
        where: { ipHash, createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) } },
      });
      if (recent >= MAX_REPORTS_PER_HOUR) {
        return NextResponse.json(
          { error: "Too many reports from this connection. Please try again later." },
          { status: 429 }
        );
      }
    }

    await prisma.gapReport.create({
      data: {
        ...report,
        // Contact details are kept only when the reporter agreed to follow-up.
        email: followUpConsent ? email : undefined,
        contactName: followUpConsent ? contactName : undefined,
        followUpConsent,
        ipHash,
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("/api/gap-report error", error);
    return NextResponse.json(
      { error: "We couldn't save your report just now. Please try again later." },
      { status: 503 }
    );
  }
}
