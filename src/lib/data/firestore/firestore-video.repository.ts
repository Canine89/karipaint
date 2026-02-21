import type {
  Video,
  CreateVideoInput,
  UpdateVideoInput,
} from "@/lib/domain/types";
import type { VideoRepository } from "@/lib/domain/repositories";
import { adminDb } from "@/lib/firebase/admin";

const COLLECTION = "videos";

function toVideo(id: string, data: Record<string, unknown>): Video {
  const createdAt = data.createdAt as { toDate?: () => Date } | undefined;
  return {
    id,
    title: (data.title as string) ?? "",
    youtubeUrl: (data.youtubeUrl as string) ?? "",
    description: (data.description as string) ?? "",
    order: (data.order as number) ?? 0,
    createdAt: createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
  };
}

export class FirestoreVideoRepository implements VideoRepository {
  private getCollection() {
    if (!adminDb) throw new Error("Firebase Admin not initialized");
    return adminDb.collection(COLLECTION);
  }

  async getAll(): Promise<Video[]> {
    const snap = await this.getCollection().orderBy("order", "asc").get();
    return snap.docs.map((d) => toVideo(d.id, d.data()));
  }

  async getById(id: string): Promise<Video | null> {
    const docRef = this.getCollection().doc(id);
    const snap = await docRef.get();
    if (!snap.exists) return null;
    return toVideo(snap.id, snap.data() ?? {});
  }

  async create(data: CreateVideoInput): Promise<Video> {
    const { FieldValue } = await import("firebase-admin/firestore");
    const ref = await this.getCollection().add({
      ...data,
      createdAt: FieldValue.serverTimestamp(),
    });
    const created = await this.getById(ref.id);
    if (!created) throw new Error("Failed to create video");
    return created;
  }

  async update(id: string, data: UpdateVideoInput): Promise<Video> {
    const ref = this.getCollection().doc(id);
    await ref.update(data as Record<string, unknown>);
    const updated = await this.getById(id);
    if (!updated) throw new Error("Video not found");
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.getCollection().doc(id).delete();
  }
}
