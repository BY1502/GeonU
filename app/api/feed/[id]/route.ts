import { ok } from "@/lib/errors";
import { withErrorHandling } from "@/lib/route";
import { getFeedById } from "@/server/services/feed.service";
import { idParamSchema } from "@/server/validators/common.validator";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return withErrorHandling(async () => {
    const parsed = idParamSchema.parse(params);
    const post = await getFeedById(parsed.id);
    return ok(post);
  });
}
