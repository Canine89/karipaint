import type { Faq, CreateFaqInput, UpdateFaqInput } from "@/lib/domain/types";
import type { FaqRepository } from "@/lib/domain/repositories";
import { adminDb } from "@/lib/firebase/admin";

const COLLECTION = "faq";

function toFaq(id: string, data: Record<string, unknown>): Faq {
  const createdAt = data.createdAt as { toDate?: () => Date } | undefined;
  return {
    id,
    question: (data.question as string) ?? "",
    answer: (data.answer as string) ?? "",
    order: (data.order as number) ?? 0,
    createdAt: createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
  };
}

export class FirestoreFaqRepository implements FaqRepository {
  private getCollection() {
    if (!adminDb) throw new Error("Firebase Admin not initialized");
    return adminDb.collection(COLLECTION);
  }

  async getAll(): Promise<Faq[]> {
    const snap = await this.getCollection().orderBy("order", "asc").get();
    return snap.docs.map((d) => toFaq(d.id, d.data()));
  }

  async getById(id: string): Promise<Faq | null> {
    const docRef = this.getCollection().doc(id);
    const snap = await docRef.get();
    if (!snap.exists) return null;
    return toFaq(snap.id, snap.data() ?? {});
  }

  async create(data: CreateFaqInput): Promise<Faq> {
    const { FieldValue } = await import("firebase-admin/firestore");
    const ref = await this.getCollection().add({
      ...data,
      createdAt: FieldValue.serverTimestamp(),
    });
    const created = await this.getById(ref.id);
    if (!created) throw new Error("Failed to create faq");
    return created;
  }

  async update(id: string, data: UpdateFaqInput): Promise<Faq> {
    const ref = this.getCollection().doc(id);
    await ref.update(data as Record<string, unknown>);
    const updated = await this.getById(id);
    if (!updated) throw new Error("Faq not found");
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.getCollection().doc(id).delete();
  }
}
