import { ReviewForm } from "../ReviewForm";

export default function NewReviewPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">고객 후기 등록</h1>
      <ReviewForm />
    </div>
  );
}
