"use server";

import { readContact, validateContact, type ContactState } from "@/lib/contact";
import { crmConfigured, env } from "@/lib/crm";

// Contact form → Zoho CRM lead (docs/cta.md). Needs, in the environment:
//   ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN  (a Zoho "Self Client" with ZohoCRM.modules.leads.CREATE)
//   ZOHO_ACCOUNTS_URL / ZOHO_API_URL  (optional; default to the .com data centre, e.g. https://accounts.zoho.eu)
// Until they're set, every valid submission returns the error state, which tells the visitor to email
// instead: a message is never accepted and then lost.
// ponytail: no Turnstile, auto-reply or owner notification yet (need keys / an email provider); the
// honeypot is the only spam guard, add Turnstile before heavy traffic.

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
  if (String(form.get("company") ?? "")) return { status: "success", name: "" };

  const data = readContact(form);
  const errors = validateContact(data);
  if (Object.keys(errors).length) return { status: "invalid", errors };

  if (!crmConfigured()) return { status: "error" };
  try {
    await createZohoLead(data);
    return { status: "success", name: data.name };
  } catch (e) {
    console.error("[contact] Zoho CRM:", e);
    return { status: "error" };
  }
}
