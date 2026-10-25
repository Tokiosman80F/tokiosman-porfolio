import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { posts, readingMinutes } from "@/content/blog";
import { site } from "@/content/site";

// Post banner: the cover on the post and its card, and the link-preview image. Built at build time in the
// site's language, like app/opengraph-image.tsx: paper with a faint grid, the wordmark, the title with one
// phrase in a canary highlight box, and the post's flow as a row of chips (ink → the last one canary).

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog banner";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

const ink = "#121212";
const canary = "#FDF175";
const muted = "#6C6B66";

export default async function BlogBanner({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug)!;
  const font = await readFile(join(process.cwd(), "assets/fonts/SpaceGrotesk-Bold.ttf"));
  const [before, after] = p.banner.title.split(p.banner.highlight);
  const words = (s: string) => s.split(/\s+/).filter(Boolean).map((w, i) => <span key={s + i}>{w}</span>);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          color: ink,
          fontFamily: "Space Grotesk",
          backgroundColor: "#F7F6F2",
          backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        {/* Wordmark · kicker pill */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "flex-end", fontSize: 40, letterSpacing: -1.5 }}>
            tokiosman
            <div style={{ width: 12, height: 12, marginLeft: 5, marginBottom: 9, background: canary, border: `3px solid ${ink}`, borderRadius: 2 }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 18px", background: "#FAFAF7", border: "2px solid #E5E4DE", borderRadius: 999, fontSize: 20, letterSpacing: 2 }}>
            <div style={{ width: 10, height: 10, background: canary, border: `2px solid ${ink}`, borderRadius: 999 }} />
            {`BLOG · ${readingMinutes(p)} MIN READ`}
          </div>
        </div>

        {/* Title, one phrase boxed */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", columnGap: 20, rowGap: 8, fontSize: 76, lineHeight: 1.05, letterSpacing: -2.5, maxWidth: 1040 }}>
          {words(before)}
          <div style={{ display: "flex", padding: "0 14px", background: canary, border: `4px solid ${ink}`, borderRadius: 10, boxShadow: `6px 6px 0 ${ink}` }}>{p.banner.highlight}</div>
          {words(after ?? "")}
        </div>

        {/* Flow chips · byline */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24 }}>
            {p.banner.flow.map((step, i) => {
              const last = i === p.banner.flow.length - 1;
              return (
                <div key={step} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      display: "flex",
                      padding: "10px 18px",
                      borderRadius: 10,
                      border: `3px solid ${ink}`,
                      background: last ? canary : ink,
                      color: last ? ink : "#ffffff",
                      boxShadow: last ? `4px 4px 0 ${ink}` : "none",
                    }}
                  >
                    {step}
                  </div>
                  {!last && <div style={{ display: "flex", color: muted, fontSize: 28 }}>→</div>}
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", fontSize: 22, color: muted }}>
            <span style={{ color: ink }}>{site.person}</span>
            <span>{site.jobTitle}</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Space Grotesk", data: font, weight: 700, style: "normal" }] },
  );
}
