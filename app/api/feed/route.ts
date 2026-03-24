import { auth } from "@/auth";
import { ApiError, ok } from "@/lib/errors";
import { parseBody, withErrorHandling } from "@/lib/route";
import { createFeedPost, getFeed } from "@/server/services/feed.service";
import { createMealPostSchema, feedQuerySchema } from "@/server/validators/feed.validator";
import { requireAuth } from "@/lib/require-auth";

export async function GET(req: Request) {
  return withErrorHandling(async () => {
    const { searchParams } = new URL(req.url);
    const session = await auth();

    const parsed = feedQuerySchema.safeParse({
      cursor: searchParams.get("cursor") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
    });

    if (!parsed.success) {
      throw new ApiError("VALIDATION_ERROR", 400, "쿼리 파라미터가 올바르지 않습니다.", parsed.error.flatten());
    }

    const feed = await getFeed({
      cursor: parsed.data.cursor,
      limit: parsed.data.limit,
      viewerId: session?.user?.id,
    });
    return ok(feed);
  });
}

export async function POST(req: Request) {
  return withErrorHandling(async () => {
    const user = await requireAuth();
    const input = await parseBody(req, createMealPostSchema);
    const post = await createFeedPost(user.id, input);
    return ok(post, 201);
  });
}
