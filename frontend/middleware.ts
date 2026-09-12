import { type NextRequest } from "next/server";
import { proxy } from "./proxy";

export function middleware(request: NextRequest) {
  return proxy(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icon-.* (pwa icons)
     * - data/ (static datasets)
     * - sw.js (service worker)
     */
    "/((?!_next/static|_next/image|favicon.ico|icon-.*|data/|sw.js).*)",
  ],
};
