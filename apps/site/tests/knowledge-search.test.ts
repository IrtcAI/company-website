import { describe, expect, it, vi } from "vitest";
import {
  EMBEDDING_DIMENSIONS,
  EMBEDDING_MODEL,
  embed,
} from "@/lib/knowledge/embed";
import index from "@/lib/knowledge/index.json";
import { MAX_RESULTS, retrieve } from "@/lib/knowledge/search";
import { CONTACT_CHUNK_ID } from "@/lib/knowledge/sources";
import { dequantize } from "@/lib/knowledge/vectors";

function embeddingResponse(vectors: number[][]) {
  return {
    ok: true,
    json: async () => ({
      data: vectors.map((embedding, index) => ({ embedding, index })),
    }),
  };
}

function mockQueryEmbedding(vector: number[]) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue(embeddingResponse([vector])),
  );
}

describe("embed", () => {
  it("batches inputs in groups of 100 and keeps order across batches", async () => {
    const inputs = Array.from({ length: 150 }, (_, i) => `chunk ${i}`);
    const fetchMock = vi.fn(async (_url: string, init: { body: string }) => {
      const body = JSON.parse(init.body) as { input: string[] };
      return embeddingResponse(body.input.map((_, i) => [i]));
    });
    vi.stubGlobal("fetch", fetchMock);

    const vectors = await embed(inputs, "test-key");

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).input).toHaveLength(100);
    expect(JSON.parse(fetchMock.mock.calls[1][1].body).input).toHaveLength(50);
    expect(vectors).toHaveLength(150);
    expect(vectors[0]).toEqual([0]);
    expect(vectors[149]).toEqual([49]);
  });

  it("reorders embeddings by the response index, not array order", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          data: [
            { embedding: [2], index: 2 },
            { embedding: [0], index: 0 },
            { embedding: [1], index: 1 },
          ],
        }),
      }),
    );

    const vectors = await embed(["a", "b", "c"], "test-key");

    expect(vectors).toEqual([[0], [1], [2]]);
  });

  it("sends the configured model and dimensions", async () => {
    const fetchMock = vi.fn().mockResolvedValue(embeddingResponse([[1]]));
    vi.stubGlobal("fetch", fetchMock);

    await embed(["hello"], "test-key");

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.model).toBe(EMBEDDING_MODEL);
    expect(body.dimensions).toBe(EMBEDDING_DIMENSIONS);
  });

  it("throws an error including the HTTP status on failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 429 }),
    );

    await expect(embed(["hello"], "test-key")).rejects.toThrow("429");
  });
});

describe("retrieve", () => {
  const sampleEntry = index.chunks.find(
    (entry) => entry.locale === "en" && entry.id !== CONTACT_CHUNK_ID,
  )!;
  const contactEntry = index.chunks.find(
    (entry) => entry.locale === "en" && entry.id === CONTACT_CHUNK_ID,
  )!;

  it("ranks the chunk matching the query embedding first and appends the contact chunk", async () => {
    mockQueryEmbedding(Array.from(dequantize(sampleEntry.vector)));

    const results = await retrieve("anything", "en", "test-key");

    expect(results.length).toBeLessThanOrEqual(MAX_RESULTS + 1);
    expect(results[0].id).toBe(sampleEntry.id);
    expect(results[0].score).toBeGreaterThan(0.999);
    expect(results.some((result) => result.id === CONTACT_CHUNK_ID)).toBe(true);
  });

  it("falls back to only the contact chunk when nothing clears MIN_SCORE", async () => {
    mockQueryEmbedding(new Array(EMBEDDING_DIMENSIONS).fill(0));

    const results = await retrieve("anything", "en", "test-key");

    expect(results).toHaveLength(1);
    expect(results[0].id).toBe(CONTACT_CHUNK_ID);
    expect(results[0].score).toBe(0);
  });

  it("does not duplicate the contact chunk when it already clears MIN_SCORE", async () => {
    mockQueryEmbedding(Array.from(dequantize(contactEntry.vector)));

    const results = await retrieve("anything", "en", "test-key");

    expect(
      results.filter((result) => result.id === CONTACT_CHUNK_ID),
    ).toHaveLength(1);
  });

  it("propagates embedding errors instead of swallowing them", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );

    await expect(retrieve("anything", "en", "test-key")).rejects.toThrow("500");
  });
});
