type Limit = { count: number; resetAt: number };

const limits = new Map<string, Limit>();
const maxTrackedKeys = 10_000;

function prune(now: number) {
  for (const [key, limit] of limits)
    if (limit.resetAt <= now) limits.delete(key);

  for (const key of limits.keys()) {
    if (limits.size < maxTrackedKeys) break;
    limits.delete(key);
  }
}

export function exceedsLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const current = limits.get(key);

  if (!current || current.resetAt <= now) {
    if (limits.size >= maxTrackedKeys) prune(now);
    limits.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  current.count += 1;
  return current.count > max;
}
