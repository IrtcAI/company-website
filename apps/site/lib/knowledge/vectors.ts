export function normalize(vector: number[]): number[] {
  const norm = Math.sqrt(vector.reduce((sum, x) => sum + x * x, 0));
  if (norm === 0) return vector.map(() => 0);
  return vector.map((x) => x / norm);
}

export function quantize(vector: number[]): string {
  const normalized = normalize(vector);
  const int8Array = new Int8Array(normalized.length);
  for (let i = 0; i < normalized.length; i++) {
    int8Array[i] = Math.max(
      -127,
      Math.min(127, Math.round(normalized[i] * 127)),
    );
  }
  return Buffer.from(int8Array).toString("base64");
}

export function dequantize(encoded: string): Float32Array {
  const buffer = Buffer.from(encoded, "base64");
  const int8Array = new Int8Array(
    buffer.buffer,
    buffer.byteOffset,
    buffer.length,
  );
  const float32Array = new Float32Array(int8Array.length);
  for (let i = 0; i < int8Array.length; i++) {
    float32Array[i] = int8Array[i] / 127;
  }
  return float32Array;
}

export function cosine(a: ArrayLike<number>, b: ArrayLike<number>): number {
  if (a.length !== b.length) throw new Error("Vector length mismatch");

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  if (normA === 0 || normB === 0) return 0;

  return dotProduct / (normA * normB);
}

export function topK<T>(
  query: ArrayLike<number>,
  items: { vector: ArrayLike<number>; value: T }[],
  k: number,
  minScore: number,
): { value: T; score: number }[] {
  const scored = items.map((item, originalIndex) => ({
    value: item.value,
    score: cosine(query, item.vector),
    originalIndex,
  }));

  const filtered = scored.filter((item) => item.score >= minScore);

  filtered.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.originalIndex - b.originalIndex;
  });

  return filtered.slice(0, k).map(({ value, score }) => ({ value, score }));
}
