"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// A dotted 3D globe on a canvas (no library): ~800 points on a sphere, turning on a tilted axis, with depth
// shading (near dots larger and brighter, far ones faint through the glassy sphere), a rim glow and a soft
// highlight. Client pins (illustrated people, public/avatars: not photos of real clients) ride on the surface and hide when they turn behind it; arcs rise from a canary
// "home" point (Toki, GMT+6) to each pin, with a pulse travelling out along them. The pin positions are
// decorative (the globe has no map). Animates only while on screen and the tab is visible; with reduced
// motion it draws one still frame. Decorative: aria-hidden.

const DOTS = 620;
const TILT = (-18 * Math.PI) / 180;
const SPIN = (2 * Math.PI) / 48_000; // one turn per 48s
const HOME: [number, number] = [23.8, 90.4];
const PINS: [number, number][] = [
  [48, 10],
  [38, -95],
  [-28, 140],
  [55, -30],
  [-12, 45],
];
const PIN_COLORS = ["#F3F2ED", "#FDF175", "#22C55E", "#60A5FA", "#9C9B95"]; // paper, canary, green, blue, graphite
const PIN_TEXT = "#121212";
const AVATARS = PINS.map((_, i) => `/avatars/person-${i + 1}.svg`);

const rad = (d: number) => (d * Math.PI) / 180;
type V = { x: number; y: number; z: number };

// lat/lon (radians) → rotated, tilted unit vector; y points down the screen
function project(lat: number, lon: number, rot: number): V {
  const x = Math.cos(lat) * Math.sin(lon + rot);
  const y = -Math.sin(lat);
  const z = Math.cos(lat) * Math.cos(lon + rot);
  return { x, y: y * Math.cos(TILT) - z * Math.sin(TILT), z: y * Math.sin(TILT) + z * Math.cos(TILT) };
}

// point on the great circle between a and b at t (0–1), lifted off the surface in the middle
function arcPoint(a: [number, number], b: [number, number], t: number, rot: number): V {
  const va = project(rad(a[0]), rad(a[1]), 0);
  const vb = project(rad(b[0]), rad(b[1]), 0);
  // slerp in the unrotated frame, then re-project via lat/lon so the arc turns with the globe
  const dot = Math.min(1, Math.max(-1, va.x * vb.x + va.y * vb.y + va.z * vb.z));
  const om = Math.acos(dot) || 1e-6;
  const s1 = Math.sin((1 - t) * om) / Math.sin(om);
  const s2 = Math.sin(t * om) / Math.sin(om);
  const p = { x: s1 * va.x + s2 * vb.x, y: s1 * va.y + s2 * vb.y, z: s1 * va.z + s2 * vb.z };
  // undo the tilt to get lat/lon back
  const y0 = p.y * Math.cos(TILT) + p.z * Math.sin(TILT);
  const z0 = -p.y * Math.sin(TILT) + p.z * Math.cos(TILT);
  const lat = Math.asin(Math.max(-1, Math.min(1, -y0)));
  const lon = Math.atan2(p.x, z0);
  const lift = 1 + 0.18 * Math.sin(Math.PI * t);
  const v = project(lat, lon, rot);
  return { x: v.x * lift, y: v.y * lift, z: v.z * lift };
}

