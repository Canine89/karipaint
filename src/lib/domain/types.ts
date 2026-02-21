/**
 * 카리페인트 도메인 타입
 */

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  category: string;
  region: string;
  duration: string;
  imageUrl: string;
  order: number;
  createdAt: string;
}

export interface CreatePortfolioInput {
  title: string;
  description: string;
  category: string;
  region: string;
  duration: string;
  imageUrl: string;
  order: number;
}

export interface UpdatePortfolioInput {
  title?: string;
  description?: string;
  category?: string;
  region?: string;
  duration?: string;
  imageUrl?: string;
  order?: number;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  order: number;
  createdAt: string;
}

export interface CreateFaqInput {
  question: string;
  answer: string;
  order: number;
}

export interface UpdateFaqInput {
  question?: string;
  answer?: string;
  order?: number;
}

export interface Review {
  id: string;
  quote: string;
  author: string;
  spaceType: string;
  order: number;
  createdAt: string;
}

export interface CreateReviewInput {
  quote: string;
  author: string;
  spaceType: string;
  order: number;
}

export interface UpdateReviewInput {
  quote?: string;
  author?: string;
  spaceType?: string;
  order?: number;
}
