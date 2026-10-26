import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests-e2e",
  timeout: 180000,
  retries: 0,
  use: {
    baseURL: "http://127.0.0.1:5000",
    headless: true,
    viewport: { width: 1280, height: 720 },
    video: { mode: "on", size: { width: 1280, height: 720 } },
  },
  outputDir: "./test-video",
  reporter: [["list"]],
});
