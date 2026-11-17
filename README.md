# 召喚本色 · Rift Compass

給尚未熟悉《英雄聯盟》位置的新手，透過生活情境與奇幻偏好，探索想投入的位置與英雄。

## Windows 使用

執行 `release/0.1.0/Rift Compass 0.1.0.exe`。這是 portable 版本，首次啟動會解開執行檔，測驗與圖片可離線使用。程式尚未簽章。

30 題包含 24 題生活情境與 6 題奇幻偏好，第 29、30 題可複選最多兩項。答案會保存在本機，可關閉後繼續、回頭修改，或確認後重新開始。

結果提供首選與次選位置、三位起步英雄、一位精熟挑戰、推薦理由與練習方向。全部 173 位英雄也可依本次答案排序後搜尋與查看。

完成測驗後會自動保存歷史紀錄，從右上角「歷史紀錄」可查看日期與當時的完整推薦。重新測驗、或修改答案後再完成，會保留另一筆快照；重新開啟同一結果不會重複新增。升級時仍留存的舊版已完成測驗會匯入一次，原完成時間會標示為未知。

右上角「設定」顯示完整儲存位置，可選擇本機資料夾。預設位於目前 Windows 使用者的應用程式資料目錄。變更位置會合併兩邊紀錄並保留原檔案，有衝突或損壞資料時會顯示錯誤。修正儲存位置後，可按「重試保存」處理尚未寫入的紀錄。

## 推薦模型

來源為 Riot Data Dragon 16.22.1，調查日期為 2026-11-15。官方資料與研究分析位於 [研究文件](docs/research/champion-survey-2026-11-15.md)。

答案轉換為自主、合作、主動、風險、耐心、精準、移動、複雜度、保護、控制、距離與布置等偏好。玩法特徵占 64%，位置占 16%，操作節奏占 8%，外型與力量主題各占 6%。沒有美術偏好時使用中性分數。

全英雄依綜合分數排序。起步三選在首選位置內考慮操作與知識負擔，長期挑戰另選一位。每位英雄皆進入排序候選，但尚未驗證每位英雄都能在某種答案下成為第一名。

英雄與位置的特徵、題目權重及練習建議是可調整的產品研究模型。位置候選尚未核對當前版本出場統計，問卷尚未進行心理計量驗證，偏好與實際學習能力仍需試玩校準。

## 本機開發

需要 Node.js 22.12 以上。此工作區已下載 Node.js 26.13.1 至專案 `.tools`，可在 PowerShell 使用以下指令。

```powershell
$env:Path = "$PWD\.tools\node-v26.13.1-win-x64;$env:Path"
npm ci
npm run dev
```

```powershell
npm test
npm run build
node scripts/verify-dev.mjs
npm run test:desktop
npm run test:history
node scripts/verify-portable.mjs
npm run package:win
```

`scripts/fetch-assets.mjs` 可重新取得本次來源版本的官方頭像與首頁圖。圖片收錄在 `public/assets`，可隨正式建置離線使用。開發工具與快取皆留在專案 `.tools`，正式執行檔不需要 Node.js。

## 主要檔案

- `src/data/questions.ts` 定義題目與答案訊號。
- `src/data/champions.ts` 將官方研究資料整理成玩法與外觀特徵。
- `src/data/lanes.ts` 定義位置解說與偏好特徵。
- `src/domain/matching.ts` 負責計分與推薦理由。
- `src/domain/session.ts` 負責答案限制與進度恢復。
- `electron/main.cjs` 負責 Windows 視窗與受限官方外連。

## 已完成的驗證

11 項核心測試、TypeScript 檢查及正式建置通過。五種位置都有對應的作答情境檢查。

正式封裝 app 已跑過完整 30 題、重啟續答、結果恢復、修改已完成多選答案後繼續、173 位英雄搜尋、英雄詳情、重新開始確認與 800×620 視窗檢查。測試期間沒有 renderer 錯誤與 HTTP 請求。

portable `.exe` 已另行確認正常自解壓、載入首頁與官方圖片，以及選答後進入下一題。單檔執行檔約 111.4 MiB。

這些驗證在目前 Windows 環境完成，尚未在全新 Windows 電腦測試。推薦內容仍需真人試玩校準。

## Riot Games

英雄資料與美術屬於 Riot Games。來源為 [官方英雄介紹](https://www.leagueoflegends.com/zh-tw/champions/)與 [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon)。

Rift Compass is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
