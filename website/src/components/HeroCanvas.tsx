"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const CHARS = "01アイウエオカキクケコ▲△▽▼◇◆●○□■".split("");

interface Particle {
  x: number;
  y: number;
  z: number;
  char: string;
  landed: boolean;
  glow: number;
  vy: number;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const draw = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const time = Date.now() * 0.001;

    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, w, h);

    const cols = 40;
    const rows = 20;
    const cellW = w / cols;
    const cellH = h / rows;
    const scrollOffset = (time * 30) % cellH;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    // Wireframe terrain grid
    ctx.strokeStyle = "rgba(255,255,255,.08)";
    ctx.lineWidth = 0.5;

    for (let r = 0; r < rows + 2; r++) {
      const y = r * cellH - scrollOffset + h * 0.3;
      const depth = r / rows;
      const perspective = 0.3 + depth * 0.7;
      const parallaxX = (mx - 0.5) * 20 * (1 - depth);
      const parallaxY = (my - 0.5) * 10 * (1 - depth);

      ctx.beginPath();
      for (let c = 0; c <= cols; c++) {
        const x = c * cellW + parallaxX;
        const noiseY =
          Math.sin(c * 0.3 + time * 0.5) * 15 * perspective +
          Math.cos(c * 0.2 + r * 0.4 + time * 0.3) * 10 * perspective;
        const py = y + noiseY + parallaxY;

        if (c === 0) ctx.moveTo(x, py);
        else ctx.lineTo(x, py);
      }
      ctx.stroke();

      if (r > 0) {
        for (let c = 0; c <= cols; c++) {
          const x = c * cellW + parallaxX;
          const noiseY =
            Math.sin(c * 0.3 + time * 0.5) * 15 * perspective +
            Math.cos(c * 0.2 + r * 0.4 + time * 0.3) * 10 * perspective;
          const prevDepth = (r - 1) / rows;
          const prevPerspective = 0.3 + prevDepth * 0.7;
          const prevParallaxX = (mx - 0.5) * 20 * (1 - prevDepth);
          const prevParallaxY = (my - 0.5) * 10 * (1 - prevDepth);
          const prevNoiseY =
            Math.sin(c * 0.3 + time * 0.5) * 15 * prevPerspective +
            Math.cos(c * 0.2 + (r - 1) * 0.4 + time * 0.3) *
              10 *
              prevPerspective;
          const prevY =
            (r - 1) * cellH - scrollOffset + h * 0.3 + prevNoiseY + prevParallaxY;
          const py = y + noiseY + parallaxY;

          ctx.beginPath();
          ctx.moveTo(
            c * cellW + prevParallaxX,
            prevY,
          );
          ctx.lineTo(x, py);
          ctx.stroke();
        }
      }
    }

    // Contour lines
    ctx.strokeStyle = "rgba(255,255,255,.04)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      const contourY = h * 0.35 + i * (h * 0.1);
      ctx.beginPath();
      for (let x = 0; x < w; x += 4) {
        const py =
          contourY +
          Math.sin(x * 0.005 + time * 0.4 + i) * 20 +
          Math.cos(x * 0.008 + time * 0.2) * 10;
        if (x === 0) ctx.moveTo(x, py);
        else ctx.lineTo(x, py);
      }
      ctx.stroke();
    }

    // Falling data characters
    for (let i = 0; i < 30; i++) {
      const seed = i * 137.5;
      const cx = ((seed * 7.3) % w);
      const fallSpeed = 40 + (seed % 60);
      const cy = ((time * fallSpeed + seed * 3) % (h * 1.2)) - h * 0.1;
      const alpha = Math.max(0, 1 - cy / h) * 0.5;

      if (cy < h * 0.8) {
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.font = "11px monospace";
        ctx.fillText(CHARS[i % CHARS.length], cx, cy);
      } else {
        const glowAlpha = Math.max(0, 1 - (cy - h * 0.8) / (h * 0.2)) * 0.8;
        ctx.beginPath();
        ctx.arc(cx, h * 0.8 + (seed % 40), 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${glowAlpha})`;
        ctx.fill();

        const driftX = Math.sin(time * 0.5 + i) * 30;
        const driftY = (time * 10 + seed) % (h * 0.3);
        ctx.beginPath();
        ctx.arc(cx + driftX, h * 0.8 + driftY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${glowAlpha * 0.4})`;
        ctx.fill();
      }
    }

    // Height-scale ruler (left edge)
    ctx.strokeStyle = "rgba(255,255,255,.15)";
    ctx.fillStyle = "rgba(255,255,255,.25)";
    ctx.font = "9px monospace";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 8; i++) {
      const ry = h * 0.25 + i * (h * 0.08);
      ctx.beginPath();
      ctx.moveTo(16, ry);
      ctx.lineTo(28, ry);
      ctx.stroke();
      ctx.fillText(`${800 - i * 100}`, 4, ry + 3);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      pausedRef.current = true;
      setPaused(true);
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    canvas.addEventListener("mousemove", onMouse);

    let observer: IntersectionObserver | null = null;
    let visible = true;

    observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.1 },
    );
    observer.observe(canvas);

    const handleVisibility = () => {
      if (document.hidden) visible = false;
      else visible = true;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const loop = () => {
      if (!pausedRef.current && visible) {
        draw(canvas);
      }
      animRef.current = requestAnimationFrame(loop);
    };

    // Draw one frame immediately
    draw(canvas);
    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer?.disconnect();
    };
  }, [draw]);

  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  };

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
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
