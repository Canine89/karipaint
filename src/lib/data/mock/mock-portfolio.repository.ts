import type {
  Portfolio,
  CreatePortfolioInput,
  UpdatePortfolioInput,
} from "@/lib/domain/types";
import type { PortfolioRepository } from "@/lib/domain/repositories";

const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
  "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
];

const MOCK_PORTFOLIOS: Portfolio[] = [
  {
    id: "1",
    title: "강남 아파트 거실·방 인테리어 도장",
    description:
      "2대째 이어진 기술력으로 거실과 방 전체에 내추럴 톤의 인테리어 도장을 시공했습니다. 고객님께서 공간이 한층 밝고 포근해졌다고 만족해 주셨습니다.",
    category: "인테리어 도장",
    region: "서울 강남구",
    duration: "3일",
    imageUrl: MOCK_IMAGES[0],
    order: 0,
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    title: "성북구 주택 외벽 도장",
    description:
      "외벽 전면 도장으로 집의 첫인상을 새롭게 했습니다. 오래된 벽면을 깔끔하게 마감해 이웃 분들로부터 칭찬을 받으셨다고 합니다.",
    category: "외벽 도장",
    region: "서울 성북구",
    duration: "5일",
    imageUrl: MOCK_IMAGES[1],
    order: 1,
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "3",
    title: "오피스텔 천장·벽면 리모델링",
    description:
      "작은 공간이라도 꼼꼼하게. 천장과 벽면을 동시에 마감해 공간의 가치를 높였습니다.",
    category: "인테리어 도장",
    region: "경기 성남시",
    duration: "2일",
    imageUrl: MOCK_IMAGES[2],
    order: 2,
    createdAt: "2024-02-10T00:00:00Z",
  },
  {
    id: "4",
    title: "빌라 현관·복도 도장",
    description:
      "현관과 복도를 밝은 톤으로 시공해 입구부터 환한 인상을 연출했습니다.",
    category: "기타",
    region: "서울 노원구",
    duration: "1일",
    imageUrl: MOCK_IMAGES[3],
    order: 3,
    createdAt: "2024-03-01T00:00:00Z",
  },
];

const STORE_KEY = "__karipaint_mock_portfolios__";

function getStore(): Portfolio[] {
  const g = globalThis as unknown as { [key: string]: Portfolio[] | undefined };
  if (!g[STORE_KEY]) {
    g[STORE_KEY] = [...MOCK_PORTFOLIOS];
  }
  return g[STORE_KEY];
}

export class MockPortfolioRepository implements PortfolioRepository {
  async getAll(): Promise<Portfolio[]> {
    return [...getStore()].sort((a, b) => a.order - b.order);
  }

  async getById(id: string): Promise<Portfolio | null> {
    return getStore().find((p) => p.id === id) ?? null;
  }

  async create(data: CreatePortfolioInput): Promise<Portfolio> {
    const id = String(Date.now());
    const newItem: Portfolio = {
      id,
      ...data,
      createdAt: new Date().toISOString(),
    };
    getStore().push(newItem);
    return newItem;
  }

  async update(id: string, data: UpdatePortfolioInput): Promise<Portfolio> {
    const items = getStore();
    const idx = items.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error("Portfolio not found");
    items[idx] = { ...items[idx], ...data };
    return items[idx];
  }

  async delete(id: string): Promise<void> {
    const items = getStore();
    const idx = items.findIndex((p) => p.id === id);
    if (idx !== -1) items.splice(idx, 1);
  }
}
