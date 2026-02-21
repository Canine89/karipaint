import type { SiteSettings, UpdateSiteSettingsInput } from "@/lib/domain/types";
import type { SiteSettingsRepository } from "@/lib/domain/repositories";

const DEFAULT_HERO =
  "https://images.unsplash.com/photo-1674500197236-a9baa14a697e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzE2NDk0NjB8&ixlib=rb-4.1.0&q=80&w=1080";

const STORE_KEY = "__karipaint_mock_site_settings__";

function getStore(): SiteSettings {
  const g = globalThis as unknown as { [key: string]: SiteSettings | undefined };
  if (!g[STORE_KEY]) {
    g[STORE_KEY] = {
      heroImageUrl: DEFAULT_HERO,
      updatedAt: new Date().toISOString(),
    };
  }
  return g[STORE_KEY];
}

export class MockSiteSettingsRepository implements SiteSettingsRepository {
  async get(): Promise<SiteSettings> {
    return { ...getStore() };
  }

  async update(data: UpdateSiteSettingsInput): Promise<SiteSettings> {
    const store = getStore();
    if (data.heroImageUrl !== undefined) store.heroImageUrl = data.heroImageUrl;
    store.updatedAt = new Date().toISOString();
    return { ...store };
  }
}
