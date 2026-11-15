import type { LaneId, Traits } from "../domain/types";

export interface Lane {
  id: LaneId;
  name: string;
  english: string;
  introduction: string;
  appeal: string;
  practice: string;
  targets: Partial<Traits>;
}

export const lanes: Lane[] = [
  {
    id: "top",
    name: "上路",
    english: "TOP",
    introduction:
      "多半獨自守住一條路，練習與同一位對手周旋，再決定何時加入團隊。",
    appeal: "有自己的空間，把一次次較量磨成實力。",
    practice: "先練習安全取得士兵的最後一擊，以及看見危險時往後退。",
    targets: {
      independence: 0.85,
      patience: 0.75,
      precision: 0.65,
      teamwork: 0.4,
      range: 0.35,
      protection: 0.4,
      mobility: 0.45,
    },
  },
  {
    id: "jungle",
    name: "打野",
    english: "JUNGLE",
    introduction:
      "在路線之間的野區移動，取得資源、觀察哪裡需要幫忙，並選擇出現的時機。",
    appeal: "探索路線、觀察變化，主動創造機會。",
    practice: "先熟悉一條清野路線，移動時看小地圖，再學習何時幫忙。",
    targets: {
      mobility: 0.85,
      initiative: 0.8,
      control: 0.75,
      setup: 0.75,
      complexity: 0.75,
      independence: 0.7,
      range: 0.35,
    },
  },
  {
    id: "mid",
    name: "中路",
    english: "MID",
    introduction:
      "守住地圖中央，練習技能交鋒與資源管理，也有機會快速支援其他地方。",
    appeal: "掌握技能與時機，從中央影響周圍。",
    practice: "先熟悉一套簡單的技能組合，技能用完後保留安全距離。",
    targets: {
      precision: 0.8,
      control: 0.75,
      complexity: 0.7,
      initiative: 0.7,
      range: 0.7,
      mobility: 0.65,
      independence: 0.65,
    },
  },
  {
    id: "bottom",
    name: "下路輸出",
    english: "BOT",
    introduction:
      "通常與輔助一起成長，累積裝備與火力，練習在安全位置持續造成傷害。",
    appeal: "細緻的走位與穩定累積，換來越來越強的火力。",
    practice: "先交替練習攻擊與移動，習慣待在能被隊友保護的位置。",
    targets: {
      range: 0.9,
      precision: 0.85,
      patience: 0.85,
      teamwork: 0.8,
      protection: 0.25,
      initiative: 0.45,
      risk: 0.45,
    },
  },
  {
    id: "support",
    name: "輔助",
    english: "SUPPORT",
    introduction:
      "與夥伴一起行動，透過控制、保護、增益與視野，幫助團隊取得機會。",
    appeal: "讀懂夥伴的需要，用不同方式讓大家發揮。",
    practice: "先選一位夥伴觀察，練習保持能互相支援的距離，再學習放置視野。",
    targets: {
      teamwork: 0.9,
      protection: 0.9,
      control: 0.8,
      independence: 0.3,
      initiative: 0.65,
      setup: 0.65,
      range: 0.6,
    },
  },
];

export const laneById = Object.fromEntries(
  lanes.map((lane) => [lane.id, lane]),
) as Record<LaneId, Lane>;
