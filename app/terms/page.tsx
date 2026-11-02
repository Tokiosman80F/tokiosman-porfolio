import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { terms } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using this site and my standard terms for projects: quotes, payment, refunds, ownership and guarantees.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalPage doc={terms} />;
}
