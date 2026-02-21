import { unstable_noStore } from "next/cache";
import { videoRepository } from "@/lib/repositories";
import { Hero } from "@/components/organisms/Hero";
import { VideoSection } from "@/components/organisms/VideoSection";

export const metadata = {
  title: "시공 영상 | 카리페인트",
  description: "카리페인트의 실제 시공 현장 영상을 확인하세요.",
};

export default async function VideosPage() {
  unstable_noStore();
  const videos = await videoRepository.getAll();

  return (
    <>
      <Hero
        variant="compact"
        title="시공 영상"
        subtitle="실제 시공 과정을 영상으로 확인하세요"
      />
      <VideoSection items={videos} />
    </>
  );
}
