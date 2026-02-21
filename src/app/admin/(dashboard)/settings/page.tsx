import { siteSettingsRepository } from "@/lib/repositories";
import { FormPageHeader } from "../FormPageHeader";
import { SiteSettingsForm } from "./SiteSettingsForm";

export default async function AdminSettingsPage() {
  const settings = await siteSettingsRepository.get();

  return (
    <div>
      <FormPageHeader title="사이트 설정" backHref="/admin" />
      <SiteSettingsForm settings={settings} />
    </div>
  );
}
