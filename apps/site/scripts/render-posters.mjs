import { spawn, execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const site = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(
  createRequire(join(site, "package.json")).resolve("vitest"),
);
const { createServer } = await import(require.resolve("vite"));
const chromePath =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const kinds = ["browser", "chip", "database", "server", "phone"];
const size = 960;
const output = join(site, "public", "studio");
const scratch = mkdtempSync(join(tmpdir(), "irtc-posters-"));

const server = await createServer({
  root: site,
  logLevel: "error",
  resolve: { alias: { "@": site } },
  server: { port: 0 },
  plugins: [
    {
      name: "poster-page",
      configureServer(vite) {
        vite.middlewares.use("/posters.html", async (_, response) => {
          const html = await vite.transformIndexHtml(
            "/posters.html",
            `<!doctype html><script type="module">import { renderPoster } from "/lib/studio-scene.ts"; window.renderPoster = renderPoster;</script>`,
          );
          response.setHeader("Content-Type", "text/html");
          response.end(html);
        });
      },
    },
  ],
});
await server.listen();
const url = `${server.resolvedUrls.local[0]}posters.html`;

const port = 9800 + Math.floor(Math.random() * 100);
const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${join(scratch, "profile")}`,
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "about:blank",
  ],
  { stdio: "ignore" },
);
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
let target;
for (let attempt = 0; attempt < 50 && !target; attempt++) {
  await sleep(200);
  try {
    const pages = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    target = pages.find((page) => page.type === "page");
  } catch {}
}
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((done) => socket.addEventListener("open", done));
let sequence = 0;
const pending = new Map();
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  pending.get(message.id)?.(message);
});
const send = (method, params = {}) =>
  new Promise((done) => {
    const id = ++sequence;
    pending.set(id, done);
    socket.send(JSON.stringify({ id, method, params }));
  });
const evaluate = async (expression) => {
  const { result } = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails)
    throw new Error(result.exceptionDetails.exception?.description);
  return result.result.value;
};

try {
  await send("Page.navigate", { url });
  for (let attempt = 0; attempt < 100; attempt++) {
    if (await evaluate("typeof window.renderPoster === 'function'")) break;
    await sleep(200);
  }
  mkdirSync(output, { recursive: true });
  for (const kind of kinds) {
    const image = await evaluate(`window.renderPoster("${kind}", ${size})`);
    const png = join(scratch, `${kind}.png`);
    writeFileSync(png, Buffer.from(image.split(",")[1], "base64"));
    execFileSync("cwebp", [
      "-quiet",
      "-q",
      "88",
      "-alpha_q",
      "100",
      "-m",
      "6",
      "-resize",
      String(size / 2),
      String(size / 2),
      png,
      "-o",
      join(output, `${kind}.webp`),
    ]);
    console.log(`public/studio/${kind}.webp`);
  }
} finally {
  socket.close();
  chrome.kill();
  await server.close();
}
