const { app, BrowserWindow, shell, ipcMain, dialog } = require("electron");
const path = require("node:path");
const { HistoryStore } = require("./history-store.cjs");
const primaryInstance = app.requestSingleInstanceLock();
if (!primaryInstance) app.quit();
app.on("second-instance", () => {
  const window = BrowserWindow.getAllWindows()[0];
  if (window) { if (window.isMinimized()) window.restore(); window.show(); window.focus(); }
});

const allowedHosts = new Set([
  "www.leagueoflegends.com",
  "developer.riotgames.com",
  "ddragon.leagueoflegends.com",
]);

function openOfficialPage(address) {
  try {
    const url = new URL(address);
    if (url.protocol === "https:" && allowedHosts.has(url.hostname))
      shell.openExternal(url.href);
  } catch {
    /* Ignore malformed external URLs. */
  }
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1200,
    height: 830,
    minWidth: 800,
    minHeight: 620,
    backgroundColor: "#f5f3ed",
    title: "召喚本色 · Rift Compass",
    icon: path.join(__dirname, "../dist/assets/app-icon.png"),
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });
  window.webContents.setWindowOpenHandler(({ url }) => {
    openOfficialPage(url);
    return { action: "deny" };
  });
  window.webContents.on("will-navigate", (event) => event.preventDefault());
  window.once("ready-to-show", () => window.show());
  const devUrl = process.env.RIFT_DEV_URL;
  if (!app.isPackaged && devUrl === "http://127.0.0.1:5173")
    window.loadURL(devUrl);
  else window.loadFile(path.join(__dirname, "../dist/index.html"));
}

if (primaryInstance) app.whenReady().then(() => {
  const store = new HistoryStore({
    settingsDirectory: app.getPath("userData"),
    defaultHistoryDirectory: path.join(app.getPath("userData"), "history"),
  });
  const handle = (channel, operation) => ipcMain.handle(channel, (event, ...args) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window || event.senderFrame !== event.sender.mainFrame) throw new Error("不允許的歷史存取");
    return operation(window, ...args);
  });
  handle("history:getSettings", () => store.getSettings());
  handle("history:list", () => store.list());
  handle("history:save", (_window, record) => store.save(record));
  handle("history:chooseDirectory", async window => {
    const selection = await dialog.showOpenDialog(window, {
      title: "選擇歷史紀錄資料夾", properties: ["openDirectory", "createDirectory"],
    });
    if (selection.canceled || !selection.filePaths.length) return null;
    return store.setDirectory(selection.filePaths[0]);
  });
  createWindow();
  app.on("activate", () => {
    if (!BrowserWindow.getAllWindows().length) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
