import { describe, expect, it } from "vitest";
import { signupInputSchema } from "@/server/validators/auth.validator";
import { createMealPostSchema } from "@/server/validators/feed.validator";

describe("validator unit tests", () => {
  it("signup schema accepts valid input", () => {
    const parsed = signupInputSchema.safeParse({
      email: "a@a.com",
      password: "Password123",
      name: "홍길동",
    });
    expect(parsed.success).toBe(true);
  });

  it("meal post schema rejects 4 images", () => {
    const parsed = createMealPostSchema.safeParse({
      title: "제목",
      description: "설명",
      cookingTimeMin: 10,
      estimatedCostWon: 3000,
      imageUrls: ["https://a.com/1", "https://a.com/2", "https://a.com/3", "https://a.com/4"],
      ingredientTags: ["두부"],
      visibility: "PUBLIC",
    });

    expect(parsed.success).toBe(false);
  });
});
