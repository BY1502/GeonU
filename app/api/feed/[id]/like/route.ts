import { ok } from "@/lib/errors";
import { withErrorHandling } from "@/lib/route";
import { requireAuth } from "@/lib/require-auth";
import { likePost } from "@/server/services/feed.service";
import { idParamSchema } from "@/server/validators/common.validator";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  return withErrorHandling(async () => {
    const user = await requireAuth();
    const parsed = idParamSchema.parse(params);
    const result = await likePost(user.id, parsed.id);
    return ok(result);
  });
}
