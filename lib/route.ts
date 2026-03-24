import { ZodSchema } from "zod";
import { ApiError, fail } from "./errors";

export async function withErrorHandling<T>(fn: () => Promise<T>) {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof ApiError) return fail(error);
    return fail(new ApiError("INTERNAL_ERROR", 500, "서버 에러가 발생했습니다."));
  }
}

export async function parseBody<T>(req: Request, schema: ZodSchema<T>): Promise<T> {
  const json = await req.json();
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    throw new ApiError("VALIDATION_ERROR", 400, "요청 값이 올바르지 않습니다.", parsed.error.flatten());
  }
  return parsed.data;
}
