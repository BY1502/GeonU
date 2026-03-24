import { ok } from "@/lib/errors";
import { withErrorHandling } from "@/lib/route";
import { requireAuth } from "@/lib/require-auth";
import { getMe } from "@/server/services/me.service";

export async function GET() {
  return withErrorHandling(async () => {
    const user = await requireAuth();
    const me = await getMe(user.id);
    return ok(me);
  });
}
