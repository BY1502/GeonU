import { NextResponse } from "next/server";

export type ErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "ALREADY_LIKED"
  | "INTERNAL_ERROR";

export class ApiError extends Error {
  constructor(
    public code: ErrorCode,
    public status: number,
    message: string,
    public details?: unknown,
  ) {
    super(message);
  }
}

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ ok: true, data }, { status });
}

export function fail(err: ApiError) {
  return NextResponse.json(
    {
      ok: false,
      error: {
        code: err.code,
        message: err.message,
        details: err.details ?? [],
      },
    },
    { status: err.status },
  );
}
