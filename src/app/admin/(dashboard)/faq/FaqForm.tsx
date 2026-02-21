"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  return (
    <form
      action={async (formData: FormData) => {
        const data = {
          question: formData.get("question") as string,
          answer: formData.get("answer") as string,
          order: Number(formData.get("order")),
        };
        if (isEdit) {
          await updateFaq(faq.id, data);
          router.push("/admin/faq");
        } else {
          await createFaq(data);
          router.push("/admin/faq");
        }
      }}
      className="space-y-8 max-w-2xl"
    >
      <section className="space-y-5">
        <h2 className="text-sm font-semibold text-muted-foreground">FAQ 내용</h2>
        <div>
          <Label htmlFor="question">질문</Label>
          <Input
            id="question"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="mt-2 h-10"
          />
        </div>
        <div>
          <Label>답변</Label>
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
            className="mt-2 h-10 max-w-24"
          />
        </div>
      </section>
      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t">
        <Button type="submit" className="min-h-11">{isEdit ? "수정" : "등록"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()} className="min-h-11">
          취소
        </Button>
      </div>
    </form>
  );
}
