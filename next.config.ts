import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

// Local baseline copy: node_modules may be a junction to another checkout (E:\my-portfolio\node_modules).
// Turbopack only follows files inside its root, so when node_modules really lives outside this folder the
// root is widened to the drive root. Anywhere else (Vercel, a normal install) node_modules is a real folder
// here and the default root is used: a hard-coded "E:\" breaks those builds.
function linkedRoot(): string | undefined {
  try {
    const real = fs.realpathSync(path.join(process.cwd(), "node_modules"));
    return path.dirname(real) === process.cwd() ? undefined : path.parse(process.cwd()).root;
  } catch {
    return undefined; // no node_modules yet
  }
}

const dev = process.env.NODE_ENV !== "production";
const cal = "https://app.cal.com https://cal.com";
const turnstile = "https://challenges.cloudflare.com";

// ponytail: 'unsafe-inline' for scripts because the pages are static, so per-request nonces aren't possible
// (Next's own inline scripts, the theme script and the JSON-LD need it). Everything else is locked down.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${dev ? "'unsafe-eval' " : ""}https://app.cal.com ${turnstile}`,
  "style-src 'self' 'unsafe-inline' https://app.cal.com",
  "img-src 'self' data: blob: https://app.cal.com https://cal.com",
  "font-src 'self' data: https://app.cal.com",
  `connect-src 'self' ${cal}${dev ? " ws:" : ""}`,
  `frame-src ${cal} ${turnstile}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const root = linkedRoot();
const nextConfig: NextConfig = {
  ...(root && { turbopack: { root } }),
  headers: async () => [{ source: "/:path*", headers: securityHeaders }],
};
export default nextConfig;
