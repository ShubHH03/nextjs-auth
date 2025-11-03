import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPathPublic = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";
  if (isPathPublic && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!isPathPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/login", "/signup", "/profile"],
};
