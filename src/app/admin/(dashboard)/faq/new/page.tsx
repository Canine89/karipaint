import { FaqForm } from "../FaqForm";
import { FormPageHeader } from "../../FormPageHeader";

export default function NewFaqPage() {
  return (
    <div>
      <FormPageHeader title="FAQ 등록" backHref="/admin/faq" />
      <FaqForm />
    </div>
  );
}
