import { ok } from "@/lib/errors";
import { parseBody, withErrorHandling } from "@/lib/route";
import { requireAuth } from "@/lib/require-auth";
import { checkinChallenge } from "@/server/services/challenge.service";
import { checkinSchema } from "@/server/validators/challenge.validator";
import { idParamSchema } from "@/server/validators/common.validator";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  return withErrorHandling(async () => {
    const user = await requireAuth();
    const parsedParams = idParamSchema.parse(params);
    const input = await parseBody(req, checkinSchema);
    const result = await checkinChallenge(user.id, parsedParams.id, input.mealPostId);
    return ok(result);
  });
}
