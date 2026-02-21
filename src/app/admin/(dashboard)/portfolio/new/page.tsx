import { PortfolioForm } from "../PortfolioForm";
import { FormPageHeader } from "../../FormPageHeader";

export default function NewPortfolioPage() {
  return (
    <div>
      <FormPageHeader title="포트폴리오 등록" backHref="/admin/portfolio" />
      <PortfolioForm />
    </div>
  );
}
