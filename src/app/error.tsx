"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background p-8">
      <h2 className="text-xl font-semibold text-foreground">문제가 발생했습니다</h2>
      <p className="text-muted-foreground text-center max-w-md">
        {error.message}
      </p>
      <Button onClick={reset}>다시 시도</Button>
    </div>
  );
}
