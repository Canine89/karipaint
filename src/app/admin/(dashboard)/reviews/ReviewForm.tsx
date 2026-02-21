"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Review } from "@/lib/domain/types";
import { createReview, updateReview } from "../../actions";

interface ReviewFormProps {
  review?: Review | null;
}

export function ReviewForm({ review }: ReviewFormProps) {
  const router = useRouter();
  const isEdit = !!review;

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
        <Label htmlFor="quote">후기 내용</Label>
        <Textarea
          id="quote"
          name="quote"
          defaultValue={review?.quote}
          required
          rows={4}
          className="mt-1"
          placeholder="고객 후기 원문을 입력하세요"
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
      <div className="flex gap-2">
        <Button type="submit">{isEdit ? "수정" : "등록"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          취소
        </Button>
      </div>
    </form>
  );
}
