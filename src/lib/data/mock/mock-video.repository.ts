import type {
  Video,
  CreateVideoInput,
  UpdateVideoInput,
} from "@/lib/domain/types";
import type { VideoRepository } from "@/lib/domain/repositories";

const MOCK_VIDEOS: Video[] = [
  {
    id: "1",
    title: "아파트 거실 도장 시공 현장",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "강남구 아파트 거실 전체 도장 시공 과정을 담았습니다.",
    order: 0,
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    title: "외벽 도장 작업 브이로그",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "상가 건물 외벽 도장 작업 과정입니다.",
    order: 1,
    createdAt: "2024-02-10T00:00:00Z",
  },
];

const STORE_KEY = "__karipaint_mock_videos__";

function getStore(): Video[] {
  const g = globalThis as unknown as { [key: string]: Video[] | undefined };
  if (!g[STORE_KEY]) {
    g[STORE_KEY] = [...MOCK_VIDEOS];
  }
  return g[STORE_KEY];
}

export class MockVideoRepository implements VideoRepository {
  async getAll(): Promise<Video[]> {
    return [...getStore()].sort((a, b) => a.order - b.order);
  }

  async getById(id: string): Promise<Video | null> {
    return getStore().find((v) => v.id === id) ?? null;
  }

  async create(data: CreateVideoInput): Promise<Video> {
    const id = String(Date.now());
    const newItem: Video = {
      id,
      ...data,
      createdAt: new Date().toISOString(),
    };
    getStore().push(newItem);
    return newItem;
  }

  async update(id: string, data: UpdateVideoInput): Promise<Video> {
    const items = getStore();
    const idx = items.findIndex((v) => v.id === id);
    if (idx === -1) throw new Error("Video not found");
    items[idx] = { ...items[idx], ...data };
    return items[idx];
  }

  async delete(id: string): Promise<void> {
    const items = getStore();
    const idx = items.findIndex((v) => v.id === id);
    if (idx !== -1) items.splice(idx, 1);
  }
}
