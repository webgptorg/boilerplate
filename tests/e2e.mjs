import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import puppeteer from "puppeteer";

const port = 3100;
const baseUrl = `http://127.0.0.1:${port}`;
const server = spawn("npm", ["run", "start", "--", "-p", String(port)], {
  env: { ...process.env, BROWSER: "none" },
  cwd: process.cwd(),
  detached: true,
  stdio: ["ignore", "pipe", "pipe"],
});

let browser;

function stopServer() {
  if (!server.killed) {
    try {
      process.kill(-server.pid, "SIGTERM");
    } catch {
      server.kill("SIGTERM");
    }
  }
}

async function waitForServer() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // The dev server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Timed out waiting for the Next.js dev server");
}

try {
  await waitForServer();
  browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(baseUrl, { waitUntil: "networkidle0" });

  await page.waitForSelector("h1");
  assert.equal(await page.$eval("h1", (element) => element.textContent), "Prepare your call");
  assert.equal(await page.$$eval(".scenario-option", (elements) => elements.length), 3);

  await page.click(".scenario-icon.technical");
  assert.equal(
    await page.$eval("#context", (element) => element.value),
    "The dashboard has been timing out for some customers since the morning deployment. Identify the likely cause, mitigate the impact, and agree on follow-up work.",
  );
  await page.$eval("#context", (element) => {
    element.value = "Rehearse the incident response before the customer update.";
    element.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await page.click(".button-primary");
  await page.waitForSelector("h1");
  assert.equal(await page.$eval("h1", (element) => element.textContent), "Your call");
  assert.equal(await page.$eval("h2", (element) => element.textContent), "Technical incident review");

  await page.click(".button-danger");
  await page.waitForSelector(".actions-card");
  assert.equal(await page.$eval("h1", (element) => element.textContent), "Call complete");
  assert.equal(await page.$eval(".action-count", (element) => element.textContent), "0/3");

  await page.click(".action-item");
  await page.waitForFunction(() => document.querySelector(".action-count")?.textContent === "1/3");
  assert.equal(await page.$eval(".action-count", (element) => element.textContent), "1/3");
  assert.equal(await page.$eval(".action-item", (element) => element.className.includes("action-done")), true);

  await page.click(".start-over");
  await page.waitForSelector(".scenario-list");
  assert.equal(await page.$eval("h1", (element) => element.textContent), "Prepare your call");
  assert.equal(await page.$eval("#context", (element) => element.value), "The team is preparing the customer portal launch. Align on progress and leave with clear owners for the remaining work.");

  console.log("Puppeteer E2E test passed");
} finally {
  if (browser) await browser.close();
  stopServer();
}
