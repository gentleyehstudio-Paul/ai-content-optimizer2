// /ai-team 短影音設定。全部維持 null 時：頁面不顯示影片，也不輸出 VideoObject。
// 影片上傳 YouTube（Shorts）後由 Gentle 填入：

// 1. YouTube 影片 ID：網址 https://www.youtube.com/shorts/XXXXXXXXXXX 的最後一段
export const AI_TEAM_YOUTUBE_ID = null as string | null;

// 2. 上傳日期（ISO 8601，含時區），例如 "2026-11-02T10:00:00+08:00"
export const AI_TEAM_VIDEO_UPLOAD_DATE = null as string | null;

export const AI_TEAM_VIDEO = {
  name: "一人公司，也能有一支 AI 小團隊｜居葉設計 AI 團隊",
  description:
    "回客戶、整理資料都是你一個人？秘書、研究、客服三個 AI 角色分工擬稿、每天回報進度，每則對外訊息都先經你同意才送出。",
  duration: "PT18S",
};

// 兩個值都填好才啟用（VideoObject 必須有 uploadDate）
export function aiTeamVideoEnabled(): boolean {
  return Boolean(AI_TEAM_YOUTUBE_ID && AI_TEAM_VIDEO_UPLOAD_DATE);
}

export function aiTeamVideoThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
