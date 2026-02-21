"use server";

import { revalidatePath } from "next/cache";
import { portfolioRepository } from "@/lib/repositories";
import { faqRepository } from "@/lib/repositories";
import { reviewRepository } from "@/lib/repositories";
import type { CreatePortfolioInput, UpdatePortfolioInput } from "@/lib/domain/types";
import type { CreateFaqInput, UpdateFaqInput } from "@/lib/domain/types";
import type { CreateReviewInput, UpdateReviewInput } from "@/lib/domain/types";

export async function createPortfolio(data: CreatePortfolioInput) {
  await portfolioRepository.create(data);
  revalidatePath("/admin/portfolio");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/portfolio");
}

export async function updatePortfolio(id: string, data: UpdatePortfolioInput) {
  await portfolioRepository.update(id, data);
  revalidatePath("/admin/portfolio");
  revalidatePath(`/admin/portfolio/${id}`);
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/portfolio");
}

export async function deletePortfolio(id: string) {
  await portfolioRepository.delete(id);
  revalidatePath("/admin/portfolio");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/portfolio");
}

export async function createFaq(data: CreateFaqInput) {
  await faqRepository.create(data);
  revalidatePath("/admin/faq");
  revalidatePath("/admin");
  revalidatePath("/inquiry");
}

export async function updateFaq(id: string, data: UpdateFaqInput) {
  await faqRepository.update(id, data);
  revalidatePath("/admin/faq");
  revalidatePath("/admin");
  revalidatePath("/inquiry");
}

export async function deleteFaq(id: string) {
  await faqRepository.delete(id);
  revalidatePath("/admin/faq");
  revalidatePath("/admin");
  revalidatePath("/inquiry");
}

export async function createReview(data: CreateReviewInput) {
  await reviewRepository.create(data);
  revalidatePath("/admin/reviews");
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateReview(id: string, data: UpdateReviewInput) {
  await reviewRepository.update(id, data);
  revalidatePath("/admin/reviews");
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteReview(id: string) {
  await reviewRepository.delete(id);
  revalidatePath("/admin/reviews");
  revalidatePath("/admin");
  revalidatePath("/");
}
