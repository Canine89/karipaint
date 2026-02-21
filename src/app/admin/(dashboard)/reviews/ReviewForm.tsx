"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiDraftSection } from "@/components/admin/AiDraftSection";
import type { Review } from "@/lib/domain/types";
import { createReview, updateReview } from "../../actions";

interface ReviewFormProps {
  review?: Review | null;
}

export function ReviewForm({ review }: ReviewFormProps) {
  const router = useRouter();
  const isEdit = !!review;
  const [quote, setQuote] = useState(review?.quote ?? "");

  return (
    <form
      action={async (formData: FormData) => {
        const data = {
          quote: formData.get("quote") as string,
          author: formData.get("author") as string,
          spaceType: formData.get("spaceType") as string,
          order: Number(formData.get("order")),
        };
        if (isEdit) {
          await updateReview(review.id, data);
          router.push("/admin/reviews");
        } else {
          await createReview(data);
          router.push("/admin/reviews");
        }
      }}
      className="space-y-6 max-w-2xl"
    >
      <div>
        <Label>후기 내용</Label>
        <AiDraftSection
          type="review_polish"
          value={quote}
          onChange={setQuote}
          name="quote"
          label="후기 내용"
          placeholder="후기 원문 또는 메모를 입력한 후 ✨ 버튼으로 문장 다듬기"
          required
          rows={4}
        />
      </div>
      <div>
        <Label htmlFor="author">작성자</Label>
        <Input
          id="author"
          name="author"
          defaultValue={review?.author}
          required
          className="mt-1"
          placeholder="예: 강남구 이○○ 고객님"
        />
      </div>
      <div>
        <Label htmlFor="spaceType">공간 유형</Label>
        <Input
          id="spaceType"
          name="spaceType"
          defaultValue={review?.spaceType}
          required
          className="mt-1"
          placeholder="예: 거실, 방·거실"
        />
      </div>
      <div>
        <Label htmlFor="order">정렬 순서</Label>
        <Input
          id="order"
          name="order"
          type="number"
          defaultValue={review?.order ?? 0}
          className="mt-1"
        />
      </div>
      <div className="flex flex-col-reverse sm:flex-row gap-2 pt-2">
        <Button type="submit" className="min-h-11">{isEdit ? "수정" : "등록"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()} className="min-h-11">
          취소
        </Button>
      </div>
    </form>
  );
}
