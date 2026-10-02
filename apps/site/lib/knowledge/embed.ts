export const EMBEDDING_MODEL = "text-embedding-3-small";
export const EMBEDDING_DIMENSIONS = 512;

const BATCH_SIZE = 100;

export async function embed(
  inputs: string[],
  apiKey: string,
  signal?: AbortSignal,
): Promise<number[][]> {
  const vectors: number[][] = [];

  for (let i = 0; i < inputs.length; i += BATCH_SIZE) {
    const batch = inputs.slice(i, i + BATCH_SIZE);
    const response = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: EMBEDDING_MODEL,
        input: batch,
        dimensions: EMBEDDING_DIMENSIONS,
      }),
      signal,
    });

    if (!response.ok)
      throw new Error(
        `OpenAI embeddings request failed with status ${response.status}`,
      );

    const data = (await response.json()) as {
      data: { embedding: number[]; index: number }[];
    };
    const ordered = [...data.data].sort((a, b) => a.index - b.index);
    vectors.push(...ordered.map((item) => item.embedding));
  }

  return vectors;
}
