import { createServer } from "vite";
import { _electron as electron, expect } from "@playwright/test";
import path from "node:path";

const server = await createServer();
let app;
try {
  await server.listen();
  const response = await fetch("http://127.0.0.1:5173");
  expect(response.status).toBe(200);
  const environment = { ...process.env, RIFT_DEV_URL: "http://127.0.0.1:5173" };
  delete environment.ELECTRON_RUN_AS_NODE;
  app = await electron.launch({
    args: [
      ".",
      `--user-data-dir=${path.resolve(".tools/dev-verification-profile")}`,
    ],
    env: environment,
  });
  const page = await app.firstWindow();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(
    page.getByRole("button", { name: "找到我的本色" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "找到我的本色" }).click();
  await expect(page.locator(".choice")).toHaveCount(4);
  expect(errors).toEqual([]);
  console.log("Development server and Electron entry verified.");
} finally {
  if (app) await app.close();
  await server.close();
}
