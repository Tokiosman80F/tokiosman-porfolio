import { ArrowUp, CalendarCheck, CreditCard, FileText, Mic, PhoneOff, UserPlus, Video } from "lucide-react";
import { FigmaIcon } from "@/components/ui/brand-icons";
import { serviceArt as art } from "@/content/services";
import { cn } from "@/lib/utils";
import { Globe } from "./Globe";

// Decorative illustrations for the "What I build" cards (references: docs/what-we-build-1.png, -2.png).
// Drawn in HTML/CSS with the design tokens. Each fills the card's art area (`relative`, fixed height)
// and lifts slightly when the card is hovered (`group`).
const lift = "transition-transform duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none";

/* 1 · Browser window showing a mini version of this site's hero, with a Figma tab */
export function BrowserArt() {
  return (
    <div className={cn("absolute inset-x-6 top-7 rounded-t-xl border border-border-strong bg-white shadow-md sm:inset-x-10", lift)}>
      <div className="flex items-end gap-1 rounded-t-xl border-b border-border-hairline bg-paper-subtle px-2 pt-2">
        <div className="flex gap-1 px-1 pb-2">
          <span className="size-2 rounded-full bg-[#ef4444]/80" />
          <span className="size-2 rounded-full bg-[#f59e0b]/80" />
          <span className="size-2 rounded-full bg-[#10b981]/80" />
        </div>
        <div className="flex min-w-0 items-center gap-1.5 rounded-t-md bg-white px-2 py-1 font-sans text-[9px] text-ink-charcoal">
          <span className="size-2.5 shrink-0 rounded-xs bg-ink-black" />
          <span className="truncate">{art.browserTabs[0]}</span>
        </div>
        <div className="hidden min-w-0 items-center gap-1.5 px-2 py-1 font-sans text-[9px] text-ink-muted sm:flex [&_svg]:size-2.5">
          <FigmaIcon />
          <span className="truncate">{art.browserTabs[1]}</span>
        </div>
      </div>
      <div className="px-4 pt-3 pb-6">
        <div className="flex items-center justify-between rounded-md border border-border-hairline px-2 py-1">
          <span className="font-display text-[9px] font-bold text-ink-black">
            tokiosman<span className="text-canary-yellow [-webkit-text-stroke:0.5px_var(--color-ink-black)]">.</span>
          </span>
          <span className="hidden gap-2 sm:flex">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1 w-5 rounded-full bg-border-strong" />
            ))}
          </span>
          <span className="h-3 w-10 rounded-xs bg-ink-black" />
        </div>
        <p className="mt-4 text-center font-display text-[13px] leading-tight font-bold text-ink-black uppercase">
          I build websites that{" "}
          <span className="rounded-xs border border-ink-black bg-canary-yellow px-0.5 text-ink-black">close deals</span>
        </p>
        <div className="mx-auto mt-2 h-1 w-3/5 rounded-full bg-border-strong" />
        <div className="mx-auto mt-1 h-1 w-2/5 rounded-full bg-border-strong" />
        <div className="mt-3 flex justify-center gap-1.5">
          <span className="h-3.5 w-12 rounded-xs bg-ink-black" />
          <span className="h-3.5 w-12 rounded-xs border border-signal-blue" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md border border-border-hairline p-1.5">
              <div className="h-8 rounded-sm bg-surface-container" />
              <div className="mt-1.5 h-1 w-4/5 rounded-full bg-border-strong" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 2 · Phone lock screen with CRM / payment / booking notifications */
const notifIcons = [UserPlus, CreditCard, CalendarCheck];

