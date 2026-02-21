import type {
  PortfolioRepository,
  FaqRepository,
  ReviewRepository,
  VideoRepository,
  SiteSettingsRepository,
} from "@/lib/domain/repositories";
import { MockPortfolioRepository } from "@/lib/data/mock/mock-portfolio.repository";
import { MockFaqRepository } from "@/lib/data/mock/mock-faq.repository";
import { MockReviewRepository } from "@/lib/data/mock/mock-review.repository";
import { MockVideoRepository } from "@/lib/data/mock/mock-video.repository";
import { MockSiteSettingsRepository } from "@/lib/data/mock/mock-site-settings.repository";

/** Vercel 배포(production/preview) 환경인지 */
const IS_DEPLOYED =
  process.env.VERCEL_ENV === "production" ||
  process.env.VERCEL_ENV === "preview";

const FIREBASE_CONFIGURED =
  process.env.NEXT_PUBLIC_USE_FIREBASE === "true" &&
  !!process.env.FIREBASE_PROJECT_ID;

/** 배포 환경에서는 Firebase 필수, 로컬에서는 설정 시 Firebase / 미설정 시 Mock */
const USE_FIREBASE = FIREBASE_CONFIGURED;

function assertFirebaseForDeploy(): void {
  if (IS_DEPLOYED && !FIREBASE_CONFIGURED) {
    throw new Error(
      "배포 환경에서는 Firebase가 필수입니다. Vercel 환경 변수에 NEXT_PUBLIC_USE_FIREBASE, FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY 등을 설정해주세요."
    );
  }
}

let _portfolioRepo: PortfolioRepository;
let _faqRepo: FaqRepository;
let _reviewRepo: ReviewRepository;
let _videoRepo: VideoRepository;
let _siteSettingsRepo: SiteSettingsRepository;

async function getPortfolioRepository(): Promise<PortfolioRepository> {
  if (_portfolioRepo) return _portfolioRepo;
  if (USE_FIREBASE) {
    const { FirestorePortfolioRepository } = await import(
      "@/lib/data/firestore/firestore-portfolio.repository"
    );
    _portfolioRepo = new FirestorePortfolioRepository();
  } else {
    assertFirebaseForDeploy();
    _portfolioRepo = new MockPortfolioRepository();
  }
  return _portfolioRepo;
}

async function getFaqRepository(): Promise<FaqRepository> {
  if (_faqRepo) return _faqRepo;
  if (USE_FIREBASE) {
    const { FirestoreFaqRepository } = await import(
      "@/lib/data/firestore/firestore-faq.repository"
    );
    _faqRepo = new FirestoreFaqRepository();
  } else {
    assertFirebaseForDeploy();
    _faqRepo = new MockFaqRepository();
  }
  return _faqRepo;
}

async function getReviewRepository(): Promise<ReviewRepository> {
  if (_reviewRepo) return _reviewRepo;
  if (USE_FIREBASE) {
    const { FirestoreReviewRepository } = await import(
      "@/lib/data/firestore/firestore-review.repository"
    );
    _reviewRepo = new FirestoreReviewRepository();
  } else {
    assertFirebaseForDeploy();
    _reviewRepo = new MockReviewRepository();
  }
  return _reviewRepo;
}

export const portfolioRepository: PortfolioRepository = {
  getAll: () => getPortfolioRepository().then((r) => r.getAll()),
  getById: (id) => getPortfolioRepository().then((r) => r.getById(id)),
  create: (data) => getPortfolioRepository().then((r) => r.create(data)),
  update: (id, data) => getPortfolioRepository().then((r) => r.update(id, data)),
  delete: (id) => getPortfolioRepository().then((r) => r.delete(id)),
};

export const faqRepository: FaqRepository = {
  getAll: () => getFaqRepository().then((r) => r.getAll()),
  getById: (id) => getFaqRepository().then((r) => r.getById(id)),
  create: (data) => getFaqRepository().then((r) => r.create(data)),
  update: (id, data) => getFaqRepository().then((r) => r.update(id, data)),
  delete: (id) => getFaqRepository().then((r) => r.delete(id)),
};

export const reviewRepository: ReviewRepository = {
  getAll: () => getReviewRepository().then((r) => r.getAll()),
  getById: (id) => getReviewRepository().then((r) => r.getById(id)),
  create: (data) => getReviewRepository().then((r) => r.create(data)),
  update: (id, data) => getReviewRepository().then((r) => r.update(id, data)),
  delete: (id) => getReviewRepository().then((r) => r.delete(id)),
};

async function getVideoRepository(): Promise<VideoRepository> {
  if (_videoRepo) return _videoRepo;
  if (USE_FIREBASE) {
    const { FirestoreVideoRepository } = await import(
      "@/lib/data/firestore/firestore-video.repository"
    );
    _videoRepo = new FirestoreVideoRepository();
  } else {
    assertFirebaseForDeploy();
    _videoRepo = new MockVideoRepository();
  }
  return _videoRepo;
}

export const videoRepository: VideoRepository = {
  getAll: () => getVideoRepository().then((r) => r.getAll()),
  getById: (id) => getVideoRepository().then((r) => r.getById(id)),
  create: (data) => getVideoRepository().then((r) => r.create(data)),
  update: (id, data) => getVideoRepository().then((r) => r.update(id, data)),
  delete: (id) => getVideoRepository().then((r) => r.delete(id)),
};

async function getSiteSettingsRepository(): Promise<SiteSettingsRepository> {
  if (_siteSettingsRepo) return _siteSettingsRepo;
  if (USE_FIREBASE) {
    const { FirestoreSiteSettingsRepository } = await import(
      "@/lib/data/firestore/firestore-site-settings.repository"
    );
    _siteSettingsRepo = new FirestoreSiteSettingsRepository();
  } else {
    assertFirebaseForDeploy();
    _siteSettingsRepo = new MockSiteSettingsRepository();
  }
  return _siteSettingsRepo;
}

export const siteSettingsRepository: SiteSettingsRepository = {
  get: () => getSiteSettingsRepository().then((r) => r.get()),
  update: (data) => getSiteSettingsRepository().then((r) => r.update(data)),
};
