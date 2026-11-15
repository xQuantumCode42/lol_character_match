import { describe, expect, it } from "vitest";
import { champions } from "../data/champions";
import { questions } from "../data/questions";
import { getRecommendations, rankChampions } from "./matching";
import { restoreSession, selectOption } from "./session";
import type { Answers } from "./types";

const completed = (option = 0): Answers =>
  Object.fromEntries(
    questions.map((question) => [question.id, [question.options[option].id]]),
  );

describe("recommendations through the complete questionnaire", () => {
  it("evaluates all official champions once and produces stable finite rankings", () => {
    const ranked = rankChampions(completed());
    expect(ranked).toHaveLength(173);
    expect(new Set(ranked.map((item) => item.champion.id)).size).toBe(173);
    expect(ranked.every((item) => Number.isFinite(item.score))).toBe(true);
    expect(rankChampions(completed()).map((item) => item.champion.id)).toEqual(
      ranked.map((item) => item.champion.id),
    );
    expect(
      ranked.every((item) => item.champion.lanes.includes(item.bestLane)),
    ).toBe(true);
    expect(
      champions.find((champion) => champion.id === "Locke")?.lanes,
    ).toEqual(["mid", "jungle"]);
  });

  it("requires every question to have a valid answer before generating results", () => {
    expect(() => getRecommendations({})).toThrow();
    expect(() =>
      getRecommendations({ ...completed(), q01: ["missing"] }),
    ).toThrow();
    expect(() =>
      getRecommendations({ ...completed(), q29: ["a", "e"] }),
    ).toThrow();
    const result = getRecommendations(completed());
    expect(result.starters).toHaveLength(3);
    expect(
      new Set(
        [...result.starters, result.challenge].map((item) => item.champion.id),
      ).size,
    ).toBe(4);
    expect(result.lanes).toHaveLength(5);
    expect(result.starters.every((item) => item.reasons.length > 0)).toBe(true);
  });

  it("responds to meaningful changes in answers", () => {
    const first = getRecommendations(completed(0));
    const second = getRecommendations(completed(2));
    expect(
      first.ranking.slice(0, 8).map((item) => item.champion.id),
    ).not.toEqual(second.ranking.slice(0, 8).map((item) => item.champion.id));
  });

  it.each([
    {
      lane: "support",
      description: "care and close partnership",
      choices: [
        "b",
        "b",
        "c",
        "c",
        "b",
        "d",
        "b",
        "b",
        "c",
        "c",
        "c",
        "c",
        "c",
        "c",
        "a",
        "c",
        "c",
        "a",
        "c",
        "b",
        "c",
        "c",
        "c",
        "c",
        "c",
        "d",
        "a",
        "a",
      ],
    },
    {
      lane: "top",
      description: "independent patient practice",
      choices: [
        "d",
        "a",
        "a",
        "a",
        "d",
        "c",
        "b",
        "b",
        "a",
        "a",
        "a",
        "a",
        "d",
        "a",
        "b",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "d",
        "a",
        "c",
        "a",
        "d",
      ],
    },
    {
      lane: "jungle",
      description: "exploration and initiating opportunities",
      choices: [
        "c",
        "c",
        "b",
        "b",
        "a",
        "a",
        "d",
        "c",
        "b",
        "b",
        "b",
        "b",
        "b",
        "b",
        "c",
        "b",
        "b",
        "b",
        "d",
        "b",
        "d",
        "d",
        "d",
        "a",
        "d",
        "a",
        "b",
        "b",
      ],
    },
    {
      lane: "bottom",
      description: "patient precision and ranged partnership",
      choices: [
        "b",
        "a",
        "a",
        "a",
        "c",
        "b",
        "b",
        "c",
        "a",
        "a",
        "a",
        "a",
        "d",
        "d",
        "d",
        "c",
        "a",
        "a",
        "a",
        "a",
        "a",
        "c",
        "b",
        "d",
        "b",
        "a",
        "a",
        "c",
      ],
    },
    {
      lane: "mid",
      description: "control and a varied spell toolkit",
      choices: [
        "a",
        "d",
        "d",
        "b",
        "a",
        "c",
        "c",
        "c",
        "b",
        "b",
        "b",
        "b",
        "b",
        "b",
        "b",
        "d",
        "b",
        "b",
        "b",
        "c",
        "b",
        "b",
        "d",
        "b",
        "b",
        "b",
        "d",
        "b",
      ],
    },
  ])("allows a $lane route for $description", ({ lane, choices }) => {
    const selections = [...choices, "e", "h"];
    const answers = Object.fromEntries(
      questions.map((question, index) => [question.id, [selections[index]]]),
    );
    expect(getRecommendations(answers).lanes[0].id).toBe(lane);
  });
});

describe("answer selection and saved progress", () => {
  it("limits multiselect answers and keeps the neutral answer exclusive", () => {
    const question = questions.find((item) => item.id === "q29")!;
    expect(selectOption(question, ["a"], "b")).toEqual(["a", "b"]);
    expect(selectOption(question, ["a", "b"], "c")).toEqual(["a", "b"]);
    expect(selectOption(question, ["a", "b"], "e")).toEqual(["e"]);
    expect(selectOption(question, ["e"], "c")).toEqual(["c"]);
    expect(selectOption(question, ["a", "b"], "a")).toEqual(["b"]);
  });

  it("restores valid answers while dropping invalid, conflicting and stale values", () => {
    const session = restoreSession(
      JSON.stringify({
        version: 1,
        screen: "results",
        questionIndex: 999,
        answers: {
          q01: ["a"],
          q02: ["wrong"],
          q29: ["a", "e"],
          q30: ["a", "b", "c"],
          removed: ["a"],
        },
      }),
    );
    expect(session.answers).toEqual({ q01: ["a"] });
    expect(session.screen).toBe("quiz");
    expect(session.questionIndex).toBe(1);
    expect(restoreSession("{broken")).toEqual({
      version: 1,
      answers: {},
      questionIndex: 0,
      screen: "home",
    });
    expect(
      restoreSession(JSON.stringify({ version: 99, answers: completed() }))
        .screen,
    ).toBe("home");
  });

  it("restores completed results and an intentionally revisited question", () => {
    expect(
      restoreSession(
        JSON.stringify({
          version: 1,
          answers: completed(),
          questionIndex: 29,
          screen: "results",
        }),
      ).screen,
    ).toBe("results");
    expect(
      restoreSession(
        JSON.stringify({
          version: 1,
          answers: completed(),
          questionIndex: 3,
          screen: "quiz",
        }),
      ).questionIndex,
    ).toBe(3);
  });
});
