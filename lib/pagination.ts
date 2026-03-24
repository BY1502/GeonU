export const FEED_DEFAULT_LIMIT = 10;
export const FEED_MAX_LIMIT = 20;

export function parseLimit(value: string | null): number {
  const parsed = Number(value ?? FEED_DEFAULT_LIMIT);
  if (Number.isNaN(parsed) || parsed < 1) return FEED_DEFAULT_LIMIT;
  return Math.min(parsed, FEED_MAX_LIMIT);
}
