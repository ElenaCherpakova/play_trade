export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/messages",
    "/orders/:path*",
    "/cart",
    "/profile/:path*",
    "/sell/:path*",
    "/checkout",
    "/watch"
  ]
};
