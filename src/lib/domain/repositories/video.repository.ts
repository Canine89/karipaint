import type {
  Video,
  CreateVideoInput,
  UpdateVideoInput,
} from "../types";

export interface VideoRepository {
  getAll(): Promise<Video[]>;
  getById(id: string): Promise<Video | null>;
  create(data: CreateVideoInput): Promise<Video>;
  update(id: string, data: UpdateVideoInput): Promise<Video>;
  delete(id: string): Promise<void>;
}
