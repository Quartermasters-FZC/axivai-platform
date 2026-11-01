import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Request | AXIVAI",
  description:
    "Ask AXIVAI to access, correct or delete personal information, or to opt out of any sale or sharing. Requests go to the AXIVAI privacy team.",
  alternates: { canonical: "/privacy-request" },
};

export default function PrivacyRequestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
