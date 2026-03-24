import { ok } from "@/lib/errors";
import { parseBody, withErrorHandling } from "@/lib/route";
import { requireAuth } from "@/lib/require-auth";
import { addComment } from "@/server/services/feed.service";
import { addCommentSchema } from "@/server/validators/feed.validator";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  return withErrorHandling(async () => {
    const user = await requireAuth();
    const input = await parseBody(req, addCommentSchema);
    const comment = await addComment(user.id, params.id, input.content);
    return ok(comment, 201);
  });
}
