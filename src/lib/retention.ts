import type { PrismaClient } from "@/generated/prisma/client";
import { SITE } from "@/lib/site";

/**
 * Enforce the gap-report retention periods published in the Privacy Policy:
 * IP hashes after SITE.retention.ipHashDays, follow-up contact details after SITE.retention.contactMonths.
 */
export async function purgeExpiredGapReportData(prisma: PrismaClient, now = new Date()) {
  const ipCutoff = new Date(now.getTime() - SITE.retention.ipHashDays * 24 * 60 * 60 * 1000);
  const contactCutoff = new Date(now);
  contactCutoff.setMonth(contactCutoff.getMonth() - SITE.retention.contactMonths);

  const ip = await prisma.gapReport.updateMany({
    where: { createdAt: { lt: ipCutoff }, ipHash: { not: null } },
    data: { ipHash: null },
  });
  const contact = await prisma.gapReport.updateMany({
    where: { createdAt: { lt: contactCutoff }, OR: [{ email: { not: null } }, { contactName: { not: null } }] },
    data: { email: null, contactName: null, followUpConsent: false },
  });
  return { ipHashesCleared: ip.count, contactsCleared: contact.count };
}
