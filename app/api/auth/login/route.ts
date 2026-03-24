import { headers } from "next/headers";
import { ok } from "@/lib/errors";
import { parseBody, withErrorHandling } from "@/lib/route";
import { loginInputSchema } from "@/server/validators/auth.validator";
import { login } from "@/server/services/auth.service";

export async function POST(req: Request) {
  return withErrorHandling(async () => {
    const input = await parseBody(req, loginInputSchema);
    const ip = headers().get("x-forwarded-for") ?? "local";
    const user = await login({ ...input, ip });
    return ok({ message: "로그인 검증 성공", user });
  });
}
