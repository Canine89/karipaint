import type { SiteSettings, UpdateSiteSettingsInput } from "../types";

export interface SiteSettingsRepository {
  get(): Promise<SiteSettings>;
  update(data: UpdateSiteSettingsInput): Promise<SiteSettings>;
}
