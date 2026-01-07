// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasSession = request.cookies.has("better-auth.session_token");

  const protectedPaths = ["/dashboard", "/admin"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Comment out or remove this block if you want logged-in users to access /login
  // if (pathname === "/login" && hasSession) {
  //   return NextResponse.redirect(new URL("/admin", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};