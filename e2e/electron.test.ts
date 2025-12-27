import { test, expect, _electron } from "@playwright/test";

let electronApp: Awaited<ReturnType<typeof _electron.launch>>;
let mainPage: Awaited<ReturnType<typeof electronApp.firstWindow>>;

test.beforeEach(async () => {
  electronApp = await _electron.launch({
    args: ["."],
    env: { NODE_ENV: "development" },
  });
  mainPage = await electronApp.firstWindow();
});

test.afterEach(async () => {
  await electronApp.close();
});

test("custom frame should minimize the mainWindow", async () => {
  await expect(mainPage.locator("#minimize")).toBeVisible();

  await mainPage.click("#minimize");
  await expect
    .poll(async () => {
      return electronApp.evaluate((electron) =>
        electron.BrowserWindow.getAllWindows()[0].isMinimized()
      );
    })
    .toBe(true);
});
