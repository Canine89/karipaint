import type {
  Review,
  CreateReviewInput,
  UpdateReviewInput,
} from "@/lib/domain/types";
import type { ReviewRepository } from "@/lib/domain/repositories";
import { adminDb } from "@/lib/firebase/admin";

const COLLECTION = "reviews";

function toReview(id: string, data: Record<string, unknown>): Review {
  const createdAt = data.createdAt as { toDate?: () => Date } | undefined;
  return {
    id,
    quote: (data.quote as string) ?? "",
    author: (data.author as string) ?? "",
    spaceType: (data.spaceType as string) ?? "",
    order: (data.order as number) ?? 0,
    createdAt: createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
  };
}

export class FirestoreReviewRepository implements ReviewRepository {
  private getCollection() {
    if (!adminDb) throw new Error("Firebase Admin not initialized");
    return adminDb.collection(COLLECTION);
  }

  async getAll(): Promise<Review[]> {
    const snap = await this.getCollection().orderBy("order", "asc").get();
    return snap.docs.map((d) => toReview(d.id, d.data()));
  }

  async getById(id: string): Promise<Review | null> {
    const docRef = this.getCollection().doc(id);
    const snap = await docRef.get();
    if (!snap.exists) return null;
    return toReview(snap.id, snap.data() ?? {});
  }

  async create(data: CreateReviewInput): Promise<Review> {
    const { FieldValue } = await import("firebase-admin/firestore");
    const ref = await this.getCollection().add({
      ...data,
      createdAt: FieldValue.serverTimestamp(),
    });
    const created = await this.getById(ref.id);
    if (!created) throw new Error("Failed to create review");
    return created;
  }

  async update(id: string, data: UpdateReviewInput): Promise<Review> {
    const ref = this.getCollection().doc(id);
    await ref.update(data as Record<string, unknown>);
    const updated = await this.getById(id);
    if (!updated) throw new Error("Review not found");
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.getCollection().doc(id).delete();
  }
}
