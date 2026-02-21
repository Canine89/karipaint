"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Check } from "lucide-react";
import type { SiteSettings } from "@/lib/domain/types";
import { updateSiteSettings } from "../../actions";

interface SiteSettingsFormProps {
  settings: SiteSettings;
}

export function SiteSettingsForm({ settings }: SiteSettingsFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [heroImageUrl, setHeroImageUrl] = useState(settings.heroImageUrl);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

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
      setHeroImageUrl(url);
    } catch (err) {
      alert(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setSaved(false);
    try {
      await updateSiteSettings({ heroImageUrl });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("저장에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <section className="space-y-5">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          대표 이미지
        </h2>
        <p className="text-sm text-muted-foreground">
          사이트 상단(히어로)에 표시되는 대표 이미지입니다.
        </p>

        {heroImageUrl && (
          <div className="relative w-full max-w-md aspect-[4/3] rounded-lg overflow-hidden border border-input bg-muted">
            <Image
              src={heroImageUrl}
              alt="대표 이미지 미리보기"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <div className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleImageSelect}
          />
          <Button
            type="button"
            variant="outline"
            className="h-11"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? "업로드 중..." : "📷 이미지 변경"}
          </Button>

          <div>
            <Label htmlFor="heroImageUrl" className="text-xs text-muted-foreground">
              또는 URL 직접 입력
            </Label>
            <Input
              id="heroImageUrl"
              type="url"
              value={heroImageUrl}
              onChange={(e) => setHeroImageUrl(e.target.value)}
              className="mt-1 h-11"
              placeholder="https://..."
            />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3 pt-6 border-t">
        <Button
          onClick={handleSubmit}
          className="h-11"
          disabled={submitting || uploading}
        >
          {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitting ? "저장 중..." : "저장"}
        </Button>
        {saved && (
          <span className="flex items-center gap-1 text-sm text-green-600">
            <Check className="h-4 w-4" />
            저장되었습니다
          </span>
        )}
      </div>
    </div>
  );
}
