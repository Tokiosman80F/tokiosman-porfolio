"use client";

import { startTransition, useActionState, useId, useRef, useState, type FormEvent } from "react";
import { ArrowRight, CalendarDays, ChevronDown } from "lucide-react";
import { sendContact } from "@/app/actions/contact";
import { PlanButton } from "@/components/ui/PlanButton";
import { contactForm as c, projectTypes } from "@/content/final-cta";
import { readContact, validateContact, type ContactErrors, type ContactField, type ContactState } from "@/lib/contact";
import { cn } from "@/lib/utils";

// Secondary path beside the call (docs/cta.md): collapsed behind "Prefer to write?" so booking stays the
// main action. Validated in the browser first (errors linked with aria-describedby, focus moves to the
// first one), then again by the server action. A hidden honeypot field catches bots.

const initial: ContactState = { status: "idle" };
const fieldClass = (invalid: boolean) =>
  cn(
    "mt-1.5 w-full rounded-lg border bg-paper-card px-unit-3 py-2.5 font-sans text-body-md text-ink-black placeholder:text-ink-muted",
    invalid ? "border-[#b91c1c]" : "border-border-strong",
  );

export function ContactForm({ crmReady }: { crmReady: boolean }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(sendContact, initial);
  const [clientErrors, setClientErrors] = useState<ContactErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;

  // Browser errors win; server errors show once a response is back (not while a new one is pending).
  const errors: ContactErrors = Object.keys(clientErrors).length
    ? clientErrors
    : state.status === "invalid" && !pending
      ? state.errors
      : {};

  // Always handled here, never as a native form action: React resets a form after its `action` runs,
  // which would wipe what the visitor typed when the server answers with an error.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errs = validateContact(readContact(data));
    setClientErrors(errs);
    const first = Object.keys(errs)[0] as ContactField | undefined;
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    startTransition(() => action(data));
  };

  const describe = (f: ContactField) => (errors[f] ? id(`${f}-error`) : undefined);
  const error = (f: ContactField) =>
    errors[f] && (
      <p id={id(`${f}-error`)} className="mt-1 font-sans text-body-sm text-[#b91c1c]">
        {errors[f]}
      </p>
    );
  const label = (f: ContactField) => (
    <label htmlFor={id(f)} className="font-sans text-body-sm font-medium text-ink-black">
      {c.fields[f].label}
    </label>
  );

  if (state.status === "success") {
    return (
      <div aria-live="polite" className="rounded-2xl bg-white p-unit-6 text-ink-black sm:p-unit-8">
        <p className="font-display text-headline-sm font-bold">
          {state.name ? c.success.heading.replace("{name}", state.name) : c.success.heading.replace(", {name}", "")}
        </p>
        <p className="mt-unit-2 font-sans text-body-md text-on-surface-variant">{c.success.text}</p>
        <div className="mt-unit-6">
          <PlanButton href={c.success.cta.href} label={c.success.cta.label} icon={CalendarDays} external />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-unit-6 text-ink-black sm:p-unit-8">
      <p className="font-display text-headline-sm font-bold">{c.heading}</p>
      <p className="mt-1 font-sans text-body-md text-on-surface-variant">{c.subtext}</p>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={id("form")}
        onClick={() => setOpen((v) => !v)}
        className="mt-unit-4 inline-flex cursor-pointer items-start gap-1.5 text-left font-sans text-body-md font-medium text-ink-black underline decoration-dashed underline-offset-4 hover:decoration-solid"
      >
        {c.toggle}
        <ChevronDown aria-hidden className={cn("mt-1 size-4 shrink-0 transition-transform motion-reduce:transition-none", open && "rotate-180")} />
      </button>

      <form
        ref={formRef}
        id={id("form")}
        hidden={!open}
        onSubmit={onSubmit}
        noValidate
        className="relative mt-unit-6 space-y-unit-4"
      >
        {/* Honeypot: off-screen and skipped by keyboard and assistive tech; only bots fill it */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="grid gap-unit-4 sm:grid-cols-2">
          <div>
            {label("name")}
            <input id={id("name")} name="name" type="text" autoComplete="name" required placeholder={c.fields.name.placeholder}
              aria-invalid={Boolean(errors.name)} aria-describedby={describe("name")} className={fieldClass(Boolean(errors.name))} />
            {error("name")}
          </div>
          <div>
            {label("email")}
            <input id={id("email")} name="email" type="email" autoComplete="email" required placeholder={c.fields.email.placeholder}
              aria-invalid={Boolean(errors.email)} aria-describedby={describe("email")} className={fieldClass(Boolean(errors.email))} />
            {error("email")}
          </div>
        </div>
        <div>
          {label("projectType")}
          <select id={id("projectType")} name="projectType" required defaultValue=""
            aria-invalid={Boolean(errors.projectType)} aria-describedby={describe("projectType")} className={fieldClass(Boolean(errors.projectType))}>
            <option value="" disabled>
              {c.fields.projectType.placeholder}
            </option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {error("projectType")}
        </div>
        <div>
          {label("message")}
          <textarea id={id("message")} name="message" rows={4} required placeholder={c.fields.message.placeholder}
            aria-invalid={Boolean(errors.message)} aria-describedby={describe("message")} className={cn(fieldClass(Boolean(errors.message)), "resize-y")} />
          {error("message")}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex cursor-pointer items-center gap-unit-2 rounded-md border border-ink-black bg-ink-black py-1 pr-unit-3 pl-1 font-sans text-body-sm font-medium text-white transition-colors hover:bg-graphite-hover disabled:cursor-wait disabled:opacity-70"
        >
          <span aria-hidden className="flex size-7 items-center justify-center rounded-sm bg-canary-yellow text-ink-black">
            <ArrowRight className="size-4" />
          </span>
          {pending ? c.sending : c.submit}
        </button>

        <div aria-live="polite">
          {state.status === "error" && !pending && <p className="font-sans text-body-sm text-[#b91c1c]">{c.error}</p>}
        </div>
        {crmReady && <p className="font-sans text-body-sm text-ink-muted">{c.crmNote}</p>}
      </form>
    </div>
  );
}
