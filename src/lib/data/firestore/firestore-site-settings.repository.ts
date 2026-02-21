import type { SiteSettings, UpdateSiteSettingsInput } from "@/lib/domain/types";
import type { SiteSettingsRepository } from "@/lib/domain/repositories";
import { adminDb } from "@/lib/firebase/admin";

const DOC_PATH = "site-settings/main";

const DEFAULT_HERO =
  "https://images.unsplash.com/photo-1674500197236-a9baa14a697e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzE2NDk0NjB8&ixlib=rb-4.1.0&q=80&w=1080";

function toSettings(data: Record<string, unknown>): SiteSettings {
  const updatedAt = data.updatedAt as { toDate?: () => Date } | undefined;
  return {
    heroImageUrl: (data.heroImageUrl as string) || DEFAULT_HERO,
    updatedAt: updatedAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
  };
}

export class FirestoreSiteSettingsRepository implements SiteSettingsRepository {
  private getDoc() {
    if (!adminDb) throw new Error("Firebase Admin not initialized");
    return adminDb.doc(DOC_PATH);
  }

  async get(): Promise<SiteSettings> {
    const snap = await this.getDoc().get();
    if (!snap.exists) {
      return { heroImageUrl: DEFAULT_HERO, updatedAt: new Date().toISOString() };
    }
    return toSettings(snap.data() ?? {});
  }

  async update(data: UpdateSiteSettingsInput): Promise<SiteSettings> {
    const { FieldValue } = await import("firebase-admin/firestore");
    await this.getDoc().set(
      { ...data, updatedAt: FieldValue.serverTimestamp() },
      { merge: true }
    );
    return this.get();
  }
}
