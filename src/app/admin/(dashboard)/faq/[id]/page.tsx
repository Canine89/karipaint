import { notFound } from "next/navigation";
import { faqRepository } from "@/lib/repositories";
import { FaqForm } from "../FaqForm";
import { FormPageHeader } from "../../FormPageHeader";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditFaqPage({ params }: PageProps) {
  const { id } = await params;
  const faq = await faqRepository.getById(id);
  if (!faq) notFound();

  return (
    <div>
      <FormPageHeader title="FAQ 수정" backHref="/admin/faq" />
      <FaqForm faq={faq} />
    </div>
  );
}
