import { useId } from "react";

// Decorative section backdrop: 4rem hairline grid, animated light beams (SMIL), surface fade.
// Ids come from useId() so several instances on one page don't share gradient/filter ids.
// Reduced motion: globals.css hides `svg:has(animate)`, the grid and fade stay.
export function BeamBackground() {
  const uid = useId();
  const id = (name: string) => `${uid}${name}`;
  const ref = (name: string) => `url(#${id(name)})`;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E4DE_1px,transparent_1px),linear-gradient(to_bottom,#E5E4DE_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
      <div className="absolute inset-0">
        <svg className="h-full w-full opacity-60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={id("green-horiz")} x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
              <stop offset="50%" stopColor="#22C55E" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#4ae176" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={id("blue-horiz")} x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
              <stop offset="50%" stopColor="#00d2ff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={id("black-horiz")} x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#121212" stopOpacity="0" />
              <stop offset="50%" stopColor="#121212" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#454545" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={id("green-vert")} x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
              <stop offset="50%" stopColor="#22c55e" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#4ae176" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={id("blue-vert")} x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#00d2ff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={id("black-vert")} x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#121212" stopOpacity="0" />
              <stop offset="50%" stopColor="#121212" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#121212" stopOpacity="0" />
            </linearGradient>
            <filter id={id("glow")} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur result="blur" stdDeviation="2.5" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* horizontal beams */}
          <line filter={ref("glow")} stroke={ref("green-horiz")} strokeWidth="2.5" x1="-300" x2="100" y1="128" y2="128">
            <animate attributeName="x1" dur="5s" from="-300" to="1920" repeatCount="indefinite" />
            <animate attributeName="x2" dur="5s" from="100" to="2320" repeatCount="indefinite" />
          </line>
          <line filter={ref("glow")} stroke={ref("blue-horiz")} strokeWidth="2.5" x1="-350" x2="50" y1="320" y2="320">
            <animate attributeName="x1" begin="1.2s" dur="6.5s" from="-350" to="1920" repeatCount="indefinite" />
            <animate attributeName="x2" begin="1.2s" dur="6.5s" from="50" to="2320" repeatCount="indefinite" />
          </line>
          <line stroke={ref("black-horiz")} strokeWidth="2" x1="-200" x2="100" y1="448" y2="448">
            <animate attributeName="x1" begin="0.6s" dur="7.5s" from="-200" to="1920" repeatCount="indefinite" />
            <animate attributeName="x2" begin="0.6s" dur="7.5s" from="100" to="2220" repeatCount="indefinite" />
          </line>
          <line filter={ref("glow")} stroke={ref("green-horiz")} strokeWidth="2.5" x1="1920" x2="1520" y1="256" y2="256">
            <animate attributeName="x1" begin="2s" dur="7s" from="1920" to="-300" repeatCount="indefinite" />
            <animate attributeName="x2" begin="2s" dur="7s" from="2320" to="100" repeatCount="indefinite" />
          </line>

          {/* vertical beams */}
          <line filter={ref("glow")} stroke={ref("blue-vert")} strokeWidth="2.5" x1="256" x2="256" y1="-250" y2="100">
            <animate attributeName="y1" begin="0.8s" dur="5.5s" from="-250" to="1000" repeatCount="indefinite" />
            <animate attributeName="y2" begin="0.8s" dur="5.5s" from="100" to="1350" repeatCount="indefinite" />
          </line>
          <line filter={ref("glow")} stroke={ref("green-vert")} strokeWidth="2.5" x1="640" x2="640" y1="-300" y2="100">
            <animate attributeName="y1" begin="2.5s" dur="6s" from="-300" to="1000" repeatCount="indefinite" />
            <animate attributeName="y2" begin="2.5s" dur="6s" from="100" to="1400" repeatCount="indefinite" />
          </line>
          <line stroke={ref("black-vert")} strokeWidth="2" x1="896" x2="896" y1="-200" y2="100">
            <animate attributeName="y1" begin="1.8s" dur="8s" from="-200" to="1000" repeatCount="indefinite" />
            <animate attributeName="y2" begin="1.8s" dur="8s" from="100" to="1300" repeatCount="indefinite" />
          </line>
          <line filter={ref("glow")} stroke={ref("blue-vert")} strokeWidth="2.5" x1="1152" x2="1152" y1="-250" y2="100">
            <animate attributeName="y1" begin="3.2s" dur="6.8s" from="-250" to="1000" repeatCount="indefinite" />
            <animate attributeName="y2" begin="3.2s" dur="6.8s" from="100" to="1350" repeatCount="indefinite" />
          </line>

          {/* pulsing nodes */}
          <circle cx="256" cy="128" fill="#00d2ff" filter={ref("glow")} r="3.5">
            <animate attributeName="opacity" dur="2.5s" values="0;0.9;0" repeatCount="indefinite" />
            <animate attributeName="r" dur="2.5s" values="2;5;2" repeatCount="indefinite" />
          </circle>
          <circle cx="640" cy="320" fill="#22C55E" filter={ref("glow")} r="3.5">
            <animate attributeName="opacity" begin="1s" dur="3s" values="0;0.95;0" repeatCount="indefinite" />
            <animate attributeName="r" begin="1s" dur="3s" values="2;5.5;2" repeatCount="indefinite" />
          </circle>
          <circle cx="896" cy="448" fill="#121212" r="3">
            <animate attributeName="opacity" begin="1.5s" dur="4s" values="0.2;0.8;0.2" repeatCount="indefinite" />
          </circle>
          <circle cx="1152" cy="256" fill="#3b82f6" filter={ref("glow")} r="3.5">
            <animate attributeName="opacity" begin="0.5s" dur="2.8s" values="0;0.9;0" repeatCount="indefinite" />
            <animate attributeName="r" begin="0.5s" dur="2.8s" values="2;5;2" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/60" />
    </div>
  );
}
