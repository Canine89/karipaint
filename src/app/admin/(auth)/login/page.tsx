import { Suspense } from "react";
import Link from "next/link";
import { AdminLoginForm } from "./login-form";

const IS_DEPLOYED =
  process.env.VERCEL_ENV === "production" ||
  process.env.VERCEL_ENV === "preview";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4 py-8">
      <div className="w-full max-w-md space-y-8 p-6 md:p-10 bg-card rounded-xl border shadow-md">
        <div className="text-center">
          <Link
            href="/"
            className="inline-block text-lg font-bold text-primary hover:opacity-80 transition-opacity mb-2"
          >
            카리페인트
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">관리자 로그인</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            도장 시공 전문 관리자 페이지
          </p>
        </div>
        <Suspense fallback={<div className="animate-pulse h-32 bg-muted rounded-lg" />}>
          <AdminLoginForm isDeployed={IS_DEPLOYED} />
        </Suspense>
        <p className="text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← 사이트로 돌아가기
          </Link>
        </p>
      </div>
    </div>
  );
}
