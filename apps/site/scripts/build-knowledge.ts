import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  EMBEDDING_DIMENSIONS,
  EMBEDDING_MODEL,
  embed,
} from "../lib/knowledge/embed";
import { chunkHash, embeddingText } from "../lib/knowledge/hash";
import {
  allKnowledgeChunks,
  type KnowledgeChunk,
} from "../lib/knowledge/sources";
import { quantize } from "../lib/knowledge/vectors";

type IndexEntry = { id: string; locale: string; hash: string; vector: string };
type Index = { model: string; dimensions: number; chunks: IndexEntry[] };

const site = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = join(site, "lib/knowledge/index.json");

function loadExisting(): Index | undefined {
  if (!existsSync(indexPath)) return undefined;
  try {
    return JSON.parse(readFileSync(indexPath, "utf8")) as Index;
  } catch {
    return undefined;
  }
}

function entryKey(entry: { id: string; locale: string }) {
  return `${entry.locale}:${entry.id}`;
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");

  const chunks = allKnowledgeChunks();
  const existing = loadExisting();
  const canReuse =
    existing?.model === EMBEDDING_MODEL &&
    existing.dimensions === EMBEDDING_DIMENSIONS;
  const existingByKey = new Map(
    (canReuse ? existing!.chunks : []).map((entry) => [entryKey(entry), entry]),
  );

  const reused: IndexEntry[] = [];
  const pending: { chunk: KnowledgeChunk; hash: string }[] = [];

  for (const chunk of chunks) {
    const hash = chunkHash(chunk);
    const match = existingByKey.get(entryKey(chunk));
    if (match && match.hash === hash) reused.push(match);
    else pending.push({ chunk, hash });
  }

  const vectors = pending.length
    ? await embed(
        pending.map(({ chunk }) => embeddingText(chunk)),
        apiKey,
      )
    : [];
  const embedded: IndexEntry[] = pending.map(({ chunk, hash }, i) => ({
    id: chunk.id,
    locale: chunk.locale,
    hash,
    vector: quantize(vectors[i]),
  }));

  const currentKeys = new Set(chunks.map(entryKey));
  const removed = canReuse
    ? existing!.chunks.filter((entry) => !currentKeys.has(entryKey(entry)))
        .length
    : 0;

  const output: Index = {
    model: EMBEDDING_MODEL,
    dimensions: EMBEDDING_DIMENSIONS,
    chunks: [...reused, ...embedded].sort((a, b) =>
      a.locale === b.locale
        ? a.id.localeCompare(b.id)
        : a.locale.localeCompare(b.locale),
    ),
  };

  writeFileSync(indexPath, `${JSON.stringify(output, null, 2)}\n`);
  console.log(
    `reused: ${reused.length}, embedded: ${embedded.length}, removed: ${removed}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
