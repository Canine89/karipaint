import type { Faq, CreateFaqInput, UpdateFaqInput } from "../types";

export interface FaqRepository {
  getAll(): Promise<Faq[]>;
  getById(id: string): Promise<Faq | null>;
  create(data: CreateFaqInput): Promise<Faq>;
  update(id: string, data: UpdateFaqInput): Promise<Faq>;
  delete(id: string): Promise<void>;
}
