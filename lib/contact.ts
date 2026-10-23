import { contactForm, projectTypes } from "@/content/final-cta";
import { site } from "@/content/site";

// Contact form validation, shared by the browser (instant feedback) and the server action (the real gate).
// Plain checks rather than a schema library: four fields don't justify a dependency.

export type ContactField = "name" | "email" | "projectType" | "message";
export type ContactData = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS: Record<ContactField, number> = { name: 100, email: 200, projectType: 40, message: 5000 };

export function readContact(form: FormData): ContactData {
  const get = (k: ContactField) => String(form.get(k) ?? "").trim().slice(0, LIMITS[k]);
  return { name: get("name"), email: get("email"), projectType: get("projectType"), message: get("message") };
}

export function validateContact(d: ContactData): ContactErrors {
  const m = contactForm.validation;
  const errors: ContactErrors = {};
  if (!d.name) errors.name = m.name;
  if (!EMAIL.test(d.email)) errors.email = m.email;
  if (!(projectTypes as readonly string[]).includes(d.projectType)) errors.projectType = m.projectType;
  if (d.message.length < 10) errors.message = m.message;
  return errors;
}

// The visitor's message as a ready-to-send email, for when the CRM is missing or fails.
// ponytail: some mail clients cut mailto bodies past ~2,000 characters; fine for a first message.
export function mailtoHref(d: ContactData) {
  const subject = contactForm.emailSubject.replace("{projectType}", d.projectType || "Website");
  const body = `${d.message}\n\n${d.name}\n${d.email}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const HONEYPOT = "hp_leave_empty";

export type ContactState =
  | { status: "idle" }
  | { status: "invalid"; errors: ContactErrors }
  | { status: "success"; name: string }
  | { status: "error" };
