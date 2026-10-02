import type { Locale } from "../content";
import { embed } from "./embed";
import { chunkHash } from "./hash";
import {
  CONTACT_CHUNK_ID,
  knowledgeChunks,
  type KnowledgeChunk,
} from "./sources";
import { dequantize, topK } from "./vectors";
import index from "./index.json";

export const MIN_SCORE = 0.35;
export const MAX_RESULTS = 4;

export type RetrievedChunk = KnowledgeChunk & { score: number };

type IndexedItem = { value: KnowledgeChunk; vector: Float32Array };

const indexed = new Map<Locale, IndexedItem[]>();

function indexedChunks(locale: Locale): IndexedItem[] {
  const cached = indexed.get(locale);
  if (cached) return cached;

  const entriesById = new Map(
    index.chunks
      .filter((entry) => entry.locale === locale)
      .map((entry) => [entry.id, entry]),
  );
  const items = knowledgeChunks(locale).flatMap((chunk) => {
    const entry = entriesById.get(chunk.id);
    if (!entry || entry.hash !== chunkHash(chunk)) return [];
    return [{ value: chunk, vector: dequantize(entry.vector) }];
  });

  indexed.set(locale, items);
  return items;
}

export async function retrieve(
  question: string,
  locale: Locale,
  apiKey: string,
  signal?: AbortSignal,
): Promise<RetrievedChunk[]> {
  const [queryVector] = await embed([question], apiKey, signal);
  const items = indexedChunks(locale);
  const results = topK(queryVector, items, MAX_RESULTS, MIN_SCORE).map(
    ({ value, score }) => ({ ...value, score }),
  );

  if (!results.some((result) => result.id === CONTACT_CHUNK_ID)) {
    const contact = items.find((item) => item.value.id === CONTACT_CHUNK_ID);
    if (contact) results.push({ ...contact.value, score: 0 });
  }

  return results;
}
