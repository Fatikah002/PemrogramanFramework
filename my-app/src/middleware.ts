import { NextRequest, NextResponse } from "next/server";
import withAuth from "./Middleware/withAuth";

function mainMiddleware(req: NextRequest) {
  return NextResponse.next();
}

export default withAuth(mainMiddleware, ["/produk", "/about", "/profile", "/admin", "/editor"]);

export const config = {
  matcher: ["/produk/:path*", "/about/:path*", "/profile/:path*", "/admin/:path*", "/editor/:path*"],
};