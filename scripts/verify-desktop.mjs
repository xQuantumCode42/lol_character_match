import { _electron as electron, expect } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const output = path.resolve(".tools/verification");
await fs.mkdir(output, { recursive: true });
const executablePath = process.env.RIFT_TEST_EXE;
const errors = [];
const externalRequests = [];
let app;

async function launch() {
  const args = [`--user-data-dir=${path.join(output, "profile")}`];
  if (!executablePath) args.unshift(path.resolve("."));
  const environment = { ...process.env };
  delete environment.ELECTRON_RUN_AS_NODE;
  app = await electron.launch({
    executablePath,
    args,
    env: environment,
    timeout: 30000,
  });
  const page = await app.firstWindow();
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (/^https?:/.test(request.url())) externalRequests.push(request.url());
  });
  await page.waitForSelector(".brand");
  return page;
}

try {
  let page = await launch();
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.getByRole("heading", { name: /你的個性/ })).toBeVisible();
  await page.screenshot({
    path: path.join(output, "home.png"),
    fullPage: true,
  });
  await page.getByRole("button", { name: "找到我的本色" }).click();
  await expect(page.getByRole("button", { name: "下一題" })).toBeDisabled();
  for (let index = 0; index < 5; index++) {
    await page
      .locator(".choice")
      .nth(index % 4)
      .click();
    await page.getByRole("button", { name: "下一題" }).click();
  }
  await expect(page.locator(".question-panel .eyebrow")).toContainText(
    "06 / 30",
  );
  await app.close();
  page = await launch();
  await expect(page.locator(".question-panel .eyebrow")).toContainText(
    "06 / 30",
  );
  await page.getByRole("button", { name: "上一題" }).click();
  await expect(page.locator('.choice[aria-pressed="true"]')).toHaveCount(1);
  await page.getByRole("button", { name: "下一題" }).click();
  for (let index = 5; index < 28; index++) {
    await page
      .locator(".choice")
      .nth(index % 4)
      .click();
    if (index === 10)
      await page.screenshot({
        path: path.join(output, "question.png"),
        fullPage: true,
      });
    await page.getByRole("button", { name: "下一題" }).click();
  }
  await page.locator(".choice").nth(0).click();
  await page.locator(".choice").nth(1).click();
  await page.locator(".choice").nth(2).click();
  await expect(page.locator('.choice[aria-pressed="true"]')).toHaveCount(2);
  await page.locator(".choice").nth(4).click();
  await expect(page.locator('.choice[aria-pressed="true"]')).toHaveCount(1);
  await page.locator(".choice").nth(0).click();
  await page.getByRole("button", { name: "下一題" }).click();
  await page.locator(".choice").nth(2).click();
  await page.locator(".choice").nth(5).click();
  await page.getByRole("button", { name: "看看我的本色" }).click();
  await expect(page.locator(".champion-card")).toHaveCount(3);
  await expect(page.locator(".challenge-card h3")).not.toBeEmpty();
  await expect
    .poll(() =>
      page
        .locator("img")
        .evaluateAll((images) =>
          images.every((image) => image.complete && image.naturalWidth > 0),
        ),
    )
    .toBe(true);
  await page.screenshot({
    path: path.join(output, "results.png"),
    fullPage: true,
  });
  const mainLane = await page.locator(".lane-identity h2").textContent();
  const starterNames = await page
    .locator(".champion-card h3")
    .allTextContents();
  await page.locator(".champion-card .card-link").first().click();
  await expect(
    page.getByRole("heading", { name: "需要慢慢熟悉的地方" }),
  ).toBeVisible();
  await expect(page.locator(".official-link")).toHaveAttribute(
    "href",
    /^https:\/\/www\.leagueoflegends\.com\/zh-tw\/champions\//,
  );
  await page.getByRole("button", { name: "關閉", exact: true }).click();
  // Editing a completed multiselect answer must reopen the incomplete question.
  await page.getByRole("button", { name: "回看我的答案" }).click();
  for (let index = 0; index < 29; index++)
    await page.getByRole("button", { name: "下一題" }).click();
  while (await page.locator('.choice[aria-pressed="true"]').count())
    await page.locator('.choice[aria-pressed="true"]').first().click();
  await page.getByRole("button", { name: "召喚本色首頁" }).click();
  await page.getByRole("button", { name: "繼續我的探索" }).click();
  await expect(page.locator(".question-panel .eyebrow")).toContainText(
    "30 / 30",
  );
  await page.locator(".choice").nth(2).click();
  await page.getByRole("button", { name: "看看我的本色" }).click();
  await page.getByRole("button", { name: "探索全部 173 位英雄" }).click();
  await expect(page.locator(".catalog-item")).toHaveCount(173);
  await page.getByRole("textbox", { name: "搜尋英雄" }).fill("阿璃");
  await expect(page.locator(".catalog-item")).toHaveCount(1);
  await page.getByRole("textbox", { name: "搜尋英雄" }).fill("not-a-champion");
  await expect(page.locator(".empty-state")).toBeVisible();
  await page.getByRole("button", { name: "關閉", exact: true }).click();
  await app.evaluate(({ BrowserWindow }) =>
    BrowserWindow.getAllWindows()[0].setSize(800, 620),
  );
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    )
    .toBe(true);
  await page.screenshot({
    path: path.join(output, "results-small.png"),
    fullPage: true,
  });
  await app.close();
  page = await launch();
  await expect(page.locator(".champion-card")).toHaveCount(3);
  await page.getByRole("button", { name: "重新測驗" }).click();
  await page.getByRole("button", { name: "保留答案" }).click();
  await expect(page.locator(".champion-card")).toHaveCount(3);
  await page.getByRole("button", { name: "重新測驗" }).click();
  await page.getByRole("button", { name: "重新開始", exact: true }).click();
  await expect(page.locator(".question-panel .eyebrow")).toContainText(
    "01 / 30",
  );
  await expect(page.getByRole("button", { name: "下一題" })).toBeDisabled();
  expect(errors).toEqual([]);
  expect(externalRequests).toEqual([]);
  const report = {
    executable: executablePath || "development Electron, production renderer",
    fullQuestionnaire: true,
    restartPersistence: true,
    resultPersistence: true,
    exclusiveMultiSelect: true,
    allChampionCount: 173,
    heroDetails: true,
    search: true,
    resetConfirmation: true,
    narrowWindow: "800x620 without horizontal overflow",
    noRuntimeNetwork: true,
    rendererErrors: errors,
    mainLane,
    starterNames,
  };
  await fs.writeFile(
    path.join(
      output,
      executablePath ? "packaged-report.json" : "desktop-report.json",
    ),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  if (app) await app.close().catch(() => {});
}
