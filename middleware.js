export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/market/:path*",
    "/messages",
    "/orders/:path*",
    "/cart",
    "/profile/:path*",
    "/sell/:path*",
    "/checkout",
    "/watch"
  ]
};
