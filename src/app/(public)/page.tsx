import { portfolioRepository } from "@/lib/repositories";
import { reviewRepository } from "@/lib/repositories";
import { Hero } from "@/components/organisms/Hero";
import { TrustBadges } from "@/components/organisms/TrustBadges";
import { PortfolioPreview } from "@/components/organisms/PortfolioPreview";
import { ReviewSection } from "@/components/organisms/ReviewSection";
import { InquiryBanner } from "@/components/organisms/InquiryBanner";

export default async function HomePage() {
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
