import { describe, expect, it } from "vitest";
import { EMBEDDING_DIMENSIONS, EMBEDDING_MODEL } from "@/lib/knowledge/embed";
import { chunkHash } from "@/lib/knowledge/hash";
import index from "@/lib/knowledge/index.json";
import { allKnowledgeChunks } from "@/lib/knowledge/sources";

const rerun = "Run `pnpm knowledge` to regenerate lib/knowledge/index.json.";

describe("knowledge index", () => {
  it("was built with the current embedding model and dimensions", () => {
    expect(index.model, rerun).toBe(EMBEDDING_MODEL);
    expect(index.dimensions, rerun).toBe(EMBEDDING_DIMENSIONS);
  });

  it("has an up-to-date entry for every knowledge chunk", () => {
    const entryByKey = new Map(
      index.chunks.map((entry) => [`${entry.locale}:${entry.id}`, entry]),
    );

    for (const chunk of allKnowledgeChunks()) {
      const key = `${chunk.locale}:${chunk.id}`;
      const entry = entryByKey.get(key);
      expect(entry, `missing index entry for ${key}. ${rerun}`).toBeDefined();
      expect(entry?.hash, `stale index entry for ${key}. ${rerun}`).toBe(
        chunkHash(chunk),
      );
    }
  });

  it("has no leftover entries for removed chunks", () => {
    const currentKeys = new Set(
      allKnowledgeChunks().map((chunk) => `${chunk.locale}:${chunk.id}`),
    );
    const staleKeys = index.chunks
      .map((entry) => `${entry.locale}:${entry.id}`)
      .filter((key) => !currentKeys.has(key));

    expect(staleKeys, rerun).toEqual([]);
  });
});
