import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "隱私權政策｜Gentleyehstudio 居葉設計",
  description:
    "說明 gentleyehdesign.com 如何蒐集、處理與利用你的個人資料，包含聯絡表單、Google Analytics 4、LINE 官方帳號與 Email。",
  alternates: { canonical: "/privacy-policy" },
  // 暫不公開（2026-10-30 Gentle 決定先拿掉隱私頁連結）：不從任何頁面連入、不列入 sitemap。
  // 內容仍有【待 Gentle 確認】項目；確認完成、移除標記後，再拿掉 noindex、加回連結與 sitemap。
  robots: { index: false, follow: false },
};

const LINE_URL = "https://line.me/R/ti/p/%40kij2619w";

/** 尚未確認的內容：醒目標示，避免被誤認為正式條款 */
function TBD({ children }: { children: ReactNode }) {
  return (
    <mark
      style={{
        background: "#f6e3a1",
        color: "#191a18",
        padding: "0 4px",
        borderRadius: 2,
      }}
    >
      【待 Gentle 確認：{children}】
    </mark>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <article
      className="bg-paper"
      style={{
        paddingTop: "clamp(120px, 14vw, 200px)",
        paddingBottom: "clamp(72px, 9vw, 128px)",
      }}
    >
      <div className="max-w-[720px] mx-auto px-5">
        <p className="text-[11px] tracking-[.16em] uppercase font-medium text-text-secondary mb-6">
          PRIVACY POLICY
        </p>
        <h1
          className="font-bold text-ink"
          style={{
            fontSize: "clamp(28px, 3.6vw, 44px)",
            lineHeight: 1.15,
            letterSpacing: "-.02em",
          }}
        >
          隱私權政策
        </h1>

        <p
          role="note"
          className="mt-6 text-[14px] leading-relaxed"
          style={{
            background: "#f6e3a1",
            color: "#191a18",
            padding: "12px 16px",
            borderRadius: 2,
          }}
        >
          本頁為草稿，標示「待 Gentle 確認」的內容尚未定案，並非最終條款。
        </p>

        <div className="mt-10 prose-article">
          <p>
            <strong>最後更新：</strong>
            <TBD>生效日期</TBD>
          </p>
          <p>
            居葉國際文化有限公司（品牌名稱 Gentleyehstudio／居葉設計，以下稱「本公司」或「我們」）重視你的隱私。本政策說明你使用
            gentleyehdesign.com（以下稱「本網站」）時，我們如何蒐集、處理與利用你的個人資料，依據《個人資料保護法》辦理。
          </p>

          <h2>1. 蒐集者</h2>
          <ul>
            <li>名稱：居葉國際文化有限公司（Gentleyehstudio）</li>
            <li>
              負責人：葉致綱（Paul Yeh）<TBD>是否公開寫出姓名（問題 12）</TBD>
            </li>
            <li>
              聯絡方式：gentleyehstudio@gmail.com；LINE 官方帳號 @kij2619w
            </li>
          </ul>

          <h2>2. 我們蒐集哪些資料</h2>

          <h3>2.1 聯絡／詢價表單（/contact）</h3>
          <p>你主動填寫並送出時，我們會蒐集下列欄位：</p>
          <ul>
            <li>
              服務項目（你選擇的類別，如 AI 代理人開發、免費 AI
              診斷、PrintScale-AI 試用、企業 AI 培訓、品牌視覺設計、其他）
            </li>
            <li>姓名／聯絡人（必填）</li>
            <li>Email（必填）</li>
            <li>公司名稱（選填）</li>
            <li>電話（選填）</li>
            <li>
              需求說明（選填，內容由你自行填寫，請避免填寫與需求無關的敏感資料）
            </li>
          </ul>
          <p>
            資料送出後，會透過電子郵件寄送服務 Resend 寄到本公司信箱
            gentleyehstudio@gmail.com。
            <TBD>確認採用 Resend 及其資料處理所在地（問題 2、9）</TBD>
          </p>

          <h3>2.2 網站使用資料（Google Analytics 4）</h3>
          <p>
            本網站在所有頁面載入 Google Analytics 4（衡量 ID：G-TXGL9R0B66），由 Google
            提供。GA4 會透過 Cookie
            或類似技術蒐集匿名化的使用資料，例如：瀏覽的頁面、停留時間、點擊、來源網站、裝置與瀏覽器類型、大致地理位置（城市層級）、語言，以及
            Cookie 識別碼（一般為 _ga、_ga_&lt;ID&gt;）。GA4
            不會蒐集你的姓名或 Email，我們也不會把表單內容傳給 GA4。
          </p>
          <ul>
            <li>我們用這些資料了解網站使用情形、改善內容與提供服務。</li>
            <li>
              GA4 資料保留期間：<TBD>2 個月／14 個月（問題 4）</TBD>
            </li>
            <li>
              是否啟用 Google 信號／廣告功能：<TBD>問題 4</TBD>
            </li>
            <li>
              你可以安裝{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Google Analytics 停用瀏覽器外掛程式
              </a>
              ，或在瀏覽器設定中封鎖 Cookie 來拒絕。
            </li>
          </ul>

          <h3>2.3 LINE 官方帳號</h3>
          <p>
            本網站提供 LINE 官方帳號（@kij2619w）的 QR Code
            與連結，網站本身不載入 LINE 的追蹤碼或登入功能。若你加入好友並傳訊息，LINE
            平台會讓我們看到你的 LINE
            顯示名稱、頭像、用戶識別碼，以及你傳送的訊息與檔案。這些資料由 LINE
            公司依其隱私權政策處理，我們會用於回覆你的諮詢。
          </p>
          <ul>
            <li>
              LINE 對話保存：<TBD>保存期間與是否轉存其他系統（問題 7、8）</TBD>
            </li>
          </ul>

          <h3>2.4 Email 往來</h3>
          <p>
            你直接寄信到 gentleyehstudio@gmail.com
            時，我們會蒐集你的 Email 與信件內容，用於回覆。信箱由 Google（Gmail）提供服務。
          </p>

          <h3>2.5 我們沒有蒐集的資料</h3>
          <p>
            本網站目前沒有會員登入、線上付款、留言區，也沒有嵌入第三方影音或社群外掛。
            <TBD>
              是否使用 Meta Pixel、Google Ads
              等廣告追蹤；若沒有，可寫「本網站目前未使用廣告再行銷追蹤工具」（問題 5）
            </TBD>
          </p>

          <h2>3. 使用目的</h2>
          <ul>
            <li>回覆你的詢價、諮詢與預約需求（聯絡、報價、方案規劃）</li>
            <li>提供你所要求的服務（如 AI 診斷、培訓規劃）</li>
            <li>客戶管理與帳務、紀錄保存</li>
            <li>分析網站使用情形以改善內容與服務（GA4）</li>
            <li>
              <TBD>是否有寄送行銷資訊／電子報（問題 10）</TBD>
              ；未取得你的同意，我們不會寄送行銷信。
            </li>
          </ul>

          <h2>4. 利用的期間、地區、對象與方式</h2>
          <ul>
            <li>
              <strong>期間：</strong>
              <TBD>保存期間（問題 3）</TBD>
            </li>
            <li>
              <strong>地區：</strong>
              以臺灣地區為主；因使用 Google（GA4、Gmail）、Vercel（網站託管）、LINE
              及 Resend（表單通知郵件），資料可能於這些服務提供者所在地（含美國等境外地區）處理。
              <TBD>確認郵件服務所在地與揭露方式（問題 2、9）</TBD>
            </li>
            <li>
              <strong>對象：</strong>
              本公司及
              <TBD>是否有員工、外包或協力人員接觸資料（問題 1）</TBD>
              ，以及上述服務提供者（僅在提供服務所必要範圍內）。
            </li>
            <li>
              <strong>方式：</strong>以電子方式處理與儲存。
            </li>
          </ul>

          <h2>5. 第三方服務</h2>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>服務</th>
                  <th>用途</th>
                  <th>蒐集的資料</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Google Analytics 4（G-TXGL9R0B66）</td>
                  <td>網站流量分析</td>
                  <td>Cookie 識別碼、頁面瀏覽、裝置／地區（概略）</td>
                </tr>
                <tr>
                  <td>Vercel</td>
                  <td>網站託管</td>
                  <td>連線紀錄（IP、時間、網址）等伺服器日誌</td>
                </tr>
                <tr>
                  <td>LINE</td>
                  <td>官方帳號客服</td>
                  <td>見 2.3</td>
                </tr>
                <tr>
                  <td>Gmail（Google）</td>
                  <td>接收表單通知與 Email</td>
                  <td>見 2.1、2.4</td>
                </tr>
                <tr>
                  <td>Resend</td>
                  <td>傳送表單通知郵件</td>
                  <td>表單欄位（見 2.1）</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            我們不會出售你的個人資料。除法令要求或你同意外，不會提供給上述服務提供者以外的第三方。
          </p>

          <h2>6. Cookie</h2>
          <p>
            本網站使用 Google Analytics 設定的 Cookie（如 _ga、_ga_TXGL9R0B66）。
            <TBD>是否新增 Cookie 同意機制（問題 6）</TBD>
            你可以隨時在瀏覽器設定中刪除或封鎖
            Cookie；封鎖後網站大部分功能仍可使用。
          </p>

          <h2>7. 你的權利</h2>
          <p>依《個人資料保護法》第 3 條，就你的個人資料，你可以向我們：</p>
          <ol>
            <li>查詢或請求閱覽；</li>
            <li>請求製給複製本；</li>
            <li>請求補充或更正；</li>
            <li>請求停止蒐集、處理或利用；</li>
            <li>請求刪除。</li>
          </ol>
          <p>
            請以 Email 或 LINE
            聯絡我們，並說明你要行使的權利與足以辨識身分的資訊。我們將於
            <TBD>回覆時限，草稿建議 15 日（問題 14）</TBD>
            內處理並回覆。若因執行職務或業務所必須，依法得不依你的請求辦理時，我們會說明理由。
          </p>

          <h2>8. 不提供資料的影響</h2>
          <p>
            詢價表單的姓名與 Email
            為必填，若不提供，我們將無法回覆你的需求。其他欄位為選填。使用 GA4
            的資料是自動蒐集，你可以依第 2.2、6 節拒絕。
          </p>

          <h2>9. 資料安全</h2>
          <p>
            我們以合理的技術與管理措施保護資料（網站使用 HTTPS 加密連線）。
            <TBD>存取控制、信箱雙重驗證等實際措施；如要列出請提供</TBD>
            但網路傳輸無法保證絕對安全。
          </p>

          <h2>10. 兒童與未成年人</h2>
          <p>
            <TBD>是否加入「本網站不針對 18 歲以下兒少提供服務」（問題 16）</TBD>
          </p>

          <h2>11. 政策修訂</h2>
          <p>
            我們可能因法令或服務變更而修訂本政策，修訂後公布於本頁並更新「最後更新」日期。
          </p>

          <h2>12. 聯絡我們</h2>
          <ul>
            <li>公司：居葉國際文化有限公司（Gentleyehstudio／居葉設計）</li>
            <li>Email：gentleyehstudio@gmail.com</li>
            <li>
              LINE 官方帳號（居葉設計）：
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                @kij2619w
              </a>
            </li>
            <li>
              網站聯絡頁：
              <a href="/contact" className="underline">
                https://www.gentleyehdesign.com/contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
