import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { questions } from "../data/questions";
import { completeSession, historyDate, newestFirst } from "./history";
import { createSession, restoreSession } from "./session";
import { Results } from "../components/Results";
import { HistoryPages } from "../components/HistoryPages";
const answers = Object.fromEntries(questions.map(question => [question.id, [question.options[0].id]]));
const completed = () => completeSession({ ...createSession(), answers });

describe("persistent completion snapshots", () => {
  it("reuses the completion id and snapshot after repeated completion and restart", () => {
    const first = completed();
    const restored = restoreSession(JSON.stringify(first));
    const again = completeSession(restored);
    expect(again.completion).toEqual(first.completion);
    expect(again.pendingRecords).toHaveLength(1);
    expect(completeSession(again).completion?.id).toBe(first.completion?.id);
  });
  it("creates another attempt with identical answers and retains the old snapshot", () => {
    const first = completed();
    const second = completed();
    expect(second.completion?.id).not.toBe(first.completion?.id);
    expect(second.completion?.result).toEqual(first.completion?.result);
    const edited = completeSession({ ...first, completion: undefined, answers: { ...answers, q01: ["b"] } });
    expect(edited.completion?.id).not.toBe(first.completion?.id);
    expect(edited.pendingRecords).toHaveLength(2);
    expect(edited.pendingRecords?.[0]).toEqual(first.completion);
    expect(first.completion?.answers.q01).toEqual(["a"]);
  });
  it.each(["home", "quiz", "results"])("imports a complete legacy session on %s exactly once with unknown time", screen => {
    const imported = restoreSession(JSON.stringify({ version: 1, answers, questionIndex: 4, screen }));
    expect(imported.completion?.completedAt).toBeNull();
    expect(imported.pendingRecords).toHaveLength(1);
    const restored = restoreSession(JSON.stringify(imported));
    expect(restored.completion).toEqual(imported.completion);
    expect(restored.pendingRecords).toHaveLength(1);
    expect(restored.screen).toBe(screen);
    expect(historyDate(imported.completion!.completedAt)).toBe("完成時間未知");
  });
  it("continues unfinished legacy sessions and does not prematurely complete edited sessions on reload", () => {
    const partial = restoreSession(JSON.stringify({ version: 1, answers: { q01: ["a"] }, questionIndex: 1, screen: "quiz" }));
    expect(partial.answers).toEqual({ q01: ["a"] });
    expect(partial.completion).toBeUndefined();
    const edited = { ...completed(), completion: undefined, screen: "quiz", answers: { ...answers, q01: ["b"] } };
    const restored = restoreSession(JSON.stringify(edited));
    expect(restored.completion).toBeUndefined();
    expect(restored.pendingRecords).toHaveLength(1);
    expect(completeSession(restored).pendingRecords).toHaveLength(2);
  });
  it("renders historical recommendation text from the snapshot and leaves progress untouched", () => {
    const session = completed();
    const before = JSON.stringify(session);
    const snapshot = structuredClone(session.completion!.result);
    snapshot.laneDetails[snapshot.lanes[0].id].appeal = "當時位置的推薦說明";
    snapshot.starters[0].champion.name = "當時的英雄推薦";
    const markup = renderToStaticMarkup(<Results result={snapshot} onReview={() => {}} />);
    expect(markup).toContain("當時位置的推薦說明");
    expect(markup).toContain("當時的英雄推薦");
    expect(JSON.stringify(session)).toBe(before);
  });
  it("sorts dates descending with unknown times last", () => {
    const record = completed().completion!;
    expect(newestFirst([{ ...record, id: "unknown", completedAt: null }, { ...record, id: "old", completedAt: "2020-01-01T00:00:00Z" }, { ...record, id: "new", completedAt: "2026-01-01T00:00:00Z" }]).map(item => item.id)).toEqual(["new", "old", "unknown"]);
  });
  it("shows the desktop guidance in a browser preview", () => {
    // Server rendering provides a browser-like window without the Electron bridge.
    const previous = globalThis.window;
    Object.defineProperty(globalThis, "window", { value: {}, writable: true, configurable: true });
    try {
      const markup = renderToStaticMarkup(<HistoryPages page="history" onHome={() => {}} onOpen={() => {}} revision={0} />);
      expect(markup).toContain("請使用桌面版");
      expect(markup).toContain("返回測驗首頁");
    } finally { Object.defineProperty(globalThis, "window", { value: previous, writable: true, configurable: true }); }
  });
});
