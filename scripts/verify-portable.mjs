import { chromium, expect } from "@playwright/test";
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import net from "node:net";
import path from "node:path";

const output = path.resolve(".tools/verification");
const executable = path.resolve("release/0.1.0/Rift Compass 0.1.0.exe");
await fs.mkdir(output, { recursive: true });
const probe = net.createServer();
await new Promise((resolve) => probe.listen(0, "127.0.0.1", resolve));
const port = probe.address().port;
await new Promise((resolve) => probe.close(resolve));
const environment = { ...process.env };
delete environment.ELECTRON_RUN_AS_NODE;
const child = spawn(
  executable,
  [
    `--user-data-dir=${path.join(output, "portable-profile")}`,
    `--remote-debugging-port=${port}`,
    "--remote-debugging-address=127.0.0.1",
  ],
  { env: environment, windowsHide: true, stdio: "ignore" },
);
let browser;
try {
  const endpoint = `http://127.0.0.1:${port}`;
  let ready = false;
  for (let attempt = 0; attempt < 90; attempt++) {
    try {
      const response = await fetch(`${endpoint}/json/version`);
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {
      /* The portable shell is still extracting. */
    }
    if (child.exitCode !== null)
      throw new Error(`Portable exited before opening: ${child.exitCode}`);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  if (!ready)
    throw new Error("Portable window did not become ready in 45 seconds");
  browser = await chromium.connectOverCDP(endpoint);
  const context = browser.contexts()[0];
  const page = context.pages()[0] || (await context.waitForEvent("page"));
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.waitForSelector(".brand");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.getByRole("heading", { name: /你的個性/ })).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".hero-art")
        .evaluate((image) => image.complete && image.naturalWidth > 0),
    )
    .toBe(true);
  await page.screenshot({
    path: path.join(output, "portable-home.png"),
    fullPage: true,
  });
  await page.getByRole("button", { name: "找到我的本色" }).click();
  await page.locator(".choice").first().click();
  await page.getByRole("button", { name: "下一題" }).click();
  await expect(page.locator(".question-panel .eyebrow")).toContainText(
    "02 / 30",
  );
  expect(errors).toEqual([]);
  const report = {
    executable,
    portableSelfExtraction: true,
    homeAndArtLoaded: true,
    answerAndNext: true,
    rendererErrors: errors,
  };
  await fs.writeFile(
    path.join(output, "portable-report.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
  await page.close();
} finally {
  if (browser) await browser.close();
  if (child.exitCode === null) child.kill();
}
