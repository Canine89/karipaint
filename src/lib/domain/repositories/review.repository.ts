import type {
  Review,
  CreateReviewInput,
  UpdateReviewInput,
} from "../types";

export interface ReviewRepository {
  getAll(): Promise<Review[]>;
  getById(id: string): Promise<Review | null>;
  create(data: CreateReviewInput): Promise<Review>;
  update(id: string, data: UpdateReviewInput): Promise<Review>;
  delete(id: string): Promise<void>;
}
