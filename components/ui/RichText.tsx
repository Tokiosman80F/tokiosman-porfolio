/** Plain text, or text with emphasised runs. */
export type RichText = string | Array<string | { strong: string }>;

export function renderRich(text: RichText) {
  if (typeof text === "string") return text;
  return text.map((p, i) =>
    typeof p === "string" ? (
      p
    ) : (
      <strong key={i} className="font-semibold text-ink-black">
        {p.strong}
      </strong>
    ),
  );
}
