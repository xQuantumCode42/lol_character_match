import { questions } from "../data/questions";
import type { Answers, Question, Session } from "./types";

export function isValidAnswer(
  question: Question,
  value: unknown,
): value is string[] {
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.length > question.maxSelections
  )
    return false;
  if (new Set(value).size !== value.length) return false;
  const options = value.map((id) =>
    question.options.find((option) => option.id === id),
  );
  return (
    options.every(Boolean) &&
    (value.length === 1 || options.every((option) => !option?.neutral))
  );
}

export function isComplete(answers: Answers): boolean {
  return questions.every((question) =>
    isValidAnswer(question, answers[question.id]),
  );
}

export function selectOption(
  question: Question,
  previous: string[],
  optionId: string,
): string[] {
  const option = question.options.find((item) => item.id === optionId);
  if (!option) return previous;
  if (question.maxSelections === 1 || option.neutral) return [optionId];
  if (previous.includes(optionId))
    return previous.filter((id) => id !== optionId);
  const selected = previous.filter((id) =>
    question.options.some((item) => item.id === id && !item.neutral),
  );
  if (selected.length >= question.maxSelections) return previous;
  return [...selected, optionId];
}

export function createSession(): Session {
  return { version: 1, answers: {}, questionIndex: 0, screen: "home" };
}

export function restoreSession(raw: string | null): Session {
  try {
    const saved = JSON.parse(raw || "null");
    if (
      !saved ||
      saved.version !== 1 ||
      typeof saved.answers !== "object" ||
      !saved.answers ||
      Array.isArray(saved.answers)
    )
      return createSession();
    const answers: Answers = {};
    for (const question of questions) {
      if (isValidAnswer(question, saved.answers[question.id]))
        answers[question.id] = saved.answers[question.id];
    }
    const firstMissing = questions.findIndex(
      (question) => !answers[question.id],
    );
    const lastReachable =
      firstMissing === -1 ? questions.length - 1 : firstMissing;
    const index =
      Number.isInteger(saved.questionIndex) &&
      saved.questionIndex >= 0 &&
      saved.questionIndex <= lastReachable
        ? saved.questionIndex
        : lastReachable;
    let screen: Session["screen"] = Object.keys(answers).length
      ? "quiz"
      : "home";
    if (saved.screen === "home") screen = "home";
    if (saved.screen === "results" && firstMissing === -1) screen = "results";
    return { version: 1, answers, questionIndex: index, screen };
  } catch {
    return createSession();
  }
}
