"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiTextarea } from "@/components/admin/AiTextarea";
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
      className="space-y-6 max-w-2xl"
    >
      <div>
        <Label htmlFor="question">질문</Label>
        <Input
          id="question"
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="answer">답변</Label>
        <AiTextarea
          id="answer"
          name="answer"
          value={answer}
          onChange={setAnswer}
          type="faq_answer"
          context={{ question }}
          required
          rows={4}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="order">정렬 순서</Label>
        <Input
          id="order"
          name="order"
          type="number"
          defaultValue={faq?.order ?? 0}
          className="mt-1"
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit">{isEdit ? "수정" : "등록"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          취소
        </Button>
      </div>
    </form>
  );
}
