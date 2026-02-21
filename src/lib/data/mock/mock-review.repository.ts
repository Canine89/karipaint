import type {
  Review,
  CreateReviewInput,
  UpdateReviewInput,
} from "@/lib/domain/types";
import type { ReviewRepository } from "@/lib/domain/repositories";

const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    quote:
      "거실 시공했는데 정말 세심하게 해주셔서 만족스러웠어요. 공간이 확 밝아진 느낌이에요.",
    author: "강남구 이○○ 고객님",
    spaceType: "거실",
    order: 0,
    createdAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "2",
    quote:
      "친절하고 꼼꼼해서 믿고 맡길 수 있었습니다. 추천해요!",
    author: "성북구 박○○ 고객님",
    spaceType: "방·거실",
    order: 1,
    createdAt: "2024-02-05T00:00:00Z",
  },
  {
    id: "3",
    quote:
      "빠르게 진행해 주시고, 결과물도 깔끔해서 좋았어요. 다음에 또 부탁드릴게요.",
    author: "노원구 김○○ 고객님",
    spaceType: "현관·복도",
    order: 2,
    createdAt: "2024-03-02T00:00:00Z",
  },
  {
    id: "4",
    quote:
      "시공 전후 차이가 너무 커서 만족스러워요. 세심하게 작업해 주셨습니다.",
    author: "아파트 거주 OO고객",
    spaceType: "전체",
    order: 3,
    createdAt: "2024-03-15T00:00:00Z",
  },
  {
    id: "5",
    quote:
      "예상보다 훨씬 빨리 끝나서 놀랐어요. 가격도 합리적이고 만족합니다.",
    author: "성남시 정○○ 고객님",
    spaceType: "거실·방",
    order: 4,
    createdAt: "2024-04-01T00:00:00Z",
  },
];

export class MockReviewRepository implements ReviewRepository {
  private items = [...MOCK_REVIEWS];

  async getAll(): Promise<Review[]> {
    return [...this.items].sort((a, b) => a.order - b.order);
  }

  async getById(id: string): Promise<Review | null> {
    return this.items.find((r) => r.id === id) ?? null;
  }

  async create(data: CreateReviewInput): Promise<Review> {
    const id = String(Date.now());
    const newItem: Review = {
      id,
      ...data,
      createdAt: new Date().toISOString(),
    };
    this.items.push(newItem);
    return newItem;
  }

  async update(id: string, data: UpdateReviewInput): Promise<Review> {
    const idx = this.items.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error("Review not found");
    this.items[idx] = { ...this.items[idx], ...data };
    return this.items[idx];
  }

  async delete(id: string): Promise<void> {
    const idx = this.items.findIndex((r) => r.id === id);
    if (idx !== -1) this.items.splice(idx, 1);
  }
}
