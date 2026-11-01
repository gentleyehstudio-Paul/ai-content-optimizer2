"use client";

import { useState } from "react";

// 點擊才載入的 YouTube 嵌入：先只顯示封面圖與播放鍵，點了才載入 youtube-nocookie 的 iframe。
export function YouTubeFacade({ id, title, poster }: { id: string; title: string; poster: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative w-full max-w-[320px] aspect-[9/16] bg-ink overflow-hidden rounded-sm">
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          aria-label={`播放影片：${title}`}
          className="group absolute inset-0 w-full h-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute left-5 bottom-5 flex items-center gap-3 text-white text-[13px] tracking-[.12em]">
            <span className="w-12 h-12 rounded-sm bg-white/90 text-ink flex items-center justify-center group-hover:bg-white">
              ▶
            </span>
            播放 18 秒影片
          </span>
        </button>
      )}
    </div>
  );
}
