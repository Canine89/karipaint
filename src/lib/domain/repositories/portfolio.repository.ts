import type {
  Portfolio,
  CreatePortfolioInput,
  UpdatePortfolioInput,
} from "../types";

export interface PortfolioRepository {
  getAll(): Promise<Portfolio[]>;
  getById(id: string): Promise<Portfolio | null>;
  create(data: CreatePortfolioInput): Promise<Portfolio>;
  update(id: string, data: UpdatePortfolioInput): Promise<Portfolio>;
  delete(id: string): Promise<void>;
}
