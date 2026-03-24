import { auth } from "@/auth";
import { ApiError } from "./errors";

export async function requireAuth() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new ApiError("UNAUTHORIZED", 401, "로그인이 필요합니다.");
  }
  return session.user;
}
