import { ok } from "@/lib/errors";
import { withErrorHandling } from "@/lib/route";
import { requireAuth } from "@/lib/require-auth";
import { joinChallenge } from "@/server/services/challenge.service";
import { idParamSchema } from "@/server/validators/common.validator";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  return withErrorHandling(async () => {
    const user = await requireAuth();
    const parsed = idParamSchema.parse(params);
    const participation = await joinChallenge(user.id, parsed.id);
    return ok({
      participationId: participation.id,
      currentCount: participation.currentCount,
      completedRate: participation.completedRate,
    });
  });
}
