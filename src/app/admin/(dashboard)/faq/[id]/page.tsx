import { notFound } from "next/navigation";
import Link from "next/link";
import { faqRepository } from "@/lib/repositories";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FaqForm } from "../FaqForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditFaqPage({ params }: PageProps) {
  const { id } = await params;
  const faq = await faqRepository.getById(id);
  if (!faq) notFound();

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/faq">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">목록</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-foreground">FAQ 수정</h1>
      </div>
      <FaqForm faq={faq} />
    </div>
  );
}
