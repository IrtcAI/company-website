import { describe, expect, it } from "vitest";
import {
  cosine,
  dequantize,
  normalize,
  quantize,
  topK,
} from "@/lib/knowledge/vectors";

describe("normalize", () => {
  it("normalizes a 3-4 vector to unit length", () => {
    const result = normalize([3, 4]);
    expect(result).toEqual([0.6, 0.8]);
  });

  it("returns zeros for a zero vector", () => {
    const result = normalize([0, 0, 0]);
    expect(result).toEqual([0, 0, 0]);
  });

  it("returns unit vector for input with unit norm", () => {
    const v = normalize([1, 0, 0]);
    expect(v).toEqual([1, 0, 0]);
  });
});

describe("quantize and dequantize", () => {
  it("round-trip preserves high cosine similarity with original", () => {
    const vector = new Array(512).fill(0).map((_, i) => Math.sin(i));

    const quantized = quantize(vector);
    const dequantized = dequantize(quantized);

    const normalizedOriginal = normalize(vector);
    const similarity = cosine(normalizedOriginal, dequantized);

    expect(similarity).toBeGreaterThan(0.998);
  });

  it("round-trip returns Float32Array", () => {
    const vector = [1, 0, -1, 0.5];
    const quantized = quantize(vector);
    const dequantized = dequantize(quantized);

    expect(dequantized).toBeInstanceOf(Float32Array);
  });

  it("preserves zero vector", () => {
    const vector = [0, 0, 0];
    const quantized = quantize(vector);
    const dequantized = dequantize(quantized);

    expect(Array.from(dequantized)).toEqual([0, 0, 0]);
  });
});

describe("cosine", () => {
  it("returns 1 for identical vectors", () => {
    expect(cosine([1, 0, 0], [1, 0, 0])).toBe(1);
    expect(cosine([3, 4], [3, 4])).toBe(1);
  });

  it("returns 0 for orthogonal vectors", () => {
    expect(cosine([1, 0], [0, 1])).toBe(0);
    expect(cosine([1, 0, 0], [0, 1, 0])).toBe(0);
  });

  it("returns -1 for opposite vectors", () => {
    expect(cosine([1, 0], [-1, 0])).toBe(-1);
    expect(cosine([1, 2, 3], [-1, -2, -3])).toBe(-1);
  });

  it("works with unnormalized vectors", () => {
    expect(cosine([2, 0], [3, 0])).toBe(1);
    expect(cosine([1, 1], [2, 0])).toBeCloseTo(1 / Math.sqrt(2));
  });

  it("returns 0 when one vector is zero", () => {
    expect(cosine([0, 0, 0], [1, 2, 3])).toBe(0);
    expect(cosine([1, 2, 3], [0, 0, 0])).toBe(0);
  });

  it("throws on length mismatch", () => {
    expect(() => cosine([1, 0], [1, 0, 0])).toThrow("Vector length mismatch");
    expect(() => cosine([1], [1, 2, 3, 4])).toThrow("Vector length mismatch");
  });

  it("works with ArrayLike inputs", () => {
    const a = new Float32Array([1, 0, 0]);
    const b = new Float32Array([1, 0, 0]);
    expect(cosine(a, b)).toBe(1);
  });
});

describe("topK", () => {
  it("returns items sorted by score descending", () => {
    const query = [1, 0, 0];
    const items = [
      { vector: [0.5, 0.5, 0], value: "a" },
      { vector: [1, 0, 0], value: "b" },
      { vector: [0, 1, 0], value: "c" },
    ];

    const result = topK(query, items, 3, -1);

    expect(result[0].value).toBe("b");
    expect(result[0].score).toBe(1);
    expect(result[1].score).toBeLessThan(result[0].score);
  });

  it("respects k limit", () => {
    const query = [1, 0];
    const items = [
      { vector: [1, 0], value: "a" },
      { vector: [0.9, 0.1], value: "b" },
      { vector: [0.8, 0.2], value: "c" },
      { vector: [0.7, 0.3], value: "d" },
    ];

    const result = topK(query, items, 2, -1);

    expect(result).toHaveLength(2);
    expect(result[0].value).toBe("a");
    expect(result[1].value).toBe("b");
  });

  it("filters by minScore", () => {
    const query = [1, 0];
    const items = [
      { vector: [1, 0], value: "high" },
      { vector: [0.5, 0.5], value: "medium" },
      { vector: [0, 1], value: "low" },
    ];

    const result = topK(query, items, 10, 0.75);

    expect(result).toHaveLength(1);
    expect(result[0].value).toBe("high");
  });

  it("maintains stable sort for ties", () => {
    const query = [1, 0];
    const items = [
      { vector: [1, 0], value: "first" },
      { vector: [1, 0], value: "second" },
      { vector: [1, 0], value: "third" },
    ];

    const result = topK(query, items, 10, -1);

    expect(result).toHaveLength(3);
    expect(result[0].value).toBe("first");
    expect(result[1].value).toBe("second");
    expect(result[2].value).toBe("third");
  });

  it("handles empty items", () => {
    const query = [1, 0];
    const result = topK(query, [], 10, -1);

    expect(result).toEqual([]);
  });

  it("returns fewer items when fewer pass minScore", () => {
    const query = [1, 0];
    const items = [
      { vector: [1, 0], value: "a" },
      { vector: [0.5, 0.5], value: "b" },
    ];

    const result = topK(query, items, 10, 0.8);

    expect(result).toHaveLength(1);
    expect(result[0].value).toBe("a");
  });
});
