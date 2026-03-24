import { ok } from "@/lib/errors";
import { parseBody, withErrorHandling } from "@/lib/route";
import { signupInputSchema } from "@/server/validators/auth.validator";
import { signup } from "@/server/services/auth.service";

export async function POST(req: Request) {
  return withErrorHandling(async () => {
    const input = await parseBody(req, signupInputSchema);
    const user = await signup(input);
    return ok({ user }, 201);
  });
}
