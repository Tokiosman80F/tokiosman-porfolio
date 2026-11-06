import { posts } from "@/content/blog";

// Blog view counts in Upstash Redis (the Vercel Marketplace integration sets KV_REST_API_URL and
// KV_REST_API_TOKEN). POST counts a view and returns the total; GET only reads it. Only real post slugs
// are accepted, so nobody can create arbitrary keys. Without the env vars it answers { views: null }.

type Ctx = { params: Promise<{ slug: string }> };

async function redis(command: "incr" | "get", slug: string): Promise<number | null> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  const res = await fetch(`${url}/${command}/views:${slug}`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
  if (!res.ok) return null;
  const { result } = (await res.json()) as { result: string | number | null };
  return Number(result ?? 0);
}

async function handle(command: "incr" | "get", { params }: Ctx) {
  const { slug } = await params;
  if (!posts.some((p) => p.slug === slug)) return Response.json({ error: "Unknown post" }, { status: 404 });
  return Response.json({ views: await redis(command, slug) }, { headers: { "Cache-Control": "no-store" } });
}

export const GET = (_req: Request, ctx: Ctx) => handle("get", ctx);
export const POST = (_req: Request, ctx: Ctx) => handle("incr", ctx);
