// Brand marks (Lucide ships no brand icons). Decorative: the tool name is always rendered next to them.
// Paths and colours are the originals from the Stitch export.

export function FramerIcon() {
  return (
    <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24">
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="#0055FF" />
    </svg>
  );
}

export function FigmaIcon() {
  return (
    <svg aria-hidden className="h-5 w-4" fill="none" viewBox="0 0 38 57">
      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
    </svg>
  );
}

export function ReactIcon() {
  return (
    <svg aria-hidden className="h-4 w-4" viewBox="0 0 115.3 100">
      {[30, 90, 150].map((deg) => (
        <ellipse key={deg} cx="57.6" cy="50" fill="none" rx="16.5" ry="48.2" stroke="#0284c7" strokeWidth="5" transform={`rotate(${deg} 57.6 50)`} />
      ))}
      <circle cx="57.6" cy="50" fill="#0284c7" r="8" />
    </svg>
  );
}

export function FramerMotionIcon() {
  return (
    <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24">
      <path d="M0 0h12v6H6v6H0V0zm12 6h12v12H12V6zm-6 6h6v6H6v-6zm6 6h12v6H12v-6z" fill="#bb44f0" />
    </svg>
  );
}

export function GoogleIcon() {
  return (
    <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24">
      <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" fill="#4285F4" />
      <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853" />
      <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" fill="#FBBC05" />
      <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335" />
    </svg>
  );
}

// Redaxify client logo, redrawn as a vector from the owner's 146×30 screenshot (docs/): a white four-point
// sparkle and wordmark in the brand navy (the screenshot showed them white on a navy bar). The wordmark is set in the site's display font, close to the
// original bold sans; replace with the company's own SVG when available.
export function RedaxifyLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="5 4 107 24" className={className} role="img" aria-label="Redaxify">
      <path d="M17 6c.7 5.3 4.7 9.3 10 10-5.3.7-9.3 4.7-10 10-.7-5.3-4.7-9.3-10-10 5.3-.7 9.3-4.7 10-10z" fill="#222445" />
      <text x="33" y="21.5" fill="#222445" className="font-display" fontSize="15.5" fontWeight="700" letterSpacing="-0.2">
        Redaxify
      </text>
    </svg>
  );
}
