"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import type { Video } from "@/lib/domain/types";
import { createVideo, updateVideo } from "../../actions";

interface VideoFormProps {
  video?: Video | null;
}

function extractYoutubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
}

export function VideoForm({ video }: VideoFormProps) {
  const router = useRouter();
  const isEdit = !!video;
  const [title, setTitle] = useState(video?.title ?? "");
  const [youtubeUrl, setYoutubeUrl] = useState(video?.youtubeUrl ?? "");
  const [description, setDescription] = useState(video?.description ?? "");
  const [submitting, setSubmitting] = useState(false);

  const videoId = extractYoutubeId(youtubeUrl);

  return (
    <form
      action={async (formData: FormData) => {
        if (submitting) return;
        setSubmitting(true);
        try {
          const data = {
            title: formData.get("title") as string,
            youtubeUrl: formData.get("youtubeUrl") as string,
            description: formData.get("description") as string,
            order: Number(formData.get("order")),
          };
          if (isEdit) {
            await updateVideo(video.id, data);
          } else {
            await createVideo(data);
          }
          router.push("/admin/videos");
        } catch {
          setSubmitting(false);
        }
      }}
      className="space-y-8 max-w-2xl"
    >
      <section className="space-y-5">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          영상 정보
        </h2>
        <div>
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-2 h-11"
            placeholder="예: 아파트 거실 도장 시공 현장"
          />
        </div>
        <div>
          <Label htmlFor="youtubeUrl">YouTube URL</Label>
          <Input
            id="youtubeUrl"
            name="youtubeUrl"
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            required
            className="mt-2 h-11"
            placeholder="https://www.youtube.com/watch?v=..."
          />
          {videoId && (
            <div className="mt-3 aspect-video max-w-md rounded-lg overflow-hidden border border-input bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="미리보기"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
          {youtubeUrl && !videoId && (
            <p className="mt-2 text-sm text-destructive">
              올바른 YouTube URL을 입력해주세요
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="description">설명</Label>
          <Textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 min-h-[100px]"
            placeholder="영상에 대한 간단한 설명"
          />
        </div>
        <div>
          <Label htmlFor="order">정렬 순서</Label>
          <Input
            id="order"
            name="order"
            type="number"
            defaultValue={video?.order ?? 0}
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
