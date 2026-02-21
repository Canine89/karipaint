import { FormPageHeader } from "../../FormPageHeader";
import { VideoForm } from "../VideoForm";

export default function NewVideoPage() {
  return (
    <div>
      <FormPageHeader title="시공 영상 등록" backHref="/admin/videos" />
      <VideoForm />
    </div>
  );
}
