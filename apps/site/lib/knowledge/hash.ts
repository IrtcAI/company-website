import { createHash } from "node:crypto";
import type { KnowledgeChunk } from "./sources";

export function embeddingText(chunk: KnowledgeChunk): string {
  return `${chunk.title}\n${chunk.text}`;
}

export function chunkHash(chunk: KnowledgeChunk): string {
  return createHash("sha256")
    .update(embeddingText(chunk))
    .digest("hex")
    .slice(0, 16);
}
