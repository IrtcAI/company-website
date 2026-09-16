type Limit = { count: number; resetAt: number };

const limits = new Map<string, Limit>();

export function exceedsLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const current = limits.get(key);
  if (!current || current.resetAt <= now) {
    limits.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  current.count += 1;
  return current.count > max;
}
