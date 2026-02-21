import { PortfolioForm } from "../PortfolioForm";

export default function NewPortfolioPage() {
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-foreground mb-6 md:mb-8">포트폴리오 등록</h1>
      <PortfolioForm />
    </div>
  );
}
