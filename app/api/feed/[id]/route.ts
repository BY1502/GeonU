import { ok } from "@/lib/errors";
import { withErrorHandling } from "@/lib/route";
import { getFeedById } from "@/server/services/feed.service";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return withErrorHandling(async () => {
    const post = await getFeedById(params.id);
    return ok(post);
  });
}
