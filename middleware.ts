export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/feed/new", "/me", "/challenges", "/api/feed/:path*", "/api/recipes", "/api/challenges/:path*", "/api/me"],
};
