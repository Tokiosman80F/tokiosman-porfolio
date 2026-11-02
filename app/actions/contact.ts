"use server";

import { headers } from "next/headers";
import { ELAPSED, HONEYPOT, MIN_FILL_MS, readContact, validateContact, type ContactState } from "@/lib/contact";
import { crmConfigured, env } from "@/lib/crm";
import { allow } from "@/lib/rate-limit";

// Contact form → Zoho CRM lead (docs/cta.md). Needs, in the environment:
//   ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN  (a Zoho "Self Client" with ZohoCRM.modules.leads.CREATE)
//   ZOHO_ACCOUNTS_URL / ZOHO_API_URL  (optional; default to the .com data centre, e.g. https://accounts.zoho.eu)
// Until they're set the form never posts here: it opens the visitor's email app instead (ContactForm).
//   TURNSTILE_SITE_KEY, TURNSTILE_SECRET_KEY  (optional; Cloudflare Turnstile is off until both are set)
// If a send fails, the error state offers the same email link: a message is never accepted and then lost.
// Spam guards, cheapest first: honeypot, fill time, rate limit, then Turnstile. Anything a real person could
// trip gets the error state (with the email link), not a fake success.
// ponytail: no auto-reply or owner notification yet (needs an email provider).

const RATE_LIMIT = { max: 5, windowMs: 60 * 60 * 1000 };

async function passesTurnstile(form: FormData, ip: string) {
  const secret = env("TURNSTILE_SECRET_KEY");
  if (!secret || !env("TURNSTILE_SITE_KEY")) return true; // not switched on
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: String(form.get("cf-turnstile-response") ?? ""), remoteip: ip }),
      signal: AbortSignal.timeout(5_000),
    });
    return ((await res.json()) as { success?: boolean }).success === true;
  } catch (e) {
    console.error("[contact] Turnstile:", e);
    return false;
  }
}

async function createZohoLead(d: ReturnType<typeof readContact>) {
  const accounts = env("ZOHO_ACCOUNTS_URL") || "https://accounts.zoho.com";
  const api = env("ZOHO_API_URL") || "https://www.zohoapis.com";

  const tokenRes = await fetch(`${accounts}/oauth/v2/token`, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: env("ZOHO_REFRESH_TOKEN"),
      client_id: env("ZOHO_CLIENT_ID"),
      client_secret: env("ZOHO_CLIENT_SECRET"),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  const { access_token } = (await tokenRes.json()) as { access_token?: string };
  if (!access_token) throw new Error(`Zoho token request failed (${tokenRes.status})`);

  const leadRes = await fetch(`${api}/crm/v2/Leads`, {
    method: "POST",
    headers: { Authorization: `Zoho-oauthtoken ${access_token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [
        {
          Last_Name: d.name,
          Company: "Not provided", // mandatory on Zoho Leads by default; the form doesn't ask for it
          Email: d.email,
          Description: `Source: Portfolio contact form\nProject type: ${d.projectType}\n\n${d.message}`,
        },
      ],
    }),
    signal: AbortSignal.timeout(10_000),
  });
  const json = (await leadRes.json()) as { data?: { code?: string }[] };
  if (json.data?.[0]?.code !== "SUCCESS") throw new Error(`Zoho lead not created (${leadRes.status})`);
}

export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: people never see or fill this field; bots do. Pretend it worked so they don't retry.
  // Not named "company" or similar, so browser autofill can't fill it for a real visitor.
  if (String(form.get(HONEYPOT) ?? "")) return { status: "success", name: "" };

  const data = readContact(form);
  const errors = validateContact(data);
  if (Object.keys(errors).length) return { status: "invalid", errors };

  if (!crmConfigured()) return { status: "error" };

  if (!(Number(form.get(ELAPSED)) >= MIN_FILL_MS)) return { status: "error" }; // missing counts as too fast
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!allow(ip, RATE_LIMIT.max, RATE_LIMIT.windowMs)) return { status: "error" };
  if (!(await passesTurnstile(form, ip))) return { status: "error" };

  try {
    await createZohoLead(data);
    return { status: "success", name: data.name };
  } catch (e) {
    console.error("[contact] Zoho CRM:", e);
    return { status: "error" };
  }
}
