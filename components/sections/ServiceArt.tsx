import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUp, FileText, Lock, Mic, PhoneOff, Plus, RotateCw, SlidersHorizontal, Star, Video, Wifi, X } from "lucide-react";
import { FigmaIcon } from "@/components/ui/brand-icons";
import { serviceArt as art } from "@/content/services";
import { cn } from "@/lib/utils";
import { Globe } from "./Globe";

// Decorative illustrations for the "What I build" cards (references: docs/what-we-build-1.png, -2.png).
// Drawn in HTML/CSS with the design tokens. Each fills the card's art area (`relative`, fixed height)
// and lifts slightly when the card is hovered (`group`).
const lift = "transition-transform duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none";

/* 1 · Design → build: a Figma file (back) with the hero frame selected, and in front a Chrome window on macOS
   showing that hero live at tokiosman.com, the cursor on its CTA. Fixed hex colours, not theme tokens (real
   app chrome): identical in light and dark. */
const chromeIcon = "size-[11px] shrink-0 text-[#5f6368]";

export function BrowserArt() {
  return (
    <>
      {/* Figma, peeking out behind: toolbar, layers panel, canvas with the selected frame */}
      <div className="absolute top-4 left-4 h-44 w-[78%] overflow-hidden rounded-lg bg-[#2c2c2c] shadow-[0_10px_24px_-10px_rgb(0_0_0/0.45)] transition-transform duration-300 ease-out group-hover:-translate-x-1 motion-reduce:transition-none sm:left-6">
        <div className="flex h-6 items-center gap-2 border-b border-[#444] px-2">
          <span className="flex gap-[3px]">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} className="size-[6px] rounded-full" style={{ background: c }} />
            ))}
          </span>
          <span className="ml-1 flex [&_svg]:h-3 [&_svg]:w-2">
            <FigmaIcon />
          </span>
          {[0, 1, 2].map((i) => (
            <span key={i} className={cn("size-2.5 rounded-[2px] border border-[#8a8a8a]", i === 0 && "border-[#0d99ff] bg-[#0d99ff]/30")} />
          ))}
          <span className="ml-auto self-center rounded-[3px] bg-[#0d99ff] px-1.5 py-[3px] font-sans text-[7px] leading-none font-semibold text-[#fff]">Share</span>
        </div>
        <div className="flex h-full">
          <div className="w-16 shrink-0 space-y-[5px] border-r border-[#444] px-2 pt-2 font-sans text-[6.5px] text-[#b3b3b3]">
            <p className="font-semibold text-[#fff]">Layers</p>
            <p className="-mx-1 rounded-[2px] bg-[#0d99ff]/25 px-1 text-[#fff]"># Hero</p>
            <p className="pl-2">Nav</p>
            <p className="pl-2">Headline</p>
            <p className="pl-2">Buttons</p>
            <p># Services</p>
          </div>
          <div className="relative flex-1 bg-[#1e1e1e]">
            <span className="absolute top-2 left-3 font-sans text-[6.5px] text-[#0d99ff]">Hero · 1440</span>
            <div className="absolute top-[18px] left-3 h-24 w-40 bg-[#fff] outline outline-1 outline-[#0d99ff]">
              {[["-top-[2px]", "-left-[2px]"], ["-top-[2px]", "-right-[2px]"], ["-bottom-[2px]", "-left-[2px]"], ["-bottom-[2px]", "-right-[2px]"]].map(([y, x]) => (
                <span key={y + x} className={cn("absolute size-[4px] border border-[#0d99ff] bg-[#fff]", y, x)} />
              ))}
              <span className="mx-auto mt-5 block h-1.5 w-20 rounded-full bg-[#121212]" />
              <span className="mx-auto mt-1 block h-1.5 w-14 rounded-[1px] bg-[#FDF175]" />
            </div>
          </div>
        </div>
      </div>

      {/* Chrome window, in front */}
      <div className={cn("absolute top-11 right-4 left-12 overflow-hidden rounded-t-[10px] bg-[#fff] shadow-[0_24px_40px_-14px_rgb(0_0_0/0.45),0_0_0_0.5px_rgb(0_0_0/0.18)] sm:right-6 sm:left-20", lift)}>
        {/* tab strip */}
        <div className="flex h-7 items-end gap-1 bg-[#dee1e6] pl-2.5">
          <span className="mb-[9px] flex gap-[5px]">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} className="size-[8px] rounded-full shadow-[inset_0_0_0_0.5px_rgb(0_0_0/0.15)]" style={{ background: c }} />
            ))}
          </span>
          <span className="ml-2 flex h-[22px] w-36 min-w-0 items-center gap-1.5 rounded-t-[7px] bg-[#fff] px-2 font-sans text-[8px] text-[#1f1f1f]">
            <span className="flex size-[10px] shrink-0 items-center justify-center rounded-[2px] bg-[#121212]">
              <span className="size-[3px] rounded-[0.5px] bg-[#FDF175]" />
            </span>
            <span className="truncate">{art.browserTabs[0]}</span>
            <X className="ml-auto size-[9px] shrink-0 text-[#5f6368]" />
          </span>
          <span className="hidden h-[22px] min-w-0 items-center gap-1.5 px-2 font-sans text-[8px] text-[#474747] sm:flex [&_svg]:h-2.5 [&_svg]:w-2">
            <FigmaIcon />
            <span className="truncate">{art.browserTabs[1]}</span>
          </span>
          <Plus className="mb-[6px] size-[10px] shrink-0 text-[#5f6368]" />
        </div>
        {/* toolbar + omnibox */}
        <div className="flex items-center gap-2 border-b border-[#e3e3e3] px-2.5 py-1">
          <ArrowLeft className={chromeIcon} />
          <ArrowRight className={cn(chromeIcon, "opacity-40")} />
          <RotateCw className={chromeIcon} />
          <span className="flex h-[18px] min-w-0 flex-1 items-center gap-1.5 rounded-full bg-[#f1f3f4] px-2 font-sans text-[8.5px] text-[#1f1f1f]">
            <SlidersHorizontal className="size-[9px] shrink-0 text-[#5f6368]" />
            <span className="truncate">{art.browserUrl}</span>
            <Star className="ml-auto size-[9px] shrink-0 text-[#5f6368]" />
          </span>
          <span className="flex size-[14px] shrink-0 items-center justify-center rounded-full bg-[#0b57d0] font-sans text-[6.5px] font-semibold text-[#fff]">
            T
          </span>
        </div>

        {/* the live page: this site's hero, in miniature */}
        <div className="relative px-4 pt-2 pb-6">
          <div className="flex items-center justify-between rounded-md border border-[#e6e6e6] px-2 py-1 shadow-[0_1px_2px_rgb(0_0_0/0.05)]">
            <span className="font-logo text-[9px] font-bold tracking-tight text-[#121212]">
              tokiosman<span className="text-[#FDF175] [-webkit-text-stroke:0.5px_#121212]">.</span>
            </span>
            <span className="hidden gap-2 font-sans text-[6.5px] text-[#555] sm:flex">
              {art.browserNav.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </span>
            <span className="rounded-[3px] border border-[#121212] bg-[#FDF175] px-1.5 py-[1px] font-sans text-[6.5px] font-semibold text-[#121212]">
              {art.browserCta.nav}
            </span>
          </div>
          <p className="mx-auto mt-2 w-fit rounded-full border border-[#e6e6e6] px-1.5 py-[1px] font-mono text-[5.5px] tracking-widest text-[#666] uppercase">
            {art.browserEyebrow}
          </p>
          <p className="mt-1.5 text-center font-display text-[13px] leading-tight font-bold text-[#121212] uppercase">
            I build websites that{" "}
            <span className="rounded-[2px] border border-[#121212] bg-[#FDF175] px-0.5 shadow-[1.5px_1.5px_0_#121212]">close deals</span>
          </p>
          <div className="mx-auto mt-2 h-[3px] w-3/5 rounded-full bg-[#d9d9d9]" />
          <div className="mx-auto mt-1 h-[3px] w-2/5 rounded-full bg-[#d9d9d9]" />
          <div className="relative mt-2.5 flex justify-center gap-1.5 font-sans text-[6.5px] font-semibold">
            <span className="rounded-[3px] bg-[#121212] px-2 py-[3px] text-[#fff]">{art.browserCta.primary}</span>
            <span className="rounded-[3px] border border-[#2563eb] px-2 py-[3px] text-[#2563eb]">{art.browserCta.secondary}</span>
            {/* macOS pointer resting on the primary button */}
            <svg aria-hidden viewBox="0 0 12 18" className="absolute top-2.5 left-[calc(50%-1.25rem)] h-3.5 w-auto drop-shadow-[0_1px_1px_rgb(0_0_0/0.3)]">
              <path d="M1 1v13.5l3.3-3.1 2.2 5.1 2.2-.9-2.2-5H11z" fill="#121212" stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["#FDF175", "#BFDBFE", "#BBF7D0"].map((c) => (
              <div key={c} className="rounded-md border border-[#e6e6e6] p-1.5">
                <div className="h-8 rounded-sm" style={{ background: `linear-gradient(135deg, ${c}, #f4f4f5)` }} />
                <div className="mt-1.5 h-[3px] w-4/5 rounded-full bg-[#d9d9d9]" />
                <div className="mt-1 h-[3px] w-1/2 rounded-full bg-[#e6e6e6]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* iPhone lock-screen app icons: Zoho and Stripe brand marks (public/logos), an iOS-style Calendar tile */
function CalendarIcon() {
  return (
    <span className="flex size-full flex-col items-center justify-center bg-[#fff] leading-none">
      <span className="font-sans text-[5px] font-semibold text-[#ef4444] uppercase">Thu</span>
      <span className="font-sans text-[12px] font-light text-[#111]">22</span>
    </span>
  );
}
const notifIcons = [
  <Image key="zoho" src="/logos/zoho.svg" alt="" width={20} height={20} unoptimized className="size-5" />,
  <Image key="stripe" src="/logos/stripe.svg" alt="" width={20} height={20} unoptimized className="size-5" />,
  <CalendarIcon key="cal" />,
];
const notifTimes = ["now", "2m ago", "9m ago"];
// Titanium edge: light catching the frame's curve
const titanium = "bg-[linear-gradient(145deg,#9a9da3_0%,#43464c_30%,#cfd2d6_52%,#5c5f65_78%,#2c2e32_100%)]";

/* 2 · iPhone lock screen: titanium frame + side buttons, black bezel, Dynamic Island, status bar, date and
   clock over a canary/blue wallpaper, and frosted notifications from the CRM, Stripe and the calendar.
   Fixed hex colours, not theme tokens (it's a physical device): identical in light and dark. */
export function PhoneArt() {
  return (
    <div className={cn("absolute top-3 left-1/2 w-[13.25rem] -translate-x-1/2", lift)}>
      {/* side buttons: action, volume up / down (left), power (right) */}
      <span className={cn("absolute top-[4.5rem] -left-[2px] h-5 w-[3px] rounded-l-sm", titanium)} />
      <span className={cn("absolute top-[6.75rem] -left-[2px] h-9 w-[3px] rounded-l-sm", titanium)} />
      <span className={cn("absolute top-[9.5rem] -left-[2px] h-9 w-[3px] rounded-l-sm", titanium)} />
      <span className={cn("absolute top-[7.5rem] -right-[2px] h-14 w-[3px] rounded-r-sm", titanium)} />

      <div className={cn("rounded-[2.55rem] p-[2.5px] shadow-[0_24px_40px_-14px_rgb(0_0_0/0.5),0_3px_8px_rgb(0_0_0/0.25)]", titanium)}>
        <div className="rounded-[2.4rem] bg-[#050505] p-[5px]">
          <div className="relative h-[27rem] overflow-hidden rounded-[2.05rem] bg-[radial-gradient(90%_55%_at_15%_8%,#FDF175_0%,transparent_60%),radial-gradient(80%_60%_at_95%_35%,#60A5FA_0%,transparent_65%),linear-gradient(180deg,#2b3f6b_0%,#121a2e_70%)]">
            {/* status bar + Dynamic Island */}
            <div className="flex items-center justify-between px-5 pt-[11px] font-sans text-[10px] font-semibold text-[#fff]">
              <span>9:41</span>
              <span className="flex items-center gap-[3px]">
                <span className="flex items-end gap-[1.5px]">
                  {[3, 4.5, 6, 7.5].map((h) => (
                    <span key={h} className="w-[2.5px] rounded-[0.5px] bg-[#fff]" style={{ height: h }} />
                  ))}
                </span>
                <Wifi className="size-[11px]" strokeWidth={3} />
                <span className="relative ml-[1px] flex h-[8px] w-[16px] items-center rounded-[2.5px] border border-[#fff]/45 p-[1px]">
                  <span className="h-full w-[78%] rounded-[1px] bg-[#fff]" />
                  <span className="absolute -right-[2.5px] h-[3px] w-[1.5px] rounded-r-sm bg-[#fff]/45" />
                </span>
              </span>
            </div>
            <span className="absolute top-[7px] left-1/2 flex h-[20px] w-[60px] -translate-x-1/2 items-center justify-end rounded-full bg-[#000] pr-[7px]">
              <span className="size-[7px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#3b4b72,#0b0d14_70%)]" />
            </span>

            {/* lock, date, clock */}
            <div className="mt-2 flex flex-col items-center text-[#fff]">
              <Lock className="size-3 opacity-90" strokeWidth={2.5} />
              <p className="mt-1 font-sans text-[11px] font-semibold opacity-90">Thursday 22 October</p>
              <p className="font-sans text-[46px] leading-[1] font-semibold tracking-[-0.03em] opacity-95">9:41</p>
            </div>

            {/* notifications: frosted glass */}
            <div className="mt-3 space-y-1.5 px-2">
              {art.notifications.map((n, i) => (
                <div key={n.app} className="flex items-center gap-2 rounded-[14px] bg-[#fff]/60 px-2 py-[7px] shadow-[0_1px_2px_rgb(0_0_0/0.08)] backdrop-blur-md">
                  <span className="flex size-[26px] shrink-0 items-center justify-center overflow-hidden rounded-[7px] bg-[#fff] shadow-[0_0_0_0.5px_rgb(0_0_0/0.08)]">
                    {notifIcons[i]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-1">
                      <span className="truncate font-sans text-[9.5px] font-semibold text-[#111]">{n.app}</span>
                      <span className="shrink-0 font-sans text-[8px] text-[#3c3c43]/70">{notifTimes[i]}</span>
                    </span>
                    <span className="block truncate font-sans text-[9.5px] text-[#1c1c1e]">{n.text}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
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
