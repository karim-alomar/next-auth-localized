import { auth } from "@/auth";
import { hasIncludedPath } from "@/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  authRoutes,
  DEFAULT_ROUTE,
  LOGIN_ROUTE,
  protectedPaths,
  PUBLIC_FILES,
} from "./routes";
import { getLocale, locales } from "./utils/getLocale";

export default auth(async (request) => {
  const isLoggedIn = !!request.auth;
  const { pathname, searchParams } = request.nextUrl;
  const isAuthRoute = hasIncludedPath(pathname, authRoutes);
  const isProtectedRoute = hasIncludedPath(pathname, protectedPaths);
  const isApiRoute = pathname.startsWith("/api/");
  const cookieStore = cookies();
  const rawLocale = (await cookieStore).get("locale")?.value;
  const locale = rawLocale ?? getLocale(request);
  // const locale = (await cookies()).get("locale")?.value ?? getLocale(request);
  const pathnameHasLocale = locales.some(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
  );

  if (PUBLIC_FILES.test(pathname) || isApiRoute) {
    return NextResponse.next();
  }

  (await cookieStore).set("locale", locale);

  if (!pathnameHasLocale) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(newUrl);
  }

  if (!isLoggedIn && isProtectedRoute && !isAuthRoute) {
    return NextResponse.redirect(
      new URL(
        `${LOGIN_ROUTE.trim()}${
          pathname.length > 3
            ? `?callbackUrl=${encodeURIComponent(pathname)}`
            : ""
        }${searchParams.toString() ? `&${searchParams.toString()}` : ""}`,
        request.nextUrl
      )
    );
  }

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(DEFAULT_ROUTE, request.url));
  }

  return NextResponse.next();
});
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/images|assets|favicon.ico|sw.js).*)",
  ],
};
