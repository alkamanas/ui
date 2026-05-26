import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";

const appUrl = process.env.EXAMPLES_URL ?? "http://localhost:4328";
const selector = "[class*='-showcase-preview']";
const outDir = resolve("public/assets/example-thumbnails");
const sourcePath = resolve("src/examples-app.tsx");
const chromePath =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function main() {
  await assertServerAvailable();
  await mkdir(outDir, { recursive: true });

  const ids = await readExampleIds();
  const port = await getFreePort();
  const userDataDir = join(tmpdir(), `alka-thumbnail-chrome-${process.pid}`);
  const chrome = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    "about:blank",
  ], {
    stdio: ["ignore", "ignore", "pipe"],
  });

  chrome.stderr.on("data", () => {});

  try {
    const wsUrl = await waitForDevtools(port);
    const cdp = await connectCdp(wsUrl);
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1400,
      height: 1400,
      deviceScaleFactor: 1,
      mobile: false,
    });

    for (const id of ids) {
      const url = `${appUrl.replace(/\/$/, "")}/examples/${id}`;
      await cdp.send("Page.navigate", { url });
      await waitForLoad(cdp);

      const rect = await getElementRect(cdp, selector);
      if (!rect) {
        console.log(`skip ${id}: showcase preview not found`);
        continue;
      }

      const screenshot = await cdp.send("Page.captureScreenshot", {
        format: "png",
        fromSurface: true,
        captureBeyondViewport: true,
        clip: {
          x: Math.max(0, rect.x),
          y: Math.max(0, rect.y),
          width: Math.max(1, rect.width),
          height: Math.max(1, rect.height),
          scale: 1,
        },
      });

      const filePath = join(outDir, `${id}.png`);
      await writeFile(filePath, Buffer.from(screenshot.data, "base64"));
      console.log(`wrote ${filePath}`);
    }

    await cdp.close();
  } finally {
    chrome.kill();
    await waitForProcessExit(chrome);
    await rm(userDataDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  }
}

async function readExampleIds() {
  const source = await readFile(sourcePath, "utf8");
  const start = source.indexOf("const examples: Example[] = [");
  const end = source.indexOf("\n];", start);
  if (start === -1 || end === -1) {
    throw new Error("Could not find examples array in examples-app.tsx");
  }

  const examplesBlock = source.slice(start, end);
  return Array.from(examplesBlock.matchAll(/id:\s*"([^"]+)"/g), (match) => match[1]);
}

async function assertServerAvailable() {
  try {
    const response = await fetch(appUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Examples server is not available at ${appUrl}. Run pnpm dev first.`, {
      cause: error,
    });
  }
}

function getFreePort() {
  return new Promise((resolvePort, reject) => {
    const server = createServer();
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => {
        if (address && typeof address === "object") {
          resolvePort(address.port);
        } else {
          reject(new Error("Could not allocate a port"));
        }
      });
    });
    server.on("error", reject);
  });
}

async function waitForDevtools(port) {
  const endpoint = `http://127.0.0.1:${port}/json`;
  const deadline = Date.now() + 10_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        const page = data.find((target) => target.type === "page" && target.webSocketDebuggerUrl);
        if (page) return page.webSocketDebuggerUrl;
      }
    } catch {}

    await sleep(100);
  }

  throw new Error("Chrome DevTools endpoint did not become available");
}

function connectCdp(wsUrl) {
  const socket = new WebSocket(wsUrl);
  let nextId = 1;
  const pending = new Map();

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) return;

    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);

    if (message.error) {
      request.reject(new Error(message.error.message));
    } else {
      request.resolve(message.result ?? {});
    }
  });

  const opened = new Promise((resolveOpen, reject) => {
    socket.addEventListener("open", resolveOpen, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  return opened.then(() => ({
    send(method, params = {}) {
      const id = nextId++;
      socket.send(JSON.stringify({ id, method, params }));
      return new Promise((resolveSend, reject) => {
        pending.set(id, { resolve: resolveSend, reject });
      });
    },
    close() {
      socket.close();
    },
  }));
}

async function waitForLoad(cdp) {
  const deadline = Date.now() + 10_000;

  while (Date.now() < deadline) {
    const result = await cdp.send("Runtime.evaluate", {
      expression: "document.readyState",
      returnByValue: true,
    });
    if (result.result?.value === "complete") {
      await sleep(300);
      return;
    }
    await sleep(100);
  }

  throw new Error("Timed out waiting for page load");
}

async function getElementRect(cdp, targetSelector) {
  const expression = `
    (() => {
      const element = Array.from(document.querySelectorAll(${JSON.stringify(targetSelector)}))
        .find((candidate) => candidate instanceof HTMLElement && candidate.offsetParent !== null);
      if (!element) return null;
      element.scrollIntoView({ block: "center", inline: "center" });
      const rect = element.getBoundingClientRect();
      return {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height
      };
    })()
  `;

  const result = await cdp.send("Runtime.evaluate", {
    expression,
    returnByValue: true,
  });

  return result.result?.value ?? null;
}

function sleep(ms) {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

function waitForProcessExit(child) {
  if (child.exitCode !== null || child.signalCode !== null) {
    return Promise.resolve();
  }

  return new Promise((resolveExit) => {
    child.once("exit", resolveExit);
  });
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