export function PhoneArt() {
  return (
    <div className={cn("absolute top-4 left-1/2 w-52 -translate-x-1/2 rounded-4xl border-[5px] border-ink-black bg-ink-black shadow-lg", lift)}>
      <div className="h-80 rounded-[1.65rem] bg-[linear-gradient(160deg,#121212_0%,#2a2d33_55%,#3f444e_100%)] px-2.5 pt-2">
        <div className="mx-auto h-4 w-16 rounded-full bg-ink-black" />
        <p className="mt-2 text-center font-sans text-[10px] text-on-primary-container">Thu 22 Oct</p>
        <p className="text-center font-display text-[28px] leading-none font-bold text-on-primary">9:41</p>
        <div className="mt-3 space-y-1.5">
          {art.notifications.map((n, i) => {
            const Icon = notifIcons[i];
            return (
              <div key={n.app} className="flex items-center gap-2 rounded-xl bg-white/92 px-2 py-1.5">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-ink-black bg-canary-yellow text-ink-black">
                  <Icon className="size-3.5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-sans text-[9px] font-semibold text-ink-black">{n.app}</span>
                  <span className="block truncate font-sans text-[9px] text-ink-charcoal">{n.text}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* 3 · AI chat answering from a source document, over a keyboard */
const keyRows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

export function ChatArt() {
  return (
    <>
      <div className="absolute inset-x-6 -bottom-2 rounded-t-xl border border-border-hairline bg-paper-subtle p-2 sm:inset-x-10">
        <div className="space-y-1">
          {keyRows.map((row, r) => (
            <div key={row} className="flex justify-center gap-1" style={{ paddingInline: `${r * 6}%` }}>
              {[...row].map((k) => (
                <span
                  key={k}
                  className="flex h-6 flex-1 items-center justify-center rounded-[5px] border border-border-hairline bg-white font-sans text-[8px] text-ink-muted shadow-xs"
                >
                  {k}
                </span>
              ))}
            </div>
          ))}
          <div className="mx-auto h-6 w-1/2 rounded-[5px] border border-border-hairline bg-white shadow-xs" />
        </div>
      </div>
      <div className={cn("absolute top-5 left-1/2 w-[72%] max-w-xs -translate-x-1/2 rounded-xl border border-border-hairline bg-white p-2.5 shadow-lg", lift)}>
        <div className="flex justify-end">
          <span className="rounded-lg rounded-br-xs bg-ink-black px-2 py-1 font-sans text-[10px] text-white">{art.chat.question}</span>
        </div>
        <div className="mt-1.5 max-w-[85%] rounded-lg rounded-bl-xs bg-paper-subtle px-2 py-1.5">
          <p className="font-sans text-[10px] text-ink-black">{art.chat.answer}</p>
          <span className="mt-1 inline-flex items-center gap-1 rounded-sm border border-border-hairline bg-white px-1 py-0.5 font-mono text-[8px] text-ink-charcoal">
            <FileText className="size-2.5" />
            {art.chat.source}
          </span>
        </div>
        <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-border-hairline px-2 py-1.5">
          <span className="flex-1 font-sans text-[10px] text-ink-muted">{art.chat.placeholder}</span>
          <span className="flex size-5 items-center justify-center rounded-full bg-ink-black text-white">
            <ArrowUp className="size-3" />
          </span>
        </div>
      </div>
    </>
  );
}

/* 4 · Video call: host tile with initials, guest self-view, call controls */
export function CallArt() {
  return (
    <div className={cn("absolute top-7 left-1/2 w-[76%] max-w-sm -translate-x-1/2", lift)}>
      <div className="relative overflow-hidden rounded-xl border border-ink-black bg-[radial-gradient(120%_100%_at_50%_0%,var(--color-paper-card),var(--color-surface-container))] shadow-lg">
        <div className="flex h-44 items-center justify-center">
          <span className="flex size-20 items-center justify-center rounded-full border-2 border-ink-black bg-canary-yellow font-display text-headline-md font-bold text-ink-black">
            {art.call.hostInitials}
          </span>
        </div>
        <span className="absolute top-2 left-2 flex items-center gap-1.5 rounded-md bg-white/90 px-1.5 py-0.5 font-sans text-[9px] font-medium text-ink-black">
          {/* speaking indicator */}
          <span className="flex h-2.5 items-end gap-px">
            <span className="h-1 w-0.5 rounded-full bg-signal-green" />
            <span className="h-2.5 w-0.5 rounded-full bg-signal-green" />
            <span className="h-1.5 w-0.5 rounded-full bg-signal-green" />
          </span>
          {art.call.host}
        </span>
        <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
          <span className="flex size-6 items-center justify-center rounded-full bg-white/90 text-ink-black">
            <Mic className="size-3" />
          </span>
          <span className="flex size-6 items-center justify-center rounded-full bg-white/90 text-ink-black">
            <Video className="size-3" />
          </span>
          {/* end-call red is a mock-UI colour */}
          <span className="flex size-6 items-center justify-center rounded-full bg-[#ef4444] text-white">
            <PhoneOff className="size-3" />
          </span>
        </div>
      </div>
      <div className="absolute -right-6 -bottom-8 flex h-20 w-24 items-center justify-center rounded-lg border border-ink-black bg-ink-black shadow-lg">
        <span className="flex size-10 items-center justify-center rounded-full bg-white/10 font-sans text-[10px] font-medium text-on-primary">
          {art.call.guest}
        </span>
      </div>
    </div>
  );
}

/* 5 · Dotted 3D globe with client pins (bottom-right, partly cropped like the reference): see Globe.tsx */
export function GlobeArt({ clients }: { clients: string[] }) {
  return <Globe clients={clients} className={cn("absolute -right-6 -bottom-16 size-96 lg:size-104", lift)} />;
}
