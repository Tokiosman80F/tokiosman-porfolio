import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { about } from "@/content/about";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

// Floating WhatsApp button (bottom-right, every viewport) + its chat panel. The button opens a small
// WhatsApp-style card: Toki's photo and status, a greeting bubble, then one link per service (and "Something
// else"), each opening a chat with site.whatsapp pre-filled with that topic's message. The panel is a native
// popover (top layer, light dismiss, Esc, no JS); it fades up on open where @starting-style is supported.
// The button shows once the navbar compacts, sits below it (z-40) and clears the iOS home indicator and, on
// phones, the floating dock. On hover/focus its label slides out to the left (CSS only).
// Colours inside the panel are WhatsApp's (fixed hex), identical in light and dark.

const PANEL_ID = "whatsapp-panel";
const waLink = (message: string) => `${site.whatsapp}?text=${encodeURIComponent(message)}`;

// shared right/bottom offsets: the panel sits just above the button
const right = "right-[max(1rem,env(safe-area-inset-right))] sm:right-6";

export function WhatsAppButton() {
  const w = site.whatsappButton;
  return (
    <>
      <button
        type="button"
        popoverTarget={PANEL_ID}
        aria-label={w.label}
        className={cn(
          "group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex cursor-pointer items-center rounded-2xl border border-border-hairline bg-white p-2 shadow-lg invisible opacity-0 [html[data-compact]_&]:visible [html[data-compact]_&]:opacity-100 transition-[border-color,translate,opacity,visibility] duration-200 hover:-translate-y-0.5 hover:border-ink-black focus-visible:border-ink-black motion-reduce:transition-none max-md:bottom-[calc(6.25rem+env(safe-area-inset-bottom))] md:bottom-6",
          right,
        )}
      >
        {/* Label: collapsed to 0 width, slides open on hover/focus (desktop pointers only) */}
        <span
          aria-hidden
          className="max-w-0 overflow-hidden font-sans text-body-sm font-medium whitespace-nowrap text-ink-black opacity-0 transition-[max-width,opacity,margin] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:mr-unit-2 group-hover:ml-unit-2 group-hover:max-w-48 group-hover:opacity-100 group-focus-visible:mr-unit-2 group-focus-visible:ml-unit-2 group-focus-visible:max-w-48 group-focus-visible:opacity-100 motion-reduce:transition-none"
        >
          {w.label}
        </span>
        <span className="relative flex size-10 items-center justify-center rounded-xl bg-[#25D366]/10">
          <Image src="/logos/whatsapp.svg" alt="" width={28} height={28} unoptimized className="size-7" />
          <span aria-hidden className="absolute -top-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-signal-green" />
        </span>
      </button>

      <div
        id={PANEL_ID}
        popover="auto"
        aria-label={w.label}
        className={cn(
          "fixed inset-auto m-0 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[#d1d7db] bg-[#efeae2] p-0 shadow-2xl",
          "bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.5rem)] max-md:bottom-[calc(10.75rem+env(safe-area-inset-bottom))] md:bottom-24",
          "transition-[opacity,translate,display,overlay] transition-discrete duration-200 ease-out starting:open:translate-y-2 starting:open:opacity-0 motion-reduce:transition-none",
          right,
        )}
      >
        {/* header: WhatsApp green, photo, name, status, close */}
        <div className="flex items-center gap-unit-3 bg-[#075e54] px-unit-4 py-unit-3 text-[#fff]">
          <Image src={about.photo.src} alt="" width={40} height={40} className="size-10 shrink-0 rounded-full object-cover object-[50%_25%]" />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate font-sans text-body-md font-semibold">{w.title}</span>
            <span className="flex items-center gap-1.5 font-sans text-[12px] text-[#d9fdd3]">
              <span aria-hidden className="size-1.5 rounded-full bg-[#25d366]" />
              {w.status}
            </span>
          </span>
          <button
            type="button"
            popoverTarget={PANEL_ID}
            popoverTargetAction="hide"
            aria-label={w.close}
            className="tap-target flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#fff] transition-colors hover:bg-[#fff]/15 focus-visible:outline-[#fff]"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>

        <div className="max-h-[min(34rem,calc(100dvh-13rem))] overflow-y-auto px-unit-3 pt-unit-4 pb-unit-3">
          {/* greeting, as an incoming message */}
          <p className="mr-unit-8 rounded-xl rounded-tl-xs bg-[#fff] px-unit-3 py-unit-2 font-sans text-body-sm text-[#111b21] shadow-[0_1px_0.5px_rgb(11_20_26/0.13)]">
            {w.greeting}
          </p>

          {/* topics: each opens WhatsApp with its message */}
          <ul className="mt-unit-3 flex flex-col gap-1">
            {w.topics.map((t) => (
              <li key={t.label}>
                <a
                  href={waLink(t.message)}
                  target="_blank"
                  rel="noopener"
                  className="group flex items-center gap-unit-2 rounded-xl border border-[#d1d7db] bg-[#fff] px-unit-3 py-2 font-sans text-body-sm font-medium text-[#111b21] transition-colors hover:border-[#25d366] hover:bg-[#f0fdf4] focus-visible:outline-[#075e54]"
                >
                  {"urgent" in t && t.urgent && <span aria-hidden className="size-2 shrink-0 rounded-full bg-[#dc2626]" />}
                  <span className="min-w-0 flex-1">{t.label}</span>
                  <ArrowUpRight aria-hidden className="size-4 shrink-0 text-[#54656f] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
                  <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-unit-3 text-center font-sans text-[11px] text-[#54656f]">{w.note}</p>
        </div>
      </div>
    </>
  );
}
