const fs = require('node:fs/promises');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const { isDeepStrictEqual } = require('node:util');

function object(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function json(value, seen = new Set()) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return true;
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value !== 'object' || seen.has(value)) return false;
  if (!Array.isArray(value) && Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) return false;
  seen.add(value);
  const valid = Object.values(value).every(item => json(item, seen));
  seen.delete(value);
  return valid;
}
function validTime(value) {
  if (value === null) return true;
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) || !Number.isFinite(Date.parse(value))) return false;
  const date = value.slice(0, 10);
  return new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) === date;
}
function validateRecord(record) {
  if (!object(record) || typeof record.id !== 'string' || !record.id.trim() || !validTime(record.completedAt) ||
      !object(record.answers) || !Object.entries(record.answers).every(([key, values]) => key.trim() && Array.isArray(values) && values.length && values.every(value => typeof value === 'string' && value.trim())) ||
      !object(record.result) || !json(record)) throw new Error('歷史紀錄格式無效');
}
function merge(left, right) {
  const records = new Map();
  for (const record of [...left, ...right]) {
    validateRecord(record);
    if (records.has(record.id) && !isDeepStrictEqual(records.get(record.id), record)) throw new Error(`歷史紀錄 id 衝突：${record.id}`);
    records.set(record.id, record);
  }
  return [...records.values()];
}
async function readJSON(filename) {
  let raw;
  try { raw = await fs.readFile(filename, 'utf8'); }
  catch (error) { if (error.code === 'ENOENT') return null; throw new Error(`無法讀取 ${filename}：${error.message}`); }
  try { return { value: JSON.parse(raw) }; }
  catch { throw new Error(`檔案損壞，無法解析 ${filename}`); }
}
async function atomicWrite(filename, value) {
  await fs.mkdir(path.dirname(filename), { recursive: true });
  const temporary = `${filename}.${randomUUID()}.tmp`;
  try {
    const handle = await fs.open(temporary, 'wx');
    try { await handle.writeFile(JSON.stringify(value, null, 2), 'utf8'); await handle.sync(); }
    finally { await handle.close(); }
    await fs.rename(temporary, filename);
  } finally { await fs.rm(temporary, { force: true }).catch(() => {}); }
}

class HistoryStore {
  constructor({ settingsDirectory, defaultHistoryDirectory }) {
    if (!path.isAbsolute(settingsDirectory) || !path.isAbsolute(defaultHistoryDirectory)) throw new Error('必須使用完整資料夾路徑');
    this.settingsFile = path.join(settingsDirectory, 'history-settings.json');
    this.defaultDirectory = path.resolve(defaultHistoryDirectory);
    this.queue = Promise.resolve();
  }
  run(task) {
    const next = this.queue.then(task);
    this.queue = next.catch(() => {});
    return next;
  }
  async readSettings() {
    const saved = await readJSON(this.settingsFile);
    if (!saved) return { directory: this.defaultDirectory };
    if (!object(saved.value) || typeof saved.value.directory !== 'string' || !path.isAbsolute(saved.value.directory)) throw new Error(`設定格式不支援：${this.settingsFile}`);
    return { directory: path.resolve(saved.value.directory) };
  }
  async readRecords(directory) {
    const filename = path.join(directory, 'history.json');
    const saved = await readJSON(filename);
    if (!saved) return [];
    if (!object(saved.value) || saved.value.version !== 1 || !Array.isArray(saved.value.records)) throw new Error(`歷史檔案格式不支援：${filename}`);
    return merge([], saved.value.records);
  }
  getSettings() { return this.run(() => this.readSettings()); }
  list() {
    return this.run(async () => {
      const { directory } = await this.readSettings();
      return (await this.readRecords(directory)).sort((a, b) => {
        if (a.completedAt === null) return b.completedAt === null ? 0 : 1;
        if (b.completedAt === null) return -1;
        return Date.parse(b.completedAt) - Date.parse(a.completedAt);
      });
    });
  }
  save(record) {
    // Clone at the public boundary so queued callers cannot change the snapshot.
    let snapshot;
    try { validateRecord(record); snapshot = JSON.parse(JSON.stringify(record)); }
    catch (error) { return Promise.reject(error); }
    return this.run(async () => {
      const { directory } = await this.readSettings();
      const existing = await this.readRecords(directory);
      const records = merge(existing, [snapshot]);
      if (records.length !== existing.length) await atomicWrite(path.join(directory, 'history.json'), { version: 1, records });
    });
  }
  setDirectory(directory) {
    return this.run(async () => {
      if (typeof directory !== 'string' || !path.isAbsolute(directory)) throw new Error('必須使用完整資料夾路徑');
      directory = path.resolve(directory);
      const current = await this.readSettings();
      const records = merge(await this.readRecords(current.directory), await this.readRecords(directory));
      await atomicWrite(path.join(directory, 'history.json'), { version: 1, records });
      await atomicWrite(this.settingsFile, { directory });
      return { directory };
    });
  }
}
module.exports = { HistoryStore };