export function Globe({ clients, className }: { clients: string[]; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Fibonacci sphere
    const golden = Math.PI * (3 - Math.sqrt(5));
    const dots = Array.from({ length: DOTS }, (_, i) => ({ lat: Math.asin(1 - (2 * (i + 0.5)) / DOTS), lon: i * golden }));
    const font = getComputedStyle(document.documentElement).getPropertyValue("--font-space-grotesk").trim() || "sans-serif";
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Avatars draw once loaded (the letter shows until then); redraw so a still globe gets them too
    const faces = AVATARS.map((src) => {
      const img = new Image();
      img.onload = () => draw(performance.now());
      img.src = src;
      return img;
    });

    let size = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      size = canvas.clientWidth;
      canvas.width = canvas.height = Math.round(size * dpr);
    };

    const draw = (time: number) => {
      const rot = reduce ? rad(-120) : time * SPIN + rad(-120); // starts with home on the near side
      const R = size * 0.42;
      const c = size / 2;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      // rim glow
      const glow = ctx.createRadialGradient(c, c, R * 0.9, c, c, R * 1.18);
      glow.addColorStop(0, "rgb(96 165 250 / 0.35)");
      glow.addColorStop(1, "rgb(96 165 250 / 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(c, c, R * 1.18, 0, Math.PI * 2);
      ctx.fill();

      // sphere body
      const body = ctx.createRadialGradient(c - R * 0.35, c - R * 0.4, R * 0.1, c, c, R);
      body.addColorStop(0, "#3f444e");
      body.addColorStop(1, "#121212");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.fill();

      // graticule: parallels every 30°, meridians every 30° (near side brighter); this is what reads as a globe
      const line = (pts: V[]) => {
        for (let k = 1; k < pts.length; k++) {
          const a = pts[k - 1];
          const b = pts[k];
          ctx.strokeStyle = `rgb(255 255 255 / ${a.z > 0 && b.z > 0 ? 0.08 + 0.14 * b.z : 0.035})`;
          ctx.beginPath();
          ctx.moveTo(c + a.x * R, c + a.y * R);
          ctx.lineTo(c + b.x * R, c + b.y * R);
          ctx.stroke();
        }
      };
      ctx.lineWidth = 1;
      for (const lat of [-60, -30, 0, 30, 60]) line(Array.from({ length: 61 }, (_, k) => project(rad(lat), rad(k * 6), rot)));
      for (let lon = 0; lon < 360; lon += 30) line(Array.from({ length: 31 }, (_, k) => project(rad(-90 + k * 6), rad(lon), rot)));

      // dots, far side first
      for (const d of dots) {
        const v = project(d.lat, d.lon, rot);
        const front = v.z > 0;
        const a = front ? 0.18 + 0.6 * v.z : 0.05;
        const r = front ? 0.7 + 1.1 * v.z : 0.6;
        ctx.fillStyle = `rgb(255 255 255 / ${a})`;
        ctx.beginPath();
        ctx.arc(c + v.x * R, c + v.y * R, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // arcs from home, with a pulse running out and back
      PINS.forEach((pin, i) => {
        ctx.lineWidth = 1.25;
        let prev: V | null = null;
        for (let s = 0; s <= 40; s++) {
          const p = arcPoint(HOME, pin, s / 40, rot);
          if (prev && p.z > -0.05 && prev.z > -0.05) {
            ctx.strokeStyle = `rgb(253 241 117 / ${0.25 + 0.45 * Math.max(0, p.z)})`;
            ctx.beginPath();
            ctx.moveTo(c + prev.x * R, c + prev.y * R);
            ctx.lineTo(c + p.x * R, c + p.y * R);
            ctx.stroke();
          }
          prev = p;
        }
        if (!reduce) {
          const t = ((time / 2600 + i * 0.37) % 1 + 1) % 1;
          const p = arcPoint(HOME, pin, t, rot);
          if (p.z > 0) {
            ctx.fillStyle = "#FDF175";
            ctx.beginPath();
            ctx.arc(c + p.x * R, c + p.y * R, 2.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // home point: canary dot with a ring
      const h = project(rad(HOME[0]), rad(HOME[1]), rot);
      if (h.z > 0) {
        const pulse = reduce ? 0 : (time / 1600) % 1;
        ctx.strokeStyle = `rgb(253 241 117 / ${0.8 * (1 - pulse)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(c + h.x * R, c + h.y * R, 5 + 10 * pulse, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#FDF175";
        ctx.beginPath();
        ctx.arc(c + h.x * R, c + h.y * R, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // client pins, nearest drawn last; scaled by depth, hidden behind the sphere
      PINS.map((pin, i) => ({ i, v: project(rad(pin[0]), rad(pin[1]), rot) }))
        .filter(({ v }) => v.z > 0.05)
        .sort((a, b) => a.v.z - b.v.z)
        .forEach(({ i, v }) => {
          const x = c + v.x * R;
          const y = c + v.y * R;
          const pr = 13 + 6 * v.z;
          ctx.globalAlpha = Math.min(1, v.z * 3);
          const face = faces[i];
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, pr, 0, Math.PI * 2);
          ctx.fillStyle = PIN_COLORS[i % PIN_COLORS.length];
          ctx.fill();
          if (face.complete && face.naturalWidth) {
            ctx.clip();
            ctx.drawImage(face, x - pr, y - pr, pr * 2, pr * 2);
          } else {
            ctx.fillStyle = PIN_TEXT;
            ctx.font = `700 ${Math.round(pr * 0.85)}px ${font}`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(clients[i]?.[0] ?? "", x, y + 0.5);
          }
          ctx.restore();
          // ring on top of the face
          ctx.globalAlpha = Math.min(1, v.z * 3);
          ctx.strokeStyle = "#121212";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, pr, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
        });

      // soft highlight, top-left
      const shine = ctx.createRadialGradient(c - R * 0.45, c - R * 0.5, 0, c - R * 0.45, c - R * 0.5, R * 0.9);
      shine.addColorStop(0, "rgb(255 255 255 / 0.12)");
      shine.addColorStop(1, "rgb(255 255 255 / 0)");
      ctx.fillStyle = shine;
      ctx.beginPath();
      ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.fill();
    };

    resize();
    let raf = 0;
    let visible = false;
    const loop = (t: number) => {
      draw(t);
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!raf && visible && !document.hidden && !reduce) raf = requestAnimationFrame(loop);
    };
    draw(performance.now());

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      start();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);
    document.addEventListener("visibilitychange", start);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", start);
    };
  }, [clients]);

  return <canvas ref={ref} aria-hidden className={cn("block aspect-square", className)} />;
}
