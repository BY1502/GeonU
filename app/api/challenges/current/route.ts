import { ok } from "@/lib/errors";
import { withErrorHandling } from "@/lib/route";
import { getCurrentChallenge } from "@/server/services/challenge.service";

export async function GET() {
  return withErrorHandling(async () => {
    const current = await getCurrentChallenge();
    return ok(current);
  });
}
