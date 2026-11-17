import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactElement } from "react";
import { isValidElement } from "react";
import { questions } from "./data/questions";
import { App } from "./App";
import { Quiz } from "./components/Quiz";
import { Results } from "./components/Results";
import { Modal } from "./components/Modal";
import { HistoryPages } from "./components/HistoryPages";

// Exercise the app's event handlers and effects in Node; no browser or DOM is launched.
const hooks = vi.hoisted(() => ({ slots: [] as any[], cursor: 0, effects: [] as (() => void)[], repeat: false }));
vi.mock("react", async importOriginal => {
  const actual = await importOriginal<typeof import("react")>();
  return { ...actual,
    useState(initial: any) {
      const index = hooks.cursor++;
      if (!(index in hooks.slots)) hooks.slots[index] = typeof initial === "function" ? initial() : initial;
      return [hooks.slots[index], (value: any) => { hooks.slots[index] = typeof value === "function" ? value(hooks.slots[index]) : value; }];
    },
    useEffect(effect: () => (() => void) | undefined, deps: unknown[]) {
      const index = hooks.cursor++;
      const old = hooks.slots[index];
      if (!old || deps.some((dep, i) => !Object.is(dep, old.deps[i]))) {
        hooks.slots[index] = { deps };
        hooks.effects.push(() => {
          old?.cleanup?.();
          let cleanup = effect();
          if (!old && hooks.repeat) { cleanup?.(); cleanup = effect(); }
          hooks.slots[index].cleanup = cleanup;
        });
      }
    },
  };
});
const key = "rift-compass.session.v1";
const answers = Object.fromEntries(questions.map(question => [question.id, [question.options[0].id]]));
let tree: ReactElement;
let local: Map<string, string>;
let records: Map<string, any>;
let api: any;
function render() {
  hooks.cursor = 0;
  tree = App();
  hooks.effects.splice(0).forEach(effect => effect());
}
async function settle() {
  for (let i = 0; i < 10; i++) { render(); await Promise.resolve(); }
  render();
}
function elements(node: any): ReactElement<any>[] {
  if (Array.isArray(node)) return node.flatMap(item => elements(item));
  if (!isValidElement(node)) return [];
  const element = node as ReactElement<any>;
  return [element, ...elements(element.props.children)];
}
function text(node: any): string {
  if (Array.isArray(node)) return node.map(text).join("");
  if (typeof node === "string") return node;
  if (isValidElement(node)) return text((node as ReactElement<any>).props.children);
  return "";
}
function button(label: string) {
  const found = elements(tree).find(element => element.type === "button" && text(element) === label);
  expect(found, `button ${label}`).toBeDefined();
  return found!;
}
function component(type: any) {
  const found = elements(tree).find(element => element.type === type);
  expect(found).toBeDefined();
  return found!;
}
function unmount() {
  for (const slot of hooks.slots) slot?.cleanup?.();
  hooks.slots = [];
  hooks.effects = [];
}
beforeEach(() => {
  hooks.slots = []; hooks.effects = []; hooks.repeat = false;
  local = new Map(); records = new Map();
  api = {
    save: vi.fn(async (record: any) => {
      if (records.has(record.id)) expect(records.get(record.id)).toEqual(record);
      records.set(record.id, structuredClone(record));
    }),
  };
  vi.stubGlobal("window", { riftHistory: api, scrollTo: vi.fn() });
  vi.stubGlobal("localStorage", { getItem: (name: string) => local.get(name) || null, setItem: (name: string, value: string) => local.set(name, value) });
});
afterEach(() => { unmount(); vi.unstubAllGlobals(); });

