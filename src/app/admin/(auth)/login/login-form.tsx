"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface AdminLoginFormProps {
  isDeployed?: boolean;
}

export function AdminLoginForm({ isDeployed = false }: AdminLoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin";
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const useFirebase =
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_USE_FIREBASE === "true";

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      if (!useFirebase) {
        setError("Firebase가 설정되지 않았습니다.");
        setLoading(false);
        return;
      }

      const { GoogleAuthProvider, signInWithPopup } = await import(
        "firebase/auth"
      );
      const { auth } = await import("@/lib/firebase/client");
      if (!auth) throw new Error("Firebase Auth not initialized");

      const provider = new GoogleAuthProvider();
      const userCred = await signInWithPopup(auth, provider);
      const token = await userCred.user.getIdToken();

      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "세션 생성 실패");
      }

      router.push(from);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (!useFirebase) {
    return (
      <div className="space-y-4">
        {isDeployed ? (
          <>
            <p className="text-sm text-destructive font-medium">
              배포 환경에서는 Firebase 설정이 필요합니다.
            </p>
            <p className="text-sm text-muted-foreground">
              Vercel 환경 변수에 NEXT_PUBLIC_USE_FIREBASE, FIREBASE_PROJECT_ID,
              FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY 등을 설정한 후
              재배포해주세요.
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Firebase 미설정 시 관리자 페이지는 로그인 없이 접근 가능합니다.
            </p>
            <Button asChild className="w-full">
              <Link href="/admin">대시보드로 이동</Link>
            </Button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button
        type="button"
        variant="outline"
        className="w-full gap-2"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {loading ? "로그인 중..." : "Google로 로그인"}
      </Button>
    </div>
  );
}
