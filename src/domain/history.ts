import { getRecommendations } from "./matching";
import { laneById } from "../data/lanes";
import { dimensionLabels } from "../data/champions";
import type { Answers, Session } from "./types";

export type RecommendationSnapshot = ReturnType<typeof getRecommendations> & {
  laneDetails: typeof laneById;
  dimensionLabels: typeof dimensionLabels;
  dataVersion: string;
};
export interface HistoryRecord {
  id: string;
  completedAt: string | null;
  answers: Answers;
  result: RecommendationSnapshot;
}
export function makeRecord(answers: Answers, completedAt: string | null): HistoryRecord {
  return JSON.parse(JSON.stringify({
    id: crypto.randomUUID(), completedAt, answers,
    result: { ...getRecommendations(answers), laneDetails: laneById, dimensionLabels, dataVersion: "16.22.1" },
  }));
}
export function completeSession(session: Session, completedAt: string | null = new Date().toISOString()): Session {
  if (session.completion) return { ...session, screen: "results" };
  const completion = makeRecord(session.answers, completedAt);
  return { ...session, screen: "results", completion, pendingRecords: [...(session.pendingRecords || []), completion] };
}
export function historyDate(value: string | null) {
  return value === null ? "完成時間未知" : new Date(value).toLocaleString("zh-TW");
}
export function newestFirst(records: HistoryRecord[]) {
  return [...records].sort((a, b) => (b.completedAt ? Date.parse(b.completedAt) : -Infinity) - (a.completedAt ? Date.parse(a.completedAt) : -Infinity));
}
declare global {
  interface Window {
    riftHistory?: {
      getSettings(): Promise<{ directory: string }>;
      list(): Promise<HistoryRecord[]>;
      save(record: HistoryRecord): Promise<unknown>;
      chooseDirectory(): Promise<{ directory: string } | null>;
    };
  }
}
