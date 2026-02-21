import { unstable_noStore } from "next/cache";
import { portfolioRepository, reviewRepository, videoRepository, siteSettingsRepository } from "@/lib/repositories";
import { Hero } from "@/components/organisms/Hero";
import { TrustBadges } from "@/components/organisms/TrustBadges";
import { PortfolioPreview } from "@/components/organisms/PortfolioPreview";
import { VideoSection } from "@/components/organisms/VideoSection";
import { ReviewSection } from "@/components/organisms/ReviewSection";
import { InquiryBanner } from "@/components/organisms/InquiryBanner";

export default async function HomePage() {
  unstable_noStore();
  const [portfolios, reviews, videos, siteSettings] = await Promise.all([
    portfolioRepository.getAll(),
    reviewRepository.getAll(),
    videoRepository.getAll(),
    siteSettingsRepository.get(),
  ]);

  return (
    <>
      <Hero heroImageUrl={siteSettings.heroImageUrl} />
      <TrustBadges />
      <PortfolioPreview items={portfolios} />
      <VideoSection items={videos} limit={4} />
      <ReviewSection items={reviews} />
      <InquiryBanner />
    </>
  );
}
