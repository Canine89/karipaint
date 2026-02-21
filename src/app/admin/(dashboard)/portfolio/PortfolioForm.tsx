"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Portfolio } from "@/lib/domain/types";
import { createPortfolio, updatePortfolio } from "../../actions";

interface PortfolioFormProps {
  portfolio?: Portfolio | null;
}

const CATEGORIES = ["인테리어 도장", "외벽 도장", "기타"];

export function PortfolioForm({ portfolio }: PortfolioFormProps) {
  const router = useRouter();
  const isEdit = !!portfolio;

  return (
    <form
      action={async (formData: FormData) => {
        const data = {
          title: formData.get("title") as string,
          description: formData.get("description") as string,
          category: formData.get("category") as string,
          region: formData.get("region") as string,
          duration: formData.get("duration") as string,
          imageUrl: formData.get("imageUrl") as string,
          order: Number(formData.get("order")),
        };
        if (isEdit) {
          await updatePortfolio(portfolio.id, data);
          router.push("/admin/portfolio");
        } else {
          await createPortfolio(data);
          router.push("/admin/portfolio");
        }
      }}
      className="space-y-6 max-w-2xl"
    >
      <div>
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          name="title"
          defaultValue={portfolio?.title}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="description">설명</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={portfolio?.description}
          required
          rows={4}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="category">카테고리</Label>
        <select
          id="category"
          name="category"
          defaultValue={portfolio?.category}
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
        >
          <option value="">선택</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="region">지역</Label>
        <Input
          id="region"
          name="region"
          defaultValue={portfolio?.region}
          required
          className="mt-1"
          placeholder="예: 서울 강남구"
        />
      </div>
      <div>
        <Label htmlFor="duration">소요일</Label>
        <Input
          id="duration"
          name="duration"
          defaultValue={portfolio?.duration}
          required
          className="mt-1"
          placeholder="예: 3일"
        />
      </div>
      <div>
        <Label htmlFor="imageUrl">이미지 URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          type="url"
          defaultValue={portfolio?.imageUrl}
          required
          className="mt-1"
          placeholder="https://..."
        />
      </div>
      <div>
        <Label htmlFor="order">정렬 순서</Label>
        <Input
          id="order"
          name="order"
          type="number"
          defaultValue={portfolio?.order ?? 0}
          className="mt-1"
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit">{isEdit ? "수정" : "등록"}</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          취소
        </Button>
      </div>
    </form>
  );
}
