import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if the path matches /marketplace/collection
  if (path === "/marketplace/collection") {
    // Create the URL for redirection
    return NextResponse.redirect(new URL("/marketplace", request.url));
  }

  // Return the default response for other paths
  return NextResponse.next();
}

// Configure which paths the middleware will run on
export const config = {
  matcher: "/marketplace/collection",
};
