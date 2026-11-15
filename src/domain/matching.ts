import { champions, dimensionLabels } from "../data/champions";
import { lanes } from "../data/lanes";
import { questions } from "../data/questions";
import { isComplete, isValidAnswer } from "./session";
import {
  dimensions,
  type Answers,
  type Champion,
  type Dimension,
  type Fantasy,
  type Form,
  type RankedChampion,
  type Style,
  type Traits,
} from "./types";

export interface PreferenceProfile {
  traits: Traits;
  styles: Style[];
  forms: Form[];
  fantasies: Fantasy[];
}

export function buildProfile(answers: Answers): PreferenceProfile {
  const totals = Object.fromEntries(
    dimensions.map((key) => [key, 0]),
  ) as Traits;
  const weights = { ...totals };
  const profile: PreferenceProfile = {
    traits: { ...totals },
    styles: [],
    forms: [],
    fantasies: [],
  };
  for (const question of questions) {
    const selected = answers[question.id];
    if (!isValidAnswer(question, selected)) continue;
    for (const dimension of dimensions) {
      // Unselected options still establish the available signal for this question.
      weights[dimension] += Math.max(
        ...question.options.map((option) =>
          Math.abs(option.traits?.[dimension] || 0),
        ),
      );
    }
    for (const id of selected) {
      const option = question.options.find((item) => item.id === id)!;
      for (const dimension of dimensions)
        totals[dimension] +=
          (option.traits?.[dimension] || 0) / selected.length;
      profile.styles.push(...(option.styles || []));
      profile.forms.push(...(option.forms || []));
      profile.fantasies.push(...(option.fantasies || []));
    }
  }
  for (const dimension of dimensions)
    profile.traits[dimension] = weights[dimension]
      ? 0.5 + (0.5 * totals[dimension]) / weights[dimension]
      : 0.5;
  return profile;
}

function traitFit(user: Traits, target: Partial<Traits>): number {
  const entries = Object.entries(target) as [Dimension, number][];
  return (
    1 -
    entries.reduce(
      (total, [key, value]) => total + Math.abs(user[key] - value),
      0,
    ) /
      entries.length
  );
}

function preferenceFit<T>(wanted: T[], available: T[]): number {
  if (!wanted.length) return 0.5;
  return (
    wanted.filter((item) => available.includes(item)).length / wanted.length
  );
}

function getReasons(profile: PreferenceProfile, champion: Champion): string[] {
  const strongest = dimensions
    .filter((key) => profile.traits[key] > 0.55 && champion.traits[key] > 0.6)
    .sort(
      (a, b) =>
        profile.traits[b] * champion.traits[b] -
        profile.traits[a] * champion.traits[a],
    );
  const reasons = [
    strongest.length
      ? `你的回答偏向${dimensionLabels[strongest[0]]}，${champion.appeal}可能讓你投入。`
      : `${champion.appeal}，值得透過試玩感受。`,
  ];
  if (profile.forms.some((form) => champion.forms.includes(form)))
    reasons.push("角色外型呼應了你選擇的喜好。");
  if (profile.fantasies.some((fantasy) => champion.fantasies.includes(fantasy)))
    reasons.push(
      `你選的力量主題，可以在${champion.themes.slice(0, 2).join("與")}中找到。`,
    );
  if (reasons.length === 1)
    reasons.push(`可以從「${champion.mechanics}」開始探索這位英雄。`);
  return reasons.slice(0, 2);
}

export function rankLanes(profile: PreferenceProfile) {
  return lanes
    .map((lane) => ({
      id: lane.id,
      score: traitFit(profile.traits, lane.targets),
    }))
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
}

export function rankChampions(answers: Answers): RankedChampion[] {
  const profile = buildProfile(answers);
  const laneRanking = rankLanes(profile);
  return champions
    .map((champion) => {
      const lane = laneRanking.find((item) =>
        champion.lanes.includes(item.id),
      )!;
      const score =
        0.64 * traitFit(profile.traits, champion.traits) +
        0.16 * lane.score +
        0.08 * preferenceFit(profile.styles, champion.styles) +
        0.06 * preferenceFit(profile.forms, champion.forms) +
        0.06 * preferenceFit(profile.fantasies, champion.fantasies);
      return {
        champion,
        score,
        bestLane: lane.id,
        reasons: getReasons(profile, champion),
      };
    })
    .sort(
      (a, b) => b.score - a.score || a.champion.id.localeCompare(b.champion.id),
    );
}

export function getRecommendations(answers: Answers) {
  if (!isComplete(answers)) throw new Error("請先完成全部題目");
  const profile = buildProfile(answers);
  const laneRanking = rankLanes(profile);
  const ranking = rankChampions(answers);
  const primary = laneRanking[0].id;
  // Start with an approachable set on one lane, while preserving a harder aspiration.
  const starters = ranking
    .filter((item) => item.champion.lanes.includes(primary))
    .sort(
      (a, b) =>
        b.score -
          0.18 * b.champion.traits.complexity -
          (a.score - 0.18 * a.champion.traits.complexity) ||
        a.champion.id.localeCompare(b.champion.id),
    )
    .slice(0, 3)
    .map((item) => ({ ...item, bestLane: primary }));
  const starterIds = new Set(starters.map((item) => item.champion.id));
  const challenge = ranking
    .filter(
      (item) =>
        !starterIds.has(item.champion.id) &&
        item.champion.lanes.includes(primary),
    )
    .sort(
      (a, b) =>
        b.score +
          0.08 * b.champion.traits.complexity -
          (a.score + 0.08 * a.champion.traits.complexity) ||
        a.champion.id.localeCompare(b.champion.id),
    )[0];
  return {
    starters,
    challenge: { ...challenge, bestLane: primary },
    lanes: laneRanking,
    ranking,
    profile,
  };
}
