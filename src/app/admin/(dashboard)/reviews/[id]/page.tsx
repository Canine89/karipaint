import { notFound } from "next/navigation";
import { reviewRepository } from "@/lib/repositories";
import { ReviewForm } from "../ReviewForm";
import { FormPageHeader } from "../../FormPageHeader";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditReviewPage({ params }: PageProps) {
  const { id } = await params;
  const review = await reviewRepository.getById(id);
  if (!review) notFound();

  return (
    <div>
      <FormPageHeader title="고객 후기 수정" backHref="/admin/reviews" />
      <ReviewForm review={review} />
    </div>
  );
}
