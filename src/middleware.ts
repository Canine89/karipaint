import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const IS_DEPLOYED =
  process.env.VERCEL_ENV === "production" ||
  process.env.VERCEL_ENV === "preview";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // 배포 환경: 항상 로그인 필수
  // 로컬: Firebase 미설정 시 로그인 없이 접근 허용 (테스트용)
  const requireAuth =
    IS_DEPLOYED ||
    process.env.NEXT_PUBLIC_USE_FIREBASE === "true";

  if (!requireAuth) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get("__session");
  if (!sessionCookie?.value) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
