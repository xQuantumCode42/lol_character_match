import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
const read = (name: string) => readFileSync(path.resolve(name), "utf8");

async function boot(primary = true) {
  const handlers = new Map<string, (...args: any[]) => any>();
  const windows: any[] = [];
  const app = {
    requestSingleInstanceLock: vi.fn(() => primary), quit: vi.fn(),
    on: vi.fn(), whenReady: vi.fn(() => Promise.resolve()),
    getPath: vi.fn(() => path.resolve(".test-user-data")), isPackaged: true,
  };
  class Window {
    options: any;
    webContents = { mainFrame: {}, setWindowOpenHandler: vi.fn(), on: vi.fn() };
    on = vi.fn(); once = vi.fn(); loadFile = vi.fn(); show = vi.fn();
    constructor(options: any) { this.options = options; windows.push(this); }
    static getAllWindows() { return windows; }
    static fromWebContents(contents: any) { return windows.find(window => window.webContents === contents); }
  }
  const store = { getSettings: vi.fn(async () => ({ directory: "current" })), list: vi.fn(async () => []), save: vi.fn(async () => {}), setDirectory: vi.fn(async directory => ({ directory })) };
  const HistoryStore = vi.fn(function () { return store; });
  const dialog = { showOpenDialog: vi.fn(async () => ({ canceled: true, filePaths: [] as string[] })) };
  vm.runInNewContext(read("electron/main.cjs"), {
    require: (name: string) => {
      if (name === "electron") return { app, BrowserWindow: Window, dialog, shell: { openExternal: vi.fn() }, ipcMain: { handle: (channel: string, handler: (...args: any[]) => any) => handlers.set(channel, handler) } };
      if (name === "node:path") return path;
      if (name === "./history-store.cjs") return { HistoryStore };
      throw new Error(name);
    },
    __dirname: path.resolve("electron"), process: { env: {}, platform: "win32" }, URL,
  });
  await Promise.resolve();
  const window = windows[0];
  const event = window ? { sender: window.webContents, senderFrame: window.webContents.mainFrame } : null;
  return { app, windows, handlers, store, HistoryStore, dialog, event };
}

describe("Electron history integration without launching a browser", () => {
  it("registers only the narrow bridge, maintains isolation, and uses userData defaults", async () => {
    const { handlers, windows, HistoryStore, event, store } = await boot();
    expect([...handlers.keys()].sort()).toEqual(["history:chooseDirectory", "history:getSettings", "history:list", "history:save"]);
    expect(windows[0].options.webPreferences).toMatchObject({ nodeIntegration: false, contextIsolation: true, sandbox: true, preload: path.resolve("electron/preload.cjs") });
    expect(HistoryStore).toHaveBeenCalledWith({ settingsDirectory: path.resolve(".test-user-data"), defaultHistoryDirectory: path.resolve(".test-user-data/history") });
    await handlers.get("history:getSettings")!(event);
    await handlers.get("history:list")!(event);
    const record = { id: "snapshot" };
    await handlers.get("history:save")!(event, record);
    expect(store.save).toHaveBeenCalledWith(record);
    expect(() => handlers.get("history:list")!({ ...event, senderFrame: {} })).toThrow();
  });
  it("cancels without switching and returns settings only after successful directory merge", async () => {
    const { handlers, dialog, store, event } = await boot();
    const choose = handlers.get("history:chooseDirectory")!;
    expect(await choose(event)).toBeNull();
    expect(store.setDirectory).not.toHaveBeenCalled();
    const selected = path.resolve(".selected");
    dialog.showOpenDialog.mockResolvedValue({ canceled: false, filePaths: [selected] });
    expect(await choose(event)).toEqual({ directory: selected });
    expect(store.setDirectory).toHaveBeenCalledWith(selected);
    store.setDirectory.mockRejectedValueOnce(new Error("merge failed"));
    await expect(choose(event)).rejects.toThrow("merge failed");
  });
  it("does not start another writer or window when the instance lock is held", async () => {
    const { app, windows, handlers } = await boot(false);
    expect(app.quit).toHaveBeenCalled();
    expect(app.whenReady).not.toHaveBeenCalled();
    expect(windows).toHaveLength(0);
    expect(handlers.size).toBe(0);
  });
  it("preload exposes four fixed operations without arbitrary paths", async () => {
    const exposeInMainWorld = vi.fn();
    const invoke = vi.fn(async () => null);
    vm.runInNewContext(read("electron/preload.cjs"), { require: () => ({ contextBridge: { exposeInMainWorld }, ipcRenderer: { invoke } }) });
    expect(exposeInMainWorld.mock.calls[0][0]).toBe("riftHistory");
    const api = exposeInMainWorld.mock.calls[0][1];
    expect(Object.keys(api).sort()).toEqual(["chooseDirectory", "getSettings", "list", "save"]);
    await api.getSettings(); await api.list(); await api.save({ id: "one" }); await api.chooseDirectory();
    expect(invoke.mock.calls).toEqual([["history:getSettings"], ["history:list"], ["history:save", { id: "one" }], ["history:chooseDirectory"]]);
    const config = JSON.parse(read("package.json"));
    expect(config.version).toBe("0.1.0");
    expect(config.build.files).toContain("electron/**/*");
  });
});
