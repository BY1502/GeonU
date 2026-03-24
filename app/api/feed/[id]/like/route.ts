import { ok } from "@/lib/errors";
import { withErrorHandling } from "@/lib/route";
import { requireAuth } from "@/lib/require-auth";
import { likePost } from "@/server/services/feed.service";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  return withErrorHandling(async () => {
    const user = await requireAuth();
    const result = await likePost(user.id, params.id);
    return ok(result);
  });
}
