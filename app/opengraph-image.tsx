import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Link-preview image (Open Graph / Twitter) for every page that doesn't set its own: the wordmark, what I
// do, and the starting price, in the site's ink + canary. Generated at build time, set in Space Grotesk Bold
// (the site's display face; the TTF lives in assets/fonts because the image renderer can't read woff2).
export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const font = await readFile(join(process.cwd(), "assets/fonts/SpaceGrotesk-Bold.ttf"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#ffffff", color: "#121212", fontFamily: "Space Grotesk" }}>
        <div style={{ display: "flex", alignItems: "flex-end", fontSize: 56, fontWeight: 700, letterSpacing: -2 }}>
          tokiosman
          <div style={{ width: 16, height: 16, marginLeft: 6, marginBottom: 12, background: "#FDF175", border: "3px solid #121212", borderRadius: 3 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>Next.js websites, web apps</div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            and
            <div style={{ display: "flex", marginLeft: 20, padding: "0 14px", background: "#FDF175", border: "4px solid #121212", borderRadius: 10, boxShadow: "6px 6px 0 #121212" }}>
              AI that sell
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 30, color: "#52525b" }}>
          <span>{`${site.person} · Design to deploy`}</span>
          <span style={{ color: "#121212", fontWeight: 700 }}>Websites from $1,500 · Fixed price</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Space Grotesk", data: font, weight: 700, style: "normal" }] },
  );
}
