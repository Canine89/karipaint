"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";

export type AiGenerateType = "portfolio_desc" | "faq_answer" | "review_polish";

interface AiDraftSectionProps {
  type: AiGenerateType;
  context?: Record<string, string>;
  /** 실제 사이트에 등록될 값 (폼 제출용) */
  value: string;
  onChange: (value: string) => void;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export function AiDraftSection({
  type,
  context = {},
  value,
  onChange,
  name,
  label,
  placeholder,
  required,
  rows = 4,
}: AiDraftSectionProps) {
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPromptHint = () => {
    switch (type) {
      case "portfolio_desc":
        return "위 정보(지역·카테고리·소요일)를 입력한 후 생성";
      case "faq_answer":
        return "질문을 입력한 후 생성";
      case "review_polish":
        return "후기 원문을 입력한 후 생성";
    }
  };

  const handleGenerate = async () => {
    setError(null);
    setLoading(true);
    try {
      const prompt =
        type === "portfolio_desc"
          ? "시공 사례 설명 생성"
          : type === "faq_answer"
            ? (context.question || "질문을 입력해주세요")
            : draft || "후기 메모를 입력해주세요";

      const res = await fetch("/api/admin/ai-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          prompt,
          context:
            type === "faq_answer"
              ? context
              : type === "review_polish"
                ? { memo: draft }
                : context, // portfolio_desc
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "생성 실패");
      }

      const { content } = await res.json();
      // 바로 등록할 설명에 넣음
      onChange(content);
    } catch (err) {
      setError(err instanceof Error ? err.message : "생성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 rounded-lg border border-input bg-muted/20 p-4 md:p-5">
      {/* AI 초안 작성 영역 */}
      <div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            AI로 초안 작성
          </span>
          <span className="text-xs text-muted-foreground">{getPromptHint()}</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="min-h-[100px] flex-1 bg-background"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleGenerate}
            disabled={loading}
            title="AI 생성 후 아래 등록용에 바로 적용"
            className="h-10 w-10 shrink-0 self-start sm:self-start"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
          </Button>
        </div>
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      </div>

      {/* 실제 등록할 내용 (폼 제출용) */}
      <div>
        <label
          htmlFor={name}
          className="text-sm font-medium text-foreground flex items-center gap-1"
        >
          등록할 {label}
          {required && <span className="text-destructive">*</span>}
        </label>
        <Textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          rows={rows}
          className="mt-2 min-h-[100px]"
          placeholder={`직접 입력하거나, 위에서 ✨ 버튼으로 생성`}
        />
      </div>
    </div>
  );
}
