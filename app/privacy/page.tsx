import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { privacy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What personal data I collect through this site, why, who processes it, and how to access or delete it.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalPage doc={privacy} />;
}
