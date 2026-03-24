import { ApiError } from "./errors";

type Hit = { count: number; resetAt: number };

const buckets = new Map<string, Hit>();

export function checkRateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  if (bucket.count >= limit) {
    throw new ApiError("RATE_LIMITED", 429, "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.");
  }

  bucket.count += 1;
  buckets.set(key, bucket);
}
