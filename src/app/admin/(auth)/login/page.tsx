import { Suspense } from "react";
import Link from "next/link";
import { AdminLoginForm } from "./login-form";

const IS_DEPLOYED =
  process.env.VERCEL_ENV === "production" ||
  process.env.VERCEL_ENV === "preview";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-sm space-y-8 p-8 bg-card rounded-lg border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-foreground">관리자 로그인</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            카리페인트 관리자 페이지
          </p>
        </div>
        <Suspense fallback={<div className="animate-pulse h-32 bg-muted rounded" />}>
          <AdminLoginForm isDeployed={IS_DEPLOYED} />
        </Suspense>
        <p className="text-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            사이트로 돌아가기
          </Link>
        </p>
      </div>
    </div>
  );
}
