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

const root = linkedRoot();
const nextConfig: NextConfig = root ? { turbopack: { root } } : {};
export default nextConfig;
