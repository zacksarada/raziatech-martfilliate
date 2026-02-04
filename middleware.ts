import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = [
    "/",
    "/dashboard",
    "/auth/signin",
    "/auth/signup",
    "/auth/error",
    "/products",
    "/api/auth",
  ];

  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  // Protect affiliate routes
  if (pathname.startsWith("/affiliate")) {
    if (!token || (token.role !== "AFFILIATE" && token.role !== "ADMIN")) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/affiliate/:path*",
    "/account/:path*",
    "/cart/:path*",
    "/checkout/:path*",
  ],
};
