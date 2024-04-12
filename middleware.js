import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !token.user) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/sell") && !token.user.isSeller) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/messages", "/orders/:path*", "/cart", "/profile/:path*", "/sell/:path*", "/checkout", "/watch"]
};
