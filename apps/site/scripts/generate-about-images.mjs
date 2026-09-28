import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const site = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(site, "..", "..");
const outputDir = join(site, "public", "about");

const STYLE =
  "Photorealistic photo, natural window light, candid moment, nobody posing for the camera. " +
  "Small, diverse team of software developers and designers in a bright modern office with tropical plants, a warm Amazon rainforest feel. " +
  "Soft coral, peach and mint color accents in the decor and clothing. " +
  "No logos, no readable text or legible screens, no famous or real people.";

const images = [
  {
    file: "team-collaboration.webp",
    prompt: `${STYLE} Two or three people gathered around a laptop on a wooden desk, smiling and pointing at the screen together.`,
  },
  {
    file: "team-whiteboard.webp",
    prompt: `${STYLE} A small group standing next to a whiteboard covered in sticky notes, sketching a plan and laughing.`,
  },
  {
    file: "pair-programming.webp",
    prompt: `${STYLE} Two developers sitting side by side sharing one laptop, one typing while the other points at the code.`,
  },
  {
    file: "team-celebration.webp",
    prompt: `${STYLE} A small team having a relaxed celebration moment in the office, clapping and smiling, coffee mugs on the table.`,
  },
];

const MAX_API_CALLS = 8;
const MAX_ATTEMPTS_PER_IMAGE = 2;
const MAX_BYTES = 150 * 1024;
const TARGET_WIDTH = 1200;

function readApiKey() {
  try {
    const contents = readFileSync(join(repoRoot, ".env"), "utf8");
    for (const line of contents.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const separator = trimmed.indexOf("=");
      if (separator === -1) continue;
      const key = trimmed.slice(0, separator).trim();
      if (key !== "OPENAI_API_KEY") continue;
      return trimmed
        .slice(separator + 1)
        .trim()
        .replace(/^["']|["']$/g, "");
    }
  } catch {}
  return process.env.OPENAI_API_KEY ?? null;
}

function commandExists(command) {
  try {
    execFileSync("which", [command], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function toWebp(sourcePath, webpPath) {
  for (const quality of [82, 74, 66, 58, 50]) {
    execFileSync("cwebp", [
      "-quiet",
      "-q",
      String(quality),
      "-resize",
      String(TARGET_WIDTH),
      "0",
      sourcePath,
      "-o",
      webpPath,
    ]);
    if (statSync(webpPath).size <= MAX_BYTES) return;
  }
}

async function requestImage(prompt, apiKey) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      size: "1536x1024",
      quality: "medium",
      n: 1,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `OpenAI request failed (${response.status}): ${detail.slice(0, 200)}`,
    );
  }

  const body = await response.json();
  const b64 = body.data?.[0]?.b64_json;
  if (!b64) throw new Error("OpenAI response did not include image data");
  return Buffer.from(b64, "base64");
}

async function main() {
  const apiKey = readApiKey();
  if (!apiKey) {
    console.log(
      "No OPENAI_API_KEY found. Skipping generation; the about page will fall back to placeholders.",
    );
    return;
  }

  const hasCwebp = commandExists("cwebp");
  const hasSips = commandExists("sips");
  mkdirSync(outputDir, { recursive: true });
  const scratch = mkdtempSync(join(tmpdir(), "irtc-about-images-"));

  let callsUsed = 0;
  let produced = 0;

  for (const image of images) {
    if (callsUsed >= MAX_API_CALLS) break;
    let success = false;

    for (
      let attempt = 1;
      attempt <= MAX_ATTEMPTS_PER_IMAGE && callsUsed < MAX_API_CALLS;
      attempt++
    ) {
      callsUsed++;
      try {
        const buffer = await requestImage(image.prompt, apiKey);
        const pngPath = join(scratch, image.file.replace(".webp", ".png"));
        writeFileSync(pngPath, buffer);

        if (hasCwebp) {
          toWebp(pngPath, join(outputDir, image.file));
        } else if (hasSips) {
          const resizedPng = join(scratch, `resized-${attempt}.png`);
          execFileSync(
            "sips",
            ["-Z", String(TARGET_WIDTH), pngPath, "--out", resizedPng],
            {
              stdio: "ignore",
            },
          );
          writeFileSync(
            join(outputDir, image.file.replace(".webp", ".png")),
            readFileSync(resizedPng),
          );
        } else {
          writeFileSync(
            join(outputDir, image.file.replace(".webp", ".png")),
            buffer,
          );
        }

        console.log(`generated public/about/${image.file}`);
        success = true;
        produced++;
        break;
      } catch (error) {
        console.log(
          `attempt ${attempt} for ${image.file} failed: ${error.message}`,
        );
      }
    }

    if (!success)
      console.log(
        `could not generate ${image.file}; the about page will use a placeholder for it.`,
      );
  }

  console.log(
    `Done. ${produced}/${images.length} image(s) generated using ${callsUsed} API call(s).`,
  );
}

main().catch((error) => {
  console.error("Image generation script failed:", error.message);
  process.exitCode = 1;
});
