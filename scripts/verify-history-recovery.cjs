const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { _electron, expect } = require('@playwright/test');

async function main() {
  const project = path.resolve(__dirname, '..');
  const output = path.join(project, '.tools/verification/history-recovery');
  await fs.mkdir(output, { recursive: true });
  const userData = await fs.mkdtemp(path.join(os.tmpdir(), 'history-recovery-'));
  const bootstrap = path.join(userData, 'bootstrap.cjs');
  await fs.writeFile(bootstrap, `const{app}=require('electron');app.setPath('userData',${JSON.stringify(userData)});require(${JSON.stringify(path.join(project, 'electron/main.cjs'))});`);
  const environment = { ...process.env };
  delete environment.ELECTRON_RUN_AS_NODE;
  const app = await _electron.launch({ executablePath: require('electron'), args: [bootstrap], cwd: project, env: environment });
  try {
    const page = await app.firstWindow();
    await page.getByRole('button', { name: '找到我的本色', exact: true }).waitFor();
    await page.evaluate(() => {
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key, value) {
        if (key === 'rift-compass.session.v1') throw new DOMException('Controlled quota failure', 'QuotaExceededError');
        return original.call(this, key, value);
      };
    });
    await page.getByRole('button', { name: '找到我的本色', exact: true }).click();
    for (let index = 0; index < 30; index++) {
      await page.locator('.choices .choice').first().click();
      await page.getByRole('button', { name: index === 29 ? '看看我的本色' : '下一題', exact: true }).click();
    }
    await expect.poll(async () => (await page.evaluate(() => window.riftHistory.list())).length).toBe(1);
    await page.reload();
    await page.waitForFunction(() => Boolean(window.riftHistory));
    const records = await page.evaluate(() => window.riftHistory.list());
    assert.equal(records.length, 1);
    assert.equal(Object.keys(records[0].answers).length, 30);

    const unsupported = { id: 'unsupported-format', completedAt: null, answers: { q01: ['a'] }, result: { historical: true } };
    await page.evaluate((record) => window.riftHistory.save(record), unsupported);
    const before = await page.evaluate(() => localStorage.getItem('rift-compass.session.v1'));
    await page.getByRole('button', { name: '歷史紀錄', exact: true }).click();
    await page.locator('[data-history-id="unsupported-format"]').click();
    await page.getByRole('alert').filter({ hasText: /格式.*無法顯示/ }).waitFor();
    const saved = await page.evaluate(() => window.riftHistory.list());
    assert.deepEqual(saved.find((record) => record.id === unsupported.id), unsupported);
    assert.equal(await page.evaluate(() => localStorage.getItem('rift-compass.session.v1')), before);
    await page.screenshot({ path: path.join(output, 'unsupported-format.png'), fullPage: true });
    await page.getByRole('button', { name: '返回歷史紀錄', exact: true }).first().click();
    await page.locator('[data-history-id="unsupported-format"]').waitFor();
    const report = { quotaRecovery: true, unsupportedFormatRecovery: true, recordsPreserved: true, temporaryData: userData };
    await fs.writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } finally { await app.close(); }
}
main().catch((error) => { console.error(error.stack || error.message); process.exitCode = 1; });
