// Zoho CRM configuration (server only: reads secrets from the environment). See app/actions/contact.ts.
export const env = (k: string) => process.env[k]?.trim() || "";

export function crmConfigured() {
  return Boolean(env("ZOHO_CLIENT_ID") && env("ZOHO_CLIENT_SECRET") && env("ZOHO_REFRESH_TOKEN"));
}
