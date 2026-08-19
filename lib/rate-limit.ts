type Bucket = {
  timestamps: number[];
};

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 3;

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSeconds: number };

export function rateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { timestamps: [] };
  const recent = bucket.timestamps.filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((recent[0] + WINDOW_MS - now) / 1000),
    );
    buckets.set(key, { timestamps: recent });
    return { ok: false, retryAfterSeconds };
  }

  recent.push(now);
  buckets.set(key, { timestamps: recent });
  return { ok: true };
}
