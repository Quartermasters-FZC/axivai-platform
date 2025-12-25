import Link from "next/link";

export function LegalFooter() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-muted-foreground">
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/privacy" className="hover:text-foreground hover:underline">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-foreground hover:underline">Terms of Service</Link>
        <Link href="/cookies" className="hover:text-foreground hover:underline">Cookie Policy</Link>
        <Link href="/accessibility" className="hover:text-foreground hover:underline">Accessibility</Link>
        <Link href="/ccpa" className="hover:text-foreground hover:underline">CCPA Notice</Link>
        <Link href="/ccpa#opt-out" className="hover:text-foreground hover:underline">Do Not Sell or Share</Link>
      </div>
      <div className="text-xs text-muted-foreground">
        Contact: <Link href="mailto:privacy@aliffcapital.com" className="hover:underline">privacy@aliffcapital.com</Link>
      </div>
    </div>
  );
}
