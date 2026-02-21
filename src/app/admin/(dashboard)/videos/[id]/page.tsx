import { notFound } from "next/navigation";
import { videoRepository } from "@/lib/repositories";
import { FormPageHeader } from "../../FormPageHeader";
import { VideoForm } from "../VideoForm";

export default async function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = await videoRepository.getById(id);
  if (!video) notFound();

  return (
    <div>
      <FormPageHeader title="시공 영상 수정" backHref="/admin/videos" />
      <VideoForm video={video} />
    </div>
  );
}
