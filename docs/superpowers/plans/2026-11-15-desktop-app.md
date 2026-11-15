# 召喚本色 Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** 交付可在 Windows 執行的 Electron app，讓零位置知識的新手透過 30 題得到位置與英雄推薦。

**Architecture:** React renderer 使用本地題庫與英雄特徵進行確定性計分，保存本地作答進度。Electron 封裝 renderer，官方美術一併打包以支援離線使用。

**Tech Stack:** Electron、React、TypeScript、Vite、electron-builder。

**Spec:** 本次對話已選定 Electron＋React＋TypeScript，24 題生活題加 6 題奇幻偏好題，173 位英雄調查見 `docs/research/champion-survey-2026-11-15.md`。

## Global Constraints

- 使用繁體中文，生活題不要求遊戲知識，第29與30題保留尚無偏好選項。
- 第一版使用本地推薦模型，結果說明玩法偏好與練習方向。
- 所有 173 位英雄進入候選，位置與人格權重為可調整的產品研究判斷。
- Windows portable `.exe` 放在 `release/0.1.0`。
- 所有依賴與工具限專案範圍，無全域安裝。

## Review Focus

- 未完整作答不能產生結果，回上一題與修改答案保留其他進度。
- 多選題最多兩項，無偏好與其他選項互斥。
- 損壞或過期的本地儲存安全恢復，儲存失敗仍能完成測驗並提示。
- 位置候選的括號註記不能被當作另一個位置，結果避免重複英雄。
- 打包後離線可使用資料與圖片，外部連結限官方 HTTPS 網域。

### Task 1 — 題庫、資料與推薦

Files: `src/data/questions.ts`, `src/data/champions.ts`, `src/domain/matching.ts`, `src/domain/session.ts`, `src/domain/*.test.ts`.

- [x] 建立開發工具與必要設定，保留既有研究資料。
- [x] 先驗證未作答、多選互斥、損壞進度、全英雄完整排序及確定性結果的失敗測試。
- [x] 實作 `rankChampions(answers)`, `getRecommendations(answers)`, `restoreSession(raw)` 與 `selectOption(question, previous, optionId)`。
- [x] 將英雄特徵整理成明確偏好標籤與位置候選，保留研究假設與來源。
- [x] 執行完整核心測試。

### Task 2 — 測驗與結果介面

Files: `src/App.tsx`, `src/styles.css`, `src/components/*`, `public/assets/*`.

- [x] 實作首頁、單題作答、返回修改、進度保存與重新開始確認。
- [x] 實作首選與次選位置、三位起步英雄、一位精熟挑戰與可查閱的完整英雄排名。
- [x] 呈現推薦理由、需適應之處、練習重點與模型來源。
- [x] 檢查桌面與較小視窗的布局、鍵盤操作與完整作答流程。

### Task 3 — Windows 封裝與交付

Files: `electron/main.cjs`, `package.json`, `scripts/*`, `README.md`.

- [x] 建立隔離 renderer 與受限官方外連處理。
- [x] 執行 typecheck、核心測試、正式建置與 Windows portable 打包。
- [x] 以打包後 app 驗證完整作答、結果、離線圖片、重啟後恢復。
- [x] 檢查所有交付檔，記錄驗證與限制。

## Execution Notes

- 使用者已授權開始實作，依本計畫持續完成。
- 此目錄沒有 Git 倉庫，直接在既有專案目錄工作。
- 暫定名稱「召喚本色 / Rift Compass」，版本 0.1.0。
- 位置、特徵權重與新手練習建議由本次實作決定，仍需使用者試玩校準。

## Verification Record

2026-11-15 完成。11 項核心測試、型別檢查、正式建置、開發入口、正式封裝完整桌面流程、portable 自解壓與作答檢查皆通過。獨立審查發現的空答案完成判定與開發伺服器綁定問題皆已修正並回歸驗證。
