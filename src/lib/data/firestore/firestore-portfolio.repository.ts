import type {
  Portfolio,
  CreatePortfolioInput,
  UpdatePortfolioInput,
} from "@/lib/domain/types";
import type { PortfolioRepository } from "@/lib/domain/repositories";
import { adminDb } from "@/lib/firebase/admin";

const COLLECTION = "portfolio";

function toPortfolio(id: string, data: Record<string, unknown>): Portfolio {
  const createdAt = data.createdAt as { toDate?: () => Date } | undefined;
  return {
    id,
    title: (data.title as string) ?? "",
    description: (data.description as string) ?? "",
    category: (data.category as string) ?? "",
    region: (data.region as string) ?? "",
    duration: (data.duration as string) ?? "",
    imageUrl: (data.imageUrl as string) ?? "",
    order: (data.order as number) ?? 0,
    createdAt: createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
  };
}

export class FirestorePortfolioRepository implements PortfolioRepository {
  private getCollection() {
    if (!adminDb) throw new Error("Firebase Admin not initialized");
    return adminDb.collection(COLLECTION);
  }

  async getAll(): Promise<Portfolio[]> {
    const snap = await this.getCollection().orderBy("order", "asc").get();
    return snap.docs.map((d) => toPortfolio(d.id, d.data()));
  }

  async getById(id: string): Promise<Portfolio | null> {
    const docRef = this.getCollection().doc(id);
    const snap = await docRef.get();
    if (!snap.exists) return null;
    return toPortfolio(snap.id, snap.data() ?? {});
  }

  async create(data: CreatePortfolioInput): Promise<Portfolio> {
    const { FieldValue } = await import("firebase-admin/firestore");
    const ref = await this.getCollection().add({
      ...data,
      createdAt: FieldValue.serverTimestamp(),
    });
    const created = await this.getById(ref.id);
    if (!created) throw new Error("Failed to create portfolio");
    return created;
  }

  async update(id: string, data: UpdatePortfolioInput): Promise<Portfolio> {
    const ref = this.getCollection().doc(id);
    await ref.update(data as Record<string, unknown>);
    const updated = await this.getById(id);
    if (!updated) throw new Error("Portfolio not found");
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.getCollection().doc(id).delete();
  }
}
