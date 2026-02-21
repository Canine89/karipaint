"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiDraftSection } from "@/components/admin/AiDraftSection";
import type { Portfolio } from "@/lib/domain/types";
import { createPortfolio, updatePortfolio } from "../../actions";

interface PortfolioFormProps {
  portfolio?: Portfolio | null;
}

const CATEGORIES = ["인테리어 도장", "외벽 도장", "기타"];

export function PortfolioForm({ portfolio }: PortfolioFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!portfolio;
  const [title, setTitle] = useState(portfolio?.title ?? "");
  const [description, setDescription] = useState(portfolio?.description ?? "");
  const [category, setCategory] = useState(portfolio?.category ?? "");
  const [region, setRegion] = useState(portfolio?.region ?? "");
  const [duration, setDuration] = useState(portfolio?.duration ?? "");
  const [imageUrl, setImageUrl] = useState(portfolio?.imageUrl ?? "");
  const [uploading, setUploading] = useState(false);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "업로드 실패");
      }
      const { url } = await res.json();
      setImageUrl(url);
    } catch (err) {
      alert(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

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
      className="space-y-8 max-w-2xl"
    >
      <section className="space-y-5">
        <h2 className="text-sm font-semibold text-muted-foreground">기본 정보</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-2 h-10"
            />
          </div>
          <div>
            <Label htmlFor="category">카테고리</Label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-2"
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
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
              className="mt-2 h-10"
              placeholder="예: 서울 강남구"
            />
          </div>
          <div>
            <Label htmlFor="duration">소요일</Label>
            <Input
              id="duration"
              name="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className="mt-2 h-10"
              placeholder="예: 3일"
            />
          </div>
        </div>
      </section>
      <section className="space-y-5">
        <h2 className="text-sm font-semibold text-muted-foreground">상세 내용</h2>
        <div>
          <Label>설명</Label>
        <AiDraftSection
          type="portfolio_desc"
          context={{
            region,
            category,
            duration,
            space: title || category,
          }}
          value={description}
          onChange={setDescription}
          name="description"
          label="설명"
          required
          rows={4}
        />
        </div>
        <div>
          <Label>현장 사진</Label>
        <p className="text-sm text-muted-foreground mt-1 mb-2">
          모바일에서는 카메라로 바로 촬영, PC에서는 파일 선택 가능
        </p>
        <div className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleImageSelect}
          />
          <div className="flex gap-2 flex-wrap">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? "업로드 중..." : "📷 사진 촬영 / 선택"}
            </Button>
            {imageUrl && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setImageUrl("")}
              >
                제거
              </Button>
            )}
          </div>
          {imageUrl ? (
            <div className="relative w-full max-w-xs aspect-video rounded-lg overflow-hidden border border-input bg-muted">
              <Image
                src={imageUrl}
                alt="미리보기"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : null}
          <Input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="mt-2 h-10"
            placeholder="위에서 촬영/선택하거나 URL 직접 입력"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="order">정렬 순서</Label>
        <Input
            id="order"
            name="order"
            type="number"
            defaultValue={portfolio?.order ?? 0}
          className="mt-2 h-10 max-w-24"
        />
      </div>
      </section>
      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t">
        <Button type="submit" className="min-h-11">{isEdit ? "수정" : "등록"}</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="min-h-11"
        >
          취소
        </Button>
      </div>
    </form>
  );
}