describe("App completion and navigation regression", () => {
  it("imports once despite repeated effects and reopening the results screen", async () => {
    local.set(key, JSON.stringify({ version: 1, answers, questionIndex: 29, screen: "results" }));
    hooks.repeat = true;
    await settle();
    expect(records.size).toBe(1);
    const id = [...records.keys()][0];
    expect(records.get(id).completedAt).toBeNull();
    expect(JSON.parse(local.get(key)!).completion.id).toBe(id);
    unmount();
    await settle();
    expect(records.size).toBe(1);
    expect(component(Results).props.result).toEqual(records.get(id).result);
    button("召喚本色RIFT COMPASS").props.onClick();
    render();
    button("查看我的結果").props.onClick();
    await settle();
    expect(records.size).toBe(1);
  });
  it("saves another snapshot after answer editing, and a new attempt with identical answers", async () => {
    local.set(key, JSON.stringify({ version: 1, answers, screen: "results" }));
    await settle();
    const original = structuredClone([...records.values()][0]);
    component(Results).props.onReview(); render();
    component(Quiz).props.onSelect("b"); render();
    // Skip through the already answered questions using the actual navigation callbacks.
    for (let i = 0; i < 30; i++) { component(Quiz).props.onNext(); render(); }
    await settle();
    expect(records.size).toBe(2);
    expect(records.get(original.id)).toEqual(original);
    const second = JSON.parse(local.get(key)!).completion;
    expect(second.answers.q01).toEqual(["b"]);
    expect(second.completedAt).not.toBeNull();
    button("重新測驗").props.onClick(); render();
    const modal = component(Modal);
    const resetButton = elements(modal).find(element => element.type === "button" && text(element).startsWith("重新開始"))!;
    resetButton.props.onClick(); render();
    for (let i = 0; i < 30; i++) {
      component(Quiz).props.onSelect(i === 0 ? "b" : "a"); render();
      component(Quiz).props.onNext(); render();
    }
    await settle();
    expect(records.size).toBe(3);
    const third = JSON.parse(local.get(key)!).completion;
    expect(third.id).not.toBe(second.id);
    expect(third.answers).toEqual(second.answers);
  });
  it("viewing a historical snapshot leaves current answers and question index intact", async () => {
    local.set(key, JSON.stringify({ version: 1, answers: { q01: ["a"] }, questionIndex: 1, screen: "quiz" }));
    await settle();
    const before = local.get(key);
    button("歷史紀錄").props.onClick(); render();
    const historical = { id: "old", completedAt: null, result: { marker: "old snapshot" } };
    component(HistoryPages).props.onOpen(historical); render();
    expect(component(Results).props.result).toEqual(historical.result);
    expect(local.get(key)).toBe(before);
    button("返回歷史紀錄").props.onClick(); render();
    component(HistoryPages).props.onHome(); render();
    button("繼續我的探索").props.onClick(); render();
    expect(component(Quiz).props.index).toBe(1);
    expect(JSON.parse(local.get(key)!).answers).toEqual({ q01: ["a"] });
  });
  it("shows file save errors and retries with the same persisted completion", async () => {
    local.set(key, JSON.stringify({ version: 1, answers, screen: "results" }));
    api.save.mockRejectedValue(new Error("disk unavailable"));
    await settle();
    expect(text(tree)).toContain("歷史紀錄尚未保存：Error: disk unavailable");
    const pending = JSON.parse(local.get(key)!).pendingRecords[0];
    api.save.mockImplementation(async (record: any) => { records.set(record.id, record); });
    button("重試保存").props.onClick(); await settle();
    expect(records.size).toBe(1);
    expect(records.get(pending.id)).toEqual(pending);
    expect(JSON.parse(local.get(key)!).pendingRecords).toEqual([]);
    expect(text(tree)).not.toContain("disk unavailable");
  });
  it("persists identity before saving a completion to the desktop file", async () => {
    local.set(key, JSON.stringify({ version: 1, answers, screen: "results" }));
    api.save.mockImplementation(async (record: any) => {
      const persisted = JSON.parse(local.get(key)!);
      expect(persisted.completion.id).toBe(record.id);
      expect(persisted.pendingRecords).toContainEqual(record);
    });
    await settle();
    expect(api.save).toHaveBeenCalled();
  });
  it("saves history even when the session cache exceeds its quota", async () => {
    local.set(key, JSON.stringify({ version: 1, answers, screen: "results" }));
    vi.stubGlobal("localStorage", {
      getItem: (name: string) => local.get(name) || null,
      setItem: () => { throw new Error("QuotaExceededError"); },
    });
    await settle();
    expect(records.size).toBe(1);
    expect(text(tree)).toContain("目前無法保存進度");
    expect(hooks.slots[0].pendingRecords).toEqual([]);
  });
});
