import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname != "/app") {
    return NextResponse.redirect(new URL("/app", request.url));
  }
  // return NextResponse.redirect(new URL("/app", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/"]
};
