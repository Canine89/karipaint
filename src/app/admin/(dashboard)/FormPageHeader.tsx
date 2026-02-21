import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface FormPageHeaderProps {
  title: string;
  backHref: string;
  backLabel?: string;
}

export function FormPageHeader({
  title,
  backHref,
  backLabel = "목록",
}: FormPageHeaderProps) {
  return (
    <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="h-10 w-10 shrink-0"
      >
        <Link href={backHref}>
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">{backLabel}</span>
        </Link>
      </Button>
      <h1 className="text-xl md:text-2xl font-bold text-foreground truncate">
        {title}
      </h1>
    </div>
  );
}
