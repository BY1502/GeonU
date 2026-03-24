import { ok } from "@/lib/errors";
import { parseBody, withErrorHandling } from "@/lib/route";
import { requireAuth } from "@/lib/require-auth";
import { addComment } from "@/server/services/feed.service";
import { addCommentSchema } from "@/server/validators/feed.validator";
import { idParamSchema } from "@/server/validators/common.validator";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  return withErrorHandling(async () => {
    const user = await requireAuth();
    const parsedParams = idParamSchema.parse(params);
    const input = await parseBody(req, addCommentSchema);
    const comment = await addComment(user.id, parsedParams.id, input.content);
    return ok(comment, 201);
  });
}
