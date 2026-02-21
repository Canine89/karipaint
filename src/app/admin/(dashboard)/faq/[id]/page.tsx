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
      <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-8">
        <Button asChild variant="ghost" size="icon" className="h-10 w-10 shrink-0">
          <Link href="/admin/faq">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">목록</span>
          </Link>
        </Button>
        <h1 className="text-xl md:text-2xl font-bold text-foreground truncate">FAQ 수정</h1>
      </div>
      <FaqForm faq={faq} />
    </div>
  );
}
