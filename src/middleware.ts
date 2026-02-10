import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that should redirect to the home page
const blockedRoutes = [
  "/projects",
  "/blog",
  "/about",
  "/blueprint",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current path starts with any blocked route
  const isBlocked = blockedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isBlocked) {
    // Redirect to home page
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    "/projects/:path*",
    "/blog/:path*",
    "/about/:path*",
    "/blueprint/:path*",
  ],
};
