import { ReviewForm } from "../ReviewForm";
import { FormPageHeader } from "../../FormPageHeader";

export default function NewReviewPage() {
  return (
    <div>
      <FormPageHeader title="고객 후기 등록" backHref="/admin/reviews" />
      <ReviewForm />
    </div>
  );
}
