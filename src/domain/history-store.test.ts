import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
const { HistoryStore } = createRequire(import.meta.url)("../../electron/history-store.cjs");
let root: string;
let store: InstanceType<typeof HistoryStore>;
const record = (id = "one", completedAt: string | null = "2026-11-17T01:02:03.000Z") => ({
  id, completedAt, answers: { q01: ["a"] }, result: { arbitrary: { nested: [1, null, "完整快照"] }, score: 0.7 },
});
const file = (directory: string) => path.join(directory, "history.json");
beforeEach(async () => {
  root = await fs.mkdtemp(path.resolve(".history-test-"));
  store = new HistoryStore({ settingsDirectory: root, defaultHistoryDirectory: path.join(root, "history") });
});
afterEach(async () => { vi.restoreAllMocks(); await fs.rm(root, { recursive: true, force: true }); });

describe("HistoryStore public boundary", () => {
  it("uses defaults, preserves opaque snapshots and deduplicates across restarts", async () => {
    expect(await store.getSettings()).toEqual({ directory: path.join(root, "history") });
    expect(await store.list()).toEqual([]);
    const original = record();
    const pending = store.save(original);
    original.result.score = 999;
    await pending;
    const restarted = new HistoryStore({ settingsDirectory: root, defaultHistoryDirectory: path.join(root, "history") });
    await restarted.save(record());
    expect(await restarted.list()).toEqual([record()]);
    expect(JSON.parse(await fs.readFile(file(path.join(root, "history")), "utf8"))).toEqual({ version: 1, records: [record()] });
    await expect(restarted.save({ ...record(), result: { changed: true } })).rejects.toThrow(/衝突/);
    expect(await restarted.list()).toEqual([record()]);
  });
  it("serializes concurrent saves and places unknown dates last", async () => {
    await Promise.all(Array.from({ length: 16 }, (_, index) => store.save(record(String(index)))));
    await store.save(record("unknown", null));
    await store.save(record("newest", "2027-01-01T00:00:00Z"));
    const records = await store.list();
    expect(records).toHaveLength(18);
    expect(records[0].id).toBe("newest");
    expect(records.at(-1).id).toBe("unknown");
  });
  it("merges both directories, keeps the source and persists settings", async () => {
    await store.save(record());
    const target = path.join(root, "selected");
    await fs.mkdir(target);
    await fs.writeFile(file(target), JSON.stringify({ version: 1, records: [record(), record("two")] }), "utf8");
    const source = await fs.readFile(file(path.join(root, "history")), "utf8");
    expect(await store.setDirectory(target)).toEqual({ directory: target });
    expect(await store.list()).toHaveLength(2);
    expect(await fs.readFile(file(path.join(root, "history")), "utf8")).toBe(source);
    expect(JSON.parse(await fs.readFile(path.join(root, "history-settings.json"), "utf8"))).toEqual({ directory: target });
    const restarted = new HistoryStore({ settingsDirectory: root, defaultHistoryDirectory: path.join(root, "unused") });
    expect(await restarted.getSettings()).toEqual({ directory: target });
  });
  it.each(["{broken", "null", '{"version":2,"records":[]}', '{"version":1,"records":[{}]}'])("refuses to overwrite damaged or unsupported data: %s", async raw => {
    const directory = path.join(root, "history");
    await fs.mkdir(directory);
    await fs.writeFile(file(directory), raw, "utf8");
    await expect(store.list()).rejects.toThrow();
    await expect(store.save(record())).rejects.toThrow();
    await expect(store.setDirectory(path.join(root, "elsewhere"))).rejects.toThrow();
    expect(await fs.readFile(file(directory), "utf8")).toBe(raw);
  });
  it("does not switch settings when target conflicts, is damaged or cannot be written", async () => {
    await store.save(record());
    const target = path.join(root, "target");
    await fs.mkdir(target);
    const conflict = JSON.stringify({ version: 1, records: [{ ...record(), answers: { q01: ["b"] } }] });
    await fs.writeFile(file(target), conflict, "utf8");
    await expect(store.setDirectory(target)).rejects.toThrow(/衝突/);
    expect(await fs.readFile(file(target), "utf8")).toBe(conflict);
    await fs.writeFile(file(target), "broken", "utf8");
    await expect(store.setDirectory(target)).rejects.toThrow();
    expect(await fs.readFile(file(target), "utf8")).toBe("broken");
    const blocker = path.join(root, "a-file");
    await fs.writeFile(blocker, "blocker", "utf8");
    await expect(store.setDirectory(blocker)).rejects.toThrow();
    expect(await store.getSettings()).toEqual({ directory: path.join(root, "history") });
    await store.save(record("recovered"));
    expect(await store.list()).toHaveLength(2);
  });
  it("keeps the old complete file when atomic rename fails and cleans temporary files", async () => {
    await store.save(record());
    const directory = path.join(root, "history");
    const previous = await fs.readFile(file(directory), "utf8");
    vi.spyOn(fs, "rename").mockRejectedValueOnce(new Error("rename denied"));
    await expect(store.save(record("two"))).rejects.toThrow("rename denied");
    expect(await fs.readFile(file(directory), "utf8")).toBe(previous);
    expect(await fs.readdir(directory)).toEqual(["history.json"]);
    await store.save(record("two"));
    expect(await store.list()).toHaveLength(2);
  });
  it("writes the merged history before changing settings", async () => {
    await store.save(record());
    const target = path.join(root, "target");
    const original = fs.rename.bind(fs);
    vi.spyOn(fs, "rename").mockImplementation(async (source, destination) => {
      if (String(destination).endsWith("history-settings.json")) throw new Error("settings denied");
      return original(source, destination);
    });
    await expect(store.setDirectory(target)).rejects.toThrow("settings denied");
    expect(await store.getSettings()).toEqual({ directory: path.join(root, "history") });
    expect(JSON.parse(await fs.readFile(file(target), "utf8")).records).toEqual([record()]);
  });
  it("rejects invalid public input and corrupt settings", async () => {
    for (const invalid of [ { ...record(), id: " " }, { ...record(), completedAt: "2026-02-30T00:00:00Z" }, { ...record(), answers: { q01: [] } }, { ...record(), result: [] }, { ...record(), result: { value: undefined } } ]) {
      await expect(store.save(invalid)).rejects.toThrow();
    }
    await expect(store.setDirectory("relative")).rejects.toThrow();
    await fs.writeFile(path.join(root, "history-settings.json"), "null", "utf8");
    await expect(store.save(record())).rejects.toThrow();
    await expect(store.setDirectory(path.join(root, "target"))).rejects.toThrow();
    expect(await fs.readFile(path.join(root, "history-settings.json"), "utf8")).toBe("null");
  });
});
