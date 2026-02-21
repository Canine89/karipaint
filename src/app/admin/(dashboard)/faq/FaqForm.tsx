"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { AiDraftSection } from "@/components/admin/AiDraftSection";
import type { Faq } from "@/lib/domain/types";
import { createFaq, updateFaq } from "../../actions";

interface FaqFormProps {
  faq?: Faq | null;
}

export function FaqForm({ faq }: FaqFormProps) {
  const router = useRouter();
  const isEdit = !!faq;
  const [question, setQuestion] = useState(faq?.question ?? "");
  const [answer, setAnswer] = useState(faq?.answer ?? "");
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      action={async (formData: FormData) => {
        if (submitting) return;
        setSubmitting(true);
        try {
          const data = {
            question: formData.get("question") as string,
            answer: formData.get("answer") as string,
            order: Number(formData.get("order")),
          };
          if (isEdit) {
            await updateFaq(faq.id, data);
          } else {
            await createFaq(data);
          }
          router.push("/admin/faq");
        } catch {
          setSubmitting(false);
        }
      }}
      className="space-y-8 max-w-2xl"
    >
      <section className="space-y-5">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          FAQ 내용
        </h2>
        <div>
          <Label htmlFor="question">질문</Label>
          <Input
            id="question"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="mt-2 h-11"
          />
        </div>
        <div>
          <Label className="mb-2 block">답변</Label>
          <AiDraftSection
            type="faq_answer"
            context={{ question }}
            value={answer}
            onChange={setAnswer}
            name="answer"
            label="답변"
            required
            rows={4}
          />
        </div>
        <div>
          <Label htmlFor="order">정렬 순서</Label>
          <Input
            id="order"
            name="order"
            type="number"
            defaultValue={faq?.order ?? 0}
            className="mt-2 h-11 max-w-28"
          />
        </div>
      </section>
      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t">
        <Button type="submit" className="h-11" disabled={submitting}>
          {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitting
            ? isEdit ? "수정 중..." : "등록 중..."
            : isEdit ? "수정" : "등록"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="h-11"
          disabled={submitting}
        >
          취소
        </Button>
      </div>
    </form>
  );
}
