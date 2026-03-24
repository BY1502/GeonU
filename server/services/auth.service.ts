import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { ApiError } from "@/lib/errors";
import { checkRateLimit } from "@/lib/rate-limit";

export async function signup(input: { email: string; password: string; name?: string }) {
  const exists = await prisma.user.findUnique({ where: { email: input.email } });
  if (exists) throw new ApiError("CONFLICT", 409, "이미 가입된 이메일입니다.");

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({
    data: { email: input.email, passwordHash, name: input.name },
    select: { id: true, email: true, name: true },
  });
  return user;
}

export async function login(input: { email: string; password: string; ip: string }) {
  checkRateLimit(`login:${input.ip}:${input.email}`, 5, 60_000);

  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) throw new ApiError("UNAUTHORIZED", 401, "이메일 또는 비밀번호가 올바르지 않습니다.");

  const matched = await bcrypt.compare(input.password, user.passwordHash);
  if (!matched) throw new ApiError("UNAUTHORIZED", 401, "이메일 또는 비밀번호가 올바르지 않습니다.");

  return { id: user.id, email: user.email, name: user.name };
}
