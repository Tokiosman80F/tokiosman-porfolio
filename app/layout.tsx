import type { Metadata, Viewport } from "next";
import { Caveat, Inter, JetBrains_Mono, Sora, Space_Grotesk } from "next/font/google";
import { BookingModal } from "@/components/BookingModal";
import { SplashLoader } from "@/components/layout/SplashLoader";
import { MotionProvider } from "@/components/MotionProvider";
import { site } from "@/content/site";
import "./globals.css";

// Variable fonts: no weight list, so every weight in use (500–700) is real, not browser-synthesized.
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });
// Logo wordmark only
const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });

// Favicon: app/favicon.ico via the file convention (Next injects the <link>). Replace that file, or add app/icon.svg, when the real one exists.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.person, url: site.url }],
  creator: site.person,
  // Link previews (the image is app/opengraph-image.tsx)
  openGraph: { type: "website", siteName: site.name, title: site.title, description: site.description, url: "/", locale: "en_US" },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
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
  sameAs: [...site.socials.map((s) => s.href), site.facebook].filter(Boolean),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning // data-theme is set by the inline script before React loads
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${caveat.variable} ${sora.variable}`}
    >
      <head>
        {/* Without JS, Reveal never runs: show its children */}
        {/* Before first paint: the theme (saved choice, else the OS setting; ThemeToggle changes it), and the
            phone splash loader is skipped if it already played this session (SplashLoader) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t;if(sessionStorage.getItem("loader-seen"))document.documentElement.setAttribute("data-loader-done","")}catch(e){}`,
          }}
        />
        <noscript>
          <style>{"[data-reveal] > * { opacity: 1 !important; } .splash { display: none !important; }"}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />
      </head>
      <body className="font-body-md text-body-md text-on-surface antialiased bg-white max-md:pb-[calc(5.5rem+env(safe-area-inset-bottom))]">
        <SplashLoader />
        <MotionProvider>{children}</MotionProvider>
        <BookingModal />
      </body>
    </html>
  );
}
