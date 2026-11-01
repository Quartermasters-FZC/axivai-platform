import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";

// DATABASE_URL: mysql://user:password@127.0.0.1:3306/dbname
// On Hostinger use 127.0.0.1, not localhost (localhost may resolve to IPv6).

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient() {
  const raw = process.env.DATABASE_URL;
  if (!raw) throw new Error("DATABASE_URL is not set");
  // Hostinger's generated URL uses localhost, which can resolve to IPv6; force IPv4.
  const url = raw.replace("@localhost:", "@127.0.0.1:");
  return new PrismaClient({
    adapter: new PrismaMariaDb(url),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export function getPrisma() {
  const client = globalForPrisma.prisma ?? createClient();
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}
