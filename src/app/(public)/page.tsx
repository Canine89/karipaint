import { unstable_noStore } from "next/cache";
import { portfolioRepository } from "@/lib/repositories";
import { reviewRepository } from "@/lib/repositories";
import { Hero } from "@/components/organisms/Hero";
import { TrustBadges } from "@/components/organisms/TrustBadges";
import { PortfolioPreview } from "@/components/organisms/PortfolioPreview";
import { ReviewSection } from "@/components/organisms/ReviewSection";
import { InquiryBanner } from "@/components/organisms/InquiryBanner";

export default async function HomePage() {
  unstable_noStore(); // 매 요청마다 최신 데이터 조회
  const [portfolios, reviews] = await Promise.all([
    portfolioRepository.getAll(),
    reviewRepository.getAll(),
  ]);

  return (
    <>
      <Hero />
      <TrustBadges />
      <PortfolioPreview items={portfolios} />
      <ReviewSection items={reviews} />
      <InquiryBanner />
    </>
  );
}
