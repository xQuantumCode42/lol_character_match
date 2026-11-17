import { useEffect, useState } from "react";
import { historyDate, newestFirst, type HistoryRecord } from "../domain/history";

export function HistoryPages({ page, onHome, onOpen, revision }: {
  page: "history" | "settings";
  onHome(): void;
  onOpen(record: HistoryRecord): void;
  revision: unknown;
}) {
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [directory, setDirectory] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [reload, setReload] = useState(0);
  useEffect(() => {
    let active = true;
    setLoaded(false);
    setError("");
    const api = window.riftHistory;
    if (api) {
      (async () => {
        const settings = await api.getSettings();
        if (active) setDirectory(settings.directory);
        const saved = await api.list();
        if (active) { setRecords(newestFirst(saved)); setLoaded(true); }
      })().catch(reason => { if (active) setError(String(reason)); });
    }
    return () => { active = false; };
  }, [page, revision, reload]);
  async function chooseDirectory() {
    setBusy(true);
    setError("");
    try {
      const selected = await window.riftHistory!.chooseDirectory();
      if (selected) { setDirectory(selected.directory); setReload(value => value + 1); }
    } catch (reason) { setError(String(reason)); }
    finally { setBusy(false); }
  }
  return <main className="results-page history-page">
    <div className="results-heading"><h1>{page === "history" ? "歷史紀錄" : "設定"}</h1>
      <button className="secondary-button" onClick={onHome}>返回測驗首頁</button>
    </div>
    {!window.riftHistory ? <p>歷史紀錄與資料夾設定請使用桌面版。瀏覽器仍可繼續測驗。</p> : <>
      {error && <div className="storage-notice" role="alert">{error}<button className="text-button" onClick={() => setReload(value => value + 1)}>重試讀取</button></div>}
      {page === "settings" ? <section className="history-card">
        <h2>歷史紀錄儲存位置</h2>
        <p className="history-path">{directory || "正在讀取儲存位置…"}</p>
        {directory && <p className="history-path">完整檔案位置：{directory.replace(/[\\/]$/, "")}{directory.includes("\\") ? "\\" : "/"}history.json</p>}
        <p>選擇新位置會合併兩邊的紀錄，並保留原檔案。</p>
        <button className="primary-button" disabled={busy} onClick={chooseDirectory}>{busy ? "正在合併…" : "選擇資料夾"}</button>
      </section> : <>
        {!loaded && !error && <p role="status">正在讀取歷史紀錄…</p>}
        {loaded && records.length === 0 && <p>尚無歷史紀錄。完成測驗後會自動保留當時的推薦。</p>}
        {loaded && records.map(record => <article className="history-card" key={record.id}>
          <h2>{historyDate(record.completedAt)}</h2>
          <button className="secondary-button" data-history-id={record.id} onClick={() => onOpen(record)}>查看紀錄</button>
        </article>)}
      </>}
    </>}
  </main>;
}
