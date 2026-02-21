"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";

export type AiGenerateType = "portfolio_desc" | "faq_answer" | "review_polish";

interface AiTextareaProps
  extends Omit<React.ComponentProps<typeof Textarea>, "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;
  type: AiGenerateType;
  context?: Record<string, string>;
  disabled?: boolean;
  name?: string;
}

export function AiTextarea({
  value,
  onChange,
  type,
  context = {},
  disabled,
  name,
  ...textareaProps
}: AiTextareaProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canUseAi =
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_USE_FIREBASE === "true";

  const handleGenerate = async () => {
    setError(null);
    setLoading(true);
    try {
      const prompt =
        type === "portfolio_desc"
          ? "시공 사례 설명 생성"
          : type === "faq_answer"
            ? value || "질문을 입력해주세요"
            : value || "후기 메모를 입력해주세요";

      const res = await fetch("/api/admin/ai-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, prompt, context }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "생성 실패");
      }

      const { content } = await res.json();
      onChange(value ? `${value}\n\n${content}` : content);
    } catch (err) {
      setError(err instanceof Error ? err.message : "생성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          {...textareaProps}
          className="min-h-[120px]"
        />
        {canUseAi && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleGenerate}
            disabled={loading || disabled}
            title="AI로 작성"
            className="shrink-0 self-start"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            <span className="sr-only">AI로 작성</span>
          </Button>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
