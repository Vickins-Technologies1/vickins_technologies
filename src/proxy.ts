// proxy.ts (place in project root or src/ — same level as app/ or pages/)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js Proxy (formerly Middleware) – runs before requests reach your routes
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for active Better Auth session cookie
  const hasSession = request.cookies.has("better-auth.session_token");

  // Protected routes requiring authentication
  const protectedPaths = ["/dashboard", "/admin"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // Redirect unauthenticated users from protected routes to login
  if (isProtected && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    // Preserve original path for post-login redirect
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Optional: Redirect logged-in users away from /login (good UX)
  // Uncomment if desired:
  /*
  if (pathname === "/login" && hasSession) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  */

  // Allow request to proceed
  return NextResponse.next();
}

// Run proxy on all routes except static/API assets
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};