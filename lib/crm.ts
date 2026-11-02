// Zoho CRM configuration (server only: reads secrets from the environment). See app/actions/contact.ts.
export const env = (k: string) => process.env[k]?.trim() || "";

export function crmConfigured() {
  return Boolean(env("ZOHO_CLIENT_ID") && env("ZOHO_CLIENT_SECRET") && env("ZOHO_REFRESH_TOKEN"));
}

// Cloudflare Turnstile: the site key is public, the secret stays here. Both must be set or the check stays off.
export const turnstileSiteKey = () => (env("TURNSTILE_SECRET_KEY") ? env("TURNSTILE_SITE_KEY") : "");
