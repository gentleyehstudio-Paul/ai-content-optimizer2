"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export function AgentsHeroCanvas() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);
  const animRef = useRef<{
    paused: boolean;
    update: () => void;
    setPaused: (p: boolean) => void;
  } | null>(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;
    const hero = heroEl;

    const canvasEl = hero.querySelector<HTMLCanvasElement>("[data-glass]");
    const inkCanvasEl = hero.querySelector<HTMLCanvasElement>("[data-ink]");
    if (!canvasEl || !inkCanvasEl) return;
    const ctxEl = canvasEl.getContext("2d");
    const ictxEl = inkCanvasEl.getContext("2d");
    if (!ctxEl || !ictxEl) return;
    const luluEl = hero.querySelector<HTMLImageElement>("[data-lulu]");
    const milesEl = hero.querySelector<HTMLImageElement>("[data-miles]");
    const tlEl = hero.querySelector<HTMLElement>("[data-tag-lulu]");
    const tmEl = hero.querySelector<HTMLElement>("[data-tag-miles]");
    const zoneEl = hero.querySelector<HTMLElement>("[data-zone]");
    if (!luluEl || !milesEl || !tlEl || !tmEl || !zoneEl) return;

    const canvas = canvasEl;
    const inkEl = inkCanvasEl;
    const ctx = ctxEl;
    const ictx = ictxEl;
    const lulu = luluEl;
    const miles = milesEl;
    const tl = tlEl;
    const tm = tmEl;
    const zone = zoneEl;

    [lulu, miles].forEach((img) => {
      img.onerror = () => {
        img.style.visibility = "hidden";
      };
    });

    const perm = new Uint8Array(512);
    const base = Array.from({ length: 256 }, (_, i) => i);
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [base[i], base[j]] = [base[j], base[i]];
    }
    for (let i = 0; i < 512; i++) perm[i] = base[i & 255];

    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (t: number, a: number, b: number) => a + t * (b - a);
    const grad = (hh: number, x: number, y: number) => {
      const k = hh & 15;
      const u = k < 8 ? x : y;
      const v = k < 8 ? y : x;
      return (k & 1 ? -u : u) + (k & 2 ? -v : v);
    };

    function noise(x: number, y: number) {
      const xi = Math.floor(x) & 255,
        yi = Math.floor(y) & 255,
        xf = x - Math.floor(x),
        yf = y - Math.floor(y),
        u = fade(xf),
        v = fade(yf);
      const aa = perm[perm[xi] + yi],
        ab = perm[perm[xi] + yi + 1],
        ba = perm[perm[xi + 1] + yi],
        bb = perm[perm[xi + 1] + yi + 1];
      return lerp(
        v,
        lerp(u, grad(aa, xf, yf), grad(ba, xf - 1, yf)),
        lerp(u, grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1)),
      );
    }

    const anim = { paused: false, update: () => {} };
    const self = {
      props: { ringMode: "orbit" as string, inkField: "on" as string },
      anim,
      setPaused(p: boolean) {
        this.anim.paused = p;
        this.anim.update();
      },
    };
    animRef.current = {
      paused: false,
      update: () => anim.update(),
      setPaused: (p: boolean) => {
        anim.paused = p;
        setPaused(p);
        anim.update();
      },
    };

    let visible = true,
      w = 0,
      h = 0,
      time = 0,
      last = 0,
      raf = 0,
      mx = 0,
      my = 0,
      px = 0,
      py = 0;
    const L = { cx: 0, cy: 0, R: 1, m: false };

    const NODES = 40;
    interface InkParticle {
      S: number[][];
      node: boolean;
      drop: boolean;
      spark: boolean;
      d: number;
      ang: number;
      amp: number;
      tone: number;
      tile: number;
      ph: number;
      r: number;
    }
    let INK: InkParticle[] | null = null;
    let PX: Float32Array | null = null;
    let PY: Float32Array | null = null;

    const hash = (x: number) => {
      const s = Math.sin(x * 127.1 + 311.7) * 43758.5453;
      return s - Math.floor(s);
    };

    function buildSwarm(n: number): InkParticle[] {
      const rnd = Math.random;
      const P: InkParticle[] = [];
      const tiles: number[][] = [];
      for (let r = 0; r < 4; r++)
        for (let c = 0; c < 5; c++)
          if (!((r + c) % 2))
            tiles.push([
              c - 2 + (rnd() - 0.5) * 0.12,
              r - 1.5 + (rnd() - 0.5) * 0.12,
            ]);
      const nT = tiles.length;
      const bz = (s: number): [number, number] => {
        const a = 1 - s;
        const p: [number, number][] = [
          [-2.7, 1.0],
          [-1.2, -1.7],
          [1.0, 1.7],
          [2.8, -0.9],
        ];
        return [0, 1].map(
          (k) =>
            a * a * a * p[0][k] +
            3 * a * a * s * p[1][k] +
            3 * a * s * s * p[2][k] +
            s * s * s * p[3][k],
        ) as [number, number];
      };
      const bzN = (s: number): [number, number] => {
        const a2 = bz(Math.max(0, s - 0.002));
        const b2 = bz(Math.min(1, s + 0.002));
        const dx = b2[0] - a2[0],
          dy = b2[1] - a2[1],
          l2 = Math.hypot(dx, dy) || 1;
        return [-dy / l2, dx / l2];
      };
      for (let i = 0; i < n; i++) {
        const node = i < NODES;
        let A: number[];
        if (node) {
          const tk = Math.floor(i / 4) % nT;
          const cr = i % 4;
          A = [
            tiles[tk][0] + [-0.5, 0.5, 0.5, -0.5][cr] * 0.94,
            tiles[tk][1] + [-0.5, -0.5, 0.5, 0.5][cr] * 0.94,
            0,
          ];
        } else {
          const tk = i % nT;
          A = [
            tiles[tk][0] + (rnd() - 0.5) * 0.94,
            tiles[tk][1] + (Math.pow(rnd(), 0.75) - 0.5) * 0.94,
            0,
          ];
        }
        const s = node ? i / (NODES - 1) : rnd();
        const b = bz(s);
        const nn = bzN(s);
        const wid = Math.sin(Math.PI * Math.pow(s, 0.55)) * 0.95 + 0.06;
        const lane = Math.floor(rnd() * 11);
        let off = node ? 0 : ((lane + rnd() * 0.7) / 11 - 0.5) * wid;
        if (!node && s > 0.62 && lane % 3 === 0) off *= 1.6;
        const B = [
          b[0] + nn[0] * off,
          b[1] + nn[1] * off,
          (rnd() - 0.5) * 0.1,
        ];
        const th = (0.1 + (node ? i / (NODES - 1) : rnd()) * 1.85) * Math.PI;
        const tt = (th / Math.PI - 0.1) / 1.85;
        const ew = 0.62 * Math.pow(1 - tt, 0.6) + 0.05;
        const rr = 2.05 + (node ? 0 : (rnd() - 0.5) * ew);
        const C = [
          Math.cos(th - 1.9) * rr,
          Math.sin(th - 1.9) * rr,
          (rnd() - 0.5) * 0.1,
        ];
        const drop = !node && rnd() < 0.05;
        const spark = !node && !drop && rnd() < 0.018;
        if (drop) {
          B[0] += (rnd() - 0.5) * 0.9;
          B[1] += (rnd() - 0.5) * 0.9;
          const k = 1 + (rnd() - 0.3) * 0.2;
          C[0] *= k;
          C[1] *= k;
        }
        P.push({
          S: [A, B, C],
          node,
          drop,
          spark,
          d: rnd() * 0.35,
          ang: rnd() * 6.283,
          amp: 0.3 + rnd() * 0.9,
          tone: Math.floor(rnd() * 3),
          tile: i % nT,
          ph: rnd() * 6.283,
          r: 1.4 + rnd() * 1.6,
        });
      }
      return P;
    }

    function drawSwarm(t: number) {
      if (!INK) {
        INK = buildSwarm(w < 760 ? 1700 : 3200);
        PX = new Float32Array(INK.length);
        PY = new Float32Array(INK.length);
      }
      const cell = L.m ? w * 0.15 : Math.min(w, h * 1.35) * 0.12;
      const F = cell * 10;
      const seg = 6,
        hold = 3.6,
        cyc = t % (seg * 3),
        si = Math.floor(cyc / seg),
        lt = cyc - si * seg;
      const g = lt < hold ? 0 : (lt - hold) / (seg - hold);
      const nx = (si + 1) % 3;
      const ease = (p: number) =>
        p < 0.5
          ? 4 * p * p * p
          : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const TF = [1, 0.4, 0.35];
      const tf = TF[si] + (TF[nx] - TF[si]) * ease(g);
      const rx =
          (0.55 + Math.sin(t * 0.21) * 0.1) * tf + py * 0.25,
        ry = Math.sin(t * 0.15) * 0.4 * tf + px * 0.35,
        rz = (-0.3 + Math.sin(t * 0.09) * 0.08) * tf;
      const cxR = Math.cos(rx),
        sxR = Math.sin(rx),
        cyR = Math.cos(ry),
        syR = Math.sin(ry),
        czR = Math.cos(rz),
        szR = Math.sin(rz);
      for (let i = 0; i < INK.length; i++) {
        const qn = INK[i];
        const a = qn.S[si],
          b = qn.S[nx];
        const p = Math.min(1, Math.max(0, (g - qn.d) / 0.65));
        const e = ease(p);
        let x = a[0] + (b[0] - a[0]) * e,
          y = a[1] + (b[1] - a[1]) * e,
          z = a[2] + (b[2] - a[2]) * e;
        const tileW = (si === 0 ? 1 - e : 0) + (nx === 0 ? e : 0);
        z += Math.sin(t * 0.6 + qn.tile) * 0.14 * tileW;
        const ds = Math.sin(p * Math.PI) * qn.amp * 0.7 + 0.025;
        const fx = x * 0.7 + t * 0.12,
          fy = y * 0.7 - t * 0.09;
        const an = qn.ang * 0.25 + noise(fx, fy) * 6.283;
        x += Math.cos(an) * ds;
        y += Math.sin(an) * ds * 0.85;
        z += noise(fy + 9.1, fx) * ds * 1.4;
        let x1 = x * czR - y * szR,
          y1 = x * szR + y * czR;
        const y2 = y1 * cxR - z * sxR,
          z2 = y1 * sxR + z * cxR;
        const x3 = x1 * cyR + z2 * syR,
          z3 = -x1 * syR + z2 * cyR;
        const k = F / (F - z3 * cell);
        PX![i] = L.cx + x3 * cell * k;
        PY![i] = L.cy + y2 * cell * k;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "multiply";
      const TONES = [
        "rgba(22,24,22,.14)",
        "rgba(22,24,22,.28)",
        "rgba(22,24,22,.5)",
      ];
      const SZ = [1.1, 1.4, 1.8];
      for (let tn = 0; tn < 3; tn++) {
        ctx.fillStyle = TONES[tn];
        const sz0 = SZ[tn];
        for (let i = NODES; i < INK.length; i++) {
          const qn = INK[i];
          if (qn.tone !== tn || qn.drop || qn.spark) continue;
          ctx.fillRect(PX![i], PY![i], sz0, sz0);
        }
      }
      ctx.fillStyle = "rgba(20,22,20,.55)";
      for (let i = NODES; i < INK.length; i++) {
        const qn = INK[i];
        if (!qn.drop) continue;
        ctx.beginPath();
        ctx.arc(PX![i], PY![i], qn.r, 0, 6.283);
        ctx.fill();
      }
      ctx.fillStyle = "rgba(194,58,42,.85)";
      for (let i = NODES; i < INK.length; i++) {
        if (INK[i].spark) ctx.fillRect(PX![i], PY![i], 2, 2);
      }
      const seed = Math.floor(t * 14);
      const lim = cell * 1.25;
      const bolt = (a: number, b: number, j: number) => {
        const dx = PX![b] - PX![a],
          dy = PY![b] - PY![a],
          len = Math.hypot(dx, dy);
        if (len > lim || len < 1) return;
        const hot = hash(j + seed * 3.1) > 0.93;
        ctx.strokeStyle = hot
          ? "rgba(194,58,42,.9)"
          : "rgba(25,26,24,.5)";
        ctx.lineWidth = hot ? 1.1 : 0.7;
        ctx.beginPath();
        ctx.moveTo(PX![a], PY![a]);
        for (let s = 1; s < 4; s++) {
          const f = s / 4;
          const jt = (hash(j * 7.3 + seed + s) - 0.5) * len * 0.18;
          ctx.lineTo(
            PX![a] + dx * f - (dy / len) * jt,
            PY![a] + dy * f + (dx / len) * jt,
          );
        }
        ctx.lineTo(PX![b], PY![b]);
        ctx.stroke();
      };
      for (let j = 0; j < NODES - 1; j++) bolt(j, j + 1, j);
      for (let j = 3; j < NODES; j += 4) bolt(j, j - 3, j + 100);
      for (let j = 0; j < NODES; j++) {
        ctx.fillStyle = "rgba(25,26,24,.08)";
        ctx.beginPath();
        ctx.arc(PX![j], PY![j], 6, 0, 6.283);
        ctx.fill();
        ctx.fillStyle = j % 9 === 0 ? "#a63328" : "#191a18";
        ctx.beginPath();
        ctx.arc(PX![j], PY![j], 1.9, 0, 6.283);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    }

    function place(
      el: HTMLElement,
      x: number,
      y: number,
      width?: number,
    ) {
      el.style.position = "absolute";
      el.style.left = x + "px";
      el.style.top = y + "px";
      if (width) el.style.width = width + "px";
    }

    function layout() {
      w = hero.clientWidth;
      h = hero.clientHeight;
      const d = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * d;
      canvas.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
      const di = Math.min(d, 1.5);
      inkEl.width = w * di;
      inkEl.height = h * di;
      ictx.setTransform(di, 0, 0, di, 0, 0);
      const m = w < 760;
      const zr = zone.getBoundingClientRect();
      const hr = hero.getBoundingClientRect();
      const zt = zr.top - hr.top;
      const zh = Math.max(zr.height, 220);
      if (m) {
        const lw = Math.min(w * 0.5, zh * 0.88);
        const mw = Math.min(w * 0.44, zh * 0.8);
        L.m = true;
        L.cx = w * 0.5;
        L.cy = h * 0.5;
        L.R = w * 0.39;
        place(lulu, w * 0.5 - lw * 0.98, zt + zh * 0.02, lw);
        place(miles, w * 0.5 + lw * 0.02, zt + zh * 0.14, mw);
        tl.style.display = tm.style.display = "none";
      } else {
        const s = Math.min(zh * 0.98, w * 0.2, 400);
        const ly = zt + (zh - s) / 2;
        const lx = w * 0.5 - s * 1.02;
        const mx0 = w * 0.5 + s * 0.02;
        L.m = false;
        L.cx = w * 0.5;
        L.cy = h * 0.5;
        L.R = Math.min(w * 0.25, h * 0.42);
        place(lulu, lx, ly, s);
        place(miles, mx0, ly + s * 0.06, s * 0.92);
        tl.style.display = tm.style.display = "block";
        place(tl, lx - 110, ly + s * 0.7);
        place(tm, mx0 + s * 0.95, ly + s * 0.74);
      }
      INK = null;
      render(time);
    }

    function drawInk(t: number) {
      ictx.clearRect(0, 0, w, h);
      if (self.props.inkField === "off") return;
      const T = t * 1.8;
      const cxI = L.cx + px * 22;
      const cyI = L.cy + py * 14;
      const R = L.R;
      const mid = 0.3 + Math.sin(T * 0.015 * 30) * 0.2;
      const high = 0.25 + Math.sin(T * 0.02 * 30) * 0.15;
      for (let l = 0; l < 12; l++) {
        const e = 0.3 + Math.sin(T * 0.6 + l * 0.5) * 0.2;
        ictx.strokeStyle = `rgba(25,26,24,${e * 0.4})`;
        ictx.lineWidth = 0.6 + e;
        ictx.beginPath();
        ictx.arc(
          cxI,
          cyI,
          (R * 1.9 * (l + 1)) / 12 + e * 40,
          0,
          Math.PI * 2,
        );
        ictx.stroke();
      }
      const f1 = 0.5 + Math.sin(T * 0.6) * 0.3;
      const f2 = 0.4 + Math.cos(T * 0.45) * 0.3;
      const ls = R * 0.42 * (0.5 + mid);
      ictx.strokeStyle = `rgba(166,51,40,${0.18 + high * 0.3})`;
      ictx.lineWidth = 1.1;
      for (let qd = 0; qd < 4; qd++) {
        const flip = qd % 2 ? -1 : 1;
        const rot = (qd / 4) * Math.PI * 2;
        ictx.beginPath();
        for (let s = 0; s < Math.PI * 2; s += 0.05) {
          const xL = cxI + Math.sin(s * f1 * 3 + rot) * ls * flip;
          const yL = cyI + Math.cos(s * f2 * 2 + rot) * ls;
          s ? ictx.lineTo(xL, yL) : ictx.moveTo(xL, yL);
        }
        ictx.closePath();
        ictx.stroke();
      }
    }

    function pointFn(
      u: number,
      v: number,
      t: number,
    ): { x: number; y: number; z: number } {
      const R = L.R;
      const r = R * 0.13;
      const x = (R + r * Math.cos(v)) * Math.cos(u);
      const y = (R + r * Math.cos(v)) * Math.sin(u);
      const z = r * Math.sin(v);
      const a = 0.85 + Math.sin(t * 0.17) * 0.2;
      const b = t * 0.18;
      const y1 = y * Math.cos(a) - z * Math.sin(a);
      const z1 = y * Math.sin(a) + z * Math.cos(a);
      const x1 = x * Math.cos(b) + z1 * Math.sin(b);
      const z2 = -x * Math.sin(b) + z1 * Math.cos(b);
      const p = 900 / (900 - z2);
      return {
        x: L.cx + x1 * p + px * 14,
        y: L.cy + y1 * p + py * 9,
        z: z2,
      };
    }

    function drawRing(t: number) {
      ctx.clearRect(0, 0, w, h);
      const U = L.m ? 72 : 100;
      const V = 12;
      const du = (2 * Math.PI) / U;
      const dv = (2 * Math.PI) / V;
      const faces: {
        p: { x: number; y: number; z: number }[];
        z: number;
        i: number;
        j: number;
      }[] = [];
      for (let i = 0; i < U; i++)
        for (let j = 0; j < V; j++) {
          const u = i * du,
            v = j * dv;
          const p = [
            pointFn(u, v, t),
            pointFn(u + du, v, t),
            pointFn(u + du, v + dv, t),
            pointFn(u, v + dv, t),
          ];
          faces.push({
            p,
            z: (p[0].z + p[1].z + p[2].z + p[3].z) / 4,
            i,
            j,
          });
        }
      faces.sort((a, b) => a.z - b.z);
      for (const f of faces) {
        const light = Math.pow(
          Math.max(
            0,
            Math.cos(
              (f.j / V) * Math.PI * 2 + (f.i / U) * 3 + t * 0.18,
            ),
          ),
          12,
        );
        ctx.beginPath();
        f.p.forEach((p, k) =>
          k ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y),
        );
        ctx.closePath();
        ctx.fillStyle = `rgba(${Math.round(150 + light * 105)},${Math.round(163 + light * 92)},${Math.round(160 + light * 95)},${0.1 + light * 0.66})`;
        ctx.fill();
        if (light > 0.62) {
          ctx.strokeStyle = `rgba(255,255,250,${light * 0.6})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    function render(t: number, dt = 0) {
      drawInk(t);
      drawSwarm(t);
      lulu.style.transform = `translate(${px * 9}px,${Math.sin(t * 0.65) * 12 + py * 6}px) rotate(${Math.sin(t * 0.4) * 3 - 4}deg)`;
      miles.style.transform = `translate(${px * 17}px,${Math.sin(t * 0.65 + 2) * 17 + py * 10}px) rotate(${Math.sin(t * 0.4 + 1) * 4 + 5}deg)`;
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
      } else {
        start();
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || anim.paused) return;
      const b = hero.getBoundingClientRect();
      mx = (e.clientX - b.left) / w - 0.5;
      my = (e.clientY - b.top) / h - 0.5;
    };
    const onLeave = () => {
      mx = my = 0;
    };
    const onVis = () => start();

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (reduced.matches) {
      anim.paused = true;
      setPaused(true);
    }
    const onReduced = (e: MediaQueryListEvent) => {
      self.setPaused(e.matches);
      setPaused(e.matches);
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
    animRef.current.setPaused(next);
  };

  return (
    <div ref={heroRef} className="absolute inset-0 w-full h-full">
      <canvas
        data-ink="1"
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.5 }}
      />
      <canvas
        data-glass="1"
        className="absolute inset-0 w-full h-full"
      />
      <Image
        data-lulu=""
        src="/assets/lulu.png"
        alt="Lulu"
        width={400}
        height={400}
        className="absolute pointer-events-none"
        style={{ willChange: "transform" }}
        draggable={false}
      />
      <Image
        data-miles=""
        src="/assets/miles.png"
        alt="Miles"
        width={400}
        height={400}
        className="absolute pointer-events-none"
        style={{ willChange: "transform" }}
        draggable={false}
      />
      <div
        data-tag-lulu=""
        className="hidden lg:block absolute text-[11px] tracking-[.1em] uppercase font-medium"
        style={{ color: "#51594f" }}
      >
        <span className="text-red font-bold">01</span> / LULU
        <br />
        <span className="font-semibold text-ink">BRAND, PRESERVED.</span>
      </div>
      <div
        data-tag-miles=""
        className="hidden lg:block absolute text-[11px] tracking-[.1em] uppercase font-medium"
        style={{ color: "#51594f" }}
      >
        <span className="text-red font-bold">02</span> / MILES
        <br />
        <span className="font-semibold text-ink">READY TO GO.</span>
      </div>
      <div data-zone="" className="absolute inset-0" />
      <button
        onClick={togglePause}
        className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-ink/60 text-[10px] transition-colors z-10"
        aria-label={paused ? "Play animation" : "Pause animation"}
      >
        {paused ? "▶" : "⏸"}
      </button>
    </div>
  );
}
