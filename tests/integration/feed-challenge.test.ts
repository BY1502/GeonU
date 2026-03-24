import { describe, expect, it, vi, beforeEach } from "vitest";
import { ApiError } from "@/lib/errors";

vi.mock("@/lib/db", () => {
  const likeStore = new Set<string>();
  let count = 0;

  return {
    prisma: {
      like: {
        create: vi.fn(async ({ data }) => {
          const key = `${data.userId}:${data.mealPostId}`;
          if (likeStore.has(key)) throw new Error("duplicate");
          likeStore.add(key);
        }),
        count: vi.fn(async () => ++count),
      },
      challengeParticipation: {
        findUnique: vi.fn(async () => ({
          id: "p1",
          currentCount: 0,
          challenge: { targetCount: 5 },
        })),
        update: vi.fn(async ({ data }) => ({ ...data })),
      },
      challengeCheckin: {
        findFirst: vi.fn(async () => null),
        create: vi.fn(async () => ({ id: "c1" })),
      },
      badge: {
        findFirst: vi.fn(async () => ({ id: "b1" })),
      },
      userBadge: {
        upsert: vi.fn(async () => ({ id: "ub1" })),
      },
      mealPost: {
        findMany: vi.fn(async () => [
          {
            id: "m1",
            title: "t",
            description: "d",
            cookingTimeMin: 10,
            estimatedCostWon: 1000,
            imageUrls: [],
            visibility: "PUBLIC",
            user: { id: "u1", name: "n" },
            likes: [],
            comments: [],
            ingredients: [],
            createdAt: new Date(),
          },
        ]),
      },
    },
  };
});

import { likePost, getFeed } from "@/server/services/feed.service";
import { checkinChallenge } from "@/server/services/challenge.service";

describe("integration-ish service tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates and fetches feed", async () => {
    const feed = await getFeed({});
    expect(feed.items.length).toBe(1);
  });

  it("prevents duplicate likes", async () => {
    await likePost("u1", "m1");
    await expect(likePost("u1", "m1")).rejects.toBeInstanceOf(ApiError);
  });

  it("updates challenge checkin progress", async () => {
    const result = await checkinChallenge("u1", "ch1", "meal1");
    expect(result.currentCount).toBe(1);
    expect(result.completedRate).toBe(20);
  });
});
