import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value; 

  if (!token && !req.nextUrl.pathname.startsWith("/login") && !req.nextUrl.pathname.startsWith("/register")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && (req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register"))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
