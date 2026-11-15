export const dimensions = [
  "independence",
  "teamwork",
  "initiative",
  "risk",
  "patience",
  "precision",
  "mobility",
  "complexity",
  "protection",
  "control",
  "range",
  "setup",
] as const;

export type Dimension = (typeof dimensions)[number];
export type Traits = Record<Dimension, number>;
export type LaneId = "top" | "jungle" | "mid" | "bottom" | "support";
export type Style = "sustained" | "burst" | "combo" | "setup";
export type Form = "human" | "creature" | "small" | "construct";
export type Fantasy =
  "element" | "nature" | "celestial" | "dark" | "tech" | "martial" | "arcane";

export interface Option {
  id: string;
  text: string;
  traits?: Partial<Record<Dimension, number>>;
  styles?: Style[];
  forms?: Form[];
  fantasies?: Fantasy[];
  neutral?: boolean;
}

export interface Question {
  id: string;
  title: string;
  section: "daily" | "fantasy";
  options: Option[];
  maxSelections: number;
}

export type Answers = Record<string, string[]>;
export interface Session {
  version: 1;
  answers: Answers;
  questionIndex: number;
  screen: "home" | "quiz" | "results";
}

export interface Champion {
  id: string;
  name: string;
  title: string;
  classes: string[];
  difficulty: number;
  lanes: LaneId[];
  candidateNote: string;
  distance: string;
  mechanics: string;
  appeal: string;
  learning: string;
  themes: string[];
  source: string;
  traits: Traits;
  styles: Style[];
  forms: Form[];
  fantasies: Fantasy[];
}

export interface RankedChampion {
  champion: Champion;
  score: number;
  bestLane: LaneId;
  reasons: string[];
}
