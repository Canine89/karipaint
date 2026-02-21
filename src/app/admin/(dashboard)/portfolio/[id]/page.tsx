import { notFound } from "next/navigation";
import { portfolioRepository } from "@/lib/repositories";
import { PortfolioForm } from "../PortfolioForm";
import { FormPageHeader } from "../../FormPageHeader";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPortfolioPage({ params }: PageProps) {
  const { id } = await params;
  const portfolio = await portfolioRepository.getById(id);
  if (!portfolio) notFound();

  return (
    <div>
      <FormPageHeader title="포트폴리오 수정" backHref="/admin/portfolio" />
      <PortfolioForm portfolio={portfolio} />
    </div>
  );
}
