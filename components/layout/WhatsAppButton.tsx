import Image from "next/image";
import { site } from "@/content/site";

// Floating WhatsApp button (bottom-right, every viewport): opens a chat with site.whatsapp, pre-filled with
// a short message. A white tile with the WhatsApp logo and a green "online" dot; on hover/focus a label
// slides out to the left (CSS only; instant with reduced motion). Sits below the navbar (z-40) and clears
// the iOS home indicator via the safe-area inset.
export function WhatsAppButton() {
  const { label, message } = site.whatsappButton;
  const href = `${site.whatsapp}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={`${label} (opens in a new tab)`}
      className="group fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex items-center rounded-2xl border border-border-hairline bg-white p-2 shadow-lg invisible opacity-0 [html[data-compact]_&]:visible [html[data-compact]_&]:opacity-100 transition-[border-color,translate,opacity,visibility] duration-200 hover:-translate-y-0.5 hover:border-ink-black focus-visible:border-ink-black motion-reduce:transition-none sm:right-6 sm:bottom-6"
    >
      {/* Label: collapsed to 0 width, slides open on hover/focus (desktop pointers only) */}
      <span
        aria-hidden
        className="max-w-0 overflow-hidden font-sans text-body-sm font-medium whitespace-nowrap text-ink-black opacity-0 transition-[max-width,opacity,margin] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:mr-unit-2 group-hover:ml-unit-2 group-hover:max-w-48 group-hover:opacity-100 group-focus-visible:mr-unit-2 group-focus-visible:ml-unit-2 group-focus-visible:max-w-48 group-focus-visible:opacity-100 motion-reduce:transition-none"
      >
        {label}
      </span>
      <span className="relative flex size-10 items-center justify-center rounded-xl bg-[#25D366]/10">
        <Image src="/logos/whatsapp.svg" alt="" width={28} height={28} unoptimized className="size-7" />
        <span aria-hidden className="absolute -top-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-signal-green" />
      </span>
    </a>
  );
}
