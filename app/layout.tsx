import type { Metadata } from "next";
import { Caveat, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { BookingModal } from "@/components/BookingModal";
import { MotionProvider } from "@/components/MotionProvider";
import { site } from "@/content/site";
import "./globals.css";

// Variable fonts: no weight list, so every weight in use (500–700) is real, not browser-synthesized.
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

// Favicon: app/favicon.ico via the file convention (Next injects the <link>). Replace that file, or add app/icon.svg, when the real one exists.
export const metadata: Metadata = {
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
};

// Person structured data (docs/footer.md): links the name to the site and, once set, the GitHub /
// LinkedIn profiles in content/site.ts (empty URLs are left out of sameAs).
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.person,
  jobTitle: site.jobTitle,
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: site.socials.map((s) => s.href).filter(Boolean),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <head>
        {/* Without JS, Reveal never runs: show its children */}
        <noscript>
          <style>{"[data-reveal] > * { opacity: 1 !important; }"}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />
      </head>
      <body className="font-body-md text-body-md text-on-surface antialiased bg-white">
        <MotionProvider>{children}</MotionProvider>
        <BookingModal />
      </body>
    </html>
  );
}
