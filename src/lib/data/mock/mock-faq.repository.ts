import type { Faq, CreateFaqInput, UpdateFaqInput } from "@/lib/domain/types";
import type { FaqRepository } from "@/lib/domain/repositories";

const MOCK_FAQS: Faq[] = [
  {
    id: "1",
    question: "견적은 어떻게 받을 수 있나요?",
    answer:
      "카카오톡 1:1 채팅, 인스타그램 DM, 네이버 톡톡 등 편하신 방법으로 연락 주시면 됩니다. 현장 확인 후 상세 견적을 제출해 드립니다.",
    order: 0,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    question: "시공 기간은 얼마나 걸리나요?",
    answer:
      "공간 크기와 작업 범위에 따라 다르지만, 일반적으로 소규모(1~2일), 중규모(3~5일) 정도 소요됩니다. 정확한 일정은 현장 확인 후 안내드립니다.",
    order: 1,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    question: "어떤 지역까지 방문 가능한가요?",
    answer:
      "서울 및 수도권 전역 방문 가능합니다. 지역에 따라 출장비가 발생할 수 있으니 문의 시 말씀해 주세요.",
    order: 2,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    question: "Before/After 사진을 제공해 주시나요?",
    answer:
      "네, 시공 완료 후 Before/After 사진을 촬영해 보관·전달해 드립니다. 고객 동의 시 포트폴리오에도 활용될 수 있습니다.",
    order: 3,
    createdAt: "2024-01-01T00:00:00Z",
  },
];

const STORE_KEY = "__karipaint_mock_faqs__";

function getStore(): Faq[] {
  const g = globalThis as unknown as { [key: string]: Faq[] | undefined };
  if (!g[STORE_KEY]) {
    g[STORE_KEY] = [...MOCK_FAQS];
  }
  return g[STORE_KEY];
}

export class MockFaqRepository implements FaqRepository {
  async getAll(): Promise<Faq[]> {
    return [...getStore()].sort((a, b) => a.order - b.order);
  }

  async getById(id: string): Promise<Faq | null> {
    return getStore().find((f) => f.id === id) ?? null;
  }

  async create(data: CreateFaqInput): Promise<Faq> {
    const id = String(Date.now());
    const newItem: Faq = {
      id,
      ...data,
      createdAt: new Date().toISOString(),
    };
    getStore().push(newItem);
    return newItem;
  }

  async update(id: string, data: UpdateFaqInput): Promise<Faq> {
    const items = getStore();
    const idx = items.findIndex((f) => f.id === id);
    if (idx === -1) throw new Error("Faq not found");
    items[idx] = { ...items[idx], ...data };
    return items[idx];
  }

  async delete(id: string): Promise<void> {
    const items = getStore();
    const idx = items.findIndex((f) => f.id === id);
    if (idx !== -1) items.splice(idx, 1);
  }
}
