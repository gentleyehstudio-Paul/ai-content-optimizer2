"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

interface BeforeAfterProps {
  beforeSrc?: string;
  afterSrc?: string;
  beforeLabel?: string;
  afterLabel?: string;
  ratio?: string;
  variant?: "logo" | "deai" | "upscale" | "idcard";
}

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  ratio = "16/10",
  variant,
}: BeforeAfterProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPos(Math.round(pct));
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePos(e.clientX);
    },
    [updatePos],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      updatePos(e.clientX);
    },
    [updatePos],
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
  }, []);

  const renderLogo = (isBefore: boolean) => {
    if (isBefore) {
      return (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: "linear-gradient(160deg, #4b3f6b 0%, #1d2c4a 70%)",
            filter: "saturate(1.3)",
          }}
        >
          <div
            className="absolute left-0 right-0 bottom-0 h-[34%]"
            style={{
              background: "linear-gradient(180deg, #27315a, #0f1530)",
            }}
          />
          <div
            className="relative px-[8%] py-[6%]"
            style={{
              background: "linear-gradient(135deg, #fdf6ff, #d9e4ff)",
              borderRadius: 14,
              boxShadow: "0 0 50px rgba(160,140,255,.55)",
              transform: "perspective(600px) rotateY(-14deg) skewX(-8deg)",
            }}
          >
            <div
              className="text-[clamp(16px,2.4vw,30px)] font-bold tracking-tight whitespace-nowrap"
              style={{
                color: "#2b2a45",
                filter: "blur(.7px)",
                transform: "skewY(-3deg)",
                letterSpacing: "-.01em",
              }}
            >
              gentIeyh
              <span className="font-normal" style={{ letterSpacing: ".06em" }}>
                sutdoi
              </span>
            </div>
            <div
              className="mt-1.5 text-[clamp(8px,.8vw,10px)] tracking-[.2em]"
              style={{ color: "#6b6a8f", filter: "blur(1px)" }}
            >
              BRAND-SAEF VISUAI AGNETS
            </div>
          </div>
        </div>
      );
    }
    return (
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: "linear-gradient(160deg, #3a423a 0%, #1e261f 70%)",
        }}
      >
        <div
          className="absolute left-0 right-0 bottom-0 h-[34%]"
          style={{ background: "linear-gradient(180deg, #2a322b, #141a15)" }}
        />
        <div
          className="relative px-[8%] py-[6%]"
          style={{
            background: "linear-gradient(180deg, #f7f6f2, #e6e6df)",
            borderRadius: 4,
            boxShadow: "0 24px 40px rgba(0,0,0,.35)",
            transform: "perspective(600px) rotateY(-14deg)",
          }}
        >
          <div
            className="text-[clamp(16px,2.4vw,30px)] font-bold whitespace-nowrap"
            style={{ color: "#191a18", letterSpacing: "-.03em" }}
          >
            gentleyeh
            <span className="font-normal">studio</span>
            <sup className="text-[.35em] font-normal">®</sup>
          </div>
          <div
            className="mt-1.5 text-[clamp(8px,.8vw,10px)] tracking-[.2em]"
            style={{ color: "#5d645b" }}
          >
            BRAND-SAFE VISUAL AGENTS
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label="Before/After comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pos}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
      className="relative w-full overflow-hidden bg-[#e4e6e0] select-none outline-offset-4"
      style={{
        aspectRatio: ratio,
        borderRadius: 14,
        cursor: "ew-resize",
        touchAction: "pan-y",
      }}
    >
      {/* After layer (bottom) */}
      <div className="absolute inset-0">
        {variant === "logo" ? (
          renderLogo(false)
        ) : afterSrc ? (
          <Image
            src={afterSrc}
            alt=""
            fill
            className="object-cover"
            draggable={false}
          />
        ) : null}
      </div>

      {/* Before layer (top, clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        {variant === "logo" ? (
          renderLogo(true)
        ) : beforeSrc ? (
          <Image
            src={beforeSrc}
            alt=""
            fill
            className="object-cover"
            draggable={false}
          />
        ) : null}
      </div>

      {/* Labels */}
      <div
        className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[10px] tracking-[.14em] pointer-events-none"
        style={{ background: "rgba(25,26,24,.72)" }}
      >
        {beforeLabel}
      </div>
      <div
        className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-ink text-[10px] tracking-[.14em] pointer-events-none"
        style={{ background: "rgba(255,255,255,.86)" }}
      >
        {afterLabel}
      </div>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 w-[2px] -ml-px bg-white pointer-events-none"
        style={{
          left: `${pos}%`,
          boxShadow: "0 0 0 1px rgba(0,0,0,.08)",
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 w-[44px] h-[44px] -mt-[22px] -ml-[22px] rounded-full bg-white flex items-center justify-center gap-1.5 text-ink text-[12px]"
          style={{ boxShadow: "0 6px 18px rgba(30,38,31,.25)" }}
        >
          <span>‹</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red" />
          <span>›</span>
        </div>
      </div>
    </div>
  );
}
