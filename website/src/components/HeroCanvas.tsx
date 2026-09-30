"use client";

import { useRef, useEffect, useState } from "react";

const CH = "0123456789ABCDEF/.-+:#";
const TONES = [0.18, 0.34, 0.55, 0.85];

export function HeroCanvas() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);
  const animRef = useRef<{ paused: boolean; update: () => void } | null>(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;
    const hero = heroEl;

    const cv = hero.querySelector("canvas") as HTMLCanvasElement;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const anim = { paused: false, update: () => {} };
    animRef.current = anim;

    let w = 0,
      h = 0,
      time = 0,
      last = 0,
      raf = 0,
      visible = true,
      mx = 0,
      my = 0,
      px = 0,
      py = 0,
      COLS = 0,
      ROWS = 0,
      hud = 0;
    let hudV: string[] = [];

    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

    const perm = new Uint8Array(512);
    const b = Array.from({ length: 256 }, (_, i) => i);
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    for (let i = 0; i < 512; i++) perm[i] = b[i & 255];

    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const gr = (hh: number, x: number, y: number) =>
      (hh & 1 ? -x : x) + (hh & 2 ? -y : y);

    function n2(x: number, y: number) {
      const X = Math.floor(x) & 255,
        Y = Math.floor(y) & 255,
        xf = x - Math.floor(x),
        yf = y - Math.floor(y),
        u = fade(xf),
        v = fade(yf);
      const aa = perm[perm[X] + Y],
        ab = perm[perm[X] + Y + 1],
        ba = perm[perm[X + 1] + Y],
        bb = perm[perm[X + 1] + Y + 1];
      return lerp(
        lerp(gr(aa, xf, yf), gr(ba, xf - 1, yf), u),
        lerp(gr(ab, xf, yf - 1), gr(bb, xf - 1, yf - 1), u),
        v,
      );
    }

    function env(x: number, z: number) {
      return (
        Math.exp(-((x - 0.08) ** 2 / 0.22 + (z - 0.5) ** 2 / 0.09)) +
        0.42 *
          Math.exp(-((x + 0.75) ** 2 / 0.12 + (z - 0.68) ** 2 / 0.06)) +
        0.3 *
          Math.exp(-((x - 0.95) ** 2 / 0.1 + (z - 0.72) ** 2 / 0.05)) +
        0.05
      );
    }

    function hgt(x: number, z: number, t: number) {
      const e = env(x, z),
        f = z * 3.2 + t * 0.22;
      const r = 1 - Math.abs(n2(x * 2.6, f)),
        r2 = 1 - Math.abs(n2(x * 6.3 + 11, f * 2.1 - t * 0.1));
      return (
        e * (0.32 + 0.5 * r * r + 0.18 * r2 * r2) +
        0.035 * n2(x * 9 - t * 0.05, z * 9 + t * 0.6)
      );
    }

    interface Glyph {
      x: number;
      z: number;
      y: number;
      v: number;
      ch: string;
      s: number;
      life: number;
    }

    const G: Glyph[] = [];

    function proj(x: number, y: number, z: number): [number, number, number] {
      const g = 1 / (1 + z * 2.3),
        g0 = 1 / 3.3,
        hz = h * 0.4 + py * 14,
        near = h * 1.04;
      return [
        w * 0.5 + px * 36 * g + x * w * 0.52 * g,
        hz + (near - hz) * ((g - g0) / (1 - g0)) - y * h * 0.62 * g,
        g,
      ];
    }

    function spawn(p: Glyph, fresh: boolean) {
      p.x = (rnd() * 2 - 1) * 1.25;
      p.z = 0.3 + rnd() * 0.65;
      p.y = 1.1 + rnd() * 0.9 + (fresh ? rnd() * 0.8 : 0);
      p.v = 0.12 + rnd() * 0.22;
      p.ch = CH[Math.floor(rnd() * CH.length)];
      p.s = 0;
      p.life = 0;
    }

    for (let i = 0; i < 90; i++) {
      const p = {} as Glyph;
      spawn(p, true);
      G.push(p);
    }

    let buf: Float32Array | null = null;

    function layout() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = hero.clientWidth;
      h = hero.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      COLS = w < 760 ? 96 : 176;
      ROWS = w < 760 ? 52 : 84;
      buf = new Float32Array(COLS * 3);
      if (anim.paused) render(time, 0);
    }

    function render(t: number, dt: number) {
      ctx!.fillStyle = "#050505";
      ctx!.fillRect(0, 0, w, h);

      const B: number[][] = [[], [], [], []];
      ctx!.lineWidth = 0.6;

      for (let r = ROWS - 1; r >= 0; r--) {
        const z = r / (ROWS - 1);
        const far = Math.min(1, (1 - z) * 4);
        ctx!.beginPath();
        for (let c = 0; c < COLS; c++) {
          const x = (c / (COLS - 1)) * 3.1 - 1.55,
            y = hgt(x, z, t),
            p = proj(x, y, z);
          buf![c * 3] = p[0];
          buf![c * 3 + 1] = p[1];
          buf![c * 3 + 2] = y;
          c ? ctx!.lineTo(p[0], p[1]) : ctx!.moveTo(p[0], p[1]);
          const k = Math.min(
            3,
            Math.floor(
              Math.max(0, y) * 3.4 * far + (r % 3 === 0 ? 0.6 : 0),
            ),
          );
          B[k].push(p[0], p[1], 0.5 + p[2] * 1.3);
        }
        ctx!.strokeStyle = `rgba(235,235,228,${(0.035 + 0.09 * (1 - z)) * far})`;
        ctx!.stroke();
      }

      for (let k = 0; k < 4; k++) {
        ctx!.fillStyle = `rgba(245,245,240,${TONES[k]})`;
        const a = B[k];
        for (let i = 0; i < a.length; i += 3)
          ctx!.fillRect(a[i], a[i + 1], a[i + 2], a[i + 2]);
      }

      ctx!.font = "9px ui-monospace,Menlo,monospace";
      ctx!.textBaseline = "middle";
      for (const p of G) {
        const sy = hgt(p.x, p.z, t);
        if (!p.s) {
          p.y -= p.v * dt;
          const q = proj(p.x, p.y, p.z),
            a = Math.min(1, (p.y - sy) * 2) * 0.7;
          ctx!.fillStyle = `rgba(240,240,235,${Math.max(0, a)})`;
          if (rnd() < 0.02) p.ch = CH[Math.floor(rnd() * CH.length)];
          ctx!.fillText(p.ch, q[0], q[1]);
          if (p.y <= sy) {
            p.s = 1;
            p.life = 0;
          }
        } else {
          p.life += dt;
          p.z -= dt * 0.07;
          p.x += n2(p.x * 2, p.z * 3 + t * 0.2) * dt * 0.12;
          const q = proj(p.x, sy + 0.01, p.z),
            a =
              Math.max(0, 1 - p.life / 6) * Math.min(1, p.life * 4);
          ctx!.fillStyle = `rgba(255,255,255,${a})`;
          ctx!.fillRect(q[0] - 1, q[1] - 1, 2.2, 2.2);
          ctx!.fillStyle = `rgba(255,255,255,${a * 0.12})`;
          ctx!.beginPath();
          ctx!.arc(q[0], q[1], 5, 0, 6.283);
          ctx!.fill();
          if (p.life > 6 || p.z < 0.02) spawn(p, false);
        }
      }

      hud -= dt;
      if (hud <= 0 || !hudV.length) {
        hud = 0.35;
        hudV = [
          (0.6 + rnd() * 0.4).toFixed(3),
          Math.floor(2800 + rnd() * 900).toLocaleString(),
          (rnd() * 99).toFixed(1),
          Math.floor(rnd() * 4096)
            .toString(16)
            .toUpperCase()
            .padStart(3, "0"),
        ];
      }

      if (w >= 760) {
        ctx!.textAlign = "right";
        ctx!.font = "9px ui-monospace,Menlo,monospace";
        const L: [string, string][] = [
          ["INK.FLOW", hudV[0]],
          ["DATA→INK", hudV[1]],
          ["DENSITY %", hudV[2]],
          ["CHANNEL", "0x" + hudV[3]],
        ];
        const x0 = w - Math.max(20, w * 0.045),
          y0 = h * 0.44;
        L.forEach((l, i) => {
          ctx!.fillStyle = "rgba(170,170,162,.8)";
          ctx!.fillText(l[0], x0 - 70, y0 + i * 16);
          ctx!.fillStyle = "rgba(245,245,240,.95)";
          ctx!.fillText(l[1], x0, y0 + i * 16);
        });
        ctx!.strokeStyle = "rgba(245,245,240,.25)";
        ctx!.beginPath();
        ctx!.moveTo(x0 - 150, y0 - 14);
        ctx!.lineTo(x0, y0 - 14);
        ctx!.stroke();
        ctx!.textAlign = "left";
        ctx!.fillStyle = "rgba(150,150,142,.7)";
        const xl = Math.max(20, w * 0.045);
        for (let i = 0; i < 5; i++) {
          const yy = h * (0.5 + i * 0.09);
          ctx!.fillText(String(2070 - i * 275), xl, yy);
          ctx!.fillRect(xl + 30, yy, 8, 1);
        }
        ctx!.textAlign = "start";
      }

      const vg = ctx!.createRadialGradient(
        w * 0.5,
        h * 0.55,
        Math.min(w, h) * 0.3,
        w * 0.5,
        h * 0.55,
        Math.max(w, h) * 0.75,
      );
      vg.addColorStop(0, "rgba(5,5,5,0)");
      vg.addColorStop(1, "rgba(5,5,5,.85)");
      ctx!.fillStyle = vg;
      ctx!.fillRect(0, 0, w, h);
    }

    function tick(now: number) {
      raf = 0;
      if (anim.paused || !visible || document.hidden) {
        last = 0;
        return;
      }
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      time += dt;
      px += (mx - px) * 0.05;
      py += (my - py) * 0.05;
      render(time, dt);
      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (!raf && !anim.paused && visible && !document.hidden)
        raf = requestAnimationFrame(tick);
    }

    anim.update = () => {
      if (anim.paused) {
        cancelAnimationFrame(raf);
        raf = 0;
        last = 0;
        render(time, 0);
      } else {
        start();
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || anim.paused) return;
      const r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / w - 0.5;
      my = (e.clientY - r.top) / h - 0.5;
    };
    const onLeave = () => {
      mx = my = 0;
    };
    const onVis = () => start();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      anim.paused = true;
      setPaused(true);
    }
    const onReduced = (e: MediaQueryListEvent) => {
      anim.paused = e.matches;
      setPaused(e.matches);
      anim.update();
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    reduced.addEventListener("change", onReduced);

    const ro = new ResizeObserver(layout);
    ro.observe(hero);
    const io = new IntersectionObserver((e) => {
      visible = e[0].isIntersecting;
      start();
    });
    io.observe(hero);

    layout();
    if (anim.paused) {
      time = 4;
      render(time, 0);
    }
    start();

    cleanupRef.current = () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      reduced.removeEventListener("change", onReduced);
    };

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
      animRef.current = null;
    };
  }, []);

  const togglePause = () => {
    if (!animRef.current) return;
    const next = !paused;
    setPaused(next);
    animRef.current.paused = next;
    animRef.current.update();
  };

  return (
    <div ref={heroRef} className="absolute inset-0 w-full h-full">
      <canvas data-river="1" className="absolute inset-0 w-full h-full" />
      <button
        onClick={togglePause}
        className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 text-[10px] transition-colors z-10"
        aria-label={paused ? "Play animation" : "Pause animation"}
      >
        {paused ? "▶" : "⏸"}
      </button>
    </div>
  );
}
