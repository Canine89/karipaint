import { notFound } from "next/navigation";
import Link from "next/link";
import { reviewRepository } from "@/lib/repositories";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ReviewForm } from "../ReviewForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditReviewPage({ params }: PageProps) {
  const { id } = await params;
  const review = await reviewRepository.getById(id);
  if (!review) notFound();

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/reviews">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">목록</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-foreground">고객 후기 수정</h1>
      </div>
      <ReviewForm review={review} />
    </div>
  );
}
